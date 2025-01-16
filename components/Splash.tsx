"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth"; // Import Session type from next-auth

import Image from "next/image";

interface SplashPageProps {
  session: Session | null; // Define the type of session as Session or null
}

const SplashPage = ({ session }: SplashPageProps) => {
  const router = useRouter();
  //   console.log(session);
  useEffect(() => {
    const checkAuthStatus = async () => {
      setTimeout(() => {
        if (session?.user) {
          router.push("/home");
        } else {
          router.push("/onboarding");
        }
      }, 1000); // 2 seconds delay
    };

    checkAuthStatus();
  }, [router, session]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Image src="/logo.svg" alt="Logo" width={154} height={123} />
    </div>
  );
};

export default SplashPage;
