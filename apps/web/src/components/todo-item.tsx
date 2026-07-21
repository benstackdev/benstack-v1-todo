import type { TodoItemType } from "@/routes/home";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Trash2, X } from "lucide-react";
import { todoItemDelete, todoUpdatePut } from "@/api/todo-client";

function TodoItem({ item, setRefreshTodos }: { item: TodoItemType, setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>; }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  return (
    <Card className={`p-2`}>
      <CardContent className={`px-1 flex justify-between items-center`}>
        <Button
          variant="ghost"
          className={`text-md`}
          onClick={() => setIsEditing(!isEditing)}>
          {item.content}
        </Button>
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