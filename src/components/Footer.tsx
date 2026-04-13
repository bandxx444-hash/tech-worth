import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative z-10 mt-20 border-t border-border">
    <div className="container mx-auto px-4 max-w-5xl py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center gradient-border"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))" }}>
            <Leaf className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-lg font-display font-bold text-foreground">EcoLens</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 text-sm font-sans">
          <Link to="/" className="text-subtle hover:text-foreground transition-colors">Home</Link>
          <Link to="/how-it-works" className="text-subtle hover:text-foreground transition-colors">How It Works</Link>
          <Link to="/upload" className="text-subtle hover:text-foreground transition-colors">Start Scan</Link>
          <Link to="/dashboard" className="text-subtle hover:text-foreground transition-colors">Dashboard</Link>
        </div>

        {/* Tagline */}
        <p className="text-xs text-faintest font-sans">
          Built for a greener future.
        </p>
      </div>

      {/* Bottom gradient line */}
      <div className="section-divider mt-8 mb-4" />
      <p className="text-center text-[11px] text-faintest font-sans">
        EcoLens 2026. Reduce, Reuse, Resell.
      </p>
    </div>
  </footer>
);

export default Footer;
