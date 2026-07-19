import SignoutButton from "@/components/sign-out-button";
import TodoForm from "@/components/todo-form";
import { useAuth } from "@/context/auth-provider";

function Home() {
  const { userEmail } = useAuth();

  return (
    <div className={`flex flex-col justify-center items-center mt-4 w-full sm:max-w-xl mx-auto`}>
      <div className={`w-full px-8 flex flex-col sm:flex-row justify-between items-center`}>
        <h1 className={`font-semibold`}>Welcome, {userEmail}</h1>
        <SignoutButton />
      </div>
      <TodoForm />
    </div>
  );
}

export default Home;