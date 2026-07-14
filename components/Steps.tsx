import { SwatchIcon, SparklesIcon, TruckIcon } from "@heroicons/react/24/outline";

const STEPS = [
  {
    num: "01",
    title: "Pick or dream it up",
    body: "Choose from the shop or describe a custom piece; I'll confirm the price, colours and timing.",
    icon: <SwatchIcon width={30} height={30} />,
  },
  {
    num: "02",
    title: "Deposit & I get hooking",
    body: "A 50% deposit via CashApp starts your order, then I make it by hand — usually 1–2 weeks.",
    icon: <SparklesIcon width={30} height={30} />,
  },
  {
    num: "03",
    title: "Balance, then cozy mail",
    body: "When it's done, you pay the balance plus shipping and it's on its way to your door.",
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
