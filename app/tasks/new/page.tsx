"use client";

import { Button, Callout, DropdownMenu, Text, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/validationSchemas";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
// import React from 'react'

type TaskForm = z.infer<typeof taskSchema>;

// interface TaskForm {
//   title: string;
//   description: string;
//   // dueDate: Date | null;
//   // priority: string;
// }

const NewTaskPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema)
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <div className="max-w-xl">
      {error && <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form 
          className="space-y-3" 
          onSubmit={handleSubmit(async (data) => {
            try {
              setSubmitting(true);
              await axios.post('/api/tasks', data);
              router.push('/tasks');
            } catch (error) {
              setSubmitting(false);
              setError('An unexpected error occured.');
            }
          })}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')}/>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )} 
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
      {/*   <SimpleMdeReact placeholder="Description" /> */}
        <Button disabled={isSubmitting}>Submit New Task {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewTaskPage;
