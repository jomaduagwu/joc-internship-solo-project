import prisma from "@/prisma/client";
import NewTaskPage from "../../new/page";
import { notFound } from "next/navigation";

// capturing route params
interface Props {
  params: { id: string };
}

// pull individual id from prisma to get a single task by id
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