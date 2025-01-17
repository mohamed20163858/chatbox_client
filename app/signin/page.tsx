"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { signInSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      // Validate inputs
      signInSchema.parse(data);

      // If validation passes, submit the form
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        setError("Invalid credentials, please try again.");
      } else {
        router.push("/home"); // Redirect on successful login
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Capture and display validation errors
        const formErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0] as "email" | "password"] = err.message;
        });
        setErrors(formErrors);
      } else {
        // Handle other errors (e.g., network or server errors)
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </label>
      <label>
        Password
        <input name="password" type="password" />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </label>
      <button>Sign In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
