import React from 'react'

const ResumeOutput = ({resume}) => {
    const resData = resume?.optimized_resume;
    if (!resData) return null;
    
    let parsedResume = resData;
    if (typeof resData === 'string') {
        try {
            parsedResume = JSON.parse(resData);
        } catch (e) {
            parsedResume = resData;
        }
    }

    const isObj = typeof parsedResume === 'object' && parsedResume !== null;

    return (
        <div className="bg-[#fbff00] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-6 border-b-8 border-black pb-4 inline-block">
                OPTIMIZED RESUME
            </h2>
            
            <div className="bg-white border-4 border-black p-6 mt-4 max-h-150 overflow-y-auto">
                {isObj ? (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-black">
                        {JSON.stringify(parsedResume, null, 2)}
                    </pre>
                ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-black">
                        {String(parsedResume)}
                    </pre>
                )}
            </div>
        </div>
    )
}

export default ResumeOutput
