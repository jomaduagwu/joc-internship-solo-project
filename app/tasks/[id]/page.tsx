import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditTaskButton from "./EditTaskButton";
import TaskDetails from "./TaskDetails";
import DeleteTaskButton from "./DeleteTaskButton";

interface Props {
  params: { id: string };
}

// pull individual id from prisma to get a single Task by id
const TaskDetailPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <>
      <div className="max-w-lg px-6 space-y-3 grid">
        <TaskDetails task={task} />
      </div>
      <div className="px-6 mt-6 space-x-3">
        <EditTaskButton taskId={task.id} />
        <DeleteTaskButton taskId={task.id} />
      </div>
    </>
  );
};

export default TaskDetailPage;