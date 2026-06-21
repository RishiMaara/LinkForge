"use client";
import { useState } from "react";

const faqs = [
  { q: "Is LinkForge free?", a: "Yes, the Free plan supports up to 15 short links and basic analytics." },
  { q: "Who can see my bio page?", a: "Anyone with your shareable /u/username link." },
  { q: "What kind of analytics do I get?", a: "Pro users get browser, device, OS, referrer, and geographic click data." },
  { q: "Can I use my own domain?", a: "Custom domain support is available on the Business plan." },
  { q: "Is my data safe?", a: "Yes, all links and analytics data are private to your account." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">FAQ</span>
        <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900">Frequently Asked</h2>
        <p className="text-neutral-500 text-sm">Everything you need to know before getting started.</p>
      </div>
      <div className="divide-y border rounded-2xl bg-white shadow-xs">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6">
            <button type="button" onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex justify-between items-center text-left cursor-pointer">
              <span className="font-semibold text-neutral-900 text-sm">{faq.q}</span>
              <span className="text-neutral-400 text-xl transition-transform" style={{ transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
            </button>
            {openIdx === i && <p className="text-sm text-neutral-500 mt-3 leading-relaxed">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
