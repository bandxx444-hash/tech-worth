import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ProgressBar from "@/components/ProgressBar";
import { useScan } from "@/context/ScanContext";

const DiagnosticsPage = () => {
  const navigate = useNavigate();
  const { diagnostics, setDiagnostics } = useScan();
  const [form, setForm] = useState(diagnostics);

  const confident = Object.entries(form.aiConfidence).filter(([, v]) => v);
  const uncertain = Object.entries(form.aiConfidence).filter(([, v]) => !v);
  const allConfident = uncertain.length === 0;

  const update = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setDiagnostics(form);
    navigate("/loading");
  };

  const fieldLabel = (key: string) => {
    const map: Record<string, string> = {
      productName: "Product Name",
      brand: "Brand",
      modelNumber: "Model Number",
      yearOfPurchase: "Year of Purchase",
      powersOn: "Does the device power on?",
      screenCondition: "Screen Condition",
    };
    return map[key] || key;
  };

  const isUncertain = (key: string) => form.aiConfidence[key] === false;

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-2xl relative z-10 pt-8 pb-20">
        <ProgressBar percent={35} />

        <button onClick={() => navigate("/upload")} className="flex items-center gap-1.5 text-sm text-subtle mt-6 mb-4 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center mb-6 animate-fade-in-up">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-primary mb-2 block">Step 2 of 4</span>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-[34px] font-extrabold mb-2">Device Diagnostics</h2>
        </div>

        {/* AI confidence banner */}
        {allConfident ? (
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-6 animate-fade-in-up">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI identified all fields from your media</span>
          </div>
        ) : (
          <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 mb-6 animate-fade-in-up">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <span className="text-primary font-medium">AI filled in {confident.length} field(s) automatically.</span>{" "}
              <span className="text-accent font-medium">{uncertain.length} field(s) couldn't be determined — please complete them below.</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="glass-card animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                {fieldLabel("productName")}
                {isUncertain("productName") && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
              </label>
              <input
                value={form.productName}
                onChange={e => update("productName", e.target.value)}
                placeholder="e.g. iPhone 12"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-card text-foreground placeholder:text-faintest focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                {fieldLabel("brand")}
                {isUncertain("brand") && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
              </label>
              <input
                value={form.brand}
                onChange={e => update("brand", e.target.value)}
                placeholder="e.g. Apple"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-card text-foreground placeholder:text-faintest focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Model Number */}
            <div>
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                {fieldLabel("modelNumber")} <span className="text-faintest font-normal">(optional)</span>
                {isUncertain("modelNumber") && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
              </label>
              <input
                value={form.modelNumber}
                onChange={e => update("modelNumber", e.target.value)}
                placeholder="e.g. A2172"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-card text-foreground placeholder:text-faintest focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Year */}
            <div>
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                {fieldLabel("yearOfPurchase")}
                {isUncertain("yearOfPurchase") && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
              </label>
              <input
                type="number"
                value={form.yearOfPurchase}
                onChange={e => update("yearOfPurchase", parseInt(e.target.value))}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            {/* Powers On */}
            <div>
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-2">
                {fieldLabel("powersOn")}
                {isUncertain("powersOn") && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
              </label>
              <div className="flex gap-3">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => update("powersOn", val)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      form.powersOn === val
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-subtle hover:border-primary/30"
                    }`}
                  >
                    {val ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>

            {/* Screen Condition */}
            <div>
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-1.5">
                {fieldLabel("screenCondition")}
                {isUncertain("screenCondition") && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
              </label>
              <select
                value={form.screenCondition}
                onChange={e => update("screenCondition", e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select condition…</option>
                <option value="Flawless">Flawless</option>
                <option value="Minor Scratches">Minor Scratches</option>
                <option value="Cracked">Cracked</option>
                <option value="Screen is off/broken">Screen is off/broken</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-8 py-3.5 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0F8A5F, #0a6b49)" }}
          >
            Run AI Analysis →
          </button>
        </div>
      </main>
    </div>
  );
};

export default DiagnosticsPage;
