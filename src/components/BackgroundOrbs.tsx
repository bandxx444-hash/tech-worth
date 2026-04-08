const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div
      className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full animate-blob"
      style={{ background: "radial-gradient(circle, rgba(15,138,95,0.07) 0%, transparent 70%)", filter: "blur(80px)" }}
    />
    <div
      className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full animate-blob"
      style={{ background: "radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)", filter: "blur(80px)", animationDelay: "4s" }}
    />
    <div
      className="absolute -bottom-40 right-1/4 w-[400px] h-[400px] rounded-full animate-blob"
      style={{ background: "radial-gradient(circle, rgba(15,138,95,0.04) 0%, transparent 70%)", filter: "blur(60px)", animationDelay: "8s" }}
    />
    {/* Top gradient line */}
    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(15,138,95,0.15), rgba(201,162,39,0.1), transparent)" }} />
    {/* Floating particles */}
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="floating-particle"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 1.3}s`,
          animationDuration: `${6 + i * 2}s`,
          background: i % 2 === 0
            ? "hsl(153 70% 38% / 0.25)"
            : "hsl(43 75% 50% / 0.2)",
          width: `${3 + (i % 3) * 2}px`,
          height: `${3 + (i % 3) * 2}px`,
        }}
      />
    ))}
    {/* Subtle mesh overlay */}
    <div className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: "radial-gradient(circle at 25% 25%, hsl(153 70% 38%) 1px, transparent 1px), radial-gradient(circle at 75% 75%, hsl(43 75% 50%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

export default BackgroundOrbs;
