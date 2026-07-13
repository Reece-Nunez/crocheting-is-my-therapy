import { UserIcon } from "@heroicons/react/24/outline";

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="wrap about__grid">
        <div className="about__portrait reveal" style={{ "--i": 0 } as React.CSSProperties} aria-hidden="true">
          {/* Swap for a real photo: <img src="/jamie.jpg" alt="Jamie Cannady, maker" /> */}
          <UserIcon />
        </div>
        <div className="about__body">
          <p className="eyebrow">Hi, I&rsquo;m the maker</p>
          <p className="lede">
            I&rsquo;m Jamie Yolanda Cannady — a wife, a twin, and a maker who puts the Lord first in
            everything I do.
          </p>
          <p>
            I&rsquo;m 38, originally from Fort Worth, Texas, and a twin to my brother, James A.
            Pickett Jr. I moved to North Carolina — first to New Bern on February 21, 2019, and now
            home in Maple Hill. On Friday, March 6, 2020, I married Cecil Cannady Jr. of Bayboro, NC.
          </p>
          <p>
            Above everything, we love the Lord. He is the head of my life — I put Him first before I
            do anything else, I read His Word, and I keep gospel music playing all day. We worship at
            New Bern Church of God, and every morning, evening, and night I send out Daily Scriptures
            to share a little of that light.
          </p>
          <p>
            I&rsquo;ve been crocheting since 2020, and it&rsquo;s become my favorite way to make
            something warm for someone else — every piece worked by hand, one stitch at a time, with
            a whole lot of love and a little prayer.
          </p>
          <p className="about__quote">Handmade with love, and a little prayer. 💜</p>
        </div>
      </div>
    </section>
  );
}
