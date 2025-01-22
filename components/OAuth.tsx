"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

type OAuthProps = {
  borderColor: "black" | "white";
};

const OAuth = ({ borderColor }: OAuthProps) => {
  return (
    <div className="mt-5 w-full flex flex-col items-center">
      <div className="flex gap-3">
        <button
          onClick={() => signIn("facebook", { callbackUrl: "/home" })}
          className={`flex items-center justify-center w-[48px] h-[48px] border-2 ${
            borderColor === "black" ? "border-black" : "border-white"
          }`}
          style={{ borderRadius: "50%" }}
          type="submit"
        >
          <Image
            src="/onboarding/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
        </button>

        <button
          className={`flex items-center justify-center w-[48px] h-[48px]  border-2 ${
            borderColor === "black" ? "border-black" : "border-white"
          }`}
          style={{ borderRadius: "50%" }}
          type="submit"
          onClick={() => signIn("google", { callbackUrl: "/home" })}
        >
          <Image
            src="/onboarding/google.svg"
            alt="Google"
            width={24}
            height={24}
          />
        </button>

        <button
          className={`flex items-center justify-center w-[48px] h-[48px] border-2 ${
            borderColor === "black" ? "border-black" : "border-white"
          }`}
          style={{ borderRadius: "50%" }}
          type="submit"
          onClick={() => signIn("discord", { callbackUrl: "/home" })}
        >
          <Image
            src={`/onboarding/discord-${borderColor}.svg`}
            alt="Discord"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex gap-2 items-center justify-center mt-6 w-full max-w-[425px]">
        <hr
          style={{ backgroundColor: "#CDD1D0", width: "40%", height: "1px" }}
        />
        <p
          className={`text-[${
            borderColor === "black" ? "#797C7B" : "#D6E4E0"
          }] text-[14px] font-['Circular Std'] font-normal leading-[14px] tracking-[0.1px]`}
        >
          OR
        </p>
        <hr
          style={{ backgroundColor: "#CDD1D0", width: "40%", height: "1px" }}
        />
      </div>
    </div>
  );
};
export default OAuth;
