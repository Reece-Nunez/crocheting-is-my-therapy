import { SwatchIcon, SparklesIcon, TruckIcon } from "@heroicons/react/24/outline";

const STEPS = [
  {
    num: "01",
    title: "Pick or dream it up",
    body: "Choose something from the shop, or tell me your idea, colours and size for a custom piece.",
    icon: <SwatchIcon width={30} height={30} />,
  },
  {
    num: "02",
    title: "I hook it up",
    body: "I confirm the details and price, then make your piece by hand. Made-to-order usually takes 1–2 weeks.",
    icon: <SparklesIcon width={30} height={30} />,
  },
  {
    num: "03",
    title: "Cozy mail",
    body: "Your finished piece is wrapped up and shipped to your door, ready to snuggle straight away.",
    icon: <TruckIcon width={30} height={30} />,
  },
];

export default function Steps() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">How ordering works</p>
          <h2>Three easy steps, no yarn knowledge required.</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step reveal" style={{ "--i": i } as React.CSSProperties} key={s.num}>
              <div className="step__icon">{s.icon}</div>
              <span className="step__num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
