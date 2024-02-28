import { Heading, Separator, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Task } from "@prisma/client";
import TaskStatusBadge from "@/app/components/TaskStatusBadge";

const TaskDetails = ({ task }: { task: Task }) => {
  return (
    <>
      <Heading>{task.title}</Heading>
      <Separator my="3" size="4" />
      {/* <Text color="gray">
        Create On: {todo.createdAt.toDateString()}
      </Text> */}
      <div>
        <TaskStatusBadge
          status={task.status}
        ></TaskStatusBadge>
      </div>

      <Text color="red">Due Date:{task.dueDate.toLocaleDateString()}</Text>

      <ReactMarkdown className="prose">
        {task.description}
      </ReactMarkdown>
    </>
  );
};

export default TaskDetails;