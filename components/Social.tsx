export default function Social() {
  return (
    <section className="social section--tight">
      <div className="wrap">
        <span className="social__hand">let&rsquo;s make something</span>
        <h2>Made just for you.</h2>
        <p className="lede" style={{ marginInline: "auto", marginTop: "var(--space-sm)" }}>
          Every piece is worked to order — reach out and we&rsquo;ll sort colours, size and
          timing together. A 50% deposit starts it; the rest plus shipping when it&rsquo;s done.
        </p>
        <div className="social__cta" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)", justifyContent: "center" }}>
          <a className="btn" href="#order">Start an order</a>
          <a className="btn btn--ghost" href="tel:+12525710542">Call or text</a>
        </div>
      </div>
    </section>
  );
}
