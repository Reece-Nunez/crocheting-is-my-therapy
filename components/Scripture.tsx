// Verse band at the very top of the page. KJV (public domain).
export default function Scripture() {
  return (
    <div className="scripture">
      <blockquote className="wrap scripture__inner">
        <p className="scripture__verse">
          &ldquo;Blessed are the poor in spirit: for theirs is the kingdom of heaven.&rdquo;
        </p>
        <cite className="scripture__ref">Matthew 5:3</cite>
      </blockquote>
    </div>
  );
}
