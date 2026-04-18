import Marquee from "../components/Marquee";
import { useNavigate } from "@tanstack/react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate({ to: "/form" });
  };

  const ArrowRightSVG = () => (
    <svg className="w-8 h-8 ml-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  );

  return (
    <div className="min-h-screen bg-black text-white font-space flex flex-col selection:bg-[#E5FF00] selection:text-black">
      {/* Navbar area */}
      <nav className="w-full flex justify-between items-center p-6 border-b-4 border-white">
        <div className="font-black text-2xl uppercase tracking-tighter">AI Job Copilot</div>
        <div className="hidden md:flex gap-4 items-center">
          <div className="w-4 h-4 bg-[#E5FF00] rounded-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          <span className="font-bold text-sm uppercase text-[#E5FF00]">System Online</span>
        </div>
      </nav>

      {/* Main Hero - Horizontal Focus / Asymmetric Load */}
      <main className="flex-grow flex flex-col md:flex-row border-b-4 border-white">
        {/* Left Section - Extreme OLED Contrast Typography */}
        <div className="md:w-[60%] w-full flex flex-col justify-center p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-white relative overflow-hidden group/hero">
          {/* Decorative geometric shapes */}
          <div className="absolute -top-20 -right-20 w-64 h-64 border-[12px] border-[#E5FF00]/10 rounded-full mix-blend-overlay pointer-events-none group-hover/hero:scale-110 transition-transform duration-700"></div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black uppercase leading-[0.9] tracking-tighter z-10 break-words text-white drop-shadow-[6px_6px_0px_#E5FF00]">
            Brutally <br /> Honest <br /> Career <br /> Feedback.
          </h1>
          
          <p className="mt-12 text-xl md:text-2xl font-bold uppercase max-w-2xl border-l-8 border-[#E5FF00] pl-6 z-10 text-gray-200">
            Stop guessing why you get rejected. 
            <br className="hidden md:block"/> Get algorithmic insights on your resume in seconds.
          </p>

          <div className="mt-16 z-10 flex">
            <button 
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center bg-[#E5FF00] text-black px-10 py-5 text-2xl font-black uppercase tracking-widest border-4 border-white cursor-pointer hover:bg-white transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-white top-3 left-3 -z-10 border-4 border-white transition-all duration-300 group-hover:top-5 group-hover:left-5 group-active:top-0 group-active:left-0 shadow-none"></div>
              <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">Start Copilot</span>
              <ArrowRightSVG />
            </button>
          </div>
        </div>

        {/* Right Section - Shredded Bento Grid */}
        <div className="md:w-[40%] w-full flex flex-col bg-black">
          <div className="flex-1 p-10 border-b-4 border-white flex flex-col justify-center bg-black hover:bg-[#E5FF00] hover:text-black transition-colors duration-300 cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl lg:text-4xl font-black uppercase group-hover:text-black transition-colors">Deep Parsing</h3>
              <span className="font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">01</span>
            </div>
            <p className="text-lg lg:text-xl font-bold leading-tight text-gray-300 group-hover:text-black transition-colors">We slice your resume into vectors. No buzzword bingo, just raw skills vs unyielding requirements.</p>
          </div>
          
          <div className="flex-1 p-10 border-b-4 border-white flex flex-col justify-center bg-black hover:bg-[#E5FF00] hover:text-black transition-colors duration-300 cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl lg:text-4xl font-black uppercase group-hover:text-black transition-colors">Fit Score</h3>
              <span className="font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">02</span>
            </div>
            <p className="text-lg lg:text-xl font-bold leading-tight text-gray-300 group-hover:text-black transition-colors">A merciless calculation of your probability. If you don't fit, we tell you exactly why.</p>
          </div>
          
          <div className="flex-1 p-10 flex flex-col justify-center bg-black hover:bg-[#E5FF00] hover:text-black transition-colors duration-300 cursor-pointer group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-3xl lg:text-4xl font-black uppercase group-hover:text-black transition-colors">Cover Protocol</h3>
              <span className="font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">03</span>
            </div>
            <p className="text-lg lg:text-xl font-bold leading-tight text-gray-300 group-hover:text-black transition-colors">Automated, highly-targeted narrative generation designed to bypass ATS filters.</p>
          </div>
        </div>
      </main>

      {/* Marquee Banner */}
      <Marquee text="AI Resume Parsing • Brutal Fit Scores • Dynamic Cover Letters • Vector Analysis" />
    </div>
  );
}
