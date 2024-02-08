import { TaskItem } from "@/components/TaskItem";
import { prisma } from "./db";

import Link from "next/link";
import React from "react";

function getTasks() {
  return prisma.task.findMany();
}

async function toggleTask(id: string, complete: boolean) {
  "use server"

  await prisma.task.update({ where: { id }, data: { complete }})
}

export default async function Home() {
  const tasks = await getTasks();
  // await prisma.task.create({
  //   data: { title: "test", description: "testing", complete: false },
  // });

  return (
    <>
      <header className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-3xl">Tasks</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded outline-none bg-transparent focus-within:bg-slate-100 hover:bg-cyan-600 "
          href="/new"
        >
          + Add New Task
        </Link>
      </header>
      <ul className="pl-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} {...task} toggleTask={toggleTask} />
        ))}
      </ul>
    </>

    // <div className="flex flex-col items-center justify-center min-h-screen">
    //   <header className="bg-gray-800 text-white w-full py-4">
    //     <div className="container mx-auto">
    //       <h1 className="text-2xl font-bold">Task Manager</h1>
    //     </div>
    //   </header>
    //   <main className="container mx-auto mt-8">
    //     {/* Task list component will go here */}
    //     <div className="bg-white p-4 rounded shadow">
    //       <h2 className="text-lg font-semibold mb-4">Task List</h2>
    //       <ul>
    //         {/* Individual task components will go here */}
    //         <li className="border-b py-2">Task 1</li>
    //         <li className="border-b py-2">Task 2</li>
    //         <li className="border-b py-2">Task 3</li>
    //       </ul>
    //     </div>
    //   </main>
    //   <footer className="bg-gray-800 text-white w-full py-4 mt-auto">
    //     <div className="container mx-auto">
    //       <p className="text-center">Footer content here</p>
    //     </div>
    //   </footer>
    // </div>
  );
}
