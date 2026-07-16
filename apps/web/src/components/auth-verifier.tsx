import { authClientVerify } from "@/api/auth-client";
import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";

function AuthVerifier({ children }) {
  const { userEmail, setAuth } = useAuth();

  useEffect(() => {
    const verifySession = async () => {
      const status = await authClientVerify();
      console.log(status);
      if (status.success) {
        setAuth(status.user.email, true);
        console.log(`email: ${userEmail}`);
      }
    };

    verifySession();
  });

  return children;
}

export default AuthVerifier;