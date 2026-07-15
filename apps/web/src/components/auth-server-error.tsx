import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CircleAlert } from "lucide-react";

function AuthServerError({ title, error }: { title: string, error: string; }) {
  return (
    <div className={`flex justify-center`}>
      <Alert
        variant="destructive"
        className={`max-w-2xs md:max-w-sm my-2`}>
        <CircleAlert />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  );
}

export default AuthServerError;