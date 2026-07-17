// Product catalogue — shared by the shop UI (components/Shop.tsx), the order-form
// dropdown, and the Product structured data (components/JsonLd.tsx).
// image: null renders a "Photo coming soon" placeholder — assign a /products/*.jpg
// path once the correct photo is confirmed.

export type Product = {
  name: string;
  desc: string;
  price: string; // display, e.g. "$70"
  priceUSD: number; // numeric, for structured data
  tag: string;
  image: string | null;
  cta: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Crochet Ruffle Hat",
    desc: "A soft crochet hat finished with a pretty ruffled brim — just tell me your colour.",
    price: "$285",
    priceUSD: 285,
    tag: "Made to order",
    image: "/products/ruffle-hat.jpg",
    cta: "Order this",
  },
  {
    name: "Men's & Women's Matching Hats",
    desc: "Coordinating crochet hats for two — his and hers, in your colours.",
    price: "$295",
    priceUSD: 295,
    tag: "Made to order",
    image: "/products/mens-matching-hat.jpg",
    cta: "Order this",
  },
  {
    name: "Hat & Scarf Set",
    desc: "A matching hat and scarf to keep the whole walk cozy — a favourite gift.",
    price: "$175",
    priceUSD: 175,
    tag: "Made to order",
    image: "/products/hat-scarf-set.jpg",
    cta: "Order this",
  },
  {
    name: "Leg Warmers",
    desc: "Ribbed crochet leg warmers, cozy from ankle to knee — pick your colours.",
    price: "$180",
    priceUSD: 180,
    tag: "Made to order",
    image: "/products/leg-warmers-web.jpg",
    cta: "Order this",
  },
  {
    name: "Shoulder Bags",
    desc: "A crochet shoulder bag that carries the essentials in style.",
    price: "$290",
    priceUSD: 290,
    tag: "Made to order",
    image: "/products/shoulder-bag.jpg",
    cta: "Order this",
  },
  {
    name: "Pocketbooks",
    desc: "A handmade crochet pocketbook — a purse with a little personality.",
    price: "$290",
    priceUSD: 290,
    tag: "Made to order",
    image: "/products/pocketbook.jpg",
    cta: "Order this",
  },
  {
    name: "Bible & Notebook Cover",
    desc: "A snug crochet cover to protect a favourite Bible or notebook.",
    price: "$100",
    priceUSD: 100,
    tag: "Made to order",
    image: "/products/bible-notebook-cover.jpg",
    cta: "Order this",
  },
  {
    name: "Chair Cover",
    desc: "A crochet cover to dress up a chair back or seat.",
    price: "$250",
    priceUSD: 250,
    tag: "Made to order",
    image: null,
    cta: "Order this",
  },
  {
    name: "Throw Blankets",
    desc: "A generous throw for the couch — warm, weighty and worn-in from the first night.",
    price: "$260",
    priceUSD: 260,
    tag: "Made to order",
    image: "/products/throw-blanket.jpg",
    cta: "Order this",
  },
  {
    name: "Chair Blankets",
    desc: "A lap-sized blanket made for a favourite chair — the one you reach for every evening.",
    price: "$150",
    priceUSD: 150,
    tag: "Made to order",
    image: "/products/throw-blanket.jpg",
    cta: "Order this",
  },
  {
    name: "Baby Blankets",
    desc: "A soft, gift-ready baby blanket in gentle yarn — sweet, snuggly and heirloom-bound.",
    price: "$275",
    priceUSD: 275,
    tag: "Made to order",
    image: null,
    cta: "Order this",
  },
  {
    name: "Comforter",
    desc: "A full bed-sized comforter, hand-worked to layer over the whole bed.",
    price: "$290",
    priceUSD: 290,
    tag: "Made to order",
    image: null,
    cta: "Order this",
  },
];
