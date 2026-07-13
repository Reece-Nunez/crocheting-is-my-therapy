// Product catalogue — shared by the shop UI (components/Shop.tsx) and the
// Product structured data (components/JsonLd.tsx). Keep prices in sync here.

export type Product = {
  name: string;
  desc: string;
  price: string; // display, e.g. "$70"
  priceUSD: number; // numeric, for structured data
  tag: string;
  image: string | null; // /products/*.jpg, or null for a "photo coming soon" card
  cta: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Crochet Ruffle Hat",
    desc: "A soft crochet hat finished with a pretty ruffled brim — just tell me your colour.",
    price: "$70",
    priceUSD: 70,
    tag: "Made to order",
    image: "/products/ruffle-hat.jpg",
    cta: "Order this",
  },
  {
    name: "Hat & Scarf Set",
    desc: "A matching hat and scarf to keep the whole walk cozy — a favourite gift.",
    price: "$65",
    priceUSD: 65,
    tag: "Made to order",
    image: "/products/hat-scarf-set.jpg",
    cta: "Order this",
  },
  {
    name: "Leg Warmers",
    desc: "Ribbed crochet leg warmers, cozy from ankle to knee — pick your colours.",
    price: "$80",
    priceUSD: 80,
    tag: "Made to order",
    image: "/products/leg-warmers-web.jpg",
    cta: "Order this",
  },
  {
    name: "Throw Blanket",
    desc: "A generous throw for the couch — warm, weighty and worn-in from the first night.",
    price: "$160",
    priceUSD: 160,
    tag: "Made to order",
    image: "/products/throw-blanket.jpg",
    cta: "Order this",
  },
  {
    name: "Comfort for Beds",
    desc: "A full bed-sized comfort blanket, hand-worked to layer over the whole bed.",
    price: "$290",
    priceUSD: 290,
    tag: "Made to order",
    image: null,
    cta: "Order this",
  },
  {
    name: "Chair Blankets",
    desc: "A lap-sized blanket made for a favourite chair — the one you reach for every evening.",
    price: "$150",
    priceUSD: 150,
    tag: "Made to order",
    image: "/products/chair-blanket.jpg",
    cta: "Order this",
  },
  {
    name: "Baby Blankets",
    desc: "A soft, gift-ready baby blanket in gentle yarn — sweet, snuggly and heirloom-bound.",
    price: "$75",
    priceUSD: 75,
    tag: "Made to order",
    image: null,
    cta: "Order this",
  },
];
