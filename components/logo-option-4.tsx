"use client"

export function LogoOption4({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "scale-75" : ""}`}>
      {/* Circuit Cloud */}
      <div className="relative group">
        <svg width="60" height="50" viewBox="0 0 60 50" className="transition-all duration-300">
          {/* Cloud outline made of circuit traces */}
          <path
            d="M 15 25 Q 15 15, 25 15 Q 28 10, 35 10 Q 42 10, 45 15 Q 55 15, 55 25 Q 55 30, 50 33 L 48 33 L 48 35 Q 48 40, 42 40 L 18 40 Q 12 40, 12 35 L 12 33 L 10 33 Q 5 30, 5 25 Q 5 20, 10 18"
            className="fill-none stroke-blue-500 stroke-[2] transition-all duration-300 group-hover:stroke-sea-green"
            strokeDasharray="2 2"
          />

          {/* Circuit nodes */}
          <g className="transition-all duration-300">
            <circle cx="25" cy="15" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
            <circle cx="35" cy="10" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
            <circle cx="45" cy="15" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
            <circle cx="50" cy="33" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
            <circle cx="42" cy="40" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
            <circle cx="18" cy="40" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
            <circle cx="10" cy="18" r="2" className="fill-blue-400 group-hover:fill-sea-green" />
          </g>

          {/* Inner circuit paths */}
          <g className="opacity-70 group-hover:opacity-100 transition-opacity">
            <path
              d="M 20 25 L 30 25 L 30 30 L 35 30"
              className="fill-none stroke-blue-300 stroke-[1] group-hover:stroke-sea-green"
              strokeDasharray="1 1"
            />
            <path
              d="M 35 20 L 40 20 L 40 28"
              className="fill-none stroke-blue-300 stroke-[1] group-hover:stroke-sea-green"
              strokeDasharray="1 1"
            />
            <circle cx="30" cy="25" r="1.5" className="fill-blue-200 group-hover:fill-sea-green" />
            <circle cx="35" cy="30" r="1.5" className="fill-blue-200 group-hover:fill-sea-green" />
            <circle cx="40" cy="28" r="1.5" className="fill-blue-200 group-hover:fill-sea-green" />
          </g>

          {/* Pulse effect on hover */}
          <circle
            cx="30"
            cy="25"
            r="8"
            className="fill-none stroke-sea-green stroke-[0.5] opacity-0 group-hover:opacity-100 group-hover:animate-ping"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-500 group-hover:text-sea-green transition-colors">The</span>
          <span className="text-2xl font-bold text-slate-200">Cloudbox</span>
        </div>
        <span className="text-xs font-mono text-slate-500 group-hover:text-sea-green transition-colors">
          connected infrastructure
        </span>
      </div>
    </div>
  )
}
