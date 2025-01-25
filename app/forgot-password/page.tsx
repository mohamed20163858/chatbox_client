import { auth } from "@/auth";
import ForgetPassword from "@/components/ForgetPassword";
import { redirect } from "next/navigation";

export default async function Page() {
  // Call your auth function to fetch the session on the server
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <ForgetPassword />;
}
