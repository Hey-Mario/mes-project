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
import { Heading } from "@radix-ui/themes";

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
    <Center className="h-full flex flex-col justify-evenly">
      <div className="flex flex-col gap-5">
        <Heading size="5">Quality Control Strategy</Heading>
        <div className="flex gap-3 justify-center w-full">
          <Button onClick={switchQualityControlStrategy}>
            Switch Quality Control Strategy
          </Button>
          <Button onClick={switchSchedulingStrategy}>
            Switch Scheduling Strategy
          </Button>
        </div>
        <p>(Look at the console for information regarding the strategy)</p>
      </div>
      <div className="flex gap-3 justify-center">
        <p>
          Current Quality Control Strategy:{" "}
          {currentQualityControlStrategy.constructor.name}
        </p>

        <p>
          Current Scheduling Strategy:{" "}
          {currentSchedulingStrategy.constructor.name}
        </p>
      </div>

    </Center>
  );
};

export default QualityControlPage;
