import React from 'react'

// Sub-component for the individual Accordion items
const DimensionItem = ({ label, detail }) => (
    <div className="collapse collapse-arrow bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2">
        <input type="radio" name="dimension-accordion" /> 
        <div className="collapse-title text-xl font-black uppercase flex justify-between items-center pr-10">
            <span>{label}</span>
            <span className=" text-black px-2 py-1 text-sm">
                SCORE: {detail.score}/5
            </span>
        </div>
        <div className="collapse-content bg-neo-lime/10 border-t-2 border-black">
            <div className="py-4">
                <p className="font-black uppercase text-xs mb-1 opacity-60">Justification:</p>
                <p className="font-bold text-sm leading-tight text-black">{detail.justification}</p>
            </div>
        </div>
    </div>
);

// Main Component
const FitScore = ({ score }) => {
    const fitData = score?.fit_score;
    if (!fitData) return null;

    // Destructure specifically what we need to handle them uniquely
    const { dimension_scores, overall_score, grade, summary } = fitData;

    return (
        <div className="text-white p-8 border-4 border-black group hover:shadow-[12px_12px_0px_0px_rgba(173,255,47,1)] transition-shadow w-full">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-4 border-white pb-2 inline-block">
                FIT SCORE
            </h2>

            <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar text-black">
                
                {/* 1. Top Level Highlights (Score & Grade) */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Overall Score" value={`${overall_score}%`} highlight />
                    <StatCard title="Grade" value={grade} highlight />
                </div>

                {/* 2. AI Summary */}
                <div className="bg-[#f0f0f0] p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    <h3 className="text-2xl font-black uppercase mb-2 border-b-4 border-black pb-1">Analysis Summary</h3>
                    <p className="font-bold text-lg font-mono leading-tight">{summary}</p>
                </div>

                {/* 3. Dimension Scores (Accordion) */}
                <div className="bg-[#f0f0f0] p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                    <h3 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-1">Dimension Breakdown</h3>
                    <div className="flex flex-col gap-2">
                        {Object.entries(dimension_scores).map(([key, value]) => (
                            <DimensionItem key={key} label={key.replace(/_/g, ' ')} detail={value} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

// Helper component for the highlighted boxes
const StatCard = ({ title, value, highlight }) => (
    <div className={`${highlight ? 'bg-[rgba(173,255,47,1)]' : 'bg-[#f0f0f0]'} p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}>
        <h3 className="text-xl font-black uppercase border-b-2 border-black mb-1">{title}</h3>
        <p className="text-4xl font-black">{value}</p>
    </div>
);

export default FitScore;