"use client"

export function LogoOption3({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "scale-75" : ""}`}>
      {/* 3D Isometric Cube */}
      <div className="relative group">
        <svg width="60" height="60" viewBox="0 0 60 60" className="transition-all duration-300">
          {/* Back face */}
          <path
            d="M30 15 L50 25 L50 45 L30 55 Z"
            className="fill-blue-900 stroke-blue-500 stroke-[1.5] transition-all duration-300 group-hover:fill-teal-900 group-hover:stroke-sea-green"
          />
          {/* Left face */}
          <path
            d="M10 25 L30 15 L30 55 L10 45 Z"
            className="fill-blue-700 stroke-blue-400 stroke-[1.5] transition-all duration-300 group-hover:fill-teal-700 group-hover:stroke-sea-green"
          />
          {/* Top face */}
          <path
            d="M10 25 L30 15 L50 25 L30 35 Z"
            className="fill-blue-500 stroke-blue-300 stroke-[1.5] transition-all duration-300 group-hover:fill-sea-green group-hover:stroke-teal-300"
          />

          {/* Circuit pattern on top face */}
          <g className="opacity-60 group-hover:opacity-100 transition-opacity">
            <circle cx="25" cy="22" r="1.5" className="fill-white" />
            <circle cx="35" cy="28" r="1.5" className="fill-white" />
            <line x1="25" y1="22" x2="35" y2="28" className="stroke-white stroke-[0.5]" />
            <circle cx="30" cy="25" r="1" className="fill-white" />
          </g>

          {/* Tech particles emerging */}
          <g className="opacity-0 group-hover:opacity-100 transition-all duration-500">
            <text x="32" y="10" className="text-[8px] fill-sea-green animate-pulse">
              ☁️
            </text>
            <text x="52" y="20" className="text-[8px] fill-sea-green animate-pulse delay-100">
              🗄️
            </text>
            <text x="8" y="20" className="text-[8px] fill-sea-green animate-pulse delay-200">
              ⚡
            </text>
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
          containerized solutions
        </span>
      </div>
    </div>
  )
}
