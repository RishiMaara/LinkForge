import Navbar from "@/components/navbar";
import FAQ from "@/components/faq";
import Link from "next/link";

export default function HomePage() {
  const features = [
    { title: "Smart Redirects", description: "Fast redirects with device, browser, and location parsing.", icon: "⚡" },
    { title: "Bio Pages", description: "Build beautiful portfolio bio pages to centralize your work in minutes.", icon: "👤" },
    { title: "Real-time Analytics", description: "Track click counts, referrer data, and geographic performance.", icon: "📈" },
    { title: "QR Codes", description: "Instantly generate high-quality PNG and SVG codes for scan tracking.", icon: "📱" },
  ];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 space-y-32">
        <div className="space-y-6 text-center sm:text-left sm:max-w-3xl">
          <h1 className="text-7xl font-extrabold tracking-tight leading-none text-neutral-900">
            Your links should do <span className="text-blue-600">more</span> than redirect.
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
            Create branded shortcuts, monitor recruiter click rates, and build a beautiful public developer bio portfolio page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link href="/login" className="rounded-xl bg-black px-6 py-3.5 text-center text-white font-medium hover:bg-neutral-800 transition shadow-sm">
              Start Free
            </Link>
            <Link href="/pricing" className="rounded-xl border border-neutral-300 px-6 py-3.5 text-center font-medium hover:bg-neutral-50 transition">
              View Pricing
            </Link>
          </div>
        </div>

        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Features</span>
            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900">Developer-First Link Shortening</h2>
            <p className="text-neutral-500">All the tools you need to optimize and showcase your public profile, resume, and open source contributions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat) => (
              <div key={feat.title} className="border rounded-2xl p-6 bg-white space-y-4 hover:shadow-md transition">
                <span className="text-3xl">{feat.icon}</span>
                <h3 className="text-xl font-bold text-neutral-900">{feat.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-16 space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">For Developers</span>
            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900">Consolidate Your Portfolio & Resume</h2>
            <p className="max-w-2xl text-neutral-600">Use clean shortcuts on your CV and profiles to track recruitments and resume views.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["RESUME", "PORTFOLIO", "GITHUB", "LINKEDIN"].map((label, i) => (
              <div key={label} className="border rounded-2xl p-6 bg-white space-y-3 hover:border-blue-500 transition hover:shadow-md cursor-pointer group">
                <span className="font-semibold text-neutral-400 group-hover:text-blue-600 transition">0{i + 1} / {label}</span>
                <h3 className="text-lg font-bold text-neutral-900">linkforge.app/rishi{label.toLowerCase()}</h3>
                <p className="text-xs text-neutral-500">Redirects straight to your hosted CV or PDF.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-16 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Testimonials</span>
            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900">Trusted by Top Engineers</h2>
            <p className="text-neutral-500">See how developers leverage LinkForge to optimize their career outreach.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Adding custom tracked links on my resume let me see exactly when companies opened my GitHub and portfolio.", name: "Alex R.", title: "Software Engineer" },
              { quote: "The developer portfolio mode is incredible. I set up my custom link page in under 5 minutes.", name: "Sarah K.", title: "UI/UX Designer" },
              { quote: "The analytics dashboard is exactly what I wanted. Clean, quick, and informative.", name: "David P.", title: "Frontend Lead" },
            ].map((t) => (
              <div key={t.name} className="border rounded-2xl p-6 bg-white space-y-4">
                <p className="text-neutral-600 italic text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-neutral-200"></div>
                  <div><span className="font-bold text-xs text-neutral-900 block">{t.name}</span><span className="text-[10px] text-neutral-400">{t.title}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-16"><FAQ /></div>
      </main>

      <footer className="border-t bg-white mt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-bold text-neutral-900">LinkForge &copy; {new Date().getFullYear()}</div>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="/pricing" className="hover:text-black">Pricing</Link>
            <Link href="/showcase" className="hover:text-black">Showcase</Link>
            <Link href="/creators" className="hover:text-black">Creators</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
