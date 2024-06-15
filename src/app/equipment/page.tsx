"use client";

import { instance } from "@/common/axiosConfig";
import Center from "@/components/Center";
import { Equipment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DeleteButton from "./_components/DeleteButton";
import EditButton from "./_components/EditButton";
import { EquipmentService } from "@/common/services/EquipmentService";
import RestoreButton from "./_components/RestoreButton";

const EquipmentPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => instance.get<Equipment[]>("/api/equipment"),
    queryKey: ["equipment"],
  });
  
  const equipmentService = new EquipmentService();
  const [equipmentStates, setEquipmentStates] = useState<any>();
  useEffect(() => {
    getEquipmentStates()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const getEquipmentStates = ()=> {
    const equipments = equipmentService.getEquipmentStates();
    if (equipments) setEquipmentStates(equipments);
  }

  if (isLoading) return <Center>Loading...</Center>;

  if (error) return <div>Error Occurred during fetch</div>;

  const handleDeleteSuccess = (equipmentId: number) => {
    refetch();
  };

  const onRestoreSuccess = (equipmentId: number) => {
    refetch();
    getEquipmentStates();
  };

  return (
    <Center>
      <div className="flex w-full justify-between items-center mb-5">
        <Heading size="5">Equipment</Heading>
        <Button>
          <Link href={"/equipment/new"}>New Equipment</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.data.map((equipment) => (
            <Table.Row key={equipment.id}>
              <Table.Cell>{equipment.name}</Table.Cell>
              <Table.Cell>{equipment.status}</Table.Cell>
              <Table.Cell>{equipment.type}</Table.Cell>
              <Table.Cell>
                {new Date(equipment.createdAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-5">
                  <DeleteButton
                    equipmentId={equipment.id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                  <EditButton equipmentId={equipment.id} />
                  {equipmentStates && equipmentStates[equipment.id] ? (
                    <RestoreButton
                      equipmentId={equipment.id}
                      onRestoreSuccess={onRestoreSuccess}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Center>
  );
};

export default EquipmentPage;
