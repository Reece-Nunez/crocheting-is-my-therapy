import {
  SparklesIcon,
  GiftIcon,
  GiftTopIcon,
  SwatchIcon,
  Square2StackIcon,
  HomeModernIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const ICON = { width: 16, height: 16 };

const CATEGORIES: { label: string; icon: React.ReactNode }[] = [
  { label: "Ruffle hats", icon: <SparklesIcon {...ICON} /> },
  { label: "Hat & scarf sets", icon: <GiftIcon {...ICON} /> },
  { label: "Leg warmers", icon: <SwatchIcon {...ICON} /> },
  { label: "Throw blankets", icon: <Square2StackIcon {...ICON} /> },
  { label: "Bed comforters", icon: <HomeModernIcon {...ICON} /> },
  { label: "Chair blankets", icon: <HeartIcon {...ICON} /> },
  { label: "Baby blankets", icon: <GiftTopIcon {...ICON} /> },
  { label: "Custom orders", icon: <StarIcon {...ICON} /> },
];

export default function Makes() {
  return (
    <section className="makes section--tight">
      <div className="wrap">
        <p className="eyebrow">
          <SparklesIcon width={16} height={16} />
          A little of everything
        </p>
        <h2 style={{ fontSize: "var(--text-lg)", fontStyle: "italic", marginTop: "var(--space-sm)" }}>
          Cozy things, made to be used and loved.
        </h2>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <span className="chip" key={c.label}>
              {c.icon}
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
