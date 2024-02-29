import prisma from "@/prisma/client";
import NewTaskPage from "../../new/page";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!task) notFound();

  return (
    <>
      <NewTaskPage task={task}/>
    </>
  );
};

export default EditTaskPage;