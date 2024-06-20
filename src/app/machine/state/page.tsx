"use client"

import React, { useState } from 'react';
import { MachineContext } from '../../../common/states/MachineContext';

const MachineStatePage = () => {
  const [machineContext] = useState(new MachineContext());
  const [status, setStatus] = useState(machineContext.getStatus());

  const handleStart = () => {
    machineContext.start();
    setStatus(machineContext.getStatus());
  };

  const handleStop = () => {
    machineContext.stop();
    setStatus(machineContext.getStatus());
  };

  const handleMaintenance = () => {
    machineContext.performMaintenance();
    setStatus(machineContext.getStatus());
  };

  return (
    <div>
      <h1>Machine State Management</h1>
      <p>Current Status: {status}</p>
      <button onClick={handleStart}>Start Machine</button>
      <button onClick={handleStop}>Stop Machine</button>
      <button onClick={handleMaintenance}>Perform Maintenance</button>
    </div>
  );
};

export default MachineStatePage;
