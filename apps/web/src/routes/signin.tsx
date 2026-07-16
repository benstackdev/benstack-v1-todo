import { authClientPost } from "@/api/auth-client";
import AuthServerError from "@/components/auth-server-error";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { signinFormSchema } from "shared";
import * as z from "zod";

function Signin() {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof signinFormSchema>) => {
    const result = await authClientPost("http://localhost:8080/auth/sign-in", data.email, data.password);

    if (result.success) navigate("/");
    else if (result.error) setServerError(result.error);
  };

  return (
    <div className="flex justify-center">
      <Card className={`flex-1 max-w-xs md:max-w-sm mt-8`}>
        <CardHeader className={`flex flex-col`}>
          <CardTitle>Sign In</CardTitle>
          <CardAction className={`flex items-center gap-x-2 text-zinc-500`}>
            Don't have an account?
            <Button variant="link" onClick={() => navigate("/sign-up")} className={`p-0 text-zinc-500`}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        {(serverError !== '') ? <AuthServerError title="Sign In Failed" error={serverError} /> : null}
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
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="sign-up">Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signin;