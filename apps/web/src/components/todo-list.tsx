import type { TodoItemType } from "@/routes/home";
import TodoItem from "./todo-item";

function TodoList({ todoIncompleteList, todoCompleteList, setRefreshTodos }: { todoIncompleteList: TodoItemType[], todoCompleteList: TodoItemType[], setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>; }) {

  return (
    <div className={`w-full max-w-xs flex flex-col gap-8 mt-8`}>
      <div className={`flex flex-col gap-4`}>
        <h2 className={`text-lg font-semibold`}>Incomplete todos:</h2>
        {todoIncompleteList.map(todoItem => {
          return (
            <TodoItem key={todoItem.id} item={todoItem} setRefreshTodos={setRefreshTodos} />
          );
        })}
      </div>
      <div className={`flex flex-col gap-4`}>
        <h2 className={`text-lg font-semibold`}>Complete todos:</h2>
        {todoCompleteList.map(todoItem => {
          return (
            <TodoItem key={todoItem.id} item={todoItem} setRefreshTodos={setRefreshTodos} />
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;