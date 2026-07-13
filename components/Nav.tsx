"use client";

import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Wordmark from "./Wordmark";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 60rem)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Wordmark />

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="navlinks"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <XMarkIcon width={24} height={24} />
          ) : (
            <Bars3Icon width={24} height={24} />
          )}
        </button>

        <nav aria-label="Primary">
          <ul
            className="nav__links"
            id="navlinks"
            data-open={open}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <li><a className="nav__link" href="#shop">Shop</a></li>
            <li><a className="nav__link" href="#about">About</a></li>
            <li><a className="nav__link" href="#order">How to order</a></li>
            <li><a className="btn btn--sm" href="#order">Order yours</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
