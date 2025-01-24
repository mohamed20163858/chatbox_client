// pages/signup.tsx
"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { signUpSchema } from "@/lib/zod";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Session } from "next-auth"; // Import Session type from next-auth

import { ZodError } from "zod";
function SignUp({ session }: { session: Session | null }) {
  if (session?.user) {
    redirect("/home");
  }
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  useEffect(() => {
    if (
      emailValue &&
      nameValue &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [emailValue, nameValue, password, confirmPassword]);
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
          redirectTo: "/home", // Redirect to a desired page after login
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
    <div className="min-h-screen max-w-[100%] flex flex-col items-center ">
      <div className="flex gap-1 font-semibold text-[18px] text-[#000E08] not-italic leading-[18px] mt-[40px] my-[15px]">
        <div>Sign up with</div>
        <span className="flex flex-col">
          <h1> Email</h1>
          <div className=" bg-[#58C3B6] w-full h-[8px] mt-[-6px] relative -z-10"></div>
        </span>{" "}
      </div>
      <p className="font-['Circular Std'] font-normal text-[14px] text-[#797C7B] not-italic leading-[20px] tracking-[0.1px] max-w-[293px] text-center ">
        Get chatting with friends and family today by signing up for our chat
        app!{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-[40px] w-[327px] flex grow flex-col gap-1 justify-between "
      >
        {message && <p className="error">{message}</p>}

        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className={`font-['Circular Std'] font-medium text-[14px] ${
              errors.name ? "text-[#FF2D1B]" : "text-[#24786D]"
            } not-italic leading-[20px] tracking-[0.1px] `}
          >
            Your name
          </label>

          <input
            name="name"
            type="text"
            id="name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            autoComplete="name"
            className={`border-b-2 ${
              errors.name ? "border-[#FF2D1B]" : "border-[#CDD1D0]"
            }  bg-white py-2  font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]`}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label
            htmlFor="email"
            className={`font-['Circular Std'] font-medium text-[14px] ${
              errors.email ? "text-[#FF2D1B]" : "text-[#24786D]"
            } not-italic leading-[20px] tracking-[0.1px] mt-4 `}
          >
            Your email
          </label>

          <input
            name="email"
            type="email"
            id="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            autoComplete="email"
            className={`border-b-2 ${
              errors.email ? "border-[#FF2D1B]" : "border-[#CDD1D0]"
            }  bg-white py-2  font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]`}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <label
            htmlFor="password"
            className={`font-['Circular Std'] font-medium text-[14px] ${
              errors.password ? "text-[#FF2D1B]" : "text-[#24786D]"
            } not-italic leading-[20px] tracking-[0.1px] mt-4 `}
          >
            Password
          </label>

          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className={`border-b-2 ${
              errors.password ? "border-[#FF2D1B]" : "border-[#CDD1D0]"
            }  bg-white py-2  font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]`}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <label
            htmlFor="confirm-password"
            className={`font-['Circular Std'] font-medium text-[14px] ${
              confirmPasswordError ? "text-[#FF2D1B]" : "text-[#24786D]"
            } not-italic leading-[20px] tracking-[0.1px] mt-4 `}
          >
            Confirm Password
          </label>

          <input
            name="confirm-password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            className={`border-b-2 ${
              confirmPasswordError ? "border-[#FF2D1B]" : "border-[#CDD1D0]"
            }  bg-white py-2  font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]`}
            required
          />
          {confirmPasswordError && (
            <p className="error">{confirmPasswordError}</p>
          )}
        </div>

        <div className="mb-[60px]">
          <input
            type="submit"
            value={loading ? "Creating an account..." : "Create an account"}
            disabled={disable}
            className={`
            w-[327px]  rounded-[16px]  font-semibold text-[16px] leading-[16px] p-4
            ${
              disable
                ? "bg-[#F3F6F6] text-[#797C7B]"
                : "bg-[#24786D] text-white"
            }`}
          />
          {error && <p className="error !text-center !mt-5">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default function PageWrapper({ session }: { session: Session | null }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp session={session} />
    </Suspense>
  );
}
