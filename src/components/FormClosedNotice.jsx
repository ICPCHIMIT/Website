import React from 'react'
import { Lock, ArrowLeft, Calendar, Mail } from 'lucide-react'

export default function FormClosedNotice({ title, message, deadline, onBack, onNavigateHome }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="w-full max-w-lg bg-[#080d1a] border border-white/10 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,186,19,0.15)]">
          <Lock className="w-8 h-8 text-[#f5ba13]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal">
            {title || 'Registration Currently Closed'}
          </h2>
          <p className="font-sans text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            {message || 'Submissions for the current cycle are closed. Please check back later or follow our official community channels.'}
          </p>
        </div>

        {deadline && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-[#f5ba13]" />
            <span>Deadline was: {new Date(deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-sans font-semibold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
            </button>
          )}
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs shadow-[0_0_15px_rgba(245,186,19,0.3)] transition-all cursor-pointer"
          >
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  )
}
