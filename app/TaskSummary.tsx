import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const TaskSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Tasks", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Tasks", value: closed, status: "CLOSED" },
  ];
  return (
    <Card>
      <Heading size='4' mb='5' >Task Status Summary:</Heading>
      <Flex gap="4">
        {containers.map((container) => (
          <Card key={container.label}>
            <Flex direction="column" gap="1">
              <Link
                className="text-sm font-medium"
                href={`/tasks/list?status${container.status}`}
              >
                {container.label}
              </Link>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};

export default TaskSummary;