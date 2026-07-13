import Image from "next/image";
import logo from "@/public/logo-transparent.png";

export default function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a className="wordmark" href="#top" aria-label="Crocheting is my Therapy — home">
      <Image
        src={logo}
        alt=""
        width={footer ? 72 : 54}
        height={footer ? 72 : 54}
        className={`wordmark__logo${footer ? " wordmark__logo--footer" : ""}`}
        priority={!footer}
      />
      <span>
        Crocheting is my {footer ? "Therapy" : <b>Therapy</b>}
      </span>
    </a>
  );
}
