import prisma from '@/prisma/client';
import { Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import TaskStatusBadge from './components/TaskStatusBadge';

const LatestTasks = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    // take: 6,
    
  });
  

  return (
    <div>
      <Heading size="4" mb="5">
        Tasks
      </Heading>
      {tasks.map((task) => (
        <Card key={task.id} className='mb-3'>
          <Flex direction="column" gap="2">
            <Link href={`/tasks/${task.id}`}>
              {task.title}
            </Link>
            <TaskStatusBadge status={task.status} />
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default LatestTasks;