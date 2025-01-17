// pages/api/auth/signup.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate and process signup data (e.g., name, email, password)
    const { name, email, password } = data;
    const BACKEND_URL =
      process.env.BACKEND_URL || "https://chatbox-server-eight.vercel.app";
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const user = await response.json();
    if (!response.ok) {
      throw new Error(user.error || "Invalid credentials");
    }
    if (response.ok && user.token) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 }
    );
  }
}
