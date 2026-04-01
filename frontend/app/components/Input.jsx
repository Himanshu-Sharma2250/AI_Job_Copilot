"use client";

import {generateApplication} from "@/lib/api"
import { useState } from "react";
import {states} from "@/app/state"

const Input = () => {
    const [file, setFile] = useState(null);
    const [jd, setJd] = useState("");
    const [loading, setLoading] = useState(false);
    const {setResult} = states();

    const handleClick = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("job_description", jd);

        try {
            const data = await generateApplication(formData)
            setResult(data);
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white border-4 border-black p-8 shadow-brutal flex flex-col gap-8 w-full transition-all">
            <div className="flex flex-col gap-3">
                <label className="text-3xl font-black uppercase tracking-tight">
                    1. Upload Resume (PDF)
                </label>
                <div className="relative border-4 border-black bg-[#f4f4f0] p-6 hover:bg-neo-lime transition-colors cursor-pointer group">
                    <input 
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                        name="resume" 
                        id="resume" 
                        accept='.pdf' 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="flex justify-between items-center z-0 relative">
                        <span className="font-bold text-xl uppercase group-hover:text-black">
                            {file ? file.name : "CHOOSE FILE"}
                        </span>
                        <span className="text-4xl">📁</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <label className="text-3xl font-black uppercase tracking-tight">
                    2. Paste Job Description
                </label>
                <textarea 
                    name="jd" 
                    id="jd" 
                    placeholder='PASTE THE FULL JOB DESCRIPTION HERE...'
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    className='border-4 border-black p-6 h-64 focus:outline-none focus:bg-neo-lime transition-colors font-medium text-xl resize-none shadow-inner'
                />
            </div>

            <button 
                onClick={handleClick}
                disabled={loading || !file || !jd}
                className='mt-4 border-4 border-black bg-neo-orange text-white px-8 py-5 text-3xl font-black uppercase tracking-widest shadow-brutal hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-brutal-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal'
            >
                {loading ? "GENERATING..." : "🚀 IGNITE APPLICATION"}
            </button>
        </div>
    )
}

export default Input
