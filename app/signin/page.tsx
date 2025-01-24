import { auth } from "@/auth";
import Signin from "@/components/Signin";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Call your auth function to fetch the session on the server
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <Signin />;
}
