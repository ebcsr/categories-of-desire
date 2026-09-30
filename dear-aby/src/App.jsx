import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, Lock, FileText, ArrowRight, Sparkles, 
  Eye, EyeOff, ShieldAlert, Film, Scroll, BookOpen, Quote, Award 
} from 'lucide-react';

const NO_BUTTON_TEXTS = [
  "NO",
  "Are you sure?",
  "Wrong path.",
  "Nice try!",
  "Access Denied ⚔️",
  "Try the gold button!",
  "Dili jud pwedeng NO!"
];

// Absolute positioned corner stars inside relative cards
const CornerFlourish = () => (
  <>
    <div className="absolute top-3 left-3 text-medieval-gold text-sm select-none pointer-events-none">✦</div>
    <div className="absolute top-3 right-3 text-medieval-gold text-sm select-none pointer-events-none">✦</div>
    <div className="absolute bottom-3 left-3 text-medieval-gold text-sm select-none pointer-events-none">✦</div>
    <div className="absolute bottom-3 right-3 text-medieval-gold text-sm select-none pointer-events-none">✦</div>
  </>
);

export default function App() {
  const [step, setStep] = useState(1); // 1 to 6 steps

  // Step 1 State
  const [surveyData, setSurveyData] = useState({
    name: '',
    age: '',
    occupation: 'Student',
    degree: '',
    yearLevel: '',
    consent: false
  });

  // Step 2 State
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Step 4 State
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0, isEvaded: false });
  const [attemptCount, setAttemptCount] = useState(0);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const cleanInput = password.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanInput === "spiderman") {
      setPasswordError(false);
      setStep(3);
    } else {
      setPasswordError(true);
    }
  };

  const handleEvade = (e) => {
    if (e) e.preventDefault();
    const maxOffset = 90;
    const randomX = (Math.random() - 0.5) * (maxOffset * 2);
    const randomY = (Math.random() - 0.5) * (maxOffset * 1.5);

    setNoButtonPos({ x: randomX, y: randomY, isEvaded: true });
    setAttemptCount((prev) => (prev + 1) % NO_BUTTON_TEXTS.length);
  };

  const handleYes = () => {
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#8B261D', '#B08A45', '#2A1E17', '#E5D8C0']
    });
    setStep(5);
  };

  return (
    <div className="min-h-screen w-full bg-medieval-vellum text-medieval-timber font-serif flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-x-hidden">
      
      {/* Background Dot Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#8B261D_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Progress Tracker (6 Steps) */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 bg-medieval-sandstone/90 backdrop-blur-md px-4 py-2 rounded-full border border-medieval-gold/40 shadow-sm">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              step === i 
                ? 'w-6 bg-medieval-brick' 
                : step > i 
                  ? 'w-2 bg-medieval-gold' 
                  : 'w-2 bg-medieval-stone/30'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: SURVEY */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-xl medieval-card p-6 sm:p-8 rounded-xl shadow-2xl my-auto text-left"
          >
            <CornerFlourish />

            <div className="flex items-center justify-between border-b-2 border-medieval-brick/20 pb-3 mb-5">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-medieval-brick bg-medieval-brick/10 px-2.5 py-1 rounded flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Social Science 191
              </span>
              <span className="text-xs text-medieval-stone font-sans">Page 1 of 1</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold leading-snug mb-3">
              Categories of Desire: Understanding Lacan's Subjective Destitution through Subject-Object Categorical Distribution
            </h1>

            <div className="bg-medieval-vellum/80 border-l-4 border-medieval-brick p-3.5 rounded text-xs text-medieval-stone leading-relaxed mb-6 space-y-1.5">
              <p>
                Have you ever had desires? How well do you cling to the guarantees and satisfaction that these desires may give you?
              </p>
              <p className="font-semibold text-medieval-brick">
                * Data submitted will be used solely for Quantitative Methods in Anthropology.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4 font-sans text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-medieval-timber mb-1">
                  Full Name <span className="text-medieval-brick">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter full name..."
                  value={surveyData.name}
                  onChange={(e) => setSurveyData({ ...surveyData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-medieval-vellum border border-medieval-stone/30 text-medieval-timber focus:outline-none focus:ring-2 focus:ring-medieval-brick/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-medieval-timber mb-1">
                    Age <span className="text-medieval-brick">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="Age"
                    value={surveyData.age}
                    onChange={(e) => setSurveyData({ ...surveyData, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-medieval-vellum border border-medieval-stone/30 text-medieval-timber focus:outline-none focus:ring-2 focus:ring-medieval-brick/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-medieval-timber mb-1">
                    Occupation <span className="text-medieval-brick">*</span>
                  </label>
                  <select
                    value={surveyData.occupation}
                    onChange={(e) => setSurveyData({ ...surveyData, occupation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-medieval-vellum border border-medieval-stone/30 text-medieval-timber focus:outline-none focus:ring-2 focus:ring-medieval-brick/40"
                  >
                    <option value="Student">Student</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>
              </div>

              {surveyData.occupation === 'Student' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-medieval-timber mb-1">
                      Degree Program
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BS Anthropology"
                      value={surveyData.degree}
                      onChange={(e) => setSurveyData({ ...surveyData, degree: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-medieval-vellum border border-medieval-stone/30 text-medieval-timber focus:outline-none focus:ring-2 focus:ring-medieval-brick/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-medieval-timber mb-1">
                      Year Level
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 3rd Year"
                      value={surveyData.yearLevel}
                      onChange={(e) => setSurveyData({ ...surveyData, yearLevel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-medieval-vellum border border-medieval-stone/30 text-medieval-timber focus:outline-none focus:ring-2 focus:ring-medieval-brick/40"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5 bg-medieval-vellum/60 p-3 rounded border border-medieval-stone/20">
                <input
                  required
                  type="checkbox"
                  id="consent"
                  checked={surveyData.consent}
                  onChange={(e) => setSurveyData({ ...surveyData, consent: e.target.checked })}
                  className="mt-0.5 w-4 h-4 accent-medieval-brick cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs font-medium leading-snug cursor-pointer select-none">
                  I consent to answering this research survey form.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-medieval-stone hover:bg-medieval-timber text-medieval-vellum font-bold rounded shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Submit Response <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 2: PASSWORD GATE */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative w-full max-w-md medieval-card p-6 sm:p-8 rounded-xl shadow-2xl text-center my-auto ${
              passwordError ? "animate-shake" : ""
            }`}
          >
            <CornerFlourish />

            <div className="w-12 h-12 bg-medieval-brick text-medieval-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-md border-2 border-medieval-gold">
              <Lock className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold mb-1">dear aby</h2>
            <p className="text-xs text-medieval-stone italic mb-5">
              To reveal the real output behind this survey, please enter password:
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="text-left bg-medieval-vellum p-3.5 rounded border-l-4 border-medieval-gold shadow-sm text-xs">
                <span className="font-bold font-sans text-medieval-brick flex items-center gap-1 uppercase tracking-wide">
                  <BookOpen className="w-3.5 h-3.5" /> Password Hint:
                </span>
                <p className="italic text-medieval-timber text-sm font-semibold pt-1">
                  "Main character in the first movie we watched together"
                </p>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-10 rounded bg-medieval-vellum border border-medieval-stone/40 text-center font-bold text-medieval-timber focus:outline-none focus:border-medieval-brick"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-medieval-stone hover:text-medieval-brick p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-medieval-brick font-bold bg-medieval-brick/10 py-2 rounded">
                  <ShieldAlert className="w-4 h-4" /> Incorrect answer! Try again. 😊
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-medieval-gold hover:bg-medieval-gold-light text-medieval-timber font-bold rounded shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                Unlock Content <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: LETTER */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-lg medieval-card medieval-gold-border p-6 sm:p-9 rounded-xl shadow-2xl my-auto text-left"
          >
            <CornerFlourish />

            <div className="flex items-center justify-between border-b-2 border-medieval-brick/20 pb-3 mb-5">
              <h2 className="text-3xl font-bold text-medieval-brick">dear tep</h2>
              <Quote className="w-7 h-7 text-medieval-gold/60" />
            </div>

            <div className="space-y-4 text-base leading-relaxed text-medieval-timber italic bg-medieval-vellum p-5 rounded border border-medieval-stone/20 shadow-inner">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-medieval-brick first-letter:float-left first-letter:mr-2">
                Remember when we watched <strong className="text-medieval-brick not-italic font-bold">Spiderman: Brand New Day</strong>? That was just the beginning of so many memorable moments with you.
              </p>
              <p>
                This website isn't actually for Social Science 191... I built this especially for you.
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-xs text-medieval-stone italic font-semibold">— Migz</span>

              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 bg-medieval-brick hover:bg-medieval-brick-hover text-medieval-vellum font-bold rounded shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                Continue <ArrowRight className="w-4 h-4 text-medieval-gold" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: PROPOSAL PAGE */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md medieval-card p-6 sm:p-8 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center my-auto"
          >
            <CornerFlourish />

            <div className="my-2 space-y-2">
              <span className="text-[11px] font-sans uppercase tracking-widest text-medieval-brick font-bold bg-medieval-brick/10 px-3 py-1 rounded-full border border-medieval-brick/20">
                Francis Miguel Plaza
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-medieval-timber pt-2">
                dear aby
              </h1>
              <p className="text-xl sm:text-2xl italic font-bold text-medieval-brick pt-1">
                "May I court you?"
              </p>
            </div>

            {/* Action Buttons Area */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[100px] w-full relative">
              
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="w-40 py-3 px-5 bg-medieval-gold hover:bg-medieval-gold-light text-medieval-timber font-bold rounded-lg shadow-lg border-2 border-medieval-timber flex items-center justify-center gap-2 z-10 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-medieval-brick text-medieval-brick animate-bounce" />
                <span className="text-lg">YES!</span>
              </motion.button>

              {/* EVADING NO BUTTON */}
              <motion.button
                animate={
                  noButtonPos.isEvaded
                    ? { x: noButtonPos.x, y: noButtonPos.y }
                    : { x: 0, y: 0 }
                }
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                onMouseEnter={handleEvade}
                onTouchStart={handleEvade}
                onClick={handleEvade}
                className="w-40 py-3 px-3 bg-medieval-stone hover:bg-medieval-timber text-medieval-vellum font-sans font-semibold rounded-lg shadow-md border border-medieval-timber z-20 text-xs cursor-pointer touch-none select-none"
              >
                {NO_BUTTON_TEXTS[attemptCount]}
              </motion.button>
            </div>

            <p className="text-[11px] text-medieval-stone opacity-75 mt-6 italic">
              * Option selection is fortified. Only one true path forward exists.
            </p>
          </motion.div>
        )}

        {/* STEP 5: VISION BOARD */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-2xl medieval-card rounded-xl p-6 sm:p-9 shadow-2xl text-center my-auto"
          >
            <CornerFlourish />

            <div className="inline-flex items-center gap-1.5 bg-medieval-brick text-medieval-vellum px-3.5 py-1 rounded-full text-xs font-sans font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-medieval-gold" /> Permission Granted
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-medieval-timber">dear aby</h1>
            <p className="text-medieval-brick italic text-base sm:text-lg mb-6 font-semibold">
              Our Next Chapter Begins
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
              <div className="bg-medieval-vellum p-4 rounded-lg border-t-4 border-medieval-gold shadow border-x border-b border-medieval-stone/20">
                <div className="flex items-center justify-between text-medieval-brick font-bold text-xs mb-1.5 font-sans">
                  <span className="flex items-center gap-1"><Film className="w-3.5 h-3.5" /> Date Memory</span>
                  <span className="bg-medieval-gold/20 px-1.5 py-0.5 rounded text-medieval-timber text-[10px]">#1</span>
                </div>
                <h3 className="font-bold text-base text-medieval-timber">Spiderman: Brand New Day</h3>
                <p className="text-xs text-medieval-stone mt-1.5 leading-relaxed">
                  That's the first movie we watched together. A classic memory that started it all.
                </p>
              </div>

              <div className="bg-medieval-vellum p-4 rounded-lg border-t-4 border-medieval-brick shadow border-x border-b border-medieval-stone/20">
                <div className="flex items-center justify-between text-medieval-brick font-bold text-xs mb-1.5 font-sans">
                  <span className="flex items-center gap-1"><Scroll className="w-3.5 h-3.5" /> Message</span>
                  <span className="bg-medieval-brick/20 px-1.5 py-0.5 rounded text-medieval-brick text-[10px]">Dear Tep</span>
                </div>
                <p className="text-xs text-medieval-timber italic leading-relaxed pt-1">
                  "lorem ipsum lorem ipsum message lorem ipsum lorem ipsum message lorem ipsum lorem ipsum message lorem ipsum lorem ipsum message lorem ipsum lorem ipsum message lorem ipsum lorem ipsum message"
                </p>
                <div className="text-right text-xs font-bold text-medieval-brick mt-2">— migz</div>
              </div>
            </div>

            <button
              onClick={() => setStep(6)}
              className="px-5 py-2.5 bg-medieval-stone hover:bg-medieval-timber text-medieval-vellum font-sans font-bold text-xs rounded shadow transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              Next Page <ArrowRight className="w-4 h-4 text-medieval-gold" />
            </button>
          </motion.div>
        )}

        {/* STEP 6: CREDITS PAGE */}
        {step === 6 && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full max-w-md medieval-card rounded-xl p-6 sm:p-8 shadow-2xl text-center my-auto"
          >
            <CornerFlourish />

            <div className="w-12 h-12 bg-medieval-brick text-medieval-gold rounded-full flex items-center justify-center mx-auto mb-3 shadow-md border-2 border-medieval-gold">
              <Award className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold text-medieval-timber mb-1">bai di si miggy nagimo ani haha</h2>

            <div className="bg-medieval-vellum p-5 rounded-lg border border-medieval-stone/20 shadow-inner space-y-3 font-sans">
              {/* <div className="border-b border-medieval-stone/20 pb-3">
                <span className="text-[10px] text-medieval-stone uppercase font-bold tracking-wider block">Client</span>
                <p className="font-bold text-medieval-brick text-base font-serif">Francis Miguel Plaza</p>
              </div> */}

              <div>
                {/* <span className="text-[10px] text-medieval-stone uppercase font-bold tracking-wider block mb-1">Developer Note</span> */}
                <p className="italic opacity-75 text-medieval-timber font-medium text-xs">
                  stay in love
                  <p>
                  from your dev: Ed Ian Jay Baguio
                </p>
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep(5)}
              className="mt-6 px-4 py-2 bg-medieval-stone/20 hover:bg-medieval-stone/30 text-medieval-timber font-sans text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              ← Back to Memories
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}