import LatestTasks from "./LatestTasks";
import TaskSummary from "./TaskSummary";
import Pagination from "./components/Pagination";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.task.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.task.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.task.count({
    where: { status: 'CLOSED' },
  });

  return (
    <>
      <div className='mb-5'>
        <TaskSummary open={open} inProgress={inProgress} closed={closed} />
      </div>
      <LatestTasks />
    </>
  );
}
