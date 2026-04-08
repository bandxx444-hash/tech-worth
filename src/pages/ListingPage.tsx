import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Download, ExternalLink, RotateCcw, DollarSign, Recycle, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ProgressBar from "@/components/ProgressBar";
import { useScan } from "@/context/ScanContext";
import { generateListing } from "@/lib/mock-ai";

const tradeInLinks = [
  { name: "Best Buy Trade-In", url: "https://www.bestbuy.com/trade-in", desc: "Trade in electronics for Best Buy gift cards." },
  { name: "Apple Trade In", url: "https://www.apple.com/shop/trade-in", desc: "Get credit toward a new Apple device or an Apple Gift Card." },
  { name: "Amazon Trade-In", url: "https://www.amazon.com/trade-in", desc: "Trade eligible devices for Amazon gift cards." },
];

const recycleLinks = [
  { name: "Best Buy Recycling", url: "https://www.bestbuy.com/recycling", desc: "Free drop-off electronics recycling at any location." },
  { name: "Staples Recycling", url: "https://www.staples.com/sbd/cre/marketing/sustainability-center/recycling-services/", desc: "Free tech recycling at Staples stores nationwide." },
  { name: "Earth911", url: "https://earth911.com", desc: "Find a local recycling center near you." },
];

const ListingPage = () => {
  const navigate = useNavigate();
  const { result, addToHistory, resetScan } = useScan();
  const listing = useMemo(() => result ? generateListing(result) : "", [result]);

  useEffect(() => { if (result) addToHistory(result); }, []); // eslint-disable-line

  if (!result) { navigate("/"); return null; }

  const downloadListing = () => {
    const blob = new Blob([listing], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `ecolens-listing-${result.id.slice(0, 8)}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleScanAnother = () => { resetScan(); navigate("/upload"); };

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-2xl relative z-10 pt-8 pb-20 font-sans">
        <ProgressBar percent={100} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[2px] gradient-text mb-3 block">Step 4 of 4 — Complete</span>

          {result.decision === "sell" && (
            <>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-6">Your Ready-to-Post Listing</h1>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-glow text-left mb-4">
                <pre className="whitespace-pre-wrap text-sm font-mono text-foreground/80 leading-relaxed rounded-xl p-5 border border-border"
                  style={{ background: "hsl(40 30% 97%)" }}>
                  {listing}
                </pre>
              </motion.div>
              <div className="flex gap-3 mb-6">
                <button onClick={downloadListing} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border border-border bg-card text-foreground hover:bg-secondary transition-all duration-200">
                  <Download className="w-4 h-4" /> Download .txt
                </button>
                <a href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(result.deviceName)}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border border-border bg-card text-foreground hover:bg-secondary transition-all duration-200">
                  <ExternalLink className="w-4 h-4" /> Search on eBay
                </a>
              </div>
            </>
          )}

          {result.decision === "trade-in" && (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 gradient-border"
                style={{ background: "linear-gradient(135deg, hsl(153 70% 38% / 0.1), hsl(43 75% 50% / 0.05))" }}>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-subtle mb-1">Expected Value</p>
              <p className="text-4xl font-display font-bold gradient-text mb-8">${result.adjustedPrice} USD</p>
              <div className="space-y-3 text-left mb-6">
                {tradeInLinks.map((l, i) => (
                  <motion.a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                    className="glass-card-glow flex items-center gap-4 group">
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{l.name}</p>
                      <p className="text-xs text-subtle">{l.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-faintest group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </>
          )}

          {result.decision === "recycle" && (
            <>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 gradient-border"
                style={{ background: "linear-gradient(135deg, hsl(153 70% 38% / 0.1), hsl(43 75% 50% / 0.05))" }}>
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <div className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 mb-8 gradient-border"
                style={{ background: "linear-gradient(135deg, hsl(153 70% 38% / 0.08), transparent)" }}>
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">You're keeping {result.co2Saved} lbs of CO₂ out of landfills.</span>
              </div>
              <div className="space-y-3 text-left mb-6">
                {recycleLinks.map((l, i) => (
                  <motion.a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                    className="glass-card-glow flex items-center gap-4 group">
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{l.name}</p>
                      <p className="text-xs text-subtle">{l.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-faintest group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </>
          )}

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card-glow text-center mb-6">
            <p className="text-xs text-subtle mb-1">Environmental Impact</p>
            <p className="text-2xl font-display font-bold gradient-text">{result.co2Saved} lbs</p>
            <p className="text-xs text-subtle">CO₂ kept out of landfills</p>
          </motion.div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScanAnother}
            className="w-full py-3.5 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta gradient-btn relative overflow-hidden flex items-center justify-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2"><RotateCcw className="w-4 h-4" /> Scan Another Device →</span>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default ListingPage;
