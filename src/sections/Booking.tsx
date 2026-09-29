import { useEffect, useRef, useState } from "react";
import { calendlyUrl, contact } from "../data/content";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_SCRIPT}"]`,
  );
  return new Promise((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Calendly failed to load")),
      { once: true },
    );
    if (!existing) {
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

// Loads the Calendly scheduler only when the section is about to scroll into view.
function Scheduler({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "ready" | "failed">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadCalendly()
          .then(() => {
            const params =
              "hide_gdpr_banner=1&hide_landing_page_details=1&primary_color=0e3b33";
            window.Calendly?.initInlineWidget({
              url: `${url}${url.includes("?") ? "&" : "?"}${params}`,
              parentElement: el,
            });
            setStatus("ready");
          })
          .catch(() => setStatus("failed"));
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [url]);

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white">
      {status !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-[15px] text-fog">
          {status === "failed" ? (
            <p>
              The scheduler didn't load. Email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="link-draw text-ink"
              >
                {contact.email}
              </a>{" "}
              to book a time.
            </p>
          ) : (
            <p>Loading available times…</p>
          )}
        </div>
      )}
      <div ref={ref} className="h-[680px] min-w-[280px] md:h-[720px]" />
    </div>
  );
}

// Shown until a Calendly link is set in content.ts
function DirectBooking() {
  return (
    <div className="flex flex-col justify-between sm:min-h-[420px] rounded-[24px] bg-porcelain p-8 text-ink sm:p-10">
      <p className="lede max-w-[30ch]">
        Email or call, and we'll find a time that works for you.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={`mailto:${contact.email}?subject=Intro%20call`}
          className="pill-dark"
        >
          Email Saleh
        </a>
        <a
          href={contact.phoneHref}
          className="pill ring-1 ring-inset ring-ink/20 hover:ring-ink/50"
        >
          Call {contact.phone}
        </a>
      </div>
    </div>
  );
}

export default function Booking() {
  return (
    <section
      id="book"
      data-tone="dark"
      className="open-up bg-deep text-porcelain"
    >
      <div className="wrap grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="heading reveal max-w-[10ch]">Book an intro call</h2>
          <p
            className="lede reveal mt-8 max-w-[34ch] text-porcelain/70"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            {calendlyUrl
              ? "Pick a time that suits you. We'll talk about your business, your books, and what you need help with."
              : "A short conversation about your business, your books, and what you need help with."}
          </p>

          {calendlyUrl && (
            <dl
              className="reveal mt-12 space-y-5 text-[15px] md:mt-16"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              <div>
                <dt className="text-porcelain/50">Prefer email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="link-draw text-lg"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-porcelain/50">Or call</dt>
                <dd className="mt-1">
                  <a href={contact.phoneHref} className="link-draw text-lg">
                    {contact.phone}
                  </a>
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div
          className="reveal lg:col-span-7"
          style={{ "--d": "150ms" } as React.CSSProperties}
        >
          {calendlyUrl ? <Scheduler url={calendlyUrl} /> : <DirectBooking />}
        </div>
      </div>
    </section>
  );
}
