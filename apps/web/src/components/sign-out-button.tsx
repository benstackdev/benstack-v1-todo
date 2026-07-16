import { useAuth } from "@/context/auth-provider";
import { authClientPost } from "@/api/auth-client";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

function SignoutButton() {
  const { userEmail } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await authClientPost("http://localhost:8080/auth/sign-out", userEmail);

    navigate("/sign-in");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={
        <Button variant="ghost">Sign Out</Button>
      } />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {userEmail}: Are you sure you want to sign out?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleSignout}>
            Sign Out
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SignoutButton;