import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, DollarSign, Store, Recycle } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ProgressBar from "@/components/ProgressBar";
import { useScan, type Decision } from "@/context/ScanContext";

const condBadgeClass: Record<string, string> = {
  Excellent: "bg-primary/10 text-primary border-primary/20",
  Good: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Fair: "bg-amber-100 text-amber-700 border-amber-200",
  Poor: "bg-red-100 text-red-600 border-red-200",
};

const decisionLabels: { value: Decision; icon: React.ReactNode; label: string }[] = [
  { value: "sell", icon: <DollarSign className="w-4 h-4" />, label: "Sell it" },
  { value: "trade-in", icon: <Store className="w-4 h-4" />, label: "Trade it in" },
  { value: "recycle", icon: <Recycle className="w-4 h-4" />, label: "Recycle it" },
];

const ResultsPage = () => {
  const navigate = useNavigate();
  const { result, setResult } = useScan();
  const [decision, setDecision] = useState<Decision | "ai">(result?.recommendation || "sell");
  const [price, setPrice] = useState(result?.adjustedPrice || 0);

  if (!result) { navigate("/"); return null; }

  const handleGenerate = () => {
    const finalDecision = decision === "ai" ? result.recommendation : decision;
    setResult({ ...result, decision: finalDecision, adjustedPrice: price });
    navigate("/listing");
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-2xl relative z-10 pt-8 pb-20">
        <ProgressBar percent={85} />

        <button onClick={() => navigate("/listings-preview")} className="flex items-center gap-1.5 text-sm text-subtle mt-6 mb-4 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">{result.deviceName}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${condBadgeClass[result.condition]}`}>
              {result.condition}
            </span>
          </div>
        </div>

        {/* Condition notes */}
        <div className="glass-card mb-4 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
          <h3 className="text-sm font-bold text-foreground mb-1">Condition Notes</h3>
          <p className="text-sm text-body leading-relaxed">{result.conditionNotes}</p>
        </div>

        {/* Market Valuation */}
        <div className="glass-card text-center mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs text-subtle mb-1">Market Valuation</p>
          <p className="text-4xl font-extrabold text-primary">${result.estimatedValue} <span className="text-lg text-subtle font-medium">USD</span></p>
          <p className="text-xs text-faintest mt-1">${result.valueLow} – ${result.valueHigh} range based on {result.comparables.length} listings</p>
        </div>

        {/* AI Recommendation */}
        <div className="glass-card mb-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
              AI Recommends: {result.recommendation.toUpperCase()}
            </span>
          </div>
          <p className="text-sm text-body">{result.recommendationReason}</p>
        </div>

        {/* Decision override */}
        <div className="glass-card mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-sm font-bold text-foreground mb-3">Your Decision</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDecision("ai")}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-all ${decision === "ai" ? "border-primary bg-primary/10 text-primary" : "border-border text-subtle hover:border-primary/30"}`}
            >
              <Sparkles className="w-4 h-4" /> Keep AI pick
            </button>
            {decisionLabels.map(d => (
              <button
                key={d.value}
                onClick={() => setDecision(d.value)}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-all ${decision === d.value ? "border-primary bg-primary/10 text-primary" : "border-border text-subtle hover:border-primary/30"}`}
              >
                {d.icon} {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price slider */}
        {(decision === "sell" || decision === "ai") && (
          <div className="glass-card mb-6 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
            <h3 className="text-sm font-bold text-foreground mb-2">Adjust Your Price</h3>
            <input
              type="range"
              min={result.valueLow}
              max={result.valueHigh}
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-subtle mt-1">
              <span>${result.valueLow}</span>
              <span className="font-bold text-primary text-base">${price}</span>
              <span>${result.valueHigh}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleGenerate}
          className="w-full py-3.5 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #0F8A5F, #0a6b49)" }}
        >
          Generate My Listing →
        </button>
      </main>
    </div>
  );
};

export default ResultsPage;
