import { useAuth } from "@/context/auth-provider";

function Home() {
  const { userEmail } = useAuth();

  return (
    <h1>Verified? {userEmail}</h1>
  );
}

export default Home;