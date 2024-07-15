"use client";

import React, { useState } from 'react';
import { getDinoInfoByName } from '@/shared/services/dinoService';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/shared/components/ui/table/table";
import { DinoData } from '@/shared/types/DinoData';  // Import the DinoData interface

const formSchema = z.object({
  dinoName: z.string().min(2).max(50),
});

export default function Home() {
  const [dinoData, setDinoData] = useState<DinoData | null>(null);
  const [error, setError] = useState('');

  const onSubmit = async (values: { dinoName: string }) => {
    try {
      const data: DinoData = await getDinoInfoByName(values.dinoName);
      setDinoData(data);
      setError('');
    } catch (error) {
      setError('Erro ao obter informações do dino.');
      setDinoData(null);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dinoName: "",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="formSearch">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="dinoName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dino name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Dino Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the name of the dinosaur.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        {error && <p className="error-message">{error}</p>}
        {dinoData && (
          <div className="dino-data">
            <h1>Dino Details</h1>
            <Table>
              <TableCaption>Dinosaur Information</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Dino</TableCell>
                  <TableCell>{dinoData.dino}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">BP</TableCell>
                  <TableCell>{dinoData.bp}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Coins</TableCell>
                  <TableCell>{dinoData.coins}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tokens</TableCell>
                  <TableCell>{dinoData.tokens}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </main>
  );
}
