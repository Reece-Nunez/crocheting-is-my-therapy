import Image from "next/image";
import logo from "@/public/logo-transparent.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a href="#top" aria-label="Crocheting is my Therapy — home">
          <Image src={logo} alt="Crocheting is my Therapy" width={96} height={96} className="footer__logo" />
        </a>
        <p className="footer__tag">Handmade with love</p>
        <div className="footer__links">
          <a href="mailto:jamiecannady4102@gmail.com">jamiecannady4102@gmail.com</a>
          <span className="sep" aria-hidden="true">·</span>
          <a href="tel:+12525710542">(252) 571-0542</a>
        </div>
        <p className="footer__pay">
          Cash or CashApp · <strong>$PrayWifeJamieCannady</strong>
        </p>
        <p className="footer__copy">© 2026 Jamie Cannady · Est. 2020</p>
      </div>
    </footer>
  );
}
