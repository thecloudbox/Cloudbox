"use client"

import { useState } from "react"

export function CloudboxLogo({ className = "", interactive = false }: { className?: string; interactive?: boolean }) {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  const [isBoxHovered, setIsBoxHovered] = useState(false)

  const LogoSVG = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300"
    >
      {/* Terminal window background */}
      <rect
        x="6"
        y="10"
        width="36"
        height="30"
        rx="4"
        className={`transition-colors duration-300 ${hoveredBlock ? "fill-zinc-900" : "fill-zinc-800"}`}
      />

      {/* Terminal title bar */}
      <rect
        x="6"
        y="10"
        width="36"
        height="6"
        rx="4"
        className={`transition-colors duration-300 ${hoveredBlock ? "fill-zinc-800" : "fill-zinc-700"}`}
      />

      {/* Terminal control dots (red, yellow, green) */}
      <circle cx="11" cy="13" r="1.5" className="fill-red-500" />
      <circle cx="16" cy="13" r="1.5" className="fill-yellow-500" />
      <circle cx="21" cy="13" r="1.5" className="fill-green-500" />

      {/* Terminal prompt and cursor */}
      <text
        x="10"
        y="25"
        className={`font-mono text-[7px] transition-colors duration-300 ${hoveredBlock ? "fill-terminal-green" : "fill-terminal-green"}`}
        style={{ fontWeight: "bold" }}
      >
        $
      </text>

      {/* Blinking cursor */}
      <rect
        x="14"
        y="20"
        width="2"
        height="6"
        className={`transition-colors duration-300 ${hoveredBlock ? "fill-terminal-green" : "fill-terminal-green"}`}
        style={{ animation: "blink 1s step-end infinite" }}
      />

      {/* Terminal output - tech symbols */}
      <text
        x="10"
        y="32"
        className={`font-mono text-[6px] transition-colors duration-300 ${hoveredBlock ? "fill-terminal-yellow" : "fill-muted-foreground"}`}
      >
        {"{ cloud: 'ready' }"}
      </text>

      {/* Cloud icon in terminal */}
      <path
        d="M26 30c0-.8.6-1.5 1.5-1.5.5 0 .9.3 1.2.7.1-.1.3-.1.5-.1.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3h-3.2c-.7 0-1.3-.6-1.3-1.3s.6-1.2 1.3-1.4z"
        className={`transition-colors duration-300 ${hoveredBlock ? "fill-terminal-green" : "fill-primary"}`}
      />

      {/* Light rays/effects */}
      <path
        d="M24 10 L24 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-terminal-green" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />
      <path
        d="M10 24 L6 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-terminal-green" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />
      <path
        d="M38 24 L42 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-terminal-green" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />
      <path
        d="M24 40 L24 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-terminal-green" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />

      {/* Add keyframe animation for blinking cursor */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </svg>
  )

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative group">
        <LogoSVG />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-xl tracking-tight">
          The<span className="text-primary group-hover:text-terminal-green transition-colors duration-300">Cloud</span>
          <span
            className="relative inline-block cursor-pointer transition-all duration-300"
            onMouseEnter={() => setIsBoxHovered(true)}
            onMouseLeave={() => setIsBoxHovered(false)}
          >
            <span
              className={`relative inline-block px-2 py-0.5 border-2 rounded transition-all duration-300 ${
                isBoxHovered
                  ? "border-terminal-green text-terminal-green shadow-lg shadow-terminal-green/50"
                  : "border-primary text-foreground"
              }`}
            >
              box
              {isBoxHovered && (
                <>
                  <span className="absolute -top-1 -right-1 w-1 h-1 bg-terminal-green rounded-full animate-ping" />
                  <span className="absolute -top-2 left-1/4 w-0.5 h-0.5 bg-terminal-yellow rounded-full animate-pulse" />
                  <span
                    className="absolute -bottom-1 -left-1 w-1 h-1 bg-terminal-green rounded-full animate-ping"
                    style={{ animationDelay: "0.2s" }}
                  />
                </>
              )}
            </span>
          </span>
        </span>
        <span className="text-xs text-muted-foreground font-mono mt-0.5">
          <span className="text-terminal-green group-hover:text-terminal-yellow transition-colors duration-300 font-bold">
            $
          </span>{" "}
          delivering solutions
        </span>
      </div>
    </div>
  )
}

