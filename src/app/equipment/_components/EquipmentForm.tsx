'use client'

import React from "react";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { instance } from "@/common/axiosConfig";
import { useRouter } from "next/navigation";
import { Equipment } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { createEquipmentSchema, IEquipmentForm } from "@/schema/equipment";
import { EquipmentService } from "@/common/services/EquipmentService";

const EquipmentForm = ({ equipment = null }: { equipment?: Equipment | null }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const equipmentService = new EquipmentService();
  const router = useRouter();

  const onSubmit = async (data: IEquipmentForm) => {
    setIsLoading(true);
    console.log(data);
    try {
      if (!equipment) {
        await instance.post("/api/equipment", data);
      } else {
        await equipmentService.saveState(equipment);
        await instance.patch("/api/equipment/" + equipment.id, data);
      }
      queryClient.invalidateQueries({ queryKey: ["equipment"] });
      router.push("/equipment");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>{equipment ? "Edit" : "Create"} Equipment</CardTitle>
        <CardDescription>
          {equipment ? "Edit" : "Create"} an equipment in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          formSchema={createEquipmentSchema}
          onSubmit={onSubmit}
          values={{
            name: equipment?.name || "",
            type: equipment?.type || "",
            status: equipment?.status || "",
          }}
        >
          <AutoFormSubmit
            disabled={isLoading}
            className="m-auto flex gap-5 min-w-[150px]"
          >
            <span>Save</span>
            {isLoading && <Spinner className=""></Spinner>}
          </AutoFormSubmit>
        </AutoForm>
      </CardContent>
    </Card>
  );
};

export default EquipmentForm;
