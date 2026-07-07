import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [tone, setTone] = useState("Corporate Business Professional");
  const [loading, setLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState("");

  // AI Response mathi Best, Formal, Friendly text ne alag padva mate helper function
  const parseOutput = (text) => {
    if (!text) return null;

    // CHANGED: result object ma default score initial state register kari
    const result = { best: "", formal: "", friendly: "", score: "95" };

    // Simple regex matching for formatting
    const bestMatch = text.match(
      /Best\s*\(Recommended\):([\s\S]*?)(?=Formal:|$)/i,
    );
    const formalMatch = text.match(/Formal:([\s\S]*?)(?=Friendly:|$)/i);
    const friendlyMatch = text.match(/Friendly:([\s\S]*?)(?=Score:|$)/i);

    // CHANGED: Score update regex logic capture criteria framework
    const scoreMatch = text.match(/Score:\s*(\d+)/i);

    if (bestMatch) result.best = bestMatch[1].trim();
    if (formalMatch) result.formal = formalMatch[1].trim();
    if (friendlyMatch) result.friendly = friendlyMatch[1].trim();
    if (scoreMatch) result.score = scoreMatch[1].trim();

    // Fallback agar AI exact format na aape to raw text standard block ma dekhay
    if (!result.best && !result.formal && !result.friendly) {
      result.best = text;
    }

    return result;
  };

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setCopiedSection("");
    try {
      // App.js ni andar change karo:
      const response = await axios.post("http://localhost:5000/api/transform", {
        text: inputText,
        tone: tone,
      });
      setOutputText(response.data.result);
    } catch (error) {
      console.error("Error transforming text:", error);
      setOutputText("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSection(type);
    setTimeout(() => setCopiedSection(""), 2000);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const parsedVersions = parseOutput(outputText);

  // CHANGED: Dynamic color palette configuration matrix for Score Badge
  const getScoreColor = (score) => {
    const num = parseInt(score, 10);
    if (num >= 90) return "text-emerald-700 bg-emerald-50 border-emerald-100";
    if (num >= 75) return "text-amber-700 bg-amber-50 border-amber-100";
    return "text-rose-700 bg-rose-50 border-rose-100";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-blue-100">
      {/* Header */}
      {/* Premium SaaS Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        {/* Top Gradient Border */}
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 ring-4 ring-blue-50 transition duration-300 hover:scale-105">
              SAI
            </div>
            {/* Brand Name */}
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight">
                <span className="text-slate-900">Suvakya</span>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="mt-0.5 text-xs italic tracking-widest text-slate-500">
                वाक्यं परिष्कृतम्
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* AI Status */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                AI Ready
              </span>
            </div>
            {/* CHANGED: Engine Badge converted to an Interactive Anchor Tag */}
            <a
              href="https://vatavaranam-ai.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-indigo-100 bg-gradient-to-r from-indigo-50/60 via-blue-50/60 to-violet-50/60 px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-100/50 hover:via-blue-100/50 hover:to-violet-100/50 cursor-pointer text-left"
            >
              <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                ⚡
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  Powered by
                </span>
                <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-colors">
                  Vatavaranam AI
                </span>
              </div>
              {/* Minimal indicator arrow added for advanced SaaS micro-interaction */}
              <span className="text-[10px] text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 ml-0.5">
                ➔
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Title Section */}
      <main className="max-w-6xl w-full mx-auto p-4 md:p-6 flex-grow flex flex-col justify-center">
        <div className="text-center mb-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Refining Words • Perfecting Impact
          </span>
          <h2 className="text-4xl font-black text-slate-900 tracking-normal sm:text-5xl bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent mt-3 font-serif leading-tight py-0">
            तव वचः, सुवाक्यम् करोतु
          </h2>
        </div>

        {/* Dynamic Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          {/* Left Side - Input Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100 flex flex-col relative h-fit">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700 tracking-wide">
                Your Raw Text (Home words / Tutelu English)
              </label>
              {inputText && (
                <button
                  onClick={() => setInputText("")}
                  className="text-xs text-slate-400 hover:text-red-500 font-medium transition cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            <textarea
              className="w-full h-64 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none transition text-slate-700 placeholder:text-slate-400 leading-relaxed text-base"
              placeholder="e.g., 'i not coming to office today because stomach bad request for leave'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="mt-2 flex justify-between items-center text-xs text-slate-400 font-medium px-1">
              <span>
                {inputText.length} chars | {wordCount} words
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-56">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm font-medium bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="Corporate Business Professional">
                    💼 Corporate Business
                  </option>
                  <option value="Super Polite and Friendly">
                    🌸 Polite & Warm
                  </option>
                  <option value="Casual but Clean English">
                    ☕ Casual but Correct
                  </option>
                  <option value="Persuasive Sales Pitch">
                    🔥 Persuasive / Sales
                  </option>
                </select>
              </div>

              <button
                onClick={handleTransform}
                disabled={loading || !inputText.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md shadow-blue-200 cursor-pointer text-sm"
              >
                {loading ? "Polishing..." : "Make Professional ✨"}
              </button>
            </div>
          </div>

          {/* Right Side - Refactored 3-Version Output Cards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100 flex flex-col justify-between min-h-[380px]">
            {/* CHANGED: Label Section Header flex layout dynamic badge addition */}
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-slate-700 tracking-wide block">
                Polished Results
              </label>
              {outputText && parsedVersions && (
                <div
                  className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs transition-all duration-300 ${getScoreColor(parsedVersions.score)}`}
                >
                  🎯 Accuracy Rank: {parsedVersions.score}/100
                </div>
              )}
            </div>

            {outputText ? (
              <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                {/* 1. BEST CARD */}
                {parsedVersions?.best && (
                  <div className="border border-blue-100 bg-blue-50/40 p-4 rounded-xl relative group transition hover:bg-blue-50/70">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                        🌟 Best (Recommended)
                      </span>
                      <button
                        onClick={() => handleCopy(parsedVersions.best, "best")}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded transition ${
                          copiedSection === "best"
                            ? "bg-green-600 text-white"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        {copiedSection === "best" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="text-slate-800 text-sm font-medium leading-relaxed select-all">
                      {parsedVersions.best}
                    </p>
                  </div>
                )}

                {/* 2. FORMAL CARD */}
                {parsedVersions?.formal && (
                  <div className="border border-slate-200 bg-slate-50/60 p-4 rounded-xl relative group transition hover:bg-slate-50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        💼 Formal Style
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(parsedVersions.formal, "formal")
                        }
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded transition ${
                          copiedSection === "formal"
                            ? "bg-green-600 text-white"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {copiedSection === "formal" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed select-all">
                      {parsedVersions.formal}
                    </p>
                  </div>
                )}

                {/* 3. FRIENDLY CARD */}
                {parsedVersions?.friendly && (
                  <div className="border border-emerald-100 bg-emerald-50/20 p-4 rounded-xl relative group transition hover:bg-emerald-50/40">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        🤝 Friendly Style
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(parsedVersions.friendly, "friendly")
                        }
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded transition ${
                          copiedSection === "friendly"
                            ? "bg-green-600 text-white"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        }`}
                      >
                        {copiedSection === "friendly" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed select-all">
                      {parsedVersions.friendly}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-grow border border-dashed border-slate-200 rounded-xl text-slate-400 italic flex flex-col items-center justify-center text-center p-8 select-none">
                <span className="text-3xl mb-2">✍️</span>
                <span className="text-sm">
                  Enter your raw text and hit submit to generate beautiful
                  variations.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 🚀 Next-Gen Enterprise Advanced Footer - Clean & Connected */}
      <footer className="mt-20 bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 px-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Top Grid Layer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1: Brand Pitch & Meta Description */}
            <div className="md:col-span-7 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <span className="text-white text-xs font-black tracking-tighter">
                    S.
                  </span>
                </div>
                <h3 className="text-base font-black tracking-tight text-white">
                  Suvakya<span className="text-blue-500">AI</span>
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                An intelligent natural language refinement platform engineered
                to transform raw thoughts, broken phrasing, and structural
                dialects into high-impact professional English.
              </p>
              <div className="font-serif italic text-xs text-slate-500 tracking-wide mt-1">
                संस्कृता वाक् પ્રસુયતે — Perfecting impact, one word at a time.
              </div>
            </div>

            {/* Col 2: Network Infrastructure & Live Ecosystem Link */}
            <div className="md:col-span-5 flex flex-col justify-center md:items-end">
              <div className="w-full max-w-xs">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 md:text-right">
                  Ecosystem Network
                </h4>
                <a
                  href="https://vatavaranam-ai.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 rounded-xl p-3 shadow-sm transition-all duration-200 cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                      Launch Vatavaranam AI
                    </span>
                  </div>
                  <span className="text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 text-xs">
                    ➔
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Base Alignment Copyright & Developer Identity */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                &copy; 2026 Suvakya AI. Universal Interface Node.
              </p>
            </div>

            {/* 🛠️ Ultra-Premium Interactive Developer Identity */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-xs font-medium text-slate-500">
              {/* Active Dev Status Pulse Tag */}
              <div className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 rounded-full px-2.5 py-1 shadow-2xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Dev Node Active
                </span>
              </div>

              {/* Main Link Text */}
              <div className="flex items-center gap-1">
                <span className="text-slate-400">
                  Engineered & Maintained by
                </span>
                <a
                  href="https://darshanraval.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block font-black text-white hover:text-blue-400 transition-colors duration-200 px-1 py-0.5 rounded group cursor-pointer"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-400 transition-all font-black uppercase tracking-wide">
                    DARSHAN RAVAL
                  </span>
                  {/* Dynamic Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;