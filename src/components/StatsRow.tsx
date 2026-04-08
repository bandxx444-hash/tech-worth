import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Devices Scanned" },
  { value: "$2.1M", label: "Value Recovered" },
  { value: "1.2M lbs", label: "CO₂ Saved" },
  { value: "4.9★", label: "User Rating" },
];

const StatsRow = () => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
  >
    {stats.map((s) => (
      <motion.div
        key={s.label}
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="glass-card-glow text-center py-6 px-4"
      >
        <div className="text-2xl md:text-3xl font-display font-bold gradient-text mb-1">{s.value}</div>
        <div className="text-xs font-medium text-subtle font-sans">{s.label}</div>
      </motion.div>
    ))}
  </motion.div>
);

export default StatsRow;
