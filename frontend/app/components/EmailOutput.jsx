import { states } from "@/app/state"

const EmailOutput = () => {
    const { result } = states();
    if (!result || !result.email) return null;
    
    return (
        <div className="bg-white border-4 border-black shadow-brutal flex flex-col w-full h-full relative">
             <div className="bg-neo-blue border-b-4 border-black p-4 flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase text-black tracking-widest">
                    OUTREACH EMAIL
                </h3>
                <button 
                    className="bg-white border-2 border-black px-4 py-1 font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all uppercase"
                    onClick={() => navigator.clipboard.writeText(result.email)}
                >
                    Copy Email
                </button>
            </div>

            <div className="p-8 whitespace-pre-wrap font-sans text-xl leading-relaxed text-black bg-[#f4f4f0] m-4 border-2 border-dashed border-black">
                {result.email}
            </div>
        </div>
    )
}

export default EmailOutput
