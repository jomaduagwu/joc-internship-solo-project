import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTask(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  const description = data.get("description")?.valueOf() || " ";
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.task.create({ data: { title, description, complete: false } });
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
        <div className="flex gap-1 justify-end">
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 bg-transparent rounded outline-none focus-within:bg-slate-100  hover:bg-cyan-600"
          >
            Create
          </button>
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 bg-transparent rounded outline-none focus-within:bg-slate-100  hover:bg-cyan-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
