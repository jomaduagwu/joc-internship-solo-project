"use client";

import {
  Button,
  Callout,
  DropdownMenu,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Task } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Level } from "@prisma/client";

type TaskForm = z.infer<typeof taskSchema>;

const NewTaskPage = ({ task }: { task?: Task }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (task) 
        await axios.patch("/api/tasks/" + task.id, data);
      else 
        await axios.post("/api/tasks", data);
      router.push("/tasks/list"); // or /tasks
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={task?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={task?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date: Date) => field.onChange(date)}
              placeholderText="Due Date"
            />
          )}
        />
        <ErrorMessage>{errors.dueDate?.message}</ErrorMessage>
        <Select.Root
          defaultValue={task?.priority}
          onValueChange={(newValue: string) =>
            setValue("priority", newValue as Level)
          }
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Priority</Select.Label>
              {Object.values(Level).map((priority) => (
                <Select.Item key={priority} value={priority}>
                  {priority}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <div className="flex space-x-4">
          <Button disabled={isSubmitting}>
            {task ? "Update Task" : "Create New Task"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default NewTaskPage;
