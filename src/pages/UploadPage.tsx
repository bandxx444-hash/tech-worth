import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Image, Video, ArrowLeft, Check, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import ProgressBar from "@/components/ProgressBar";
import { useScan } from "@/context/ScanContext";
import { simulateAIDiagnostics } from "@/lib/mock-ai";

const UploadPage = () => {
  const navigate = useNavigate();
  const { files, setFiles, setDiagnostics } = useScan();
  const [tab, setTab] = useState<"photos" | "video">("photos");
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handlePhotoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    setFiles([...files, ...dropped]);
  }, [files, setFiles]);

  const handlePhotoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]);
  }, [files, setFiles]);

  const handleVideoSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setVideoFile(e.target.files[0]);
      setFiles([e.target.files[0]]);
    }
  }, [setFiles]);

  const handleContinue = () => {
    setDiagnostics(simulateAIDiagnostics());
    navigate("/diagnostics");
  };

  const hasMedia = tab === "photos" ? files.length > 0 : !!videoFile;
  const mediaCount = tab === "photos" ? files.length : (videoFile ? 1 : 0);

  return (
    <div className="min-h-screen relative">
      <BackgroundOrbs />
      <Navbar />
      <main className="container mx-auto px-4 max-w-2xl relative z-10 pt-8 pb-20 font-sans">
        <ProgressBar percent={10} />

        <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-subtle mt-6 mb-4 hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-center mb-8 animate-fade-in-up">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-primary mb-3 block font-sans">Step 1 of 4</span>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 gradient-border"
            style={{ background: "linear-gradient(135deg, hsl(153 70% 38% / 0.1), hsl(43 75% 50% / 0.05))" }}>
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-[36px] font-display font-bold mb-2">Upload Your Device</h2>
          <p className="text-subtle text-sm max-w-md mx-auto">Show us your device from multiple angles for the most accurate valuation.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1 mb-6 max-w-xs mx-auto" style={{ background: "hsl(220 15% 13%)" }}>
          {(["photos", "video"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === t ? "bg-secondary text-foreground shadow-sm" : "text-subtle hover:text-foreground"
              }`}
            >
              {t === "photos" ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {t === "photos" ? "Photos" : "Video"}
            </button>
          ))}
        </div>

        {/* Upload zone */}
        {tab === "photos" ? (
          <div>
            <div
              className="border border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/40 transition-all duration-300"
              style={{ background: "linear-gradient(145deg, hsl(220 18% 11%), hsl(220 18% 9%))" }}
              onDragOver={e => e.preventDefault()} onDrop={handlePhotoDrop} onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Drop photos here or click to browse</p>
              <p className="text-xs text-faintest">JPG, PNG, WEBP · Multiple files accepted</p>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoSelect} />
            </div>
            {files.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {files.map((f, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border">
                    <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div
              className="border border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-primary/40 transition-all duration-300"
              style={{ background: "linear-gradient(145deg, hsl(220 18% 11%), hsl(220 18% 9%))" }}
              onClick={() => videoRef.current?.click()}
            >
              <Video className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">Drop a video or click to browse</p>
              <p className="text-xs text-faintest">MP4, MOV, AVI · Single file</p>
              <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
            </div>
            {videoFile && (
              <div className="mt-4 rounded-xl overflow-hidden border border-border">
                <video src={URL.createObjectURL(videoFile)} controls className="w-full max-h-64 object-contain" />
              </div>
            )}
          </div>
        )}

        {hasMedia && (
          <div className="mt-6 animate-fade-in-up">
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 mb-4 gradient-border"
              style={{ background: "linear-gradient(135deg, hsl(153 70% 38% / 0.08), hsl(43 75% 50% / 0.04))" }}>
              <Check className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {mediaCount} {tab === "photos" ? "image(s)" : "video"} ready · AI will auto-identify your device
              </span>
            </div>
            <button onClick={handleContinue}
              className="w-full py-3.5 rounded-xl font-bold text-[15px] text-primary-foreground shadow-cta transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, hsl(153 70% 38%), hsl(153 70% 28%))" }}>
              Continue — AI will auto-fill details →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UploadPage;
