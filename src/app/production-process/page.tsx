"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ProductionFacade } from "@/common/facades/ProductionFacade";
import Center from "@/components/Center";

const ProductionProcessPage = () => {
  const productionFacade = new ProductionFacade();

  const handleProcessOrderAndStock = () => {
    productionFacade.processOrderAndStock();
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
