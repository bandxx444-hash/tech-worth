import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "My Dashboard", to: "/dashboard" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 h-[68px] shadow-nav flex items-center px-6"
      style={{ background: "linear-gradient(90deg, #0a6b49, #0F8A5F, #12a070)" }}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
            ♻️
          </div>
          <span className="text-[22px] font-extrabold" style={{ color: "white" }}>EcoLens</span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-[rgba(255,255,255,0.15)]"
                  : "hover:bg-[rgba(255,255,255,0.15)]"
              }`}
              style={{ color: location.pathname === link.to ? "white" : "rgba(255,255,255,0.85)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/scan"
          className="px-5 py-2 rounded-[20px] text-sm font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "white",
            color: "#0F8A5F",
          }}
        >
          Start Scan
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
