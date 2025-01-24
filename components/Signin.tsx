"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { signInSchema } from "@/lib/zod";
import { ZodError } from "zod";
import OAuth from "@/components/OAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  useEffect(() => {
    if (email && password) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
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
        setErrors({});
        setError("Invalid credentials, please try again.");
      } else {
        router.push("/home");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Capture and display validation errors
        const formErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0] as "email" | "password"] = err.message;
        });
        setError(null);
        setErrors(formErrors);
      } else {
        setError("An unexpected error occurred: - " + error);
      }
    } finally {
      setLoading(false);
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
        className="mt-[40px] w-[327px] flex grow flex-col gap-1 justify-between "
      >
        <div className="flex flex-col gap-1">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        </div>

        <div className="mb-[60px]">
          <input
            type="submit"
            value={loading ? "Logging in..." : "Log in"}
            disabled={disable}
            className={`
            w-[327px]  rounded-[16px]  font-semibold text-[16px] leading-[16px] p-4
            ${
              disable
                ? "bg-[#F3F6F6] text-[#797C7B]"
                : "bg-[#24786D] text-white"
            }`}
          />
          <Link
            className="font-['Circular Std'] text-[#24786D]  block w-full  max-w-[425px] font-medium text-[14px] not-italic leading-[14px] text-center mt-4 "
            href="/forgot-password"
          >
            Forgot password?
          </Link>
          {error && <p className="error !text-center !mt-5">{error}</p>}
        </div>
      </form>
    </div>
  );
}
