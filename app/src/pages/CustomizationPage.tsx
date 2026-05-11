import { useState } from "react";

export default function CustomizationPage() {
  const [selectedColor, setSelectedColor] = useState<string>("#0053db");
  const [density, setDensity] = useState<string>("standard");
  const [toggles, setToggles] = useState({
    glassmorphism: true,
    editorialTypography: true,
    compactSidebar: false,
  });

  const colors = [
    "#0053db",
    "#7c3aed",
    "#059669",
    "#dc2626",
    "#ea580c",
    "#1e293b",
  ];

  const densityOptions = [
    { value: "spacious", label: "Spacious", icon: "view_headline" },
    { value: "standard", label: "Standard", icon: "reorder" },
    { value: "compact", label: "Compact", icon: "view_comfy" },
  ];

  const toggleList = [
    {
      key: "glassmorphism" as const,
      label: "Glassmorphism Effects",
      desc: "Enable backdrop blur on navigation",
    },
    {
      key: "editorialTypography" as const,
      label: "Editorial Typography",
      desc: "Use premium display fonts for headers",
    },
    {
      key: "compactSidebar" as const,
      label: "Compact Sidebar",
      desc: "Collapse navigation by default",
    },
  ];

  return (
    <div className="pt-8 px-12 pb-12 min-h-screen bg-background">
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight mb-2">
          Customization
        </h1>
        <p className="font-body text-on-surface-variant max-w-2xl leading-relaxed">
          Define your organization's digital identity. Adjust tonal logic,
          manage brand assets, and refine the architectural layout of the
          platform.
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Branding Identity */}
        <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-lg font-bold text-on-surface">
              Branding Identity
            </h3>
            <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full uppercase tracking-wider">
              Active Brand
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo Upload */}
            <div className="space-y-4">
              <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Primary Logo
              </label>
              <div className="relative group border-2 border-dashed border-outline-variant/30 rounded-xl p-8 flex flex-col items-center justify-center bg-surface hover:bg-surface-container transition-all cursor-pointer">
                <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    image
                  </span>
                </div>
                <p className="text-sm font-semibold text-primary">
                  Replace Logo
                </p>
                <p className="text-[10px] text-on-surface-variant mt-1">
                  SVG, PNG up to 5MB
                </p>
              </div>
            </div>
            {/* Brand Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Organization Name
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-sm outline-none font-medium"
                  type="text"
                  defaultValue="Atheneum Industries"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Slogan/Identity
                </label>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg px-4 py-3 focus:ring-1 focus:ring-primary transition-all text-sm outline-none font-medium"
                  type="text"
                  defaultValue="Precision Through Architectural Intelligence"
                />
              </div>
            </div>
          </div>

          {/* Tonal Palette */}
          <div className="mt-12">
            <label className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-6 block">
              Tonal Palette (Primary Accent)
            </label>
            <div className="flex flex-wrap gap-4">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-12 h-12 rounded-full border-4 border-white shadow-sm transition-transform hover:scale-110 ${
                    selectedColor === c ? "ring-2 shadow-md" : ""
                  }`}
                  style={{
                    backgroundColor: c,
                    ringColor: selectedColor === c ? c : undefined,
                  }}
                />
              ))}
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-highest border-2 border-dashed border-outline-variant text-outline transition-transform hover:scale-110">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <section className="col-span-12 lg:col-span-4 space-y-8">
          {/* Density Controls */}
          <div className="bg-surface-container-high p-6 rounded-xl">
            <h3 className="font-headline text-md font-bold text-on-surface mb-6">
              Interface Density
            </h3>
            <div className="space-y-4">
              {densityOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg cursor-pointer group hover:bg-white transition-all ${
                    density === opt.value
                      ? "border-2 border-primary"
                      : "border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined ${density === opt.value ? "text-primary" : "text-on-surface-variant"}`}
                    >
                      {opt.icon}
                    </span>
                    <span
                      className={`text-sm font-semibold ${density === opt.value ? "text-primary" : ""}`}
                    >
                      {opt.label}
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="density"
                    checked={density === opt.value}
                    onChange={() => setDensity(opt.value)}
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container">
            <h3 className="font-headline text-md font-bold text-on-surface mb-6">
              Global Features
            </h3>
            <div className="space-y-4">
              {toggleList.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setToggles((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      toggles[item.key]
                        ? "bg-primary"
                        : "bg-surface-container-highest"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 rounded-full transition-all ${
                        toggles[item.key]
                          ? "right-1 bg-white"
                          : "left-1 bg-outline"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Architectural Preview */}
        <section className="col-span-12 bg-surface-container p-8 rounded-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold text-on-surface">
                Architectural Preview
              </h3>
              <p className="text-xs text-on-surface-variant">
                Real-time simulation of branding choices
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-sm font-bold text-on-surface hover:bg-surface-container-highest transition-all rounded-lg">
                Discard Changes
              </button>
              <button className="px-6 py-2 text-sm font-bold bg-primary text-on-primary rounded-lg shadow-lg hover:bg-primary-dim transition-all">
                Publish Identity
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl h-[400px] flex relative">
            {/* Mini SideNav */}
            <div className="w-16 bg-slate-100 flex flex-col items-center py-6 gap-6">
              <div
                className="w-8 h-8 rounded-md"
                style={{ backgroundColor: selectedColor }}
              />
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-8 h-1 bg-slate-300 rounded-full" />
              ))}
            </div>
            {/* Mini Content Area */}
            <div className="flex-1 p-8">
              <div className="h-8 w-48 bg-slate-100 rounded-lg mb-8" />
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 h-48 bg-slate-50 rounded-xl p-4">
                  <div className="h-4 w-full bg-slate-200 rounded mb-3" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded mb-3" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded" />
                  <div className="mt-12 h-16 w-full bg-white rounded-lg shadow-sm border border-slate-100" />
                </div>
                <div className="h-48 bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200" />
                  <div className="h-3 w-20 bg-slate-300 rounded" />
                </div>
              </div>
            </div>
            {/* Glass Popover Preview */}
            <div className="absolute bottom-20 right-20 w-64 p-4 bg-white/85 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                />
                <p className="text-[10px] font-bold uppercase text-on-surface">
                  Glassmorphism Active
                </p>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-tight">
                This floating module demonstrates the glass and gradient logic
                applied to your current theme.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
