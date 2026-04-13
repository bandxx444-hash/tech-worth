import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, AlertTriangle, Recycle } from "lucide-react";

const crisisStats = [
  { value: 62, suffix: "M tonnes", label: "E-waste generated globally in 2023" },
  { value: 1.8, suffix: "B", prefix: "~", label: "New electronics sold every year" },
  { value: 91, suffix: "B+", prefix: "$", label: "In recoverable materials discarded annually" },
  { value: 20, suffix: "%", prefix: "< ", label: "Of e-waste formally recycled worldwide" },
];

const harmfulPoints = [
  "Toxic metals contaminate drinking water and damage ecosystems for decades.",
  "Improper burning releases dioxins and carcinogens, harming workers and nearby communities.",
  <>Manufacturing a single smartphone generates roughly <strong className="text-foreground">44 lbs of CO2</strong> — discarding it wastes all of that embodied carbon.</>,
  "Rare earth minerals used in electronics are finite; landfilling them accelerates resource depletion.",
];

const helpPoints = [
  <>Extending a device's life by just <strong className="text-foreground">one year</strong> cuts its carbon footprint by up to 30%.</>,
  "Certified recyclers recover gold, silver, copper, and rare earths — reducing the need to mine new materials.",
  <>The global secondhand electronics market is projected to reach <strong className="text-foreground">$150B by 2030</strong>.</>,
  <>Every tonne of e-waste properly processed prevents roughly <strong className="text-foreground">2 tonnes of CO2-equivalent</strong> emissions.</>,
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(current);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, value]);

  const formatted = Number.isInteger(value) ? Math.round(display).toString() : display.toFixed(1);

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

const EWasteCrisisSection = () => (
  <section className="relative z-10 mt-24">
    <div className="rounded-3xl px-6 md:px-12 py-14 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(150 20% 92% / 0.7), hsl(150 25% 90% / 0.4))" }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(153 70% 45%), transparent)" }} />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(43 75% 55%), transparent)" }} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* Header */}
        <motion.span variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[3px] text-primary block mb-3 font-sans">
          The E-Waste Crisis
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-bold leading-tight mb-4 font-display">
          What is E-Waste — and Why Does It Matter?
        </motion.h2>
        <motion.p variants={fadeUp} className="text-body text-[15px] leading-relaxed max-w-4xl mb-12 font-sans">
          E-waste (electronic waste) is any discarded electronic device — phones, laptops, tablets, TVs, printers,
          and more. It's the world's fastest-growing solid waste stream, yet less than <strong className="text-foreground">20% is formally recycled</strong>.
          The rest ends up in landfills or is illegally exported, leaching toxic heavy metals like lead, mercury, and
          cadmium into soil and groundwater.
        </motion.p>

        {/* Stats row with animated counters */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {crisisStats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-2xl border border-border bg-card px-5 py-6 text-center transition-all duration-300 hover:shadow-card hover:border-primary/20 group"
            >
              <div className="text-2xl md:text-3xl font-display font-bold gradient-text mb-2">
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-xs text-subtle font-sans leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two columns with icons */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <motion.div variants={fadeUp} className="glass-card !bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(0 72% 51% / 0.1)" }}>
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-xl font-display font-bold">Why it's harmful</h3>
            </div>
            <div className="space-y-4">
              {harmfulPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <ArrowRight className="w-4 h-4 mt-1 text-destructive/60 flex-shrink-0" />
                  <p className="text-sm text-body leading-relaxed font-sans">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-card !bg-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--primary) / 0.1)" }}>
                <Recycle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold">How reselling &amp; recycling helps</h3>
            </div>
            <div className="space-y-4">
              {helpPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <p className="text-sm text-body leading-relaxed font-sans">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* How this tool helps */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl px-6 md:px-8 py-6 border-l-4 relative overflow-hidden"
          style={{ background: "hsl(150 20% 94%)", borderColor: "hsl(153 70% 38%)" }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.05] blur-2xl"
            style={{ background: "radial-gradient(circle, hsl(153 70% 45%), transparent)" }} />
          <h4 className="text-lg font-display font-bold mb-2">How this tool helps</h4>
          <p className="text-sm text-body leading-relaxed font-sans">
            Through AI-powered valuation and eBay listing generation, this platform helps you recover real value from devices
            that would otherwise be discarded — keeping electronics in use longer and out of landfills. Every scan is a step
            toward a circular economy.
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default EWasteCrisisSection;
