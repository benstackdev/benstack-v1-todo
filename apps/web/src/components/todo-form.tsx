import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { todoContentSchema } from "shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoCreatePost } from "@/api/todo-client";
import { Field, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

function TodoForm() {
  const [serverError, setServerError] = useState('');
  const form = useForm<z.infer<typeof todoContentSchema>>({
    resolver: zodResolver(todoContentSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof todoContentSchema>) => {
    const result = await todoCreatePost(data.content);

    if (result.success) form.reset(); // reset form state
    else if (result.error) setServerError(result.error);
  };

  return (
    <div className={`flex justify-center w-full mt-8 max-w-xs`}>
      {(serverError !== "") ? serverError : null}
      <form
        id="todo"
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full`}
      >
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} orientation="responsive">
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="New todo..."
                />
                <Button form="todo" type="submit">
                  <Plus /> Add
                </Button>
              </Field>
            );
          }}
        />
      </form>
    </div>
  );
}

export default TodoForm;