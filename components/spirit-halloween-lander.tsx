"use client"

import { useState } from "react"
import Image from "next/image"

const AFFILIATE_LINK = "https://trksy.org/aff_c?offer_id=3280&aff_id=26188"

const ORANGE = "#EE6B1F"
const ORANGE_DEEP = "#1C0E05"
const ORANGE_BRIGHT = "#FF9138"
const INK = "#111213"

const STEPS = [
  {
    t: "Click apply now",
    d: "Start your application — it takes seconds.",
    icon: "M9 9l10.5 3.5-4.5 2-2 4.5L9 9z M4 4l1.5 1.5 M4 9h2 M9 4v2",
  },
  { t: "Enter your email", d: "Quick 30-second signup process.", icon: "M3 7l9 6 9-6 M3.5 5.5h17v13h-17z" },
  {
    t: "Complete the survey",
    d: "Share your shopping preferences.",
    icon: "M5 6a2 2 0 012-2h10a2 2 0 012 2v13a2 2 0 01-2 2H7a2 2 0 01-2-2V6z M9 10h6 M9 14h6",
  },
  {
    t: "Complete 5+ deals",
    d: "Simple tasks like app downloads & trials.",
    icon: "M3 10h18v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9z M12 10v11 M3 14h18 M12 10c-2.5 0-4-1.2-4-2.8C8 5.5 10 5 12 7c2-2 4-1.5 4 .2 0 1.6-1.5 2.8-4 2.8z",
  },
  {
    t: "Receive your discount",
    d: "Delivered straight to your inbox.",
    icon: "M8 21h8 M12 17v4 M7 4h10v5a5 5 0 01-10 0V4z M7 6H4v1a4 4 0 004 4 M17 6h3v1a4 4 0 01-4 4",
  },
]

const CATEGORIES = [
  {
    t: "Costumes & Cosplay",
    d: "Adult, kids, and plus-size looks plus screen-accurate cosplay.",
    icon: "M12 3.5a1.6 1.6 0 100 3.2 M12 6.7l-6 4.6 2 2.1 1-.9V20h6v-7.5l1 .9 2-2.1-6-4.6z",
  },
  {
    t: "Masks & SFX Makeup",
    d: "Latex masks, prosthetics, face paint, and fake blood.",
    icon: "M4 6h16v4.5a8 8 0 01-16 0V6z M8.5 10.5h.01 M15.5 10.5h.01 M9 14.5c1.8 1.4 4.2 1.4 6 0 M9 3v3 M15 3v3",
  },
  {
    t: "Animatronics & Decor",
    d: "Life-size props, fog machines, lighting, and yard haunts.",
    icon: "M6 20.5V11a6 6 0 1112 0v9.5l-3-2-3 2-3-2-3 2z M9.5 10.5h.01 M14.5 10.5h.01 M11 15h2",
  },
  {
    t: "Party Supplies & Accessories",
    d: "Wigs, hats, contacts, candy bowls, and tableware.",
    icon: "M5 14a7 5.5 0 1 0 14 0a7 5.5 0 1 0 -14 0 M12 8.5V5.5c0-1.2.9-2 2-2 M9.5 10c-1 2.5-1 5.5 0 8 M14.5 10c1 2.5 1 5.5 0 8",
  },
]

const FAQS = [
  {
    q: "What are deals?",
    a: "Simple tasks like app downloads, surveys, or trial subscriptions. Each deal is straightforward and designed to be completed quickly.",
  },
  {
    q: "How many do I need?",
    a: "Complete 5+ deals to receive your reward. The more deals you complete, the faster you can receive your discount code.",
  },
  {
    q: "How long do they take?",
    a: "Typically 10-20 minutes per deal. Most users complete all required deals within a few hours spread across a day or two.",
  },
]

const AVATARS = [
  { src: "/avatars/spirit-shopper-1.png", alt: "Smiling young woman with dark wavy hair in a black top" },
  { src: "/avatars/spirit-shopper-2.png", alt: "Smiling young man with curly hair in an orange sweatshirt" },
  { src: "/avatars/spirit-shopper-3.png", alt: "Smiling woman with blonde hair in a dark green jacket" },
]

