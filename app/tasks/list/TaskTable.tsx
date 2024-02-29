import TaskStatusBadge from "../../components/TaskStatusBadge";
import { Status, Task } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from 'next/link';
import NextLink from 'next/link';

export interface TaskQuery {
  status: Status;
  orderBy: keyof Task;
  page: string;
}

interface Props {
  searchParams: TaskQuery;
  tasks: Task[];
}

const TaskTable = ({ searchParams, tasks }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map((task) => (
          <Table.Row key={task.id}>
            <Table.Cell>
              <Link href={`/tasks/${task.id}`}>{task.title}</Link>
              <div className="block md:hidden">
                <TaskStatusBadge status={task.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <TaskStatusBadge status={task.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {task.description}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {task.dueDate.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Task;
  className?: string;
}[] = [
  { label: "Task", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Description",
    value: "description",
    className: "hidden md:table-cell",
  },
  {
    label: "Due Date",
    value: "dueDate",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default TaskTable;