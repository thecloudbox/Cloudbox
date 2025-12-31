"use client"

import { useState, useEffect } from "react"

export function LogoOption2({ compact = false }: { compact?: boolean }) {
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center gap-3 ${compact ? "scale-75" : ""}`}>
      {/* Command Transform */}
      <div className="font-mono text-lg flex items-center gap-1 group">
        <span className="text-blue-500 group-hover:text-sea-green transition-colors">$</span>
        <span className="text-slate-300">deploy --</span>
        <span className="relative inline-flex items-center">
          {/* Morphing animation container */}
          <span className="text-blue-400 group-hover:text-sea-green transition-all duration-500 group-hover:opacity-0">
            cloud
          </span>
          <span className="absolute left-0 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
            ☁️
          </span>
        </span>
        <span
          className={`w-2 h-5 bg-slate-300 ml-1 ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity`}
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-500 group-hover:text-sea-green transition-colors">The</span>
          <span className="text-2xl font-bold text-slate-200">Cloudbox</span>
        </div>
        <span className="text-xs font-mono text-slate-500 group-hover:text-sea-green transition-colors">
          deploy with confidence
        </span>
      </div>
    </div>
  )
}
