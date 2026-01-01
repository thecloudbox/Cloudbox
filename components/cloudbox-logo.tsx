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
      <circle
        cx="12"
        cy="10"
        r="1.5"
        className={`animate-pulse transition-colors duration-300 ${hoveredBlock ? "fill-green-500" : "fill-primary"}`}
        style={{ opacity: 0.6 }}
      />
      <circle
        cx="36"
        cy="12"
        r="1"
        className={`animate-pulse transition-colors duration-300 ${hoveredBlock ? "fill-green-500" : "fill-primary"}`}
        style={{ opacity: 0.4, animationDelay: "0.5s" }}
      />
      <circle
        cx="38"
        cy="28"
        r="1.5"
        className={`animate-pulse transition-colors duration-300 ${hoveredBlock ? "fill-green-500" : "fill-primary"}`}
        style={{ opacity: 0.5, animationDelay: "1s" }}
      />
      <circle
        cx="10"
        cy="32"
        r="1"
        className={`animate-pulse transition-colors duration-300 ${hoveredBlock ? "fill-green-500" : "fill-primary"}`}
        style={{ opacity: 0.4, animationDelay: "1.5s" }}
      />

      <path
        d="M8 18 L4 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />
      <path
        d="M10 36 L6 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />
      <path
        d="M38 18 L42 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />
      <path
        d="M36 36 L40 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.3 }}
      />

      <rect
        x="10"
        y="14"
        width="28"
        height="28"
        rx="3"
        className={`transition-all duration-300 ${hoveredBlock === "main" || !interactive ? "fill-primary" : "fill-primary"} ${hoveredBlock === "main" ? "fill-green-500" : ""}`}
        style={{ opacity: 0.9 }}
        onMouseEnter={() => interactive && setHoveredBlock("main")}
        onMouseLeave={() => interactive && setHoveredBlock(null)}
      />

      <path
        d="M10 17 L6 20 L6 44 L10 42 Z"
        className={`transition-colors duration-300 ${hoveredBlock === "main" ? "fill-green-500" : "fill-primary"}`}
        style={{ opacity: 0.6 }}
      />

      <path
        d="M10 42 L6 44 L30 44 L38 42 Z"
        className={`transition-colors duration-300 ${hoveredBlock === "main" ? "fill-green-500" : "fill-primary"}`}
        style={{ opacity: 0.7 }}
      />

      <rect
        x="10"
        y="14"
        width="28"
        height="6"
        rx="3"
        className={`transition-all duration-300 ${hoveredBlock === "lid" ? "fill-green-500" : "fill-primary"}`}
        onMouseEnter={() => interactive && setHoveredBlock("lid")}
        onMouseLeave={() => interactive && setHoveredBlock(null)}
      />

      <g style={{ opacity: 0.8 }} className="transition-opacity duration-300 group-hover:opacity-100">
        <text
          x="14"
          y="26"
          className={`font-mono text-[8px] transition-colors duration-300 ${hoveredBlock === "code" ? "fill-green-200" : "fill-primary-foreground"}`}
          onMouseEnter={() => interactive && setHoveredBlock("code")}
          onMouseLeave={() => interactive && setHoveredBlock(null)}
        >
          {"<>"}
        </text>
        <text
          x="28"
          y="26"
          className={`font-mono text-[8px] transition-colors duration-300 ${hoveredBlock === "iac" ? "fill-green-200" : "fill-primary-foreground"}`}
          onMouseEnter={() => interactive && setHoveredBlock("iac")}
          onMouseLeave={() => interactive && setHoveredBlock(null)}
        >
          {"{ }"}
        </text>

        <text
          x="14"
          y="32"
          className={`font-mono text-[7px] transition-colors duration-300 ${hoveredBlock === "terminal" ? "fill-green-200" : "fill-primary-foreground"}`}
          onMouseEnter={() => interactive && setHoveredBlock("terminal")}
          onMouseLeave={() => interactive && setHoveredBlock(null)}
        >
          $_
        </text>

        <path
          d="M28 30c0-.8.6-1.5 1.5-1.5.5 0 .9.3 1.2.7.1-.1.3-.1.5-.1.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3h-3.2c-.7 0-1.3-.6-1.3-1.3s.6-1.2 1.3-1.4z"
          className={`transition-colors duration-300 ${hoveredBlock === "cloud" ? "fill-green-200" : "fill-primary-foreground"}`}
          style={{ opacity: 0.7 }}
          onMouseEnter={() => interactive && setHoveredBlock("cloud")}
          onMouseLeave={() => interactive && setHoveredBlock(null)}
        />

        <g
          className="transition-colors duration-300"
          onMouseEnter={() => interactive && setHoveredBlock("database")}
          onMouseLeave={() => interactive && setHoveredBlock(null)}
        >
          <ellipse
            cx="24"
            cy="36"
            rx="4"
            ry="1.5"
            className={hoveredBlock === "database" ? "fill-green-200" : "fill-primary-foreground"}
            style={{ opacity: 0.6 }}
          />
          <rect
            x="20"
            y="36"
            width="8"
            height="3"
            className={hoveredBlock === "database" ? "fill-green-200" : "fill-primary-foreground"}
            style={{ opacity: 0.6 }}
          />
          <ellipse
            cx="24"
            cy="39"
            rx="4"
            ry="1.5"
            className={hoveredBlock === "database" ? "fill-green-200" : "fill-primary-foreground"}
            style={{ opacity: 0.6 }}
          />
        </g>
      </g>

      <path
        d="M24 14 L24 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.2 }}
      />
      <path
        d="M24 14 L20 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.15 }}
      />
      <path
        d="M24 14 L28 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`transition-colors duration-300 ${hoveredBlock ? "text-green-500" : "text-primary"}`}
        style={{ opacity: 0.15 }}
      />
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
                  <span
                    className="absolute -bottom-2 right-1/4 w-0.5 h-0.5 bg-terminal-yellow rounded-full animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] text-terminal-green animate-bounce">
                    {"<>"}
                  </span>
                  <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-[8px] text-terminal-yellow animate-pulse font-mono font-bold">
                    $
                  </span>
                  <span
                    className="absolute -bottom-3 left-1/4 text-[8px] text-terminal-green animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ☁
                  </span>
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
        <circle
          cx="12"
          cy="10"
          r="1.5"
          className={`animate-pulse transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.6 }}
        />
        <circle
          cx="36"
          cy="12"
          r="1"
          className={`animate-pulse transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.4, animationDelay: "0.5s" }}
        />
        <circle
          cx="38"
          cy="28"
          r="1.5"
          className={`animate-pulse transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.5, animationDelay: "1s" }}
        />
        <circle
          cx="10"
          cy="32"
          r="1"
          className={`animate-pulse transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.4, animationDelay: "1.5s" }}
        />

        <path
          d="M8 18 L4 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />
        <path
          d="M10 36 L6 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />
        <path
          d="M38 18 L42 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />
        <path
          d="M36 36 L40 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.3 }}
        />

        <rect
          x="10"
          y="14"
          width="28"
          height="28"
          rx="3"
          className={`transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.9 }}
        />
        <path
          d="M10 17 L6 20 L6 44 L10 42 Z"
          className={`transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.6 }}
        />
        <path
          d="M10 42 L6 44 L30 44 L38 42 Z"
          className={`transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
          style={{ opacity: 0.7 }}
        />
        <rect
          x="10"
          y="14"
          width="28"
          height="6"
          rx="3"
          className={`transition-colors duration-300 ${isHovered ? "fill-green-500" : "fill-primary"}`}
        />

        <g style={{ opacity: 0.8 }}>
          <text
            x="14"
            y="26"
            className={`font-mono text-[8px] transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
          >
            {"<>"}
          </text>
          <text
            x="28"
            y="26"
            className={`font-mono text-[8px] transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
          >
            {"{ }"}
          </text>
          <text
            x="14"
            y="32"
            className={`font-mono text-[7px] transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
          >
            $_
          </text>
          <path
            d="M28 30c0-.8.6-1.5 1.5-1.5.5 0 .9.3 1.2.7.1-.1.3-.1.5-.1.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3h-3.2c-.7 0-1.3-.6-1.3-1.3s.6-1.2 1.3-1.4z"
            className={`transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
            style={{ opacity: 0.7 }}
          />
          <ellipse
            cx="24"
            cy="36"
            rx="4"
            ry="1.5"
            className={`transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
            style={{ opacity: 0.6 }}
          />
          <rect
            x="20"
            y="36"
            width="8"
            height="3"
            className={`transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
            style={{ opacity: 0.6 }}
          />
          <ellipse
            cx="24"
            cy="39"
            rx="4"
            ry="1.5"
            className={`transition-colors duration-300 ${isHovered ? "fill-green-200" : "fill-primary-foreground"}`}
            style={{ opacity: 0.6 }}
          />
        </g>

        <path
          d="M24 14 L24 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.2 }}
        />
        <path
          d="M24 14 L20 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.15 }}
        />
        <path
          d="M24 14 L28 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={`transition-colors duration-300 ${isHovered ? "text-green-500" : "text-primary"}`}
          style={{ opacity: 0.15 }}
        />
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
