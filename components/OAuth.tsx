import Image from "next/image";

interface OAuthProps {
  borderColor: "black" | "white";
}

const OAuth = ({ borderColor }: OAuthProps) => {
  return (
    <div className="mt-5 w-full flex flex-col items-center">
      <div className="flex gap-3">
        <button
          className={`flex items-center justify-center w-[48px] h-[48px] border-2 border-[${borderColor}]`}
          style={{ borderRadius: "50%" }}
        >
          <Image
            src="/onboarding/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
          />
        </button>
        <button
          className={`flex items-center justify-center w-[48px] h-[48px]  border-2 border-[${borderColor}]`}
          style={{ borderRadius: "50%" }}
        >
          <Image
            src="/onboarding/google.svg"
            alt="Gmail"
            width={24}
            height={24}
          />
        </button>
        <button
          className={`flex items-center justify-center w-[48px] h-[48px] border-2 border-[${borderColor}]`}
          style={{ borderRadius: "50%" }}
        >
          <Image
            src={`/onboarding/apple-${borderColor}.svg`}
            alt="Apple"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="flex gap-2 items-center justify-center mt-6 w-full max-w-[425px]">
        <hr
          style={{ backgroundColor: "#CDD1D0", width: "40%", height: "1px" }}
        />
        <p>OR</p>
        <hr
          style={{ backgroundColor: "#CDD1D0", width: "40%", height: "1px" }}
        />
      </div>
    </div>
  );
};
export default OAuth;
