"use client"

import { ComplexMachine, ComplexMachineAdapter } from "@/common/adpters/ComplexMachineAdapter";
import { SimpleMachine, SimpleMachineAdapter } from "@/common/adpters/SimpleMachineAdapter";
import { IMachine, MachineContext } from "@/common/interfaces/IMachine";
import { Button } from "@/components/ui/button";
import { Code, Heading } from "@radix-ui/themes";
import MachineCard from "./_components/MachineCard";
import { useState } from "react";
import Center from "@/components/Center";
import { message } from "antd";
import { MachineInterpreter } from "@/lib/interpreter/machine-interpreter";
import './style.css'

const MachinePage = () => {
  const machineA = new SimpleMachineAdapter(new SimpleMachine("PrinterMachine"));
  const machineB = new ComplexMachineAdapter(new ComplexMachine("ProductionMachine"));
  const mainScript = `
    START PrinterMachine
    STOP PrinterMachine
    START ProductionMachine
    SET_SPEED 1000
    STOP ProductionMachine
    START PrinterMachine
  `

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

  const handleRunScript = () => {
    handleRunScript_(mainScript);
  };

  const handleRunScript_ = (script: string) => {
    const interpreter = new MachineInterpreter();
    const context: Record<string, string | number> = {};
    interpreter.parse(script);
    interpreter.interpret(context);
    checkAndHandleContext(context);
  };

  const handleRunScriptOneByOne = async () => {
    const interpreter = new MachineInterpreter();
    const scripts = interpreter.split(mainScript);
    for (const script of scripts) {
      await new Promise<void>((resolve) => setTimeout(() => {
        handleRunScript_(script);
        resolve();
      }, 500));
    }
  };

  const checkAndHandleContext = (context: MachineContext) => {
    const machines_ = machines;
    machines_.forEach((machine) => machine.handleContext(context));
    setMachines([...machines_])
  }

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
      <div>
        <div className="script-container">
          <span className="whitespace-break-spaces">{mainScript}</span>
        </div>
        <div className="flex gap-3 justify-center w-full m-3">
          <Button onClick={handleRunScript}>Run full script</Button>
          <Button onClick={handleRunScriptOneByOne}>Run Script One by One</Button>
        </div>
      </div>
    </Center>
  );
};

export default MachinePage;
