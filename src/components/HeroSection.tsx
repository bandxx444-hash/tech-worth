import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { useScan } from "@/context/ScanContext";
import { simulateAIDiagnostics } from "@/lib/mock-ai";

const HeroSection = () => {
  const navigate = useNavigate();
  const { setFiles, setDiagnostics } = useScan();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (dropped.length) {
      setFiles(dropped);
      setDiagnostics(simulateAIDiagnostics());
      navigate("/diagnostics");
    }
  }, [setFiles, setDiagnostics, navigate]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles(Array.from(e.target.files));
      setDiagnostics(simulateAIDiagnostics());
      navigate("/diagnostics");
    }
  }, [setFiles, setDiagnostics, navigate]);

  return (
    <section className="relative z-10 pt-20 pb-12 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in-up">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium text-primary">
          AI-Powered · Real-Time Market Pricing · Free to Use
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-[60px] font-extrabold leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        E-Waste Value Detector.
        <br />
        <span className="text-shimmer">Turn Tech Waste Into Wealth.</span>
      </h1>

      {/* Subtext */}
      <p className="text-lg text-subtle max-w-[560px] mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        Snap a photo of your old electronics and instantly discover their market value, optimal selling channels, and environmental impact.
      </p>

      {/* CTA Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <button
          onClick={() => navigate("/upload")}
          className="px-7 py-3.5 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #0F8A5F, #0a6b49)" }}
        >
          Start Scanning →
        </button>
        <div className="text-left">
          <p className="text-sm font-bold text-foreground mb-2">Drop a photo or video — get your value instantly.</p>
          <div
            className="border-2 border-dashed border-primary/30 rounded-2xl bg-background h-[110px] flex items-center justify-center gap-2 text-subtle text-sm cursor-pointer hover:border-primary/50 transition-colors"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="w-5 h-5 text-primary" />
            Click or drag to upload
          </div>
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFileSelect} />
        </div>
      </div>

      {/* 3-step explainer */}
      <div className="glass-card inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        {[
          { n: "1", title: "Upload Media", sub: "Photo or video" },
          { n: "2", title: "AI Analysis", sub: "Instant detection" },
          { n: "3", title: "Get Your Listing", sub: "Sell or recycle" },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step.n}</span>
            <div className="text-left">
              <div className="font-semibold text-foreground">{step.title}</div>
              <div className="text-xs text-subtle">{step.sub}</div>
            </div>
            {i < 2 && <span className="text-faintest ml-2 hidden md:inline">→</span>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
