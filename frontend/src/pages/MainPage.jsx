import { useNavigate } from "@tanstack/react-router";
import JobDescForm from "../components/JobDescForm";
import { states } from "../store/globalStates";

const MainPage = () => {
    const {resultHistory} = states()
    const navigate = useNavigate()
    return (
        <main className="min-h-screen bg-[--background] text-[--foreground] font-sans overflow-x-hidden selection:bg-neo-lime selection:text-black">
            {/* Header / Hero */}
            <div className={`transition-all duration-700 ease-in-out flex flex-col items-center justify-center min-h-[80vh] py-24`}>
                <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-center border-b-8 border-black pb-4 w-full">
                        AI Job <span className="bg-black text-neo-lime px-4 py-1 rotate-2 inline-block shadow-[8px_8px_0px_0px_rgba(255,0,234,1)]">COPILOT</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold max-w-3xl text-center mt-8 mb-16 bg-white border-4 text-black border-black p-4 shadow-brutal">
                        Upload your Resume. Paste the Job Description. <br /> Get Tailored Results inside 10 seconds.
                    </p>

                    <div className="w-full max-w-2xl mx-auto flex justify-end mb-4">
                        <button 
                            onClick={() => navigate({ to: "/history" })}
                            className="border-2 border-black bg-white text-black cursor-pointer px-4 py-2 font-bold uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-800 hover:text-white transition-all"
                        >
                            Previous Results ({resultHistory.length})
                        </button>
                    </div>

                    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <JobDescForm />
                    </div>
                </div>
            </div>

        </main>
    )
}

export default MainPage