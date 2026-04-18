import { createFileRoute, Link } from '@tanstack/react-router'
import { states } from '../store/globalStates'
import FitScore from '../components/FitScore'

export const Route = createFileRoute('/result/$id')({
  component: ResultDetailComponent,
})

function ResultDetailComponent() {
  // 1. Get the ID from the URL parameters
  const { id } = Route.useParams()
  const { resultHistory } = states()

  // 2. Find the specific result in your history
  // Note: We convert id to Number since URL params are strings
  const resultData = resultHistory.find((item) => String(item.id) === String(id))

  if (!resultData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-black uppercase shadow-brutal bg-red-500 p-4">Result Not Found</h1>
        <Link to="/history" className="mt-8 underline font-bold">Return to History</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[--background] p-6 md:p-12 font-sans selection:bg-neo-lime">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex justify-between items-center mb-12 border-b-8 border-black pb-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Report <span className="text-neo-pink">#{id}</span>
          </h2>
          <Link 
            to="/history" 
            className="border-4 border-black bg-white px-6 py-2 font-black uppercase shadow-brutal hover:bg-neo-lime transition-all"
          >
            ← Back to History
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Visual Scores and Summary */}
          <div className="flex flex-col gap-8">
            <FitScore score={{ fit_score: resultData.fit_score }} />
          </div>

          {/* Right Column: Communication Drafts */}
          <div className="flex flex-col gap-8">
            {/* Email Section */}
            <div className="bg-white border-4 border-black p-6 shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-4 bg-black text-white inline-block px-2">Generated Email</h3>
              <pre className="whitespace-pre-wrap font-medium text-sm leading-relaxed text-slate-900 bg-slate-50 p-4 border-2 border-black/10">
                {resultData.email}
              </pre>
            </div>

            {/* LinkedIn Section */}
            <div className="bg-white border-4 border-black p-6 shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-4 bg-blue-600 text-white inline-block px-2">LinkedIn Message</h3>
              <p className="font-bold text-lg italic text-slate-900">
                "{resultData.linkedin_message}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}