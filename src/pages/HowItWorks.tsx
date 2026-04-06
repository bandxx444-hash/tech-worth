import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    emoji: "📸",
    step: "Step 1 of 4",
    title: "Capture Your Device",
    desc: "Take a photo or short video of the electronic device you want to evaluate. Our system accepts smartphones, laptops, tablets, and more.",
    info: "Tip: Better lighting and multiple angles lead to more accurate valuations.",
  },
  {
    emoji: "🤖",
    step: "Step 2 of 4",
    title: "AI Identifies & Grades",
    desc: "Our computer vision model detects the device make, model, year, and cosmetic condition within seconds.",
    info: "We use a proprietary grading scale: Excellent, Good, Fair, and Poor.",
  },
  {
    emoji: "💰",
    step: "Step 3 of 4",
    title: "Real-Time Market Pricing",
    desc: "EcoLens scans eBay, Swappa, and trade-in programs to give you a fair market value based on recent sold listings.",
    info: "Prices update every 24 hours to reflect current market trends.",
  },
  {
    emoji: "📋",
    step: "Step 4 of 4",
    title: "Get Your Listing",
    desc: "Receive an auto-generated listing with optimized title, description, and pricing — ready to copy-paste to any marketplace.",
    info: "One click to copy. Sell, trade-in, or recycle — the choice is yours.",
  },
];

const whyCards = [
  { emoji: "🌍", title: "Reduce E-Waste", body: "Over 50 million tonnes of e-waste are generated each year. EcoLens helps divert devices from landfills." },
  { emoji: "⚡", title: "Instant Results", body: "No sign-ups, no waiting. Snap a photo and get your valuation in under 10 seconds." },
  { emoji: "🔒", title: "Private & Secure", body: "Your images are processed in real-time and never stored. We take your privacy seriously." },
];

const faqs = [
  { q: "Is EcoLens really free?", a: "Yes — EcoLens is completely free to use for individual scans. We may offer premium features in the future." },
  { q: "What devices can I scan?", a: "Smartphones, laptops, tablets, smartwatches, gaming consoles, and most consumer electronics." },
  { q: "How accurate are the valuations?", a: "Our AI is trained on millions of sold listings and achieves 92%+ accuracy within a $15 margin." },
  { q: "Do you store my photos?", a: "No. All images are processed in-memory and discarded immediately after analysis." },
];

const HowItWorks = () => (
  <div className="min-h-screen relative">
    <BackgroundOrbs />
    <Navbar />
    <main className="container mx-auto px-4 max-w-5xl relative z-10 pt-16 pb-20">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-3xl md:text-[44px] font-extrabold leading-tight mb-4">
          Simple. Smart.{" "}
          <span className="text-shimmer">Sustainable.</span>
        </h1>
        <p className="text-subtle text-lg max-w-lg mx-auto">
          Four easy steps from old device to cash in your pocket.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-20">
        {steps.map((s, i) => (
          <div
            key={i}
            className="glass-card animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
              {s.emoji}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-primary mb-2 block">
              {s.step}
            </span>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-body text-sm leading-relaxed mb-4">{s.desc}</p>
            <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-xs text-subtle">
              {s.info}
            </div>
          </div>
        ))}
      </div>

      {/* Why EcoLens */}
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-2xl md:text-[34px] font-extrabold mb-3">Why EcoLens?</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {whyCards.map((c, i) => (
          <div key={i} className="glass-card text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-3xl mb-3">{c.emoji}</div>
            <h4 className="font-bold text-foreground mb-2">{c.title}</h4>
            <p className="text-sm text-body leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-2xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 py-0 border-border">
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-body pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <div className="text-center animate-fade-in-up">
        <button className="px-8 py-4 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #0F8A5F, #0a6b49)" }}>
          Start Scanning Now →
        </button>
      </div>
    </main>
  </div>
);

export default HowItWorks;
