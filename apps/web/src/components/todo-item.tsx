import type { TodoItemType } from "@/routes/home";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import { todoUpdatePut } from "@/api/todo-client";

function TodoItem({ item, setRefreshTodos }: { item: TodoItemType, setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>; }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleCompleted = async (event: React.SubmitEvent) => {
    event.preventDefault();
    const completed = !item.isComplete;
    console.log(completed);
    await todoUpdatePut(item.id, item.content, completed);
    setRefreshTodos(true);
  };

  const notEditing = (
    <Card>
      <CardContent className={`flex justify-between items-center`}>
        <p className={`text-lg`}>
          {item.content}
        </p>
        <form onSubmit={toggleCompleted}>
          <Button type="submit" variant="secondary" size="icon">
            {item.isComplete ? <X /> : <Check />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return notEditing;
}

export default TodoItem;