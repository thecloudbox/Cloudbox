"use client"

import { useState, useEffect } from "react"

export function LogoOption1({ compact = false }: { compact?: boolean }) {
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center gap-3 ${compact ? "scale-90" : ""}`}>
      {/* Terminal Window */}
      <div className="relative group">
        {/* Terminal Container */}
        <div
          className={`bg-slate-900 border-2 border-blue-500 rounded-lg p-2 ${compact ? "min-w-[140px]" : "min-w-[200px]"} transition-all duration-300 group-hover:border-sea-green group-hover:shadow-lg group-hover:shadow-sea-green/20`}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-slate-700">
            <div className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-sea-green transition-colors" />
            <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover:bg-sea-green transition-colors" />
            <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-sea-green transition-colors" />
          </div>

          {/* Terminal Content */}
          <div className={`font-mono space-y-0.5 ${compact ? "text-[10px]" : "text-xs"}`}>
            <div className="flex items-center gap-1.5">
              <span className="text-blue-400 group-hover:text-sea-green transition-colors">$</span>
              <span className="text-slate-300">thecloud init</span>
            </div>
            <div className="flex items-center gap-1.5 pl-2">
              <span className="text-slate-400 text-[9px]">☁️ 🗄️ 🚀</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-blue-400 group-hover:text-sea-green transition-colors">$</span>
              <span
                className={`w-1.5 h-3 bg-slate-300 ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`${compact ? "text-xl" : "text-2xl"} font-bold text-blue-500 group-hover:text-sea-green transition-colors`}
          >
            The
          </span>
          <span className={`${compact ? "text-xl" : "text-2xl"} font-bold text-slate-200`}>Cloud</span>
          <span
            className={`${compact ? "text-xl" : "text-2xl"} font-bold text-blue-400 group-hover:text-sea-green transition-colors`}
          >
            box
          </span>
        </div>
        <span
          className={`${compact ? "text-[10px]" : "text-xs"} font-mono text-slate-500 group-hover:text-sea-green transition-colors`}
        >
          delivering solutions
        </span>
      </div>
    </div>
  )
}
