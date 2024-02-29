import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import LatestTasks from "../LatestTasks";

const TasksPage = () => {
  return (
    <div>
      <div className="mb-4">
        <Button>
          <Link href="/tasks/new">Add New Task</Link>{" "}
        </Button>
       
      </div>
      <div>
        <LatestTasks />
      </div>
    </div>
  );
};

export default TasksPage;
