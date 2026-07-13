import Image from "next/image";
import logo from "@/public/logo-transparent.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="hero__stamp">
            Handmade in small batches · <b>Est. 2020</b>
          </p>
          <h1>
            Made by hand, <span className="plain">one</span>
            <br />
            <span className="hero__sig">cozy</span> loop at a time.
          </h1>
          <p className="lede">
            Soft crochet goods you&rsquo;ll actually reach for — ruffle hats, cozy hat-and-scarf
            sets, throw blankets and bed-sized comforters, each one made to order with a whole
            lot of love.
          </p>
          <div className="hero__cta">
            <a className="btn" href="#shop">Browse the shop</a>
            <a className="btn btn--ghost" href="#order">Request a custom piece</a>
          </div>
        </div>

        <div className="hero__art reveal" style={{ "--i": 1 } as React.CSSProperties}>
          <Image
            src={logo}
            alt="Crocheting is my Therapy — Handmade with Love"
            className="hero__logo"
            sizes="(max-width: 60rem) 340px, 470px"
            priority
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
