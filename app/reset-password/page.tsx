// app/reset-password/page.tsx
import { auth } from "@/auth";
import ResetPassword from "@/components/ResetPassword";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const session = await auth();
  if (session?.user) redirect("/home");
  const { token } = await searchParams;
  if (!token || token.length !== 36) {
    redirect("/onboarding");
  }
  return <ResetPassword />;
}
