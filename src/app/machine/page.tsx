"use client"

import { ComplexMachine, ComplexMachineAdapter } from "@/common/adpters/ComplexMachineAdapter";
import { SimpleMachine, SimpleMachineAdapter } from "@/common/adpters/SimpleMachineAdapter";
import { IMachine } from "@/common/interfaces/IMachine";
import { Button } from "@/components/ui/button";
import { Heading } from "@radix-ui/themes";
import MachineCard from "./_components/MachineCard";

const machineA = new SimpleMachineAdapter(new SimpleMachine());
const machineB = new ComplexMachineAdapter(new ComplexMachine());

const machines: IMachine[] = [machineA, machineB];

const handleStartMachines = () => {
  machines.forEach((machine) => machine.start());
};

const handleStopMachines = () => {
  machines.forEach((machine) => machine.stop());
};

const handleGetStatuses = () => {
  machines.forEach((machine) => console.log(machine.getStatus()));
};

const MachinePage = () => {
  return (
    <div>
      <Heading size="5">Manufacturing Execution System</Heading>
      <Button onClick={handleStartMachines}>Start All Machines</Button>
      <Button onClick={handleStopMachines}>Stop All Machines</Button>
      <Button onClick={handleGetStatuses}>Get Machine Statuses</Button>
      <div>
        {
          machines.map((machine, key) => <MachineCard machine={machine} key={key} />)
        }
      </div>
    </div>
  );
};

export default MachinePage;
