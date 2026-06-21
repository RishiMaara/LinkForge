import Link from "next/link";

export default function PricingPage() {
  const plans = [
    { name: "Free", price: "$0", description: "For individuals, students, and hobbyists.", href: "/login", popular: false,
      features: ["Up to 15 short links", "Basic analytics (clicks)", "Standard QR codes", "Public bio profile page"] },
    { name: "Pro", price: "$9", period: "/ month", description: "For active developers, creators, and freelancers.", href: "/login", popular: true,
      features: ["Unlimited short links", "Detailed visitor analytics", "Custom slug aliases", "Password protection & expiration", "Priority support"] },
    { name: "Business", price: "$29", period: "/ month", description: "For teams, agencies, and custom domains.", href: "/login", popular: false,
      features: ["Multiple custom domains", "Advanced API access", "Export analytics (CSV)", "Team access controls", "Dedicated account manager"] },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 space-y-16">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Pricing</span>
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900">Plans for any scale.</h1>
        <p className="max-w-xl mx-auto text-neutral-500 text-lg">Start for free and upgrade as your developer presence and visitor volume grows.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div key={plan.name} className={`border rounded-3xl p-8 flex flex-col justify-between relative bg-white transition-all hover:shadow-lg ${plan.popular ? "border-blue-600 shadow-md ring-1 ring-blue-600" : "border-neutral-200"}`}>
            {plan.popular && <span className="absolute top-0 right-8 transform -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">{plan.name}</h3>
                <p className="text-sm text-neutral-500 mt-2">{plan.description}</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-neutral-900">{plan.price}</span>
                {plan.period && <span className="text-neutral-500 ml-1 text-sm font-semibold">{plan.period}</span>}
              </div>
              <ul className="space-y-3 pt-6 border-t border-neutral-100">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-neutral-600">
                    <span className="text-blue-600 font-bold">✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={plan.href} className={`w-full mt-8 py-3 rounded-xl font-bold transition block text-center ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"}`}>
              {plan.name === "Free" ? "Start Free" : plan.name === "Pro" ? "Go Pro" : "Contact Sales"}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
