import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/content/clinic";

export function Logo() {
  return (
    <Link href="/" className="logo">
      <Image className="logo-mark" src="/brand/logo-mark.jpg" width={44} height={44} alt="" priority />
      <span className="logo-text">
        <span className="logo-name">{clinic.name}</span>
        <span className="logo-specialty">{clinic.cityCountry}</span>
      </span>
    </Link>
  );
}
