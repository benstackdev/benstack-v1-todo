import { todoAllGet } from "@/api/todo-client";
import SignoutButton from "@/components/sign-out-button";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import { useAuth } from "@/context/auth-provider";
import { useEffect, useState } from "react";

export type TodoItemType = {
  id: string,
  userId: string,
  content: string,
  isComplete: boolean;
};

function Home() {
  const { userEmail } = useAuth();
  const [refreshTodos, setRefreshTodos] = useState<boolean>(true);
  const [todoIncompleteList, setTodoIncompleteList] = useState<TodoItemType[]>([]);
  const [todoCompleteList, setTodoCompleteList] = useState<TodoItemType[]>([]);

  useEffect(() => {
    const fetchAllTodos = async () => {
      const incompletedResponse = await todoAllGet("?completed=false");
      const completedResponse = await todoAllGet("?completed=true");
      setTodoIncompleteList(incompletedResponse.data);
      setTodoCompleteList(completedResponse.data);

      setRefreshTodos(false);
    };

    if (refreshTodos) fetchAllTodos();
  }, [refreshTodos, setRefreshTodos, todoIncompleteList, todoCompleteList, setTodoIncompleteList, setTodoCompleteList]);

  return (
    <div className={`flex flex-col justify-center items-center mt-4 w-full max-w-xl mx-auto`}>
      <div className={`w-full px-8 flex flex-col sm:flex-row justify-between items-center`}>
        <h1 className={`font-semibold`}>Welcome, {userEmail}</h1>
        <SignoutButton />
      </div>
      <TodoForm setRefreshTodos={setRefreshTodos} />
      <TodoList todoIncompleteList={todoIncompleteList} todoCompleteList={todoCompleteList} setRefreshTodos={setRefreshTodos} />
    </div>
  );
}

export default Home;