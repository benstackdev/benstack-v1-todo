import { signupFormSchema } from "shared";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import AuthServerError from "@/components/auth-server-error";
import { authClientPost } from "@/api/auth-client";

function Signup() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirm: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    const result = await authClientPost("http://localhost:8080/auth/sign-up", data.email, data.password);

    if (result.success) navigate("/sign-in");
    else if (result.error) setServerError(result.error);
  };

  return (
    <div className="flex justify-center">
      <Card className={`flex-1 max-w-xs md:max-w-md mt-8`}>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        {(serverError !== '') ? <AuthServerError title="Sign Up Failed" error={serverError} /> : null}
        <CardContent>
          <form
            id="sign-up"
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex flex-col gap-6`}>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="confirm"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="sign-up">Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;