import React from 'react';

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Background radial glow */}
      <div className="absolute w-72 h-48 bg-cyan-500/15 rounded-full blur-3xl -z-10 transform translate-y-4" />
      <div className="absolute w-48 h-36 bg-blue-600/20 rounded-full blur-2xl -z-10 transform -translate-x-12" />

      <svg
        viewBox="0 0 460 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[420px] h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Gradients for Books */}
          <linearGradient id="bookTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="bookSpineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="bookEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Book 2 */}
          <linearGradient id="book2Top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Book 3 (Base) */}
          <linearGradient id="book3Top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Laptop Gradients */}
          <linearGradient id="laptopLid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="laptopScreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <linearGradient id="laptopBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Glass Lens Gradient */}
          <radialGradient id="lensGlow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#bae6fd" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
          </radialGradient>

          <linearGradient id="lensRim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Soft Ground Shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#030712" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base Floor Shadows */}
        <ellipse cx="230" cy="225" rx="190" ry="22" fill="url(#groundShadow)" />
        <ellipse cx="115" cy="222" rx="75" ry="18" fill="url(#groundShadow)" />

        {/* ================= STACK OF 3 BLUE BOOKS (LEFT) ================= */}
        {/* Book 3 (Bottom) */}
        <g id="book-bottom" transform="translate(45, 148)">
          {/* Bottom Spine/Front */}
          <path d="M5 24 L105 24 L110 40 L5 40 Z" fill="#172554" />
          {/* Pages */}
          <path d="M105 24 L142 6 L142 22 L110 40 Z" fill="url(#bookEdgeGrad)" />
          {/* Top Cover */}
          <path d="M5 24 L42 6 L142 6 L105 24 Z" fill="url(#book3Top)" />
          {/* Gold Bookmark ribbon detail */}
          <path d="M30 24 L30 42 L36 38 L42 42 L42 24 Z" fill="#fbbf24" opacity="0.9" />
        </g>

        {/* Book 2 (Middle) */}
        <g id="book-middle" transform="translate(52, 120)">
          {/* Front */}
          <path d="M5 24 L98 24 L103 38 L5 38 Z" fill="#1e3a8a" />
          {/* Pages */}
          <path d="M98 24 L132 8 L132 22 L103 38 Z" fill="url(#bookEdgeGrad)" />
          {/* Top Cover */}
          <path d="M5 24 L39 8 L132 8 L98 24 Z" fill="url(#book2Top)" />
        </g>

        {/* Book 1 (Top) */}
        <g id="book-top" transform="translate(58, 92)">
          {/* Front */}
          <path d="M5 24 L94 24 L98 38 L5 38 Z" fill="url(#bookSpineGrad)" />
          {/* Pages */}
          <path d="M94 24 L126 8 L126 22 L98 38 Z" fill="url(#bookEdgeGrad)" />
          {/* Page lines */}
          <line x1="97" y1="26" x2="124" y2="10" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
          <line x1="98" y1="31" x2="125" y2="15" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
          {/* Top Cover */}
          <path d="M5 24 L37 8 L126 8 L94 24 Z" fill="url(#bookTopGrad)" />
          {/* Modern embossed book pattern */}
          <path d="M30 18 L75 18" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          <path d="M30 21 L55 21" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* ================= SLEEK OPEN LAPTOP ================= */}
        {/* Laptop Screen Display */}
        <g id="laptop" transform="translate(160, 42)">
          {/* Outer Bezel (Slightly tilted 3D perspective) */}
          <rect
            x="35"
            y="12"
            width="170"
            height="118"
            rx="8"
            fill="url(#laptopLid)"
            stroke="#64748b"
            strokeWidth="2.5"
          />
          {/* Inner Display Screen */}
          <rect
            x="42"
            y="18"
            width="156"
            height="106"
            rx="4"
            fill="url(#laptopScreen)"
          />

          {/* Web / Research Document Header inside Screen */}
          <rect x="48" y="24" width="144" height="14" rx="2" fill="#e0f2fe" />
          <circle cx="56" cy="31" r="2.5" fill="#38bdf8" />
          <rect x="64" y="29" width="45" height="4" rx="2" fill="#0284c7" />

          {/* Document Content Lines on Screen */}
          <rect x="48" y="44" width="85" height="5" rx="2.5" fill="#94a3b8" />
          <rect x="48" y="53" width="70" height="4" rx="2" fill="#cbd5e1" />
          <rect x="48" y="60" width="78" height="4" rx="2" fill="#cbd5e1" />
          <rect x="48" y="67" width="62" height="4" rx="2" fill="#cbd5e1" />

          <rect x="48" y="77" width="55" height="4" rx="2" fill="#cbd5e1" />
          <rect x="48" y="84" width="72" height="4" rx="2" fill="#cbd5e1" />
          <rect x="48" y="91" width="66" height="4" rx="2" fill="#cbd5e1" />
          <rect x="48" y="98" width="50" height="4" rx="2" fill="#cbd5e1" />
          <rect x="48" y="105" width="68" height="4" rx="2" fill="#cbd5e1" />

          {/* Laptop Hinge & Base */}
          {/* Base bottom slab */}
          <path
            d="M5 132 L235 132 L215 152 L25 152 Z"
            fill="url(#laptopBase)"
            stroke="#475569"
            strokeWidth="1.5"
          />
          {/* Trackpad */}
          <path
            d="M102 136 L138 136 L134 148 L106 148 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="1"
          />
          {/* Front Lip */}
          <path
            d="M25 152 L215 152 L210 156 L30 156 Z"
            fill="#334155"
          />
        </g>

        {/* ================= MAGNIFYING GLASS OVER SCREEN ================= */}
        <g id="magnifier" transform="translate(258, 58)">
          {/* Circular Rim Shadow */}
          <ellipse cx="62" cy="62" rx="42" ry="42" fill="none" stroke="#0f172a" strokeWidth="10" opacity="0.3" />

          {/* Glass Lens with Radial Shimmer */}
          <circle cx="60" cy="60" r="38" fill="url(#lensGlow)" />

          {/* Zoomed Lines visible through lens */}
          <rect x="36" y="46" width="48" height="6" rx="3" fill="#0369a1" opacity="0.9" />
          <rect x="36" y="58" width="42" height="5" rx="2.5" fill="#0284c7" opacity="0.8" />
          <rect x="36" y="69" width="38" height="5" rx="2.5" fill="#38bdf8" opacity="0.75" />

          {/* Gloss Highlight Arc */}
          <path
            d="M34 50 A 30 30 0 0 1 78 34"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Heavy Dark Rim / Frame */}
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="url(#lensRim)"
            strokeWidth="6"
          />

          {/* Handle angled at 45 degrees downwards */}
          <g transform="translate(86, 86) rotate(45)">
            {/* Metal connector */}
            <rect x="-4" y="0" width="8" height="10" rx="1" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
            {/* Sleek Ergonomic Handle */}
            <rect x="-5" y="10" width="10" height="42" rx="4" fill="url(#lensRim)" stroke="#0f172a" strokeWidth="1" />
            {/* Grip detail ring */}
            <line x1="-5" y1="22" x2="5" y2="22" stroke="#64748b" strokeWidth="1" />
            <line x1="-5" y1="26" x2="5" y2="26" stroke="#64748b" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
};
