import { states } from "@/app/state"

const ResumeOutput = () => {
    const { result } = states();
    if (!result || !result.resume) return null;
    
    return (
        <div className="bg-white border-4 border-black shadow-brutal flex flex-col w-full h-full relative">
            <div className="bg-neo-pink border-b-4 border-black p-4 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase text-black tracking-widest">
                    TAILORED RESUME
                </h3>
                <button 
                    className="bg-white border-2 border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                    onClick={() => navigator.clipboard.writeText(result.resume)}
                >
                    Copy Text
                </button>
            </div>

            <div className="p-8 whitespace-pre-wrap font-mono text-lg leading-relaxed text-black max-h-[600px] overflow-y-auto">
                {result.resume}
            </div>
        </div>
    )
}

export default ResumeOutput
