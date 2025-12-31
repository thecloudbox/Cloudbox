export function CloudboxLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Terminal window background */}
          <rect x="2" y="2" width="28" height="28" rx="3" className="fill-primary" />
          <rect x="2" y="2" width="28" height="6" rx="3" className="fill-primary/80" />
          {/* Terminal dots */}
          <circle cx="6" cy="5" r="1" className="fill-primary-foreground/60" />
          <circle cx="9" cy="5" r="1" className="fill-primary-foreground/60" />
          <circle cx="12" cy="5" r="1" className="fill-primary-foreground/60" />
          {/* Terminal prompt */}
          <path
            d="M6 13 L9 16 L6 19 M11 19 L16 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          />
          {/* Cloud/box icon in bottom right */}
          <rect x="18" y="18" width="8" height="8" rx="1" className="fill-primary-foreground/20" />
          <rect x="19.5" y="19.5" width="5" height="5" rx="0.5" className="fill-primary-foreground/40" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-lg tracking-tight">
          The<span className="text-primary">Cloud</span>box
        </span>
        <span className="text-[10px] text-muted-foreground tracking-wider font-mono">$ cloud-ready</span>
      </div>
    </div>
  )
}

export function CloudboxLogoCompact({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="28" height="28" rx="3" className="fill-primary" />
        <rect x="2" y="2" width="28" height="6" rx="3" className="fill-primary/80" />
        <circle cx="6" cy="5" r="1" className="fill-primary-foreground/60" />
        <circle cx="9" cy="5" r="1" className="fill-primary-foreground/60" />
        <circle cx="12" cy="5" r="1" className="fill-primary-foreground/60" />
        <path
          d="M6 13 L9 16 L6 19 M11 19 L16 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-foreground"
        />
        <rect x="18" y="18" width="8" height="8" rx="1" className="fill-primary-foreground/20" />
        <rect x="19.5" y="19.5" width="5" height="5" rx="0.5" className="fill-primary-foreground/40" />
      </svg>
      <span className="font-bold text-lg">
        The<span className="text-primary">Cloud</span>box
      </span>
    </div>
  )
}
