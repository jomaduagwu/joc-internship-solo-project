"use client";

import Link from "next/link";

type TaskItemProps = {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: string;
  complete: boolean;
  toggleTask: (id: number, complete: boolean) => void;
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask: (id: number) => void;
};
export function TaskItem({
  id,
  title,
  description,
  dueDate,
  priority,
  complete,
  toggleTask,
  onDeleteTask,
}: TaskItemProps) {
  const handleDelete = () => {
    onDeleteTask(id);
  };

  return (
    <li className="flex gap-4 py-3 items-center">
      <input
        id={id.toString()}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTask(id, e.target.checked)}
      />
      <div className="flex-grow">
        <label
          htmlFor={id.toString()}
          className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
        >
          {title}
        </label>
        <div className="flex justify-between">
          {dueDate && (
            <p className="text-slate-100 text-sm">
              Due Date: {dueDate ? new Date(dueDate).toLocaleDateString() : ""}
            </p>
          )}
          <p className="text-slate-100 text-sm">Priority: {priority}</p>
        </div>

        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded outline-non bg-transparent focus-within:bg-slate-100 hover:bg-cyan-600"
        >
          Delete
        </button>
        <Link href={`/edit/${id}`}>
          <button className="border border-slate-300 text-slate-300 px-2 py-1 rounded outline-non bg-transparent focus-within:bg-slate-100 hover:bg-cyan-600">
            Edit
          </button>
        </Link>
      </div>

      {/* <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label> */}
    </li>
  );
}
