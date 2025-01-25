// pages/api/auth/signup.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ app: "Next.js" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const data = await req.json();

    // Validate and process signup data (e.g., name, email, password)

    const { email } = data;
    const BACKEND_URL =
      process.env.BACKEND_URL || "https://chatbox-server-eight.vercel.app";
    const response = await fetch(`${BACKEND_URL}/api/user/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(
        resData.error ||
          "the email address you provided is not registered in our website"
      );
    }
    if (response.ok && resData.success) {
      return NextResponse.json(
        {
          message:
            "We successfully send you a reset password link to your email check it out and follow the instruction provided",
        },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to send reset email");
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to find user",
      },
      { status: 500 }
    );
  }
}
