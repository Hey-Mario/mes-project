"use client";

import { instance } from "@/common/axiosConfig";
import Center from "@/components/Center";
import { Task } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { convertToComposite } from "@/common/composite/TaskComposite";
import "./style.css";

interface TaskWithSubTasks extends Task {
  subTasks?: TaskWithSubTasks[];
}

const TaskPage = () => {
   const { data, isLoading, error, refetch } = useQuery({
     queryFn: () => instance.get<TaskWithSubTasks[]>("/api/task"),
     queryKey: ["task"],
   });

   if (isLoading) return <Center>Loading...</Center>;

   if (error) return <div>Error Occurred during fetch</div>;

  const tasks: ITaskComponent[] = data?.data.map(convertToComposite) || [];

  return (
    <Center>
      <div className="flex w-full justify-between items-center mb-5">
        <Heading size="5">Task</Heading>
        {/* <Button>
          <Link href={"/task/new"}>New Task</Link>
        </Button> */}
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            {/* <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => (
            <TaskRow key={task.getName()} task={task} />
          ))}
        </Table.Body>
      </Table.Root>
    </Center>
  );
};

const TaskRow = ({ task }: { task: ITaskComponent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Table.Row>
        <Table.Cell>
          {task.getSubTasks().length > 0 && (
            <button
              className="expand-button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "-" : "+"}
            </button>
          )}
          {task.getName()}
        </Table.Cell>
        <Table.Cell>{task.getDescription()}</Table.Cell>
      </Table.Row>
      {isExpanded &&
        task.getSubTasks() &&
        task.getSubTasks().length > 0 &&
        task.getSubTasks().map((subTask, i) => (
          <Table.Row key={i} className="sub-task pl-4">
            <Table.Cell>{subTask.getName()}</Table.Cell>
            <Table.Cell>{subTask.getDescription()}</Table.Cell>
          </Table.Row>
        ))}
    </>
  );
};

export default TaskPage;
