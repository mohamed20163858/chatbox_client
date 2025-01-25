// app/api/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

    const sendToken = jwt.sign({ app: "Next.js" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const data = await req.json();
    const { password, token } = data;

    const BACKEND_URL =
      process.env.BACKEND_URL || "https://chatbox-server-eight.vercel.app";
    const response = await fetch(`${BACKEND_URL}/api/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendToken}`,
      },
      body: JSON.stringify({ token, password }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Password reset failed");
    if (response.ok && result.success) {
      return NextResponse.json(
        {
          message:
            "We successfully send you a reset password link to your email check it out and follow the instruction provided",
        },
        { status: 200 }
      );
    } else {
      throw new Error("Reset failed");
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reset failed" },
      { status: 500 }
    );
  }
}
