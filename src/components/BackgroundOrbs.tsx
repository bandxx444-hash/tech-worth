const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div
      className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full animate-blob"
      style={{ background: "rgba(15,138,95,0.06)", filter: "blur(80px)" }}
    />
    <div
      className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full animate-blob"
      style={{ background: "rgba(207,232,216,0.7)", filter: "blur(60px)", animationDelay: "4s" }}
    />
    <div
      className="absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full animate-blob"
      style={{ background: "rgba(201,162,39,0.07)", filter: "blur(50px)", animationDelay: "8s" }}
    />
  </div>
);

export default BackgroundOrbs;
