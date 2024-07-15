"use client"

import React, { useState } from 'react';
import { getDinoInfoByName } from '@/shared/services/dinoService';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table/table"


const formSchema = z.object({
  dinoName: z.string().min(2).max(50),
})

export default function Home() {
  const [dinoData, setDinoData] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await getDinoInfoByName(values.dinoName);
      setDinoData(data);
      setError('');
    } catch (error) {
      setError('Erro ao obter informações do dino.');
      setDinoData(null);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dinoName: "",
    },
  })

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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      Dino name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        {dinoData}
        <div className="list">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
