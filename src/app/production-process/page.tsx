"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductionFacade } from "@/common/facades/ProductionFacade";
import Center from "@/components/Center";
import { ProductionProcess } from "@/common/classes/production/ProductionProcess";
import { Operator } from "@/common/classes/production/Operator";
import { NotificationTypeEnum } from "@/common/interfaces/notification/NotificationTypeEnum";
import { BaseProcess, StatusNotificationDecorator } from "@/common/decorators/StatusNotificationDecorator";

const ProductionProcessPage = () => {
  const productionProcess = new ProductionProcess();
  
  // Simulation of multiple users
  const operator1 = new Operator('Alice');
  const operator2 = new Operator('Bob');

  useEffect(() => {
    productionProcess.registerObserver(operator1);
    productionProcess.registerObserver(operator2);

    return () => {
      productionProcess.removeObserver(operator1);
      productionProcess.removeObserver(operator2);
    };
  }, []);

  const productionFacade = new ProductionFacade();

  // Decorators
  const baseProcess = new BaseProcess();
  const processWithNotification = new StatusNotificationDecorator(baseProcess);
  
  const handleProcessOrderAndStock = () => {
    productionProcess.changeProcess('Production Process Starting', NotificationTypeEnum.WARNING);
    productionFacade.processOrderAndStock();
    productionProcess.changeProcess('Production Process Ending', NotificationTypeEnum.SUCCESS);

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
