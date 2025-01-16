import SplashPage from "@/components/Splash";
import { auth } from "../auth";

export default async function Page() {
  const session = await auth();

  return <SplashPage session={session} />;
}
