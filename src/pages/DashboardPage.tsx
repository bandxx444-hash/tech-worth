import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import { useScan, type ScanResult } from "@/context/ScanContext";

const condBadge: Record<string, string> = {
  Excellent: "bg-primary/10 text-primary",
  Good: "bg-emerald-100 text-emerald-700",
  Fair: "bg-amber-100 text-amber-700",
  Poor: "bg-red-100 text-red-600",
};

const decisionIcon: Record<string, string> = {
  sell: "💰",
  "trade-in": "🏪",
  recycle: "♻️",
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { scanHistory, clearHistory } = useScan();

  const totalValue = scanHistory.reduce((s, r) => s + r.estimatedValue, 0);
  const totalCO2 = scanHistory.reduce((s, r) => s + r.co2Saved, 0);

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-3xl relative z-10 pt-10 pb-20">
        <h1 className="text-2xl md:text-[40px] font-extrabold mb-8 animate-fade-in-up">My Dashboard</h1>

        {scanHistory.length === 0 ? (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-bold mb-2">No scans yet</h2>
            <p className="text-subtle text-sm mb-6">Start scanning devices to see your history here.</p>
            <button
              onClick={() => navigate("/upload")}
              className="px-6 py-3 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta"
              style={{ background: "linear-gradient(135deg, #0F8A5F, #0a6b49)" }}
            >
              Scan Your First Device →
            </button>
          </div>
        ) : (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Devices Scanned", value: scanHistory.length },
                { label: "Total Est. Value", value: `$${totalValue.toLocaleString()}` },
                { label: "CO₂ Saved (lbs)", value: totalCO2.toFixed(1) },
              ].map(m => (
                <div key={m.label} className="glass-card text-center py-5">
                  <div className="text-2xl font-extrabold text-primary">{m.value}</div>
                  <div className="text-xs text-subtle mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Scan list */}
            <div className="space-y-3 mb-8">
              {scanHistory.map((r: ScanResult) => (
                <div key={r.id} className="glass-card flex items-center gap-4">
                  <span className="text-2xl">{decisionIcon[r.decision]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-sm truncate">{r.deviceName}</p>
                    <p className="text-xs text-subtle">{r.brand} · {new Date(r.scannedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-extrabold text-primary">${r.estimatedValue}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${condBadge[r.condition]}`}>
                      {r.condition}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/upload")}
                className="flex-1 py-3 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta"
                style={{ background: "linear-gradient(135deg, #0F8A5F, #0a6b49)" }}
              >
                Scan Another Device →
              </button>
              <button
                onClick={clearHistory}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-subtle border border-border hover:bg-secondary transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
