"use client"

type TaskItemProps = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  toggleTask: (id: string, complete: boolean) => void
};
export function TaskItem({ id, title, description, complete, toggleTask }: TaskItemProps) {
  return (
    <li className="flex gap-1 items-center">
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={e => toggleTask(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
    </li>
  );
}
