// Crochet "shell" edge that sits on top of the band it reveals.
const SHELL =
  "M0 22 V11 Q30 22 60 11 T120 11 T180 11 T240 11 T300 11 T360 11 T420 11 " +
  "T480 11 T540 11 T600 11 T660 11 T720 11 T780 11 T840 11 T900 11 T960 11 " +
  "T1020 11 T1080 11 T1140 11 T1200 11 V22 Z";

export default function Scallop({ color }: { color: string }) {
  return (
    <svg
      className="scallop"
      viewBox="0 0 1200 22"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ color }}
    >
      <path d={SHELL} fill="currentColor" />
    </svg>
  );
}
