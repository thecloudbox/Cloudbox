"use client"

import { useState, useEffect } from "react"

export function LogoOption5({ compact = false }: { compact?: boolean }) {
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex items-center gap-3 ${compact ? "scale-75" : ""}`}>
      {/* Infrastructure Stack */}
      <div className="relative group">
        <svg width="70" height="60" viewBox="0 0 70 60" className="transition-all duration-300">
          {/* Stack layers with isometric offset */}
          <g>
            {/* Layer 5 - Top (Application) */}
            <rect
              x="5"
              y="5"
              width="50"
              height="8"
              className="fill-blue-500 stroke-blue-400 stroke-[1] transition-all duration-300 group-hover:fill-sea-green group-hover:stroke-teal-400"
            />
            <polygon
              points="55,5 60,8 60,16 55,13"
              className="fill-blue-600 transition-all duration-300 group-hover:fill-teal-600"
            />
            <polygon
              points="5,13 55,13 60,16 10,16"
              className="fill-blue-400 transition-all duration-300 group-hover:fill-teal-400"
            />

            {/* Layer 4 */}
            <rect
              x="8"
              y="16"
              width="50"
              height="8"
              className="fill-blue-600 stroke-blue-500 stroke-[1] transition-all duration-300 group-hover:fill-teal-700 group-hover:stroke-teal-500"
            />
            <polygon
              points="58,16 63,19 63,27 58,24"
              className="fill-blue-700 transition-all duration-300 group-hover:fill-teal-800"
            />

            {/* Layer 3 */}
            <rect
              x="11"
              y="27"
              width="50"
              height="8"
              className="fill-blue-700 stroke-blue-600 stroke-[1] transition-all duration-300 group-hover:fill-teal-800 group-hover:stroke-teal-600"
            />
            <polygon
              points="61,27 66,30 66,38 61,35"
              className="fill-blue-800 transition-all duration-300 group-hover:fill-teal-900"
            />

            {/* Layer 2 */}
            <rect
              x="14"
              y="38"
              width="50"
              height="8"
              className="fill-blue-800 stroke-blue-700 stroke-[1] transition-all duration-300 group-hover:fill-teal-900 group-hover:stroke-teal-700"
            />

            {/* Layer 1 - Base (Infrastructure) */}
            <rect
              x="17"
              y="49"
              width="50"
              height="8"
              className="fill-blue-900 stroke-blue-800 stroke-[1] transition-all duration-300 group-hover:fill-slate-900 group-hover:stroke-teal-800"
            />
          </g>

          {/* Terminal prompt integrated */}
          <g className="font-mono">
            <text x="20" y="54" className="text-[6px] fill-blue-300 group-hover:fill-sea-green transition-colors">
              $
            </text>
            <rect
              x="24"
              y="50"
              width="1.5"
              height="5"
              className={`fill-blue-300 group-hover:fill-sea-green transition-all ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            />
          </g>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-500 group-hover:text-sea-green transition-colors">The</span>
          <span className="text-2xl font-bold text-slate-200">Cloudbox</span>
        </div>
        <span className="text-xs font-mono text-slate-500 group-hover:text-sea-green transition-colors">
          full-stack infrastructure
        </span>
      </div>
    </div>
  )
}
