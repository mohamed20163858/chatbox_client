// app/reset-password/page.tsx
import { auth } from "@/auth";
import ResetPassword from "@/components/ResetPassword";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: { token?: string };
}
export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  if (session?.user) redirect("/home");
  const token = await searchParams.token;
  if (!token || token.length !== 36) {
    redirect("/onboarding");
  }
  return <ResetPassword />;
}
