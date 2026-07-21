import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { todoSchema } from "shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoCreatePost } from "@/api/todo-client";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

function TodoForm({ setRefreshTodos }: { setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>; }) {
  const [serverError, setServerError] = useState('');
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    mode: "onSubmit",
    defaultValues: {
      content: "",
      isComplete: false
    }
  });

  const onSubmit = async (data: z.infer<typeof todoSchema>) => {
    const result = await todoCreatePost(data.content, data.isComplete);

    if (result.success) {
      setRefreshTodos(true);
      form.reset(); // reset form state
    }
    else if (result.error) setServerError(result.error);
  };

  return (
    <div className={`flex flex-col items-center w-full mt-8 max-w-xs`}>
      {(serverError !== "") ? serverError : null}
      <form
        id="todo"
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full flex flex-col gap-3`}
      >
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="New todo..."
                />
              </Field>
            );
          }}
        />
        <Controller
          name="isComplete"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <Checkbox
                  id={field.name}
                  name={field.name}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  checked={field.value}
                />
                <FieldLabel htmlFor={field.name}>
                  Mark as complete
                </FieldLabel>
              </Field>
            );
          }}
        />
        <Button form="todo" type="submit">
          <Plus /> Add
        </Button>
      </form>
    </div>
  );
}

export default TodoForm;