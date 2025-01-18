// pages/signup.tsx
"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { signUpSchema } from "@/lib/zod";
import { useSearchParams } from "next/navigation";

import { ZodError } from "zod";
export default function SignUp() {
  // const params = useParams();
  const searchParams = useSearchParams();
  // Decode dynamic route parameter
  // const decodedSlug = params.slug
  //    decodeURIComponent(params.slug as string)
  //   : null;
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  useEffect(() => {
    if (email || name) {
      setMessage("Please complete your registration");
      if (email) {
        setEmailValue(email);
      }
      if (name) {
        setNameValue(name);
      }
    }
  }, [email, name]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      // Validate inputs
      signUpSchema.parse(data);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Something went wrong");
      } else {
        await response.json();
        await signIn("credentials", {
          redirect: true,
          email: data.email,
          password: data.password,
          callbackUrl: "/", // Redirect to a desired page after login
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Capture and display validation errors
        const formErrors: { name?: string; email?: string; password?: string } =
          {};
        error.errors.forEach((err) => {
          formErrors[err.path[0] as "name" | "email" | "password"] =
            err.message;
        });
        setErrors(formErrors);
      } else {
        // Handle other errors (e.g., network or server errors)
        setError("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <label>
        Name
        <input
          name="name"
          type="text"
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          autoComplete="email"
          value={nameValue}
          required
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          onChange={(e) => {
            setEmailValue(e.target.value);
          }}
          autoComplete="email"
          value={emailValue}
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