function Icon({ d, className = "w-6 h-6", color = ORANGE }: { d: string; className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split(" M").map((p, i) => (
        <path key={i} d={(i === 0 ? "" : "M") + p} />
      ))}
    </svg>
  )
}

function CTAButton({
  children,
  dark = false,
  large = false,
}: {
  children: React.ReactNode
  dark?: boolean
  large?: boolean
}) {
  return (
    <a
      href={AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-btn group inline-flex items-center gap-2 rounded-full font-semibold ${
        large ? "px-9 py-4 text-lg" : "px-7 py-3.5 text-base"
      }`}
      style={dark ? { backgroundColor: ORANGE, color: "#FFFFFF" } : { backgroundColor: "#FFFFFF", color: INK }}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}

function TimelineRow({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const leftSide = index % 2 === 0
  return (
    <div className="relative grid grid-cols-[3rem_1fr] md:grid-cols-[1fr_3.5rem_1fr] gap-x-4 md:gap-x-8 items-center pb-6 md:pb-8 last:pb-0">
      <div
        className={`hidden md:flex items-center ${leftSide ? "md:order-3 justify-start" : "md:order-1 justify-end"}`}
        aria-hidden="true"
      >
        <span className="font-black text-6xl lg:text-7xl leading-none select-none" style={{ color: "#F7DCC5" }}>
          0{index + 1}
        </span>
      </div>

      <div className="order-1 md:order-2 flex justify-center self-start md:self-center pt-1 md:pt-0">
        <div
          className="t-node w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm z-10"
          style={{
            backgroundColor: ORANGE,
            borderColor: ORANGE,
            color: "#FFFFFF",
            boxShadow: "0 8px 22px rgba(238,107,31,.38)",
          }}
        >
          {index + 1}
        </div>
      </div>

      <div
        className={`t-card order-2 rounded-2xl p-5 bg-white border border-gray-200 shadow-sm ${
          leftSide ? "md:order-1" : "md:order-3"
        }`}
      >
        <div className={`flex items-start gap-4 ${leftSide ? "md:flex-row-reverse md:text-right" : ""}`}>
          <div
            className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#FDE8D6" }}
          >
            <Icon d={step.icon} color={ORANGE} className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg leading-snug">{step.t}</h3>
            <p className="mt-1 text-gray-500 leading-relaxed text-sm">{step.d}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SpiritHalloweenRewardLander() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-white antialiased overflow-x-hidden font-sans" style={{ color: INK }}>
      <style>{`
        .cta-btn { transition: transform .15s ease, box-shadow .2s ease; }
        .cta-btn:hover { transform: scale(1.04); box-shadow: 0 12px 32px rgba(0,0,0,0.22); }
        .cta-btn:active { transform: scale(0.98); }

        .orb { position: absolute; border-radius: 9999px; filter: blur(70px); opacity: .5; animation: orbDrift 12s ease-in-out infinite; }
        @keyframes orbDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.15); }
        }

        .drifter { position: absolute; opacity: .18; animation: drift 9s ease-in-out infinite; }
        @keyframes drift {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(8deg); }
        }

        .cat-card { transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease; }
        .cat-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 24px 48px rgba(17,18,19,0.12); }
        .cat-card:hover .cat-icon { transform: translateY(-4px) rotate(4deg) scale(1.08); }
        .cat-icon { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
        .card-shine { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 35%, rgba(238,107,31,0.06) 47%, rgba(255,255,255,0.55) 52%, transparent 65%); background-size: 260% 100%; animation: cardShine 7s ease-in-out infinite; }
        @keyframes cardShine { 0%, 55% { background-position: 135% 0; } 85%, 100% { background-position: -60% 0; } }
        .icon-bob { animation: iconBob 4.5s ease-in-out infinite; }
        @keyframes iconBob { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(-5deg); } }
        .cat-spark { position: absolute; top: 16px; right: 18px; color: #EE6B1F; animation: sparkTwinkle 3.4s ease-in-out infinite; }
        @keyframes sparkTwinkle { 0%, 100% { transform: scale(.75) rotate(0deg); opacity: .15; } 50% { transform: scale(1.2) rotate(25deg); opacity: .45; } }

        .faq-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .35s cubic-bezier(.16,1,.3,1); }
        .faq-body.open { grid-template-rows: 1fr; }
        .faq-inner { overflow: hidden; }

        .pulse-dot { animation: pulseDot 1.8s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,.6); } 50% { box-shadow: 0 0 0 7px rgba(74,222,128,0); } }

        .t-card { transition: transform .25s cubic-bezier(.16,1,.3,1), border-color .25s ease, box-shadow .25s ease; }
        .t-card:hover { transform: translateY(-6px); border-color: rgba(238,107,31,.4); box-shadow: 0 18px 44px rgba(238,107,31,.14); }
        .t-rail-fill { background: linear-gradient(180deg, #FF9138, #EE6B1F); }

        .spark { position: absolute; bottom: -12px; border-radius: 9999px; background: rgba(255,255,255,.75); animation: sparkRise linear infinite; }
        @keyframes sparkRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          12% { opacity: .8; }
          100% { transform: translateY(-560px) scale(.3); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, .orb, .drifter, .card-shine, .icon-bob, .cat-spark, .spark, .pulse-dot { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ── HERO ────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(170deg, ${ORANGE_BRIGHT} 0%, ${ORANGE} 45%, ${ORANGE_DEEP} 100%)` }}
      >
        <div className="orb w-96 h-96 -top-24 -left-24" style={{ backgroundColor: "#FFB05C" }} />
        <div className="orb w-80 h-80 top-1/3 -right-20" style={{ backgroundColor: "#1C0E05", animationDelay: "-6s" }} />
        <div className="drifter left-[8%] top-[30%]">
          <Icon
            d="M6 20.5V11a6 6 0 1112 0v9.5l-3-2-3 2-3-2-3 2z M9.5 10.5h.01 M14.5 10.5h.01"
            color="#fff"
            className="w-8 h-8"
          />
        </div>
        <div className="drifter right-[10%] top-[18%]" style={{ animationDelay: "-3s" }}>
          <Icon
            d="M4 6h16v4.5a8 8 0 01-16 0V6z M8.5 10.5h.01 M15.5 10.5h.01 M9 14.5c1.8 1.4 4.2 1.4 6 0"
            color="#fff"
            className="w-9 h-9"
          />
        </div>
        <div className="drifter left-[16%] bottom-[12%]" style={{ animationDelay: "-5s" }}>
          <Icon
            d="M5 14a7 5.5 0 1 0 14 0a7 5.5 0 1 0 -14 0 M12 8.5V5.5c0-1.2.9-2 2-2"
            color="#fff"
            className="w-8 h-8"
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pt-12 pb-20 md:pt-20 md:pb-24 text-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              Applications Open
            </span>
            <h1 className="mt-6 font-black tracking-tight leading-[1.05] text-[1.55rem] min-[352px]:text-[1.72rem] min-[384px]:text-[1.9rem] min-[416px]:text-[2.05rem] min-[448px]:text-[2.2rem] min-[480px]:text-[2.4rem] min-[512px]:text-[2.55rem] min-[544px]:text-[2.7rem] min-[576px]:text-[2.9rem] min-[608px]:text-[3.05rem] min-[640px]:text-[3.2rem] min-[672px]:text-[3.4rem] min-[704px]:text-[3.55rem] min-[736px]:text-[3.7rem] text-balance">
              {"The Spirit Halloween Discounts They Don't Advertise"}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-xl mx-auto leading-relaxed text-pretty">
              Discover how shoppers are unlocking hidden discount codes on costumes, masks and SFX makeup,
              animatronics, and party accessories.
            </p>
            <div className="mt-9 flex items-center justify-center gap-x-5 gap-y-9 flex-wrap">
              <CTAButton large>Apply Now</CTAButton>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AVATARS.map((a) => (
                    <Image
                      key={a.src}
                      src={a.src || "/placeholder.svg"}
                      alt={a.alt}
                      width={72}
                      height={72}
                      className="w-9 h-9 rounded-full border-2 border-white/60 object-cover"
                    />
                  ))}
                </div>
                <span className="text-white/80 text-sm leading-tight max-w-[200px] text-left">
                  {"Join 12,000+ shoppers who've already claimed their discounts"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE STEPS ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="text-center">
            <div className="text-sm font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              How it works
            </div>
            <h2 className="mt-3 font-black tracking-tight text-3xl md:text-5xl text-balance">
              Five Simple Steps to Claiming Your Discounts
            </h2>
          </div>

          <div className="relative mt-10">
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full bg-gray-200" />
            <div className="t-rail-fill absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full" />

            {STEPS.map((step, i) => (
              <TimelineRow key={step.t} step={step} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <CTAButton dark large>
              Apply Now
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ── WHAT YOUR DISCOUNT COVERS ───────────────────── */}
      <section style={{ backgroundColor: "#F7F7F8" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 text-center">
          <div>
            <div className="text-sm font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Unlock rewards
            </div>
            <h2 className="mt-3 font-black tracking-tight text-3xl md:text-5xl text-balance">
              What You Can Do With Your Discount
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-5 text-left">
            {CATEGORIES.map((c, i) => (
              <div
                key={c.t}
                className="cat-card relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm p-7 flex items-start gap-5"
              >
                <div className="card-shine" style={{ animationDelay: `${i * 1.8}s` }} aria-hidden="true" />
                <span className="cat-spark" style={{ animationDelay: `${i * 0.8}s` }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" />
                  </svg>
                </span>
                <div
                  className="cat-icon w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#FDE8D6" }}
                >
                  <div className="icon-bob" style={{ animationDelay: `${i * 0.6}s` }}>
                    <Icon d={c.icon} className="w-7 h-7" />
                  </div>
                </div>
                <div className="relative">
                  <h3 className="font-bold text-2xl">{c.t}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20 text-center">
          <div>
            <div className="text-sm font-semibold tracking-widest uppercase" style={{ color: ORANGE }}>
              Questions &amp; answers
            </div>
            <h2 className="mt-3 font-black tracking-tight text-3xl md:text-5xl text-balance">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 flex flex-col gap-4 text-left">
            {FAQS.map((f, i) => (
              <div key={f.q} className="rounded-2xl bg-white border border-gray-200 shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-bold text-lg">{f.q}</span>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: openFaq === i ? ORANGE : "#F2F3F5" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 8l5 5 5-5"
                        stroke={openFaq === i ? "#fff" : INK}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div className={`faq-body ${openFaq === i ? "open" : ""}`}>
                  <div className="faq-inner">
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(170deg, ${ORANGE_BRIGHT} 0%, ${ORANGE} 50%, ${ORANGE_DEEP} 100%)` }}
      >
        {[
          { l: "6%", s: 5, d: 7, delay: 0 },
          { l: "16%", s: 4, d: 9, delay: 2.2 },
          { l: "28%", s: 6, d: 8, delay: 1.1 },
          { l: "42%", s: 4, d: 10, delay: 3.4 },
          { l: "58%", s: 5, d: 7.5, delay: 0.6 },
          { l: "70%", s: 4, d: 9.5, delay: 2.8 },
          { l: "82%", s: 6, d: 8.5, delay: 1.8 },
          { l: "92%", s: 4, d: 7, delay: 4 },
        ].map((sp, i) => (
          <span
            key={i}
            className="spark"
            style={{
              left: sp.l,
              width: sp.s,
              height: sp.s,
              animationDuration: `${sp.d}s`,
              animationDelay: `${sp.delay}s`,
            }}
            aria-hidden="true"
          />
        ))}
        <div className="orb w-96 h-96 -top-24 -left-24" style={{ backgroundColor: "#FFC48A", opacity: 0.35 }} />
        <div
          className="orb w-80 h-80 -bottom-24 -right-16"
          style={{ backgroundColor: "#1C0E05", animationDelay: "-5s" }}
        />

        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28 text-center text-white">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
              Applications Open
            </span>
            <h2 className="mt-6 font-black tracking-tight text-4xl md:text-6xl leading-[1.05] text-balance">
              Ready to Start Saving?
            </h2>
            <p className="mt-4 text-white/85 text-lg max-w-xl mx-auto leading-relaxed text-pretty">
              Join thousands of shoppers who have already claimed their discount code. Your savings are just a few clicks
              away.
            </p>
          </div>

          <div className="mt-12">
            <CTAButton large>Apply Now</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
