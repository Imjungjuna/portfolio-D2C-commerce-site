"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(
        () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    }
  }, []);

  return null;
}
