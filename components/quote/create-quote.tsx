"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  text: z.string({ required_error: "Text is required" }),
  mediaUrl: z.instanceof(File, { message: "Media is required" }),
});

function CreateQuote() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<CreateQuoteData, z.infer<typeof FormSchema>>({
    defaultValues: {
      text: "",
      mediaUrl: null,
    },
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<CreateQuoteData> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: data.mediaUrl,
      });

      const getMediaData = await res.json();

      if (getMediaData?.length) {
        const mediaUrl = getMediaData[0].url;

        const res = await fetch("/api/quote/create-quote", {
          method: "POST",
          body: JSON.stringify({
            text: data.text,
            mediaUrl,
          }),
        });

        if (res.ok) {
          toast({ title: "Quote created successfully!" });
        }

        form.reset();
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const file = form.watch("mediaUrl");

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Quote</CardTitle>
          <CardDescription>Share your thoughts with the world.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-full"
                          placeholder="Type your text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {file ? (
                <div className="relative overflow-hidden rounded-md border p-4">
                  <X
                    className="absolute right-1 top-1 cursor-pointer rounded-full bg-red-500 p-1 text-white"
                    size={24}
                    onClick={() => form.setValue("mediaUrl", null)}
                  />
                  <div className="relative h-60 min-w-28">
                    <Image
                      className="object-contain"
                      src={URL.createObjectURL(file as Blob)}
                      alt={file.name}
                      fill
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <FormField
                    control={form.control}
                    name="mediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            type="file"
                            accept="image/*"
                            multiple={false}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const file = e.target.files
                                ? e.target.files[0]
                                : null;
                              field.onChange(file);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div className="flex justify-between pt-4">
                <Link href="/">
                  <Button variant="outline">Go Back</Button>
                </Link>
                <Button
                  className="w-20"
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateQuote;
