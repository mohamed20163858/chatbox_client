"use client";
import { useState, useEffect } from "react";
import { forgotPasswordSchema } from "@/lib/zod";
import { ZodError } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string }>({});

  useEffect(() => {
    setDisable(!email);
  }, [email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
    };

    try {
      forgotPasswordSchema.parse(data);
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to send reset email");
      }

      router.push("/onboarding");
    } catch (error) {
      if (error instanceof ZodError) {
        const formErrors: { email?: string } = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0] as "email"] = err.message;
        });
        setErrors(formErrors);
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-[100%] flex flex-col items-center ">
      <div className="flex gap-1 font-semibold text-[18px] text-[#000E08] not-italic leading-[18px] mt-[40px] my-[15px]">
        <span className="flex flex-col">
          <h1>Reset your</h1>
          <div className="bg-[#58C3B6] w-full h-[8px] mt-[-6px] relative -z-10"></div>
        </span>{" "}
        <div>Password</div>
      </div>
      <p className="font-['Circular Std'] font-normal text-[14px] text-[#797C7B] not-italic leading-[20px] tracking-[0.1px] max-w-[293px] text-center ">
        Enter your email to receive a password reset link
      </p>

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
        </div>

        <div className="mb-[60px]">
          <input
            type="submit"
            value={loading ? "Sending..." : "Send Reset Link"}
            disabled={disable}
            className={`
              w-[327px] rounded-[16px] font-semibold text-[16px] leading-[16px] p-4
              ${
                disable
                  ? "bg-[#F3F6F6] text-[#797C7B]"
                  : "bg-[#24786D] text-white"
              }`}
          />
          <Link
            className="font-['Circular Std'] text-[#24786D] block w-full max-w-[425px] font-medium text-[14px] not-italic leading-[14px] text-center mt-4 "
            href="/signin"
          >
            Back to Sign In
          </Link>
          {error && <p className="error !text-center !mt-5">{error}</p>}
        </div>
      </form>
    </div>
  );
}
