import Wordmark from "./Wordmark";

const TAGLINE = (
  <span>
    handmade with love<b>·</b>stitched slow<b>·</b>crocheting is my therapy<b>·</b>est. 2020<b>·</b>
  </span>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {TAGLINE}
          {TAGLINE}
        </div>
      </div>
      <div className="wrap footer__meta">
        <Wordmark footer />
        <p className="muted">
          <a href="mailto:jamiecannady4102@gmail.com">jamiecannady4102@gmail.com</a> ·{" "}
          <a href="tel:+12525710542">(252) 571-0542</a>
          <br />
          Cash or CashApp $PrayWifeJamieCannady
          <br />© 2026 Jamie Cannady · Handmade with love
        </p>
      </div>
    </footer>
  );
}
