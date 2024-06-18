"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ProductionFacade } from "@/common/facades/ProductionFacade";
import Center from "@/components/Center";
import { BaseProcess, StatusNotificationDecorator } from "@/common/decorators/StatusNotificationDecorator";

const ProductionProcessPage = () => {
  const productionFacade = new ProductionFacade();

  // Decorators
  const baseProcess = new BaseProcess();
  const processWithNotification = new StatusNotificationDecorator(baseProcess);
  
  const handleProcessOrderAndStock = () => {
    productionFacade.processOrderAndStock();
    processWithNotification.execute();
  };

  return (
    <Center>
      <h1>Production Process Page</h1>
      <p>(Look at the console for information regarding the process)</p>
      <Button onClick={handleProcessOrderAndStock}>
        Start Order Processing
      </Button>
    </Center>
  );
};

export default ProductionProcessPage;
