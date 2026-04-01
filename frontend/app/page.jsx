"use client";

import EmailOutput from "@/app/components/EmailOutput"
import ResumeOutput from "@/app/components/ResumeOutput"
import FitScore from "@/app/components/FitScore"
import Input from "@/app/components/Input"
import { states } from "@/app/state"

export default function Home() {
    const { result } = states();
    console.log("resukt : ", result)
    return (
        <main className="min-h-screen bg-[--background] text-[--foreground] font-sans overflow-x-hidden selection:bg-neo-lime selection:text-black">
            {/* Header / Hero */}
            <div className={`transition-all duration-700 ease-in-out flex flex-col items-center justify-center ${result ? 'py-12' : 'min-h-[80vh] py-24'}`}>
                <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-center border-b-8 border-black pb-4 w-full">
                        AI Job <span className="bg-black text-neo-lime px-4 py-1 rotate-2 inline-block shadow-[8px_8px_0px_0px_rgba(255,0,234,1)]">COPILOT</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold max-w-3xl text-center mt-8 mb-16 bg-white border-4 border-black p-4 shadow-brutal">
                        Upload your Resume. Paste the Job Description. <br /> Get Tailored Results inside 10 seconds.
                    </p>

                    {!result && (
                        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <Input />
                        </div>
                    )}
                </div>
            </div>

            {/* Results Section */}
            {result && (
                <div className="max-w-7xl mx-auto px-6 pb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-4 h-full">
                            <FitScore />
                        </div>
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            <ResumeOutput />
                            <EmailOutput />
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
