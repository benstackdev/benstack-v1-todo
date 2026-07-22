import type { TodoItemType } from "@/routes/home";
import { useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Trash2, X } from "lucide-react";
import { todoItemDelete, todoUpdatePut } from "@/api/todo-client";
import { Controller, useForm } from "react-hook-form";
import { todoSchema } from "shared";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Field, FieldDescription, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";

function TodoItem({ item, setRefreshTodos }: { item: TodoItemType, setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>; }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingDesc, setIsEditingDesc] = useState<boolean>(false);

  const contentForm = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    mode: "onSubmit",
    defaultValues: {
      content: item.content,
      isComplete: item.isComplete
    }
  });

  const toggleCompleted = async () => {
    const completed = !item.isComplete;
    console.log(completed);
    await todoUpdatePut(item.id, item.content, completed);
    setRefreshTodos(true);
  };

  const deleteTodoItem = async () => {
    const deletedItem = await todoItemDelete(item.id);
    console.log(deletedItem);
    setRefreshTodos(true);
  };

  const updateTodoContent = async (data: z.infer<typeof todoSchema>) => {
    await todoUpdatePut(item.id, data.content, item.isComplete);
    setRefreshTodos(true);
    setIsEditing(false);
  };

  const contentNotEditing = (
    <Button
      variant="ghost"
      className={`text-md`}
      onClick={() => setIsEditing(true)}>
      {item.content}
    </Button>
  );

  const contentEditing = (
    <form id="update-todo-content" onSubmit={contentForm.handleSubmit(updateTodoContent)}>
      <Controller
        name="content"
        control={contentForm.control}
        render={({ field, fieldState }) => {
          return (
            <Field data-invalid={fieldState.invalid}>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <Input
                {...field}
                id={field.name}
                type="text"
                className={`text-md`}
                aria-invalid={fieldState.invalid}
                onFocus={() => setIsEditingDesc(true)}
                onBlur={() => setIsEditingDesc(false)}
              />
              {isEditingDesc ?
                <FieldDescription>
                  Press <Kbd className={`text-sky-300`}>Enter</Kbd> to save
                </FieldDescription>
                : null}
            </Field>
          );
        }}
      />
    </form>
  );

  return (
    <Card className={`p-2`}>
      <CardContent className={`px-1 flex justify-between items-center`}>
        {isEditing ? contentEditing : contentNotEditing}
        <div className={`flex gap-1`}>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleCompleted}>
            {item.isComplete ? <X /> : <Check />}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={deleteTodoItem}>
            <Trash2 />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoItem;