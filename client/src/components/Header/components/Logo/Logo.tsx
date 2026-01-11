import type { LogoProps } from "../types";

export default function Logo({ src, alt }: LogoProps) {
  return (
    <div className="">
      <img src={src} alt={alt || "Odyseusz Logo"} className="h-6 w-6"/>
    </div>
  );
}