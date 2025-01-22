"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { signInSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { redirect } from "next/navigation";
import OAuth from "@/components/OAuth";

import { useSession } from "next-auth/react";

export default function SignIn() {
  // const router = useRouter();
  const { data: session, status } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  if (status === "authenticated" && session?.user) {
    redirect("/home");
  }

  if (status === "loading") {
    return (
      <div className="text-center flex justify-center items-center h-screen ">
        <p>Loading...</p>
      </div>
    );
  }
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
        redirect("/home"); // Redirect on successful login
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
    <div className="min-h-screen max-w-[100%] flex flex-col items-center ">
      <div className="flex gap-1 font-semibold text-[18px] text-[#000E08] not-italic leading-[18px] mt-[40px] my-[15px]">
        <span className="flex flex-col">
          <h1>Log in</h1>
          <div className=" bg-[#58C3B6] w-full h-[8px] mt-[-6px] relative -z-10"></div>
        </span>{" "}
        <div>to Chatbox</div>
      </div>
      <p className="font-['Circular Std'] font-normal text-[14px] text-[#797C7B] not-italic leading-[20px] tracking-[0.1px] max-w-[293px] text-center ">
        Welcome back! Sign in using your social account or email to continue us
      </p>
      <OAuth borderColor="black" />
      <form
        onSubmit={handleSubmit}
        className="mt-[40px] w-[327px] flex flex-col gap-1"
      >
        <label
          htmlFor="email"
          className="font-['Circular Std'] font-medium text-[14px] text-[#24786D] not-italic leading-[20px] tracking-[0.1px] "
        >
          Your email
        </label>

        <input
          name="email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="border-b-2 border-[#CDD1D0] my-4 bg-white py-2 px-1 font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]"
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <label
          htmlFor="password"
          className="font-['Circular Std'] font-medium text-[14px] text-[#24786D] not-italic leading-[20px] tracking-[0.1px] mt-4 "
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
          className="border-b-2 border-[#CDD1D0] my-4 bg-white py-2 px-1 font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]"
          required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <input type="submit" value="Log in" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
