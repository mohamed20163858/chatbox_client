import { auth } from "@/auth";
import OAuth from "@/components/OAuth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Call your auth function to fetch the session on the server
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <OAuth borderColor="black" />;
}
