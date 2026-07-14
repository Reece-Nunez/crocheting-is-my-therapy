import { site } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

// Absolute URL for an image path (structured data requires absolute URLs).
const abs = (path: string | null) => `${site.url}${path ?? "/og.png"}`;

export default function JsonLd() {
  const prices = PRODUCTS.map((p) => p.priceUSD);
  const priceRange = `$${Math.min(...prices)}–$${Math.max(...prices)}`;

  const graph = [
    {
      "@type": ["Store", "LocalBusiness"],
      "@id": `${site.url}/#business`,
      name: site.name,
      description: site.description,
      url: site.url,
      image: `${site.url}/og.png`,
      logo: `${site.url}/logo-transparent.png`,
      telephone: site.phone,
      email: site.email,
      foundingDate: site.foundingYear,
      founder: { "@type": "Person", name: site.founder },
      priceRange,
      paymentAccepted: "CashApp",
      currenciesAccepted: "USD",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "State", name: "North Carolina" },
      ],
      knowsAbout: ["Crochet", "Handmade blankets", "Handmade hats", "Baby blankets"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Handmade crochet goods",
        itemListElement: PRODUCTS.map((p) => ({
          "@type": "Offer",
          priceCurrency: "USD",
          price: p.priceUSD,
          availability: "https://schema.org/MadeToOrder",
          itemOffered: {
            "@type": "Product",
            name: p.name,
            description: p.desc,
            image: abs(p.image),
            category: "Handmade crochet",
            brand: { "@type": "Brand", name: site.name },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.shortDescription,
      publisher: { "@id": `${site.url}/#business` },
      inLanguage: "en-US",
    },
  ];

  const json = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