export function CloudboxLogoCompact({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBoxHovered, setIsBoxHovered] = useState(false)

  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Terminal window background */}
        <rect
          x="6"
          y="10"
          width="36"
          height="30"
          rx="4"
          className={`transition-colors duration-300 ${isHovered ? "fill-zinc-900" : "fill-zinc-800"}`}
        />

        {/* Terminal title bar */}
        <rect
          x="6"
          y="10"
          width="36"
          height="6"
          rx="4"
          className={`transition-colors duration-300 ${isHovered ? "fill-zinc-800" : "fill-zinc-700"}`}
        />

        {/* Terminal control dots (red, yellow, green) */}
        <circle cx="11" cy="13" r="1.5" className="fill-red-500" />
        <circle cx="16" cy="13" r="1.5" className="fill-yellow-500" />
        <circle cx="21" cy="13" r="1.5" className="fill-green-500" />

        {/* Terminal prompt and cursor */}
        <text
          x="10"
          y="25"
          className={`font-mono text-[7px] transition-colors duration-300 ${isHovered ? "fill-terminal-green" : "fill-terminal-green"}`}
          style={{ fontWeight: "bold" }}
        >
          $
        </text>

        {/* Blinking cursor */}
        <rect
          x="14"
          y="20"
          width="2"
          height="6"
          className={`transition-colors duration-300 ${isHovered ? "fill-terminal-green" : "fill-terminal-green"}`}
          style={{ animation: "blink 1s step-end infinite" }}
        />

        {/* Terminal output - tech symbols */}
        <text
          x="10"
          y="32"
          className={`font-mono text-[6px] transition-colors duration-300 ${isHovered ? "fill-terminal-yellow" : "fill-muted-foreground"}`}
        >
          {"{ cloud: 'ready' }"}
        </text>

        {/* Cloud icon in terminal */}
        <path
          d="M26 30c0-.8.6-1.5 1.5-1.5.5 0 .9.3 1.2.7.1-.1.3-.1.5-.1.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3h-3.2c-.7 0-1.3-.6-1.3-1.3s.6-1.2 1.3-1.4z"
          className={`transition-colors duration-300 ${isHovered ? "fill-terminal-green" : "fill-primary"}`}
        />

        {/* Light rays/effects */}
        <path
          d="M24 10 L24 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-terminal-green" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />
        <path
          d="M10 24 L6 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-terminal-green" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />
        <path
          d="M38 24 L42 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-terminal-green" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />
        <path
          d="M24 40 L24 44"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-terminal-green" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />

        {/* Add keyframe animation for blinking cursor */}
        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </svg>
      <span className="font-bold text-lg tracking-tight">
        The
        <span className={`transition-colors duration-300 ${isHovered ? "text-terminal-green" : "text-primary"}`}>
          Cloud
        </span>
        <span
          className="relative inline-block cursor-pointer transition-all duration-300 ml-0.5"
          onMouseEnter={() => setIsBoxHovered(true)}
          onMouseLeave={() => setIsBoxHovered(false)}
        >
          <span
            className={`relative inline-block px-1.5 py-0.5 border-2 rounded transition-all duration-300 ${
              isBoxHovered
                ? "border-terminal-green text-terminal-green shadow-md shadow-terminal-green/50"
                : "border-primary text-foreground"
            }`}
          >
            box
            {isBoxHovered && (
              <>
                <span className="absolute -top-0.5 -right-0.5 w-0.5 h-0.5 bg-terminal-green rounded-full animate-ping" />
                <span
                  className="absolute -bottom-0.5 -left-0.5 w-0.5 h-0.5 bg-terminal-green rounded-full animate-ping"
                  style={{ animationDelay: "0.2s" }}
                />
              </>
            )}
          </span>
        </span>
      </span>
    </div>
  )
}
