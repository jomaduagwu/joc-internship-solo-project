import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import { Level } from "../../components/enum"

async function createTask(data: FormData) {
  "use server";

  console.log("Enum values:", Level);
  
  const title = data.get("title")?.valueOf();
  const description = data.get("description")?.valueOf() || " ";
  const dueDateInput = data.get("dueDate");
  const dueDate = dueDateInput ? new Date(dueDateInput as string).toISOString() : null;
  const priorityValue = data.get("priority")?.valueOf();

  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  const priority = (priorityValue as string).toUpperCase() as Level;
  console.log("Priority value from form:", priorityValue);
  console.log("Parsed priority:", priority);

  if (!Object.values(Level).includes(priority)) {
    throw new Error("Invalid priority level");
  }

  await prisma.task.create({ data: { title, description, dueDate, complete: false, priority } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-3xl">New</h1>
      </header>
      <form action={createTask} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border border-slate-300 text-slate-500 px-2 py-1 rounded outline-none focus-within:bg-slate-100"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border border-slate-300 text-slate-500 px-2 py-1 rounded outline-none focus-within:bg-slate-100"
        />
        <div className="flex gap-4">
          <select
            name="priority"
            className="border border-slate-300 text-slate-500 px-2 py-1 rounded outline-none focus-within:bg-slate-100"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            name="dueDate"
            className="border border-slate-300 text-slate-500 px-2 py-1 rounded outline-none focus-within:bg-slate-100"
            placeholder="Due Date"
          />
        </div>
        <div className="flex gap-1 justify-end">
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 bg-transparent rounded outline-none focus-within:bg-slate-100  hover:bg-cyan-600 hover:text-lg"
          >
            Create
          </button>
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 bg-transparent rounded outline-none focus-within:bg-slate-100  hover:bg-cyan-600 hover:text-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
