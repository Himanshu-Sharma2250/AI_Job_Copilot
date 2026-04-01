import { states } from "@/app/state"

const FitScore = () => {
    const { result } = states();
    if (!result || !result.fit_score) return null;

    // Extract the first number found in the AI response to use as the big score
    const rawScore = result.fit_score;
    const match = rawScore.match(/\b(\d{1,3})\b/);
    const score = match ? parseInt(match[1]) : 0;
    const colorClass = score >= 80 ? 'bg-neo-lime' : score >= 50 ? 'bg-yellow-300' : 'bg-red-500';

    return (
        <div className={`border-4 border-black p-8 shadow-brutal flex flex-col items-center h-full ${colorClass} transition-colors`}>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black text-center border-b-4 border-black pb-2 w-full">
                FIT SCORE
            </h3>

            {/* Display the extracted numeric score massively */}
            <div className="text-8xl md:text-9xl font-black tracking-tighter text-black py-4 drop-shadow-md">
                {match ? score : "?"}
            </div>
            
            <p className="text-xl font-bold uppercase text-center bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                {score >= 80 ? "HIGH MATCH" : score >= 50 ? "AVERAGE MATCH" : "LOW MATCH"}
            </p>

            {/* Display the actual AI reasoning/text in a readable scrolling box so it doesn't break the layout */}
            <div className="w-full bg-white border-4 border-black p-4 max-h-[300px] overflow-y-auto mt-auto">
                <h4 className="font-bold border-b-2 border-black mb-2 uppercase text-sm">AI Analysis</h4>
                <p className="text-base font-medium whitespace-pre-wrap">{rawScore}</p>
            </div>
        </div>
    )
}

export default FitScore
