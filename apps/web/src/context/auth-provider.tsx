import { createContext, useContext, useState } from "react";

export type AuthContextType = {
  userEmail: string | undefined,
  isVerified: boolean,
  setAuth: (email: string, verified: boolean) => void;
};

const initialState: AuthContextType = {
  userEmail: undefined,
  isVerified: false,
  setAuth: () => null
};

const AuthContext = createContext<AuthContextType>(initialState);

function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState<AuthContextType["userEmail"]>(undefined);
  const [isVerified, setIsVerified] = useState<AuthContextType["isVerified"]>(false);

  const setAuth = (email: string, verified: boolean) => {
    setUserEmail(email);
    setIsVerified(verified);
  };

  return (
    <AuthContext.Provider value={{ userEmail, isVerified, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;