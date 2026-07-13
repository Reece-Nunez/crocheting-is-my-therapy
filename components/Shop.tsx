import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

/*
  Product photos live in /public/products (web-optimized copies of Jamie's originals).
  image: null renders a "Photo coming soon" placeholder — swap in a real photo when ready.
*/

type Product = {
  name: string;
  desc: string;
  price: string;
  priceNote?: string;
  tag: string;
  ready?: boolean;
  image: string | null;
  cta: string;
};

const PRODUCTS: Product[] = [
  {
    name: "Crochet Ruffle Hat",
    desc: "A soft crochet hat finished with a pretty ruffled brim — just tell me your colour.",
    price: "$70",
    tag: "Made to order",
    image: "/products/ruffle-hat.jpg",
    cta: "Order this",
  },
  {
    name: "Hat & Scarf Set",
    desc: "A matching hat and scarf to keep the whole walk cozy — a favourite gift.",
    price: "$65",
    tag: "Made to order",
    image: "/products/hat-scarf-set.jpg",
    cta: "Order this",
  },
  {
    name: "Leg Warmers",
    desc: "Ribbed crochet leg warmers, cozy from ankle to knee — pick your colours.",
    price: "$80",
    tag: "Made to order",
    image: "/products/leg-warmers-web.jpg",
    cta: "Order this",
  },
  {
    name: "Throw Blanket",
    desc: "A generous throw for the couch — warm, weighty and worn-in from the first night.",
    price: "$160",
    tag: "Made to order",
    image: "/products/throw-blanket.jpg",
    cta: "Order this",
  },
  {
    name: "Comfort for Beds",
    desc: "A full bed-sized comfort blanket, hand-worked to layer over the whole bed.",
    price: "$290",
    tag: "Made to order",
    image: null, // photo pending
    cta: "Order this",
  },
  {
    name: "Chair Blankets",
    desc: "A lap-sized blanket made for a favourite chair — the one you reach for every evening.",
    price: "$150",
    tag: "Made to order",
    image: "/products/chair-blanket.jpg",
    cta: "Order this",
  },
  {
    name: "Baby Blankets",
    desc: "A soft, gift-ready baby blanket in gentle yarn — sweet, snuggly and heirloom-bound.",
    price: "$75",
    tag: "Made to order",
    image: null, // photo pending
    cta: "Order this",
  },
];

export default function Shop() {
  return (
    <section className="shop section" id="shop">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">The shop</p>
          <h2>Made to order, in small batches.</h2>
          <p className="head__meta">
            Made to order · every piece one-of-a-kind · pay by cash or CashApp
          </p>
        </div>

        <div className="shop__grid">
          {PRODUCTS.map((p) => (
            <article className="card" key={p.name}>
              <div className={`card__thumb${p.image ? "" : " card__thumb--empty"}`}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 40rem) 100vw, (max-width: 60rem) 50vw, 360px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="card__soon">
                    <PhotoIcon width={30} height={30} />
                    <span>Photo coming soon</span>
                  </div>
                )}
              </div>
              <div className="card__body">
                <span className={`card__tag${p.ready ? " card__tag--ready" : ""}`}>{p.tag}</span>
                <h3 className="card__name">{p.name}</h3>
                <p className="card__desc">{p.desc}</p>
                <div className="card__foot">
                  <span className="card__price">
                    {p.price} {p.priceNote && <small>{p.priceNote}</small>}
                  </span>
                  <a className="tlink" href="#order">
                    {p.cta} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
