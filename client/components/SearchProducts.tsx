import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'

interface Props {
  name: string
  brand: string
  onSearch: (name: string, brand: string) => void
}
interface FormData {
  name: string
  brand: string
}

export default function Searchbar({ name, brand, onSearch }: Props) {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      brand: '',
    },
  })

  const onSubmit = (data: FormData) => {
    onSearch(data.name.trim(), data.brand.trim())
  }

  // To update form values if props change, add this effect:
  React.useEffect(() => {
    form.reset({ name, brand })
  }, [name, brand])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 mt-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Search by name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Search by brand" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="btn self-end">
          Submit
        </Button>
      </form>
    </Form>
  )
}
