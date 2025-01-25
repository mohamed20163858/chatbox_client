// components/ResetPassword.tsx
"use client";
import { useState, useEffect } from "react";
import { resetPasswordSchema } from "@/lib/zod";
import { ZodError } from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ password?: string }>({});

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        setDisable(true);
      } else {
        setConfirmPasswordError("");
        setDisable(false);
      }
    } else {
      setDisable(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      password: formData.get("password") as string,
      token,
    };

    try {
      // Only validate password with Zod
      resetPasswordSchema.parse(data);

      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Password reset failed");
      }

      router.push("/signin");
    } catch (error) {
      if (error instanceof ZodError) {
        const formErrors: { password?: string } = {};
        error.errors.forEach((err) => {
          formErrors[err.path[0] as "password"] = err.message;
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
        Enter your new password below
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-[40px] w-[327px] flex grow flex-col gap-1 justify-between "
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className={`font-['Circular Std'] font-medium text-[14px] ${
              errors.password ? "text-[#FF2D1B]" : "text-[#24786D]"
            } not-italic leading-[20px] tracking-[0.1px] mt-4 `}
          >
            New Password
          </label>

          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border-b-2 ${
              errors.password ? "border-[#FF2D1B]" : "border-[#CDD1D0]"
            }  bg-white py-2  font-['Caros'] font-normal text-[16px] text-[#000E08] not-italic leading-[16px]`}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label
            htmlFor="confirmPassword"
            className={`font-['Circular Std'] font-medium text-[14px] ${
              confirmPasswordError ? "text-[#FF2D1B]" : "text-[#24786D]"
            } not-italic leading-[20px] tracking-[0.1px] mt-4 `}
          >
            Confirm Password
          </label>

          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            value={loading ? "Resetting..." : "Reset Password"}
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
