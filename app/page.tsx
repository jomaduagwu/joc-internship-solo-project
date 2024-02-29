// // import { TaskItem } from "@/app/components/TaskItem";
// // import { prisma } from "./db";
// import prisma from '@/prisma/client';

// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// import { Level } from "@/app/components/enum"
// // import { getTasks } from "@/app/api/tasks";

// // function to fetch tasks
// // async function getTasks() {
// //   return prisma.task.findMany();
// // }

// // async function toggleTask(id: number, complete: boolean) {
// //   "use server";
// //   await prisma.task.update({ where: { id }, data: { complete } });
// // }

// // async function handleDeleteTask(id: number) {
// //   await prisma.task.delete({ where: { id } });
// // }

// // async function handleEditTask(id: number, updatedTask: Task) {
// //   await prisma.task.update({ where: { id }, data: updatedTask });
// // }

// export default async function Home() {
//   // // define state to hold tasks
//   // const tasks = await getTasks();

//   // // await prisma.task.create({
//   // //   data: { title: "test", description: "testing", complete: false },
//   // // });
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const tasksData = await getTasks();
//         setTasks(tasksData);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   // const handleTaskUpdate = (taskId: number, updatedTaskData: Task) => {
//   //   const updatedTasks = tasks.map(task => {
//   //     if (task.id === taskId) {
//   //       return { ...task, ...updatedTaskData };
//   //     }
//   //     return task;
//   //   });
//   //   setTasks(updatedTasks);
//   // };

//   return (
//     <>
//       <header className="mb-4 mt-4">
//         <h1 className="text-3xl text-center my-5">Task Manager</h1>
//         <div className="py-6 text-center">
//           <Link
//             className="border border-slate-300 text-slate-300 px-2 py-1 rounded outline-none bg-transparent focus-within:bg-slate-100 hover:bg-cyan-600 "
//             href="/new"
//           >
//             + Add New Task
//           </Link>
//         </div>
//       </header>
//       <ul className="pl-4">
//         {tasks.map((task) => (
//           <TaskItem
//             key={task.id}
//             id={task.id}
//             title={task.title}
//             description={task.description}
//             dueDate={task.dueDate}
//             priority={task.priority as Level}
//             complete={task.complete}
//             toggleTask={toggleTask}
//             onTaskUpdate={handleTaskUpdate}

//             // onDeleteTask={handleDeleteTask(task.id)} // not working
//           />
//         ))}
//       </ul>
//     </>

//       );
// }

import LatestTasks from "./LatestTasks";
import TaskSummary from "./TaskSummary";
// import Pagination from "./components/Pagination";
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
