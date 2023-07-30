import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { useToast } from "~/components/ui/use-toast";
import { getTRPCErrorFromUnknown } from "@trpc/server";

const createTILSchema = z.object({
  title: z.string().nonempty("Title cannot be empty"),
  content: z.string().nonempty("Content cannot be empty"),
  tags: z.string().nonempty("Tags cannot be empty"),
});

type CreateTILFormType = z.infer<typeof createTILSchema>;

const CreateTIL = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createTILSchema>>({
    resolver: zodResolver(createTILSchema),
    defaultValues: {
      content: "",
      tags: "",
      title: "",
    },
  });

  const { mutate, isLoading } = api.til.createTil.useMutation({
    onSuccess: () => {
      toast({
        title: "TIL created successfully",
        description: "Your TIL has been created successfully",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to post TIL",
        description: getTRPCErrorFromUnknown(error).message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CreateTILFormType) => {
    mutate(values);
  };

  return (
    <div className="container flex flex-1 flex-col gap-8 py-6 lg:px-32 lg:py-8">
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Create TIL
        </h1>
        <p className="text-lg text-muted-foreground">
          Unearth the Unseen: Share Your &apos;Today I Learned&apos; Journey!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={(event) => {
            const theReturnedFunc = form.handleSubmit(onSubmit);
            void theReturnedFunc(event);
          }}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="how to generate migration with drizzle"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is the title of the TIL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Error Monitoring in Bugsnag works similar to Sentry"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can write in <span>markdown</span>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="javascript, typescript, react"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add multiple tags with commas{" "}
                  <span className="font-bold text-white">,</span> in between.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="default"
            className="w-full"
            disabled={
              form.formState.isSubmitting ||
              Boolean(
                form.formState.errors.content?.message ??
                  form.formState.errors.title?.message ??
                  form.formState.errors.tags?.message
              ) ||
              isLoading
            }
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateTIL;
