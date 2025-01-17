import OAuth from "@/components/OAuth";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  } else {
    return (
      <div
        className="min-h-screen max-w-[100%] flex flex-col items-center "
        style={{ backgroundColor: "black", color: "white" }}
      >
        <div className=" flex flex-col items-center justify-center pb-4 relative">
          <div className="h-screen w-screen absolute bg-[url('/onboarding/purple.svg')] bg-cover bg-center"></div>
          <div
            style={{ maxWidth: "425px" }}
            className="flex flex-col px-4 relative z-10"
          >
            <div className="flex items-center justify-center pt-[50px]">
              <Image
                src="/onboarding/white-logo.svg"
                alt="Logo"
                width={77}
                height={20}
              />
            </div>
            <h1 className="font-['Caros'] font-normal text-[68px] leading-[78px] shadow">
              Connect friends{" "}
              <span className="font-semibold">easily & quickly</span>
            </h1>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center ">
          <p
            className="px-4 font-normal text-[16px] text-[#B9C1BE] leading-[26px] my-4"
            style={{ maxWidth: "425px" }}
          >
            Our chat app is the perfect way to stay connected with friends and
            family.
          </p>
          <OAuth borderColor={"white"} />
          <button className="mt-5 w-[90%]">
            <Link
              className="bg-white text-black rounded-[16px] block w-full  max-w-[425px] font-medium text-[16px] leading-[16px] p-4 "
              style={{ fontFamily: "Caros Italic", fontStyle: "normal" }}
              href="/signup"
            >
              Sign up within mail
            </Link>
          </button>

          <div className="my-5">
            <Link
              href="/signin"
              className="text-[14px] leading-[14px] text-[#B9C1BE] tracking-[0.1px]"
            >
              Existing account?{" "}
              <span className="text-white font-medium">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
export default Onboarding;
