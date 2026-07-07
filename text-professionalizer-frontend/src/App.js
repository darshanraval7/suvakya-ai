import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [tone, setTone] = useState('Corporate Business Professional');
  const [loading, setLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState('');

  // AI Response mathi Best, Formal, Friendly text ne alag padva mate helper function
  const parseOutput = (text) => {
    if (!text) return null;
    
    const result = { best: '', formal: '', friendly: '' };
    
    // Simple regex matching for formatting
    const bestMatch = text.match(/Best\s*\(Recommended\):([\s\S]*?)(?=Formal:|$)/i);
    const formalMatch = text.match(/Formal:([\s\S]*?)(?=Friendly:|$)/i);
    const friendlyMatch = text.match(/Friendly:([\s\S]*?)$/i);

    if (bestMatch) result.best = bestMatch[1].trim();
    if (formalMatch) result.formal = formalMatch[1].trim();
    if (friendlyMatch) result.friendly = friendlyMatch[1].trim();

    // Fallback agar AI exact format na aape to raw text standard block ma dekhay
    if (!result.best && !result.formal && !result.friendly) {
      result.best = text;
    }

    return result;
  };

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setCopiedSection('');
    try {
      // App.js ni andar change karo:
      const response = await axios.post('https://suvakya-ai-backend.onrender.com/api/transform', {
        text: inputText,
        tone: tone
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
    setTimeout(() => setCopiedSection(''), 2000);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const parsedVersions = parseOutput(outputText);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Suvakya
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {" "}AI
          </span>
        </h1>

        <p className="text-xs italic tracking-wide text-slate-500">
          संस्कृता वाक् प्रसूयते
        </p>
      </div>
          </div>
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100 shadow-xs">
            ⚡ Powered by Vatavaranam AI
          </span>
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
                  onClick={() => setInputText('')}
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
              <span>{inputText.length} chars | {wordCount} words</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-56">
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm font-medium bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition cursor-pointer"
                >
                  <option value="Corporate Business Professional">💼 Corporate Business</option>
                  <option value="Super Polite and Friendly">🌸 Polite & Warm</option>
                  <option value="Casual but Clean English">☕ Casual but Correct</option>
                  <option value="Persuasive Sales Pitch">🔥 Persuasive / Sales</option>
                </select>
              </div>
              
              <button
                onClick={handleTransform}
                disabled={loading || !inputText.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md shadow-blue-200 cursor-pointer text-sm"
              >
                {loading ? 'Polishing...' : 'Make Professional ✨'}
              </button>
            </div>
          </div>

          {/* Right Side - Refactored 3-Version Output Cards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-100 flex flex-col justify-between min-h-[380px]">
            <label className="text-sm font-semibold text-slate-700 tracking-wide mb-3 block">
              Polished Results
            </label>

            {outputText ? (
              <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                {/* 1. BEST CARD */}
                {parsedVersions?.best && (
                  <div className="border border-blue-100 bg-blue-50/40 p-4 rounded-xl relative group transition hover:bg-blue-50/70">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">🌟 Best (Recommended)</span>
                      <button 
                        onClick={() => handleCopy(parsedVersions.best, 'best')}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded transition ${
                          copiedSection === 'best' ? 'bg-green-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {copiedSection === 'best' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-slate-800 text-sm font-medium leading-relaxed select-all">{parsedVersions.best}</p>
                  </div>
                )}

                {/* 2. FORMAL CARD */}
                {parsedVersions?.formal && (
                  <div className="border border-slate-200 bg-slate-50/60 p-4 rounded-xl relative group transition hover:bg-slate-50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">💼 Formal Style</span>
                      <button 
                        onClick={() => handleCopy(parsedVersions.formal, 'formal')}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded transition ${
                          copiedSection === 'formal' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {copiedSection === 'formal' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed select-all">{parsedVersions.formal}</p>
                  </div>
                )}

                {/* 3. FRIENDLY CARD */}
                {parsedVersions?.friendly && (
                  <div className="border border-emerald-100 bg-emerald-50/20 p-4 rounded-xl relative group transition hover:bg-emerald-50/40">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">🤝 Friendly Style</span>
                      <button 
                        onClick={() => handleCopy(parsedVersions.friendly, 'friendly')}
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded transition ${
                          copiedSection === 'friendly' ? 'bg-green-600 text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        }`}
                      >
                        {copiedSection === 'friendly' ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed select-all">{parsedVersions.friendly}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-grow border border-dashed border-slate-200 rounded-xl text-slate-400 italic flex flex-col items-center justify-center text-center p-8 select-none">
                <span className="text-3xl mb-2">✍️</span>
                <span className="text-sm">Enter your raw text and hit submit to generate beautiful variations.</span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-slate-200/60 text-xs font-medium text-slate-400 bg-white">
        &copy; 2026 Suvakya AI. Crafted beautifully for professional communication.
      </footer>
    </div>
  );
}

export default App;