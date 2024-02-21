import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma/client';

// GET /api/tasks
export default async function handleGetTasks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// POST /api/tasks
export async function handleCreateTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, dueDate, priority, complete  } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate,
        priority,
        complete,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /api/tasks/:id
export async function handleUpdateTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskId = parseInt(req.query.id as string, 10);
    const { title, description, priority, dueDate } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        priority,
        dueDate,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE /api/tasks/:id
export async function handleDeleteTask(req: NextApiRequest, res: NextApiResponse) {
  try {
    const taskId = parseInt(req.query.id as string, 10);
    await prisma.task.delete({
      where: { id: taskId },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
