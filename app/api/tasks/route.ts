import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { taskSchema } from "@/app/validationSchemas";


export async function POST(request: NextRequest) {
  const body = await request.json();

 
  const validation = taskSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        priority: body.priority,
        status: 'OPEN',
        complete: false, 
      },
    });
  
 
    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error("Error creating task:", error);
  

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}