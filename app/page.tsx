"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Simulate an API call to check if the user is signed in
      const isSignedIn = false; // Replace with actual auth check

      setTimeout(() => {
        if (isSignedIn) {
          router.push("/home");
        } else {
          router.push("/onboarding");
        }
      }, 1000); // 2 seconds delay
    };

    checkAuthStatus();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Image src="/logo.svg" alt="Logo" width={154} height={123} />
    </div>
  );
};

export default SplashPage;
