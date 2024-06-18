"use client"

import React, { useState } from "react";
import { QualityControlContext } from "@/common/contexts/QualityControlContext";
import { SchedulingContext } from "@/common/contexts/SchedulingContext";
import { QualityControlStrategyFirst } from "@/common/strategies/QualityControlStrategyFirst";
import { QualityControlStrategySecond } from "@/common/strategies/QualityControlStrategySecond";
import { SchedulingStrategyFirst } from "@/common/strategies/SchedulingStrategyFirst";
import { SchedulingStrategySecond } from "@/common/strategies/SchedulingStrategySecond";
import Center from "@/components/Center";
import { Button } from "@/components/ui/button";

const QualityControlPage = () => {
  const [qualityControlContext, setQualityControlContext] = useState(
    new QualityControlContext(new QualityControlStrategyFirst())
  );
  const [currentQualityControlStrategy, setCurrentQualityControlStrategy] =
    useState(new QualityControlStrategyFirst());

  const [schedulingContext, setSchedulingContext] = useState(
    new SchedulingContext(new SchedulingStrategyFirst())
  );
  const [currentSchedulingStrategy, setCurrentSchedulingStrategy] = useState(
    new SchedulingStrategyFirst()
  );

  const switchQualityControlStrategy = () => {
    const isUsingFirstStrategy =
      currentQualityControlStrategy instanceof QualityControlStrategyFirst;
    const newStrategy = isUsingFirstStrategy
      ? new QualityControlStrategySecond()
      : new QualityControlStrategyFirst();
    qualityControlContext.setStrategy(newStrategy);
    setCurrentQualityControlStrategy(newStrategy);
    newStrategy.execute('Execute quality control');
  };

  const switchSchedulingStrategy = () => {
    const isUsingFirstStrategy =
      currentSchedulingStrategy instanceof SchedulingStrategyFirst;
    const newStrategy = isUsingFirstStrategy
      ? new SchedulingStrategySecond()
      : new SchedulingStrategyFirst();
    schedulingContext.setStrategy(newStrategy);
    setCurrentSchedulingStrategy(newStrategy);
    newStrategy.schedule(['First task', 'Second task']);
  };

  return (
    <Center>
      <h1>Quality Control Strategy</h1>
      <p>(Look at the console for information regarding the strategy)</p>
      <Button onClick={switchQualityControlStrategy}>
        Switch Quality Control Strategy
      </Button>
      <p>
        Current Quality Control Strategy:{" "}
        {currentQualityControlStrategy.constructor.name}
      </p>
      <Button onClick={switchSchedulingStrategy}>
        Switch Scheduling Strategy
      </Button>
      <p>
        Current Scheduling Strategy:{" "}
        {currentSchedulingStrategy.constructor.name}
      </p>
    </Center>
  );
};

export default QualityControlPage;
