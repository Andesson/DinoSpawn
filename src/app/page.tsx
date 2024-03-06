"use client"

import React, { useState } from 'react';
import { getPlayerInfoByName } from '@/shared/services/playerService';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  playerName: z.string().min(2).max(50),
})

export default function Home() {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await getPlayerInfoByName(values.playerName);
      setPlayerData(data);
      setError('');
    } catch (error) {
      setError('Erro ao obter informações do jogador.');
      setPlayerData(null);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerName: "",
    },
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="playerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
