import { authClientVerify } from "@/api/auth-client";
import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function AuthVerifier({ children }) {
  const navigate = useNavigate();
  const { userEmail, isVerified, setAuth } = useAuth();

  useEffect(() => {
    const verifySession = async () => {
      const status = await authClientVerify();
      console.log(status);
      if (status.success) {
        setAuth(status.user.email, true);
        console.log(`verified: ${isVerified}`);
      }
    };

    verifySession();
  });

  useEffect(() => {
    if (isVerified) navigate("/");
    else navigate("/sign-in");
  }, [isVerified, navigate]);

  return children;
}

export default AuthVerifier;