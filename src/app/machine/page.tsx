"use client"

import { ComplexMachine, ComplexMachineAdapter } from "@/common/adpters/ComplexMachineAdapter";
import { SimpleMachine, SimpleMachineAdapter } from "@/common/adpters/SimpleMachineAdapter";
import { IMachine } from "@/common/interfaces/IMachine";
import { Button } from "@/components/ui/button";
import { Heading } from "@radix-ui/themes";
import MachineCard from "./_components/MachineCard";
import { useState } from "react";
import Center from "@/components/Center";
import { message } from "antd";

const MachinePage = () => {
  const machineA = new SimpleMachineAdapter(new SimpleMachine());
  const machineB = new ComplexMachineAdapter(new ComplexMachine());
  
  const [machines, setMachines] = useState<IMachine[]>([machineA, machineB]);

  const handleStartMachines = () => {
    const machines_ = machines;
    machines_.forEach((machine) => machine.start());
    setMachines([...machines_])
  };
  
  const handleStopMachines = () => {
    const machines_ = machines;
    machines_.forEach((machine) => machine.stop());
    setMachines([...machines_])
  };
  
  const handleGetStatuses = () => {
    const machines_ = machines;
    machines_.forEach((machine) => {
      const status = machine.getStatus();
      console.log(status);
      message.info(status);
    });
    setMachines([...machines_])
  };

  return (
    <Center className="h-full flex flex-col justify-evenly">
      <div className="flex flex-col gap-5">
        <Heading size="5">Manufacturing Execution System</Heading>
        <div className="flex gap-3 justify-center w-full">
          <Button onClick={handleStartMachines}>Start All Machines</Button>
          <Button onClick={handleStopMachines}>Stop All Machines</Button>
          <Button onClick={handleGetStatuses}>Get Machine Statuses</Button>
        </div>
        <p>
          (Look at the console for more information)
        </p>
      </div>
      <div className="flex gap-3 justify-center">
        {
          machines.map((machine, key) => <MachineCard machine={machine} key={key} />)
        }
      </div>
    </Center>
  );
};

export default MachinePage;
