import FitScore from "../components/FitScore";
import JobDescForm from "../components/JobDescForm";
import ResumeOutput from "../components/ResumeOutput";
import EmailOutput from "../components/EmailOutput";
import { states } from "../store/globalStates";
import { useNavigate } from "@tanstack/react-router";

const ResultPage = () => {
    const {result} = states();
    console.log("Result : ", result)
    const navigate = useNavigate();

    if (!result) {
        return (
            <div className="min-h-screen bg-[--background] flex items-center justify-center font-sans">
                 <p className="text-xl font-bold text-black bg-white border-4 border-black p-4 shadow-brutal">No results found. Please generate an application first.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[--background] text-[--foreground] font-sans overflow-x-hidden selection:bg-neo-lime selection:text-black">
            <div className="py-12 relative">
                <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-center border-b-8 border-black pb-4 w-full">
                        Your <span className="bg-black text-neo-lime px-4 py-1 -rotate-2 inline-block shadow-[8px_8px_0px_0px_rgba(255,0,234,1)]">RESULTS</span>
                    </h1>
                </div>
                <button 
                        onClick={() => navigate({ to: '/' })}
                        className="absolute top-28 right-62 border-black cursor-pointer text-white px-6 py-2 font-black uppercase shadow-brutal hover:text-fuchsia-500 transition-all"
                    >
                        ← Back
                    </button>

                <div className="max-w-7xl mx-auto px-6 pb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-4 h-full">
                            <FitScore score={result} />
                        </div>
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            <ResumeOutput resume={result} />
                            <EmailOutput email={result} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResultPage;
