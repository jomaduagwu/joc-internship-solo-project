import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import TaskActions from './TaskActions';
import { Flex } from '@radix-ui/themes';
import TaskTable, { TaskQuery, columnNames } from './TaskTable';

interface Props {
  searchParams: TaskQuery
}

const TaskPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const orderBy = columnNames
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const tasks = await prisma.task.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const taskCount = await prisma.task.count({ where });

  return (
    <Flex direction="column" gap="3">
      <TaskActions />
      <TaskTable searchParams={searchParams} tasks={tasks} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={taskCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default TaskPage;