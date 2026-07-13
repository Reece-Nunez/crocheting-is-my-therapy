import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { PRODUCTS } from "@/lib/products";

/*
  Product data lives in lib/products.ts (shared with structured data).
  image: null renders a "Photo coming soon" placeholder — swap in a real photo when ready.
*/

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
                <span className="card__tag">{p.tag}</span>
                <h3 className="card__name">{p.name}</h3>
                <p className="card__desc">{p.desc}</p>
                <div className="card__foot">
                  <span className="card__price">{p.price}</span>
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
