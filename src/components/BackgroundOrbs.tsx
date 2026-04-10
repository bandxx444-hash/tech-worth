import { motion } from "framer-motion";

const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Animated aurora gradient bands */}
    <motion.div
      animate={{ x: [0, 60, -40, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-40 -right-40 w-[900px] h-[600px] rounded-full opacity-[0.12]"
      style={{ background: "radial-gradient(ellipse at 40% 50%, hsl(153 70% 45%), hsl(43 80% 55%) 50%, transparent 80%)", filter: "blur(100px)" }}
    />
    <motion.div
      animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.08, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 -left-40 w-[700px] h-[500px] rounded-full opacity-[0.08]"
      style={{ background: "radial-gradient(ellipse at 60% 40%, hsl(43 85% 55%), hsl(153 60% 40%) 60%, transparent 80%)", filter: "blur(90px)" }}
    />
    <motion.div
      animate={{ x: [0, 30, -20, 0], y: [0, -50, 30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-32 right-1/3 w-[500px] h-[400px] rounded-full opacity-[0.06]"
      style={{ background: "radial-gradient(circle, hsl(153 70% 42%), transparent 70%)", filter: "blur(80px)" }}
    />

    {/* Animated grid */}
    <div className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(hsl(153 70% 38% / 0.3) 1px, transparent 1px),
          linear-gradient(90deg, hsl(153 70% 38% / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />

    {/* Radial vignette from center */}
    <div className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 50% 30%, transparent 40%, hsl(40 30% 96% / 0.6) 100%)" }}
    />

    {/* Top gradient line */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(153 70% 38% / 0.25), hsl(43 75% 50% / 0.2), transparent)" }} />

    {/* Floating particles */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.6, 0],
          y: [0, -80 - i * 10],
          x: [0, (i % 2 === 0 ? 1 : -1) * 20],
        }}
        transition={{
          duration: 5 + i * 0.8,
          repeat: Infinity,
          delay: i * 0.7,
          ease: "easeOut",
        }}
        style={{
          left: `${8 + i * 9}%`,
          top: `${30 + (i % 4) * 15}%`,
          width: `${3 + (i % 3) * 2}px`,
          height: `${3 + (i % 3) * 2}px`,
          background: i % 3 === 0
            ? "hsl(153 70% 48%)"
            : i % 3 === 1
            ? "hsl(43 75% 55%)"
            : "hsl(153 50% 60%)",
        }}
      />
    ))}

    {/* Decorative corner accents */}
    <svg className="absolute top-8 left-8 w-20 h-20 opacity-[0.06]" viewBox="0 0 80 80">
      <path d="M0 40 L40 0 L80 40 L40 80Z" fill="none" stroke="hsl(153 70% 38%)" strokeWidth="0.5" />
      <path d="M10 40 L40 10 L70 40 L40 70Z" fill="none" stroke="hsl(43 75% 50%)" strokeWidth="0.5" />
    </svg>
    <svg className="absolute bottom-8 right-8 w-20 h-20 opacity-[0.06]" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(153 70% 38%)" strokeWidth="0.5" />
      <circle cx="40" cy="40" r="25" fill="none" stroke="hsl(43 75% 50%)" strokeWidth="0.5" />
      <circle cx="40" cy="40" r="15" fill="none" stroke="hsl(153 70% 38%)" strokeWidth="0.5" />
    </svg>
  </div>
);

export default BackgroundOrbs;
