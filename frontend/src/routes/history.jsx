import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { states } from '../store/globalStates'
import { useState } from 'react'

export const Route = createFileRoute('/history')({
  component: RouteComponent,
})

function RouteComponent() {
  const { resultHistory } = states()
  const navigate = useNavigate()
  console.log("fit score: ", resultHistory)
  const latestToOldResults = [...resultHistory].reverse();

  return (
    <div className="min-h-screen bg-[--background] p-6 md:p-12 font-sans">
      {/* Header Navigation */}
      <div className="max-w-6xl mx-auto mb-12 flex justify-between items-end border-b-8 border-black pb-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Past <span className="bg-neo-lime px-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Sprints</span>
          </h1>
          <p className="text-xl font-bold mt-2 uppercase">Total Generations: {resultHistory.length}</p>
        </div>
        <button 
          onClick={() => navigate({ to: '/' })}
          className="border-4 border-black cursor-pointer text-black bg-white px-6 py-2 font-black uppercase shadow-brutal hover:bg-pink-600 hover:text-white transition-all"
        >
          ← Back
        </button>
      </div>

      {/* History List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-12">
        {latestToOldResults.length === 0 ? (
          <div className="border-4 border-dashed border-black p-20 text-center">
            <p className="text-3xl font-black uppercase opacity-30">No history found yet. Go ignite something!</p>
          </div>
        ) : (
          latestToOldResults.map((item, index) => (
            <HistoryCard key={index} data={item} index={index} />
          ))
        )}
      </div>
    </div>
  )
}

const HistoryCard = ({ data, index }) => {
  const navigate = useNavigate()
  const formattedDate = data.timestamp 
    ? new Date(data.timestamp).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : "DATE UNKNOWN";
  // Extracting the grade color logic
  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'B') return 'bg-neo-lime'
    if (grade === 'C') return 'bg-orange-400'
    return 'bg-red-500 text-white'
  }

  return (
    <div className="border-4 border-black bg-white shadow-brutal overflow-hidden flex flex-col md:flex-row">
      {/* Left Sidebar: Stats */}
      <div className={`p-6 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col justify-center items-center gap-4 min-w-50 ${getGradeColor(data.fit_score.grade)}`}>
        {/* <span className="text-6xl font-black italic">#{index + 1}</span> */}
        <span className="font-black uppercase text-xs bg-black text-white px-2 py-1 mb-2">
            {formattedDate}
        </span>
        <div className="text-center">
          <div className="text-4xl font-black">{data.fit_score.overall_score}%</div>
          <div className="font-bold uppercase text-sm border-t-2 border-black pt-1">Match Score</div>
        </div>
        <div className="text-5xl font-black border-4 border-black bg-white text-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {data.fit_score.grade}
        </div>
      </div>

      {/* Right Content: Details */}
      <div className="flex-1 p-8 flex flex-col gap-6 bg-[#fdfdfd]">
        <div>
            <h3 className="text-2xl text-black uppercase mb-2">Analysis Summary</h3>
            <p className="font-medium text-gray-700 leading-tight border-l-4 border-black pl-4">
                {data.fit_score.summary}
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Email Preview Snippet */}
            <div className="border-2 border-black p-4 bg-white">
                <span className="block font-black uppercase text-xs mb-2 text-neo-pink">Generated Email</span>
                <p className="text-sm text-slate-950 line-clamp-4 italic">"{data.email.substring(0, 200)}..."</p>
            </div>

            {/* LinkedIn Snippet */}
            <div className="border-2 border-black p-4 bg-white">
                <span className="block font-black uppercase text-xs mb-2 text-blue-600">LinkedIn Hook</span>
                <p className="text-sm text-slate-950 font-bold">"{data.linkedin_message}"</p>
            </div>
        </div>

        <button 
          className="mt-2 w-full border-4 cursor-pointer border-black bg-black text-white py-3 font-black uppercase tracking-widest hover:bg-lime-400 hover:text-black transition-colors"
          onClick={() => navigate({ to:"/result/$id", params: {id: String(data.id)} })}
        >
          View Full Report & Resume
        </button>
      </div>
    </div>
  )
}