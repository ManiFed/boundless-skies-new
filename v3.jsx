/* Variation 3 — Twilight Horizon (DUAL FOCUS: nature + astronomy)
   Tagline: "Accessible wonder for all"
   Sunset hero with animated bird silhouettes drifting across the sky.
   African savanna silhouette band along the horizon: animated giraffe browsing,
   elephant walking, antelope running. Below the hero, the page balances
   astronomy content with terrestrial-nature content — equal weight.
*/

// ───── Animated bird silhouettes (flapping, drifting across hero) ─────
const Birds = () => {
  // Each bird: a path with a class that animates the wing y-scale.
  // The whole flock translates across the sky on different durations.
  const flock = [
    { delay: 0,    dur: 38, top: "22%", scale: 1.0,  flap: 0.7 },
    { delay: 4,    dur: 44, top: "28%", scale: 0.85, flap: 0.9 },
    { delay: 9,    dur: 36, top: "18%", scale: 0.7,  flap: 1.1 },
    { delay: 14,   dur: 50, top: "34%", scale: 1.15, flap: 0.6 },
    { delay: 18,   dur: 42, top: "24%", scale: 0.6,  flap: 1.3 },
    { delay: 23,   dur: 48, top: "30%", scale: 0.9,  flap: 0.8 },
    { delay: 28,   dur: 40, top: "20%", scale: 0.55, flap: 1.4 },
  ];
  return (
    <div style={birdsStyles.layer} aria-hidden="true">
      {flock.map((b, i) => (
        <div
          key={i}
          style={{
            ...birdsStyles.bird,
            top: b.top,
            transform: `scale(${b.scale})`,
            animation: `bs-bird-cross ${b.dur}s linear ${b.delay}s infinite`,
          }}
        >
          <svg
            width="56"
            height="22"
            viewBox="0 0 56 22"
            style={{
              animation: `bs-bird-flap ${b.flap}s ease-in-out infinite`,
              transformOrigin: "center",
            }}
          >
            <path
              d="M 2 14 Q 10 4 18 12 Q 24 6 28 10 Q 32 6 38 12 Q 46 4 54 14"
              fill="none"
              stroke="#0A0E1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes bs-bird-cross {
          0%   { left: -8%;  }
          100% { left: 108%; }
        }
        @keyframes bs-bird-flap {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.35); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-bs-bird] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
const birdsStyles = {
  layer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    overflow: "hidden",
  },
  bird: {
    position: "absolute",
    left: "-8%",
    willChange: "transform, left",
  },
};

// ───── Savanna silhouette band — animated wildlife crossing horizon ─────
// `sunless` skips drawing the sun (used for the footer band — sun lives in hero)
const SavannaBand = ({ height = 220, sunless = false }) => {
  return (
    <div style={{ position: "relative", height, overflow: "hidden" }} aria-hidden="true">
      {/* Sky-to-ground gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #f3a84e 0%, #e07a3a 30%, #8a3a26 65%, #2a1530 100%)",
        }}
      />
      {/* Sun disc setting on horizon */}
      {!sunless && (
        <div
          style={{
            position: "absolute",
            left: "62%",
            bottom: "32%",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffe2a8 0%, #ffb464 60%, transparent 80%)",
            boxShadow: "0 0 80px 20px rgba(255,180,100,0.4)",
          }}
        />
      )}

      {/* Distant acacia layer (further, paler, slow) */}
      <svg viewBox="0 0 1600 220" preserveAspectRatio="xMidYEnd slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}>
        <g fill="#3a1a2c">
          {/* rolling hills */}
          <path d="M 0 180 Q 200 150 400 165 T 800 160 T 1200 170 T 1600 158 L 1600 220 L 0 220 Z" />
          {/* far acacias (small) */}
          {[120, 280, 510, 720, 940, 1180, 1380, 1520].map((x, i) => (
            <g key={i} transform={`translate(${x}, 162)`}>
              <rect x="-1" y="0" width="2" height="14" />
              <ellipse cx="0" cy="-2" rx="10" ry="4" />
            </g>
          ))}
        </g>
      </svg>

      {/* Foreground silhouette ground + animated wildlife */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60%" }}>
        {/* Ground */}
        <div
          style={{
            position: "absolute",
            left: 0, right: 0, bottom: 0,
            height: "55%",
            background: "#0A0E1F",
            clipPath: "polygon(0 28%, 8% 22%, 22% 32%, 38% 18%, 55% 28%, 72% 16%, 88% 26%, 100% 20%, 100% 100%, 0 100%)",
          }}
        />

        {/* Big foreground acacia, left */}
        <svg viewBox="0 0 240 200" style={{ position: "absolute", left: "3%", bottom: 0, width: 220, height: 180 }}>
          <g fill="#0A0E1F">
            <rect x="115" y="80" width="6" height="120" />
            <path d="M 118 92 Q 100 84 88 78 Q 78 76 72 80 Q 86 88 102 90 Z" />
            <path d="M 118 88 Q 134 80 152 76 Q 162 76 168 80 Q 152 86 134 88 Z" />
            <ellipse cx="120" cy="74" rx="60" ry="14" />
            <ellipse cx="100" cy="68" rx="28" ry="6" />
            <ellipse cx="146" cy="70" rx="22" ry="5" />
          </g>
        </svg>

        {/* Giraffe — browsing, gentle bob */}
        <div style={savannaStyles.giraffe}>
          <svg viewBox="0 0 120 160" width="110" height="146">
            <g fill="#0A0E1F">
              {/* legs */}
              <rect x="22" y="80" width="6" height="70" />
              <rect x="36" y="80" width="6" height="70" />
              <rect x="68" y="80" width="6" height="70" />
              <rect x="82" y="80" width="6" height="70" />
              {/* body */}
              <rect x="18" y="68" width="76" height="20" rx="6" />
              {/* neck */}
              <path d="M 78 68 Q 86 50 92 30 L 102 28 Q 96 50 88 72 Z" />
              {/* head */}
              <path d="M 92 28 Q 110 22 114 18 L 116 24 Q 108 30 96 34 Z" />
              {/* ossicones */}
              <rect x="100" y="14" width="2" height="8" />
              <rect x="104" y="14" width="2" height="8" />
              {/* tail */}
              <path d="M 18 70 L 12 78 L 14 80 L 20 76 Z" />
            </g>
          </svg>
        </div>

        {/* Elephant — slow walking right-to-left */}
        <div style={savannaStyles.elephant}>
          <svg viewBox="0 0 200 120" width="170" height="102">
            <g fill="#0A0E1F">
              {/* body */}
              <ellipse cx="100" cy="58" rx="62" ry="32" />
              {/* head */}
              <ellipse cx="48" cy="58" rx="28" ry="26" />
              {/* ear */}
              <path d="M 36 42 Q 18 38 14 56 Q 22 70 38 66 Z" />
              {/* trunk - slight curve */}
              <path className="bs-trunk" d="M 28 70 Q 14 86 10 100 Q 14 104 22 100 Q 30 88 38 78 Z" />
              {/* tusk */}
              <path d="M 36 78 Q 30 86 28 92 L 32 92 Q 36 84 40 80 Z" fill="#F5EBD3" />
              {/* legs */}
              <rect x="58" y="80" width="14" height="30" />
              <rect x="86" y="84" width="14" height="28" />
              <rect x="120" y="80" width="14" height="30" />
              <rect x="146" y="84" width="14" height="28" />
              {/* tail */}
              <path d="M 162 56 Q 174 60 176 70 L 172 72 Q 168 64 160 62 Z" />
            </g>
          </svg>
        </div>

        {/* Antelope/gazelle — running across faster */}
        <div style={savannaStyles.antelope}>
          <svg viewBox="0 0 100 70" width="80" height="56">
            <g fill="#0A0E1F">
              {/* body */}
              <ellipse cx="50" cy="34" rx="28" ry="10" />
              {/* neck + head */}
              <path d="M 72 34 Q 80 20 86 14 L 92 16 Q 88 26 80 36 Z" />
              {/* horns */}
              <path d="M 84 14 Q 88 6 92 2 M 88 14 Q 94 8 98 4" stroke="#0A0E1F" strokeWidth="1.5" fill="none" />
              {/* legs - mid-stride */}
              <path className="bs-leg-1" d="M 32 42 L 26 64 M 36 42 L 38 64" stroke="#0A0E1F" strokeWidth="3" />
              <path className="bs-leg-2" d="M 62 42 L 56 64 M 66 42 L 70 64" stroke="#0A0E1F" strokeWidth="3" />
              {/* tail */}
              <path d="M 22 32 L 14 30 L 22 36 Z" />
            </g>
          </svg>
        </div>

        {/* Birds-in-distance over horizon */}
        <div style={savannaStyles.farBirds}>
          <svg viewBox="0 0 200 30" width="160" height="22">
            <g fill="none" stroke="#0A0E1F" strokeWidth="1.5" strokeLinecap="round">
              <path d="M 4 14 Q 10 8 16 14 Q 22 8 28 14" />
              <path d="M 50 10 Q 56 4 62 10 Q 68 4 74 10" />
              <path d="M 110 16 Q 116 10 122 16 Q 128 10 134 16" />
              <path d="M 160 12 Q 166 6 172 12 Q 178 6 184 12" />
            </g>
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes bs-giraffe-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        @keyframes bs-elephant-walk {
          0%   { right: -12%; }
          100% { right: 110%; }
        }
        @keyframes bs-antelope-run {
          0%   { left: -10%; }
          100% { left: 110%; }
        }
        @keyframes bs-far-birds-drift {
          0%   { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
        @keyframes bs-trunk-sway {
          0%, 100% { transform: rotate(0deg); transform-origin: 30px 70px; }
          50%      { transform: rotate(-6deg); transform-origin: 30px 70px; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-bs-anim] { animation: none !important; }
        }
      `}</style>
    </div>
  );
};
const savannaStyles = {
  giraffe: {
    position: "absolute",
    left: "22%",
    bottom: "8%",
    animation: "bs-giraffe-bob 3.4s ease-in-out infinite",
  },
  elephant: {
    position: "absolute",
    bottom: "6%",
    right: "-12%",
    animation: "bs-elephant-walk 48s linear infinite",
  },
  antelope: {
    position: "absolute",
    bottom: "16%",
    left: "-10%",
    animation: "bs-antelope-run 22s linear infinite",
  },
  farBirds: {
    position: "absolute",
    top: "8%",
    left: "30%",
    animation: "bs-far-birds-drift 6s ease-in-out infinite alternate",
    opacity: 0.7,
  },
};

// ─────────────────────────────────────────────────────────────────────
const V3 = () => {
  return (
    <div style={v3.root}>
      <style>{`
        @keyframes bs-svg-elephant-walk {
          0%   { transform: translateX(1700px); }
          100% { transform: translateX(-200px); }
        }
        @keyframes bs-svg-antelope-run {
          0%   { transform: translateX(-400px); }
          100% { transform: translateX(1700px); }
        }
        @keyframes bs-svg-zebra-drift {
          0%   { transform: translateX(900px); }
          100% { transform: translateX(-300px); }
        }
        @keyframes bs-svg-giraffe-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        .bs-svg-elephant   { animation: bs-svg-elephant-walk 80s linear infinite; }
        .bs-svg-antelopes  { animation: bs-svg-antelope-run 32s linear infinite; }
        .bs-svg-zebras     { animation: bs-svg-zebra-drift 120s linear infinite; }
        .bs-svg-giraffe    { animation: bs-svg-giraffe-bob 3.4s ease-in-out infinite; transform-origin: center bottom; transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) {
          .bs-svg-elephant, .bs-svg-antelopes, .bs-svg-zebras, .bs-svg-giraffe { animation: none; }
        }
      `}</style>
      {/* NAV */}
      <header style={v3.nav}>
        <Wordmark size={18} light={false} />
        <nav style={v3.navLinks}>
          {["Mission", "Wildlife", "Sky", "Events", "Host", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={v3.navLink}>{l}</a>
          ))}
        </nav>
        <div style={v3.navRight}>
          <a href="#" style={v3.navLink}>Donate</a>
          <a href="#events" style={v3.navCta}>Find an event</a>
        </div>
      </header>

      {/* HERO — one continuous twilight illustration:
           stars fade into sunset → sun setting behind acacia hills →
           savanna silhouette ground with animated wildlife. */}
      <section style={v3.hero}>
        {/* Layer 1 — sky stars (fade out where the sunset begins) */}
        <div style={v3.heroStars}>
          <Starfield density={0.9} intensity={0.85} />
        </div>
        {/* Layer 2 — sun glow halo (BEHIND hills) */}
        <div style={v3.heroSunHalo} />
        <div style={v3.heroSun} />
        {/* Layer 3 — drifting birds, above sun, below hills */}
        <Birds />

        {/* Layer 4 — ONE horizon line. Single ground silhouette across the
             whole hero, with acacias rooted at it and the sun setting behind it.
             Wildlife walks on this same line. */}
        <svg
          viewBox="0 0 1600 520"
          preserveAspectRatio="xMidYEnd slice"
          style={v3.heroHorizonSvg}
          aria-hidden="true"
        >
          {/* Single horizon — gently undulating, fills bottom of hero */}
          <g fill="#0A0E1F">
            <path d="M 0 80 Q 200 70 420 78 Q 640 86 880 76 Q 1120 68 1340 80 Q 1480 86 1600 78 L 1600 520 L 0 520 Z" />
          </g>
          {/* Acacias rooted on the horizon line — varied heights for parallax feel
              but ALL standing on the same ground. */}
          <g fill="#0A0E1F">
            {[
              { x: 90,   trunk: 36, canopy: 18 },
              { x: 240,  trunk: 28, canopy: 14 },
              { x: 380,  trunk: 44, canopy: 22 },
              { x: 560,  trunk: 32, canopy: 16 },
              { x: 720,  trunk: 26, canopy: 13 },
              { x: 940,  trunk: 38, canopy: 20 },
              { x: 1120, trunk: 30, canopy: 15 },
              { x: 1280, trunk: 42, canopy: 22 },
              { x: 1460, trunk: 28, canopy: 14 },
              { x: 1560, trunk: 34, canopy: 17 },
            ].map((t, i) => {
              // Trunk base sits on horizon (~y=78 with slight wobble)
              const baseY = 78 + Math.sin(t.x * 0.01) * 4;
              return (
                <g key={i} transform={`translate(${t.x}, ${baseY})`}>
                  <rect x="-1.5" y={-t.trunk} width="3" height={t.trunk} />
                  <ellipse cx="0" cy={-t.trunk - 2} rx={t.canopy * 1.6} ry={t.canopy * 0.5} />
                </g>
              );
            })}
          </g>
          {/* Foreground hero acacia — larger, on the same horizon, far left */}
          <g fill="#0A0E1F" transform="translate(180, 78)">
            <rect x="-3" y="-110" width="6" height="110" />
            <path d="M 0 -118 Q -40 -126 -68 -132 Q -82 -132 -88 -126 Q -68 -118 -40 -114 Z" />
            <path d="M 0 -120 Q 38 -128 70 -134 Q 86 -132 92 -126 Q 70 -118 40 -116 Z" />
            <ellipse cx="0" cy="-136" rx="78" ry="18" />
            <ellipse cx="-30" cy="-142" rx="34" ry="8" />
            <ellipse cx="32" cy="-140" rx="28" ry="7" />
          </g>
          {/* Tall grass tufts along the horizon */}
          <g stroke="#0A0E1F" strokeWidth="1.6" strokeLinecap="round" fill="none">
            {[40, 130, 320, 500, 660, 840, 1020, 1200, 1380, 1530].map((x, i) => {
              const y = 78 + Math.sin(x * 0.01) * 4;
              return (
                <g key={i} transform={`translate(${x}, ${y})`}>
                  <path d="M 0 0 L -3 -10" />
                  <path d="M 0 0 L 0 -12" />
                  <path d="M 0 0 L 3 -10" />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Layer 5 — animated wildlife, ALL standing on the same horizon line.
             Rendered inside an SVG that uses the same viewBox as the horizon
             so coordinates line up exactly. */}
        <svg
          viewBox="0 0 1600 520"
          preserveAspectRatio="xMidYEnd slice"
          style={v3.heroWildlifeSvg}
          aria-hidden="true"
        >
          {/* Giraffe — standing near foreground acacia, gentle bob */}
          <g className="bs-svg-giraffe" fill="#0A0E1F">
            <g transform="translate(310, 78)">
              {/* legs end at y=0 (horizon), body above */}
              <rect x="-22" y="-70" width="6" height="70" />
              <rect x="-8" y="-70" width="6" height="70" />
              <rect x="22" y="-70" width="6" height="70" />
              <rect x="36" y="-70" width="6" height="70" />
              <rect x="-26" y="-86" width="72" height="20" rx="6" />
              <path d="M 32 -86 Q 40 -106 46 -126 L 56 -128 Q 50 -106 42 -82 Z" />
              <path d="M 46 -128 Q 64 -134 68 -138 L 70 -132 Q 62 -126 50 -122 Z" />
              <rect x="54" y="-142" width="2" height="8" />
              <rect x="58" y="-142" width="2" height="8" />
            </g>
          </g>

          {/* Elephant — slow walk across the horizon, right to left */}
          <g className="bs-svg-elephant" fill="#0A0E1F">
            <g transform="translate(0, 78)">
              <ellipse cx="0" cy="-32" rx="62" ry="32" />
              <ellipse cx="-52" cy="-32" rx="28" ry="26" />
              <path d="M -64 -48 Q -82 -52 -86 -34 Q -78 -20 -62 -24 Z" />
              <path d="M -72 -20 Q -86 -4 -90 10 Q -86 14 -78 10 Q -70 -2 -62 -12 Z" />
              <rect x="-42" y="-10" width="14" height="10" />
              <rect x="-14" y="-6" width="14" height="6" />
              <rect x="20" y="-10" width="14" height="10" />
              <rect x="46" y="-6" width="14" height="6" />
              <path d="M 62 -34 Q 74 -30 76 -20 L 72 -18 Q 68 -26 60 -28 Z" />
            </g>
          </g>

          {/* Antelope herd — running across the horizon left to right */}
          <g className="bs-svg-antelopes" fill="#0A0E1F">
            {[0, 90, 165, 230, 310].map((dx, i) => (
              <g key={i} transform={`translate(${dx}, ${78 + (i % 2) * 1})`}>
                <ellipse cx="50" cy="-26" rx="20" ry="7" />
                <path d="M 66 -26 Q 72 -36 76 -40 L 80 -38 Q 76 -32 70 -24 Z" />
                <path d="M 76 -40 Q 78 -46 80 -48 M 78 -40 Q 82 -44 84 -46" stroke="#0A0E1F" strokeWidth="1.2" fill="none" />
                <path d="M 38 -20 L 34 -2 M 42 -20 L 44 -2" stroke="#0A0E1F" strokeWidth="2.5" />
                <path d="M 58 -20 L 54 -2 M 62 -20 L 66 -2" stroke="#0A0E1F" strokeWidth="2.5" />
                <path d="M 32 -28 L 26 -28 L 32 -24 Z" />
              </g>
            ))}
          </g>

          {/* Distant zebra herd — tiny, walking opposite direction far away */}
          <g className="bs-svg-zebras" fill="#0A0E1F" opacity="0.85">
            {[0, 24, 50, 74, 98, 124, 148].map((dx, i) => (
              <g key={i} transform={`translate(${dx}, ${78 + (i % 2)})`}>
                <ellipse cx="0" cy="-8" rx="6" ry="2.5" />
                <rect x="-5" y="-6" width="1.4" height="6" />
                <rect x="3.6" y="-6" width="1.4" height="6" />
                <ellipse cx="6" cy="-11" rx="2.5" ry="2" />
              </g>
            ))}
          </g>
        </svg>

        <div style={v3.heroContent}>
          <div style={v3.heroEyebrow}>● An initiative for accessible nature &amp; astronomy</div>
          <h1 style={v3.heroH1}>
            <em style={v3.heroH1Em}>Accessible wonder</em><br />
            <span style={v3.heroH1Soft}>for all.</span>
          </h1>
          <p style={v3.heroSub}>
            Boundless Skies opens the natural world — from rising
            constellations to grazing wildlife — to children and adults
            of every ability. We design the equipment, the events, and
            the experience around the people who join us.
          </p>
          <div style={v3.heroCtas}>
            <a href="#events" style={v3.btnPrimary}>Find an event near you →</a>
            <a href="#mission" style={v3.btnSubtle}>Read our mission</a>
          </div>
        </div>

        <div style={v3.heroNext}>
          <div style={v3.heroNextLabel}>NEXT EVENT</div>
          <div style={v3.heroNextTitle}>Sunset Safari &amp; Spring Stars</div>
          <div style={v3.heroNextMeta}>16 May · 7:00 PM · Cedar Ridge, NC</div>
        </div>
      </section>

      {/* DUAL FOCUS — sky / earth equal weight */}
      <section id="mission" style={v3.dualSection}>
        <div style={v3.container}>
          <SectionEyebrow color="#C24B16">Our Mission</SectionEyebrow>
          <h2 style={v3.h2}>
            Awe lives in two directions — <em style={v3.italicWarm}>upward and outward.</em>
          </h2>
          <p style={{ ...v3.body, fontSize: 19, maxWidth: 720, marginTop: 20 }}>
            All of us who gaze upon the night sky — or watch a flock turn
            against the sunset — share a sense of awe and wonder that puts
            everything else into perspective. It is a powerful feeling, and
            one that everyone deserves to have.
          </p>

          <div style={v3.dualGrid}>
            {/* SKY column */}
            <div style={v3.dualCard}>
              <div style={v3.dualIcon}>
                <svg viewBox="0 0 60 60" width="48" height="48">
                  <g fill="#C24B16">
                    <circle cx="14" cy="14" r="2" />
                    <circle cx="46" cy="10" r="1.5" />
                    <circle cx="38" cy="26" r="2.5" />
                    <circle cx="22" cy="34" r="1.5" />
                    <circle cx="50" cy="40" r="2" />
                    <circle cx="12" cy="48" r="1.8" />
                    <circle cx="32" cy="50" r="2.2" />
                  </g>
                  <g stroke="#C24B16" strokeWidth="0.8" fill="none" opacity="0.5">
                    <line x1="14" y1="14" x2="38" y2="26" />
                    <line x1="38" y1="26" x2="22" y2="34" />
                    <line x1="38" y1="26" x2="50" y2="40" />
                    <line x1="22" y1="34" x2="32" y2="50" />
                  </g>
                </svg>
              </div>
              <div style={v3.dualKicker}>The sky above</div>
              <h3 style={v3.dualH3}>Astronomy that meets you where you are.</h3>
              <p style={v3.body}>
                Hands-free optics on parallelogram mounts. Carefully positioned
                tripods and eyepieces. Smart telescopes with high-contrast
                displays. Sky charts in large print, in braille, and read aloud.
              </p>
              <ul style={v3.dualList}>
                <li>Seated and supine viewing</li>
                <li>Smart-display scopes for low vision</li>
                <li>ASL interpretation at every event</li>
                <li>Sensory-friendly hours and run-of-show</li>
              </ul>
              <a href="#sky" style={v3.linkWarm}>Our astronomy program →</a>
            </div>

            {/* WILDLIFE column */}
            <div style={v3.dualCard}>
              <div style={v3.dualIcon}>
                <svg viewBox="0 0 60 60" width="48" height="48">
                  <g fill="#C24B16">
                    {/* tiny giraffe + bird */}
                    <rect x="38" y="22" width="3" height="26" />
                    <rect x="34" y="40" width="3" height="14" />
                    <rect x="42" y="40" width="3" height="14" />
                    <rect x="46" y="40" width="3" height="14" />
                    <rect x="30" y="40" width="3" height="14" />
                    <path d="M 32 40 L 50 40 L 50 32 L 46 18 L 50 14 L 52 18 L 50 26 L 50 40 Z" />
                    <path d="M 6 18 Q 12 12 18 18 Q 24 12 30 18" stroke="#C24B16" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
              <div style={v3.dualKicker}>The earth around</div>
              <h3 style={v3.dualH3}>Wildlife and wild places, for every body.</h3>
              <p style={v3.body}>
                Birding from raised platforms. Tactile field guides for the
                blind. Quiet observation blinds for autistic guests. Trail
                programs designed alongside the people who use them — so the
                more-than-human world is a place anyone can spend an evening.
              </p>
              <ul style={v3.dualList}>
                <li>Accessible birding hides &amp; raised hides</li>
                <li>Tactile and audio field guides</li>
                <li>Sensory rest spaces on every walk</li>
                <li>Partnerships with sanctuaries &amp; reserves</li>
              </ul>
              <a href="#wildlife" style={v3.linkWarm}>Our nature program →</a>
            </div>
          </div>
        </div>
      </section>

      {/* WILDLIFE band — animated savanna again, used as a section break with copy */}
      <section id="wildlife" style={v3.bandSection}>
        <SavannaBand height={260} sunless />
        <div style={v3.bandOverlay}>
          <div style={v3.container}>
            <SectionEyebrow color="#FFD99C">In the field</SectionEyebrow>
            <h2 style={{ ...v3.h2, color: "#F5EBD3", maxWidth: 760 }}>
              From a heron at dusk to <em style={{ ...v3.italicWarm, color: "#FFD99C" }}>Saturn at midnight</em> — one continuous evening of wonder.
            </h2>
          </div>
        </div>
      </section>

      {/* PEOPLE STRIP — quotes / faces */}
      <section style={v3.peopleSection}>
        <div style={v3.container}>
          <SectionEyebrow color="#C24B16">In their words</SectionEyebrow>
          <div style={v3.peopleGrid}>
            {[
              {
                q: "The first time my son saw Saturn through their scope — without me lifting him — he said he could be an astronaut. He's seven.",
                w: "Marina K., parent",
                p: "Portrait — parent and child outside, dusk",
              },
              {
                q: "I'd given up on telescopes years ago. Their parallelogram mount let me look at the moon from my chair, and I cried.",
                w: "James A., guest",
                p: "Portrait — guest at parallelogram mount",
              },
              {
                q: "On the bird walk they had a tactile field guide. My daughter is blind and she felt the shape of a kingfisher's beak. She hasn't stopped talking about it.",
                w: "Dr. Patel, Cedar Ridge School",
                p: "Portrait — educator with student, raised birding hide",
              },
            ].map((t, i) => (
              <figure key={i} style={v3.testimonial}>
                <ImgPlaceholder tone="light" ratio="4 / 5" label={t.p} />
                <blockquote style={v3.quote}>"{t.q}"</blockquote>
                <figcaption style={v3.who}>— {t.w}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONSTELLATION MAP */}
      <section id="sky" style={v3.darkSection}>
        <div style={v3.container}>
          <div style={v3.constHead}>
            <div>
              <SectionEyebrow color="#E8B86D">Who we observe with</SectionEyebrow>
              <h2 style={{ ...v3.h2, color: "#F5EBD3" }}>
                Each pattern is <em style={{ ...v3.italicWarm, color: "#E8B86D" }}>someone we share the sky with.</em>
              </h2>
            </div>
            <p style={v3.bodyDark}>
              Hover the constellations. The design of every event we run —
              under the stars or in the sanctuary — begins with the people
              in it.
            </p>
          </div>
          <ConstellationMap height={520} />
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={v3.section}>
        <div style={v3.container}>
          <div style={v3.eventsHead}>
            <div>
              <SectionEyebrow color="#C24B16">Upcoming events</SectionEyebrow>
              <h2 style={v3.h2}>Come look up — and out — with us.</h2>
              <p style={{ ...v3.body, marginTop: 16, maxWidth: 560 }}>
                All Boundless Skies events are free and open to anyone.
                Each is built with adaptive equipment and patient guides,
                and most pair an astronomy session with a wildlife walk.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            {EVENTS.map((ev, i) => <EventCard key={i} ev={ev} variant="light" />)}
            <div style={{ borderTop: "1px solid rgba(10,14,31,0.12)" }} />
          </div>
        </div>
      </section>

      {/* HOST */}
      <section id="host" style={v3.hostBanner}>
        <div style={v3.hostBannerBg}>
          <Starfield density={0.7} intensity={0.7} />
        </div>
        <div style={v3.container}>
          <div style={v3.hostInner}>
            <div>
              <SectionEyebrow color="#E8B86D">Host an event</SectionEyebrow>
              <h2 style={{ ...v3.h2, color: "#F5EBD3" }}>
                Schools, residences, sanctuaries — <em style={{ ...v3.italicWarm, color: "#E8B86D" }}>we'll bring the wild &amp; the sky to you.</em>
              </h2>
              <p style={{ ...v3.bodyDark, maxWidth: 580, marginTop: 24 }}>
                Our team handles the equipment, training for staff, and a
                full accessibility assessment of your site. There is no
                cost to the host. We work in evenings, in weather, with
                groups large and small.
              </p>
            </div>
            <div style={v3.hostSteps}>
              {[
                ["1", "Tell us about your site", "Indoor and outdoor space, lighting, who you serve."],
                ["2", "We assess and plan", "Equipment selection, staff training, run-of-show."],
                ["3", "Together, we look up", "Two to three hours, with structure and quiet built in."],
              ].map(([n, t, b]) => (
                <div key={n} style={v3.hostStep}>
                  <div style={v3.hostStepN}>{n}</div>
                  <div>
                    <div style={v3.hostStepT}>{t}</div>
                    <div style={v3.hostStepB}>{b}</div>
                  </div>
                </div>
              ))}
              <a href="#contact" style={{ ...v3.btnPrimary, marginTop: 16, display: "inline-block" }}>
                Request a visit →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={v3.section}>
        <div style={v3.container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 36 }}>
            <div>
              <SectionEyebrow color="#C24B16">From the field</SectionEyebrow>
              <h2 style={v3.h2}>Faces, fur, feathers, and the sky above.</h2>
            </div>
            <a href="#" style={v3.linkWarm}>See the full archive →</a>
          </div>
          <div style={v3.galleryGrid}>
            <ImgPlaceholder tone="light" ratio="4 / 3" label="Star party at residential school, golden hour" style={{ gridColumn: "span 2", gridRow: "span 2" }} />
            <ImgPlaceholder tone="light" ratio="1 / 1" label="Saturn through a smart telescope display" />
            <ImgPlaceholder tone="light" ratio="1 / 1" label="Tactile field guide — kingfisher bill" />
            <ImgPlaceholder tone="light" ratio="1 / 1" label="Heron at dusk, raised viewing hide" />
            <ImgPlaceholder tone="light" ratio="1 / 1" label="Wheelchair user reaching the eyepiece" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={v3.contactSection}>
        <div style={v3.container}>
          <div style={v3.contactGrid}>
            <div>
              <SectionEyebrow color="#C24B16">Stay in touch</SectionEyebrow>
              <h2 style={v3.h2}>
                A monthly note from <em style={v3.italicWarm}>under the stars and out in the field.</em>
              </h2>
              <p style={{ ...v3.body, maxWidth: 460, marginTop: 16 }}>
                What's worth looking at this month, where we'll be, and
                what we're learning from the people we observe with.
              </p>
              <div style={{ marginTop: 32 }}>
                <Newsletter tone="light" />
              </div>
            </div>
            <div style={v3.contactRight}>
              <div>
                <div style={v3.contactLabel}>Email</div>
                <a href="mailto:hello@boundlessskies.org" style={v3.contactValue}>hello@boundlessskies.org</a>
              </div>
              <div>
                <div style={v3.contactLabel}>Phone</div>
                <a href="tel:" style={v3.contactValue}>+1 (828) 555-0142</a>
              </div>
              <div>
                <div style={v3.contactLabel}>Mail</div>
                <div style={v3.contactValue}>P.O. Box 412, Asheville, NC 28801</div>
              </div>
              <div>
                <div style={v3.contactLabel}>Press &amp; partnerships</div>
                <a href="mailto:press@boundlessskies.org" style={v3.contactValue}>press@boundlessskies.org</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER with savanna silhouette band on top */}
      <footer style={v3.footer}>
        <SavannaBand height={180} sunless />
        <div style={v3.container}>
          <div style={v3.footerTop}>
            <Wordmark size={20} light withTag />
            <p style={v3.footerCredo}>
              <em>Accessible wonder, for all — above and below.</em>
            </p>
          </div>
          <div style={v3.footerGrid}>
            <div>
              <div style={v3.footerColTitle}>About</div>
              <a href="#" style={v3.footerLink}>Mission</a>
              <a href="#" style={v3.footerLink}>Team</a>
              <a href="#" style={v3.footerLink}>Press</a>
            </div>
            <div>
              <div style={v3.footerColTitle}>Get involved</div>
              <a href="#" style={v3.footerLink}>Attend an event</a>
              <a href="#" style={v3.footerLink}>Host at your site</a>
              <a href="#" style={v3.footerLink}>Volunteer</a>
              <a href="#" style={v3.footerLink}>Donate</a>
            </div>
            <div>
              <div style={v3.footerColTitle}>Resources</div>
              <a href="#" style={v3.footerLink}>Accessibility statement</a>
              <a href="#" style={v3.footerLink}>Equipment guides</a>
              <a href="#" style={v3.footerLink}>Hosting checklist</a>
            </div>
            <div>
              <div style={v3.footerColTitle}>Newsletter</div>
              <Newsletter tone="dark" />
            </div>
          </div>
          <div style={v3.footerBottom}>
            <span>© 2026 Boundless Skies · A 501(c)(3) initiative</span>
            <span>All adaptations open and shared.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const v3 = {
  root: {
    background: "#FBF4E0",
    color: "#0A0E1F",
    fontFamily: '"Inter", sans-serif',
    minHeight: "100%",
  },
  nav: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    zIndex: 10,
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "24px 56px",
  },
  navLinks: {
    display: "flex",
    gap: 28,
    justifyContent: "center",
  },
  navLink: {
    color: "#F5EBD3",
    textDecoration: "none",
    fontSize: 14,
    letterSpacing: "0.04em",
    opacity: 0.92,
  },
  navRight: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    justifySelf: "end",
  },
  navCta: {
    background: "#E8B86D",
    color: "#0A0E1F",
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "10px 18px",
    borderRadius: 2,
    fontWeight: 500,
  },

  hero: {
    position: "relative",
    height: 940,
    overflow: "hidden",
    background: "linear-gradient(180deg, #050816 0%, #0a0e1f 12%, #1c1d3d 28%, #4a2244 48%, #8a3a26 64%, #c24b16 78%, #e07a3a 88%, #f3a84e 96%, #ffc683 100%)",
  },
  heroStars: {
    position: "absolute",
    top: 0, left: 0, right: 0, height: "45%",
    opacity: 0.85,
    maskImage: "linear-gradient(180deg, #000 0%, #000 60%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 60%, transparent 100%)",
  },
  heroSunHalo: {
    position: "absolute",
    bottom: 240,
    left: "58%",
    transform: "translateX(-50%)",
    width: 720,
    height: 720,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,226,168,0.55) 0%, rgba(255,180,100,0.35) 25%, rgba(243,168,78,0.18) 50%, transparent 70%)",
    pointerEvents: "none",
    filter: "blur(2px)",
  },
  heroSun: {
    position: "absolute",
    bottom: 230,
    left: "58%",
    transform: "translateX(-50%)",
    width: 240,
    height: 240,
    borderRadius: "50%",
    background: "radial-gradient(circle, #fff4d4 0%, #ffd99c 35%, #ffb464 65%, #f3a84e 90%)",
    opacity: 0.98,
    pointerEvents: "none",
    boxShadow: "0 0 120px 40px rgba(255,180,100,0.35)",
  },
  heroHorizonSvg: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    width: "100%",
    height: 520,
    pointerEvents: "none",
  },
  heroWildlifeSvg: {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    width: "100%",
    height: 520,
    pointerEvents: "none",
    zIndex: 1,
  },
  svgGiraffe: {
    transformOrigin: "center bottom",
    animation: "bs-giraffe-bob 3.4s ease-in-out infinite",
  },
  svgElephant: {
    animation: "bs-elephant-walk-svg 60s linear infinite",
  },
  svgAntelopes: {
    animation: "bs-antelope-run-svg 28s linear infinite",
  },
  svgZebras: {
    animation: "bs-zebra-drift-svg 90s linear infinite",
  },
  heroContent: {
    position: "relative",
    padding: "150px 56px 0",
    maxWidth: 1180,
    margin: "0 auto",
    color: "#F5EBD3",
    zIndex: 2,
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: "#FFD99C",
    marginBottom: 32,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  heroH1: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 124,
    lineHeight: 0.96,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.02em",
    textWrap: "balance",
  },
  heroH1Soft: {
    color: "rgba(245,235,211,0.82)",
  },
  heroH1Em: {
    fontStyle: "italic",
    color: "#FFD99C",
  },
  heroSub: {
    fontSize: 19,
    lineHeight: 1.6,
    color: "rgba(245,235,211,0.9)",
    maxWidth: 560,
    marginTop: 32,
  },
  heroCtas: {
    display: "flex",
    gap: 16,
    marginTop: 40,
    alignItems: "center",
  },
  btnPrimary: {
    background: "#E8B86D",
    color: "#0A0E1F",
    padding: "16px 26px",
    fontSize: 14,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 500,
    textDecoration: "none",
    borderRadius: 2,
  },
  btnSubtle: {
    color: "#F5EBD3",
    padding: "16px 24px",
    fontSize: 14,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 500,
    textDecoration: "none",
    border: "1px solid rgba(245,235,211,0.45)",
    borderRadius: 2,
  },
  heroNext: {
    position: "absolute",
    right: 56,
    bottom: 56,
    background: "rgba(10,14,31,0.7)",
    zIndex: 4,
    backdropFilter: "blur(10px)",
    padding: "20px 24px",
    borderRadius: 4,
    border: "1px solid rgba(245,235,211,0.18)",
    color: "#F5EBD3",
    maxWidth: 320,
    zIndex: 3,
  },
  heroNextLabel: {
    fontSize: 11,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#E8B86D",
    marginBottom: 6,
  },
  heroNextTitle: {
    fontFamily: '"Cormorant Garamond", serif',
    fontStyle: "italic",
    fontSize: 22,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  heroNextMeta: {
    fontSize: 13,
    color: "#9BA8C9",
  },

  dualSection: {
    padding: "120px 56px",
  },
  container: {
    maxWidth: 1280,
    margin: "0 auto",
  },
  h2: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 64,
    lineHeight: 1.08,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.015em",
    textWrap: "balance",
  },
  italicWarm: {
    fontStyle: "italic",
    color: "#C24B16",
  },
  body: {
    fontSize: 18,
    lineHeight: 1.7,
    color: "#3a3f55",
    margin: 0,
    marginBottom: 18,
    maxWidth: 540,
  },
  bodyDark: {
    fontSize: 18,
    lineHeight: 1.7,
    color: "#C9D1E8",
    margin: 0,
    maxWidth: 540,
  },

  dualGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 32,
    marginTop: 64,
  },
  dualCard: {
    background: "#F2E5C2",
    padding: "44px 44px 48px",
    borderRadius: 4,
    border: "1px solid rgba(10,14,31,0.08)",
  },
  dualIcon: {
    marginBottom: 20,
  },
  dualKicker: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 12,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#C24B16",
    marginBottom: 14,
  },
  dualH3: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 38,
    lineHeight: 1.15,
    fontWeight: 400,
    margin: 0,
    marginBottom: 20,
    letterSpacing: "-0.01em",
  },
  dualList: {
    listStyle: "none",
    padding: 0,
    margin: "8px 0 24px",
    fontSize: 15,
    color: "#3a3f55",
    lineHeight: 1.9,
  },

  bandSection: {
    position: "relative",
    background: "#0A0E1F",
  },
  bandOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(90deg, rgba(10,14,31,0.85) 0%, rgba(10,14,31,0.5) 60%, transparent 100%)",
    padding: "0 56px",
    zIndex: 2,
  },

  peopleSection: {
    padding: "120px 56px",
    background: "#F2E5C2",
    borderTop: "1px solid rgba(10,14,31,0.08)",
    borderBottom: "1px solid rgba(10,14,31,0.08)",
  },
  peopleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 36,
    marginTop: 36,
  },
  testimonial: {
    margin: 0,
  },
  quote: {
    fontFamily: '"Cormorant Garamond", serif',
    fontStyle: "italic",
    fontSize: 22,
    lineHeight: 1.4,
    color: "#0A0E1F",
    margin: "20px 0 12px",
    textWrap: "pretty",
  },
  who: {
    fontSize: 13,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#3a3f55",
  },

  darkSection: {
    background: "#0A0E1F",
    padding: "120px 56px",
    color: "#F5EBD3",
  },
  constHead: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 56,
    alignItems: "end",
    marginBottom: 36,
  },

  section: {
    padding: "120px 56px",
  },
  eventsHead: {
    marginBottom: 16,
  },

  hostBanner: {
    position: "relative",
    padding: "140px 56px",
    background: "#0A0E1F",
    color: "#F5EBD3",
    overflow: "hidden",
  },
  hostBannerBg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 80% 20%, #1d2750 0%, #0a0e1f 60%, #050816 100%)",
    opacity: 1,
  },
  hostInner: {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "start",
  },
  hostSteps: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingLeft: 32,
    borderLeft: "1px solid rgba(245,235,211,0.18)",
  },
  hostStep: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 18,
    alignItems: "start",
  },
  hostStepN: {
    fontFamily: '"Cormorant Garamond", serif',
    fontStyle: "italic",
    fontSize: 32,
    color: "#E8B86D",
    lineHeight: 1,
  },
  hostStepT: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 4,
  },
  hostStepB: {
    fontSize: 15,
    color: "#C9D1E8",
    lineHeight: 1.55,
  },

  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridAutoRows: "minmax(180px, auto)",
    gap: 12,
  },
  linkWarm: {
    color: "#C24B16",
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    borderBottom: "1px solid #C24B16",
    paddingBottom: 4,
  },

  contactSection: {
    padding: "120px 56px",
    background: "#F2E5C2",
    borderTop: "1px solid rgba(10,14,31,0.08)",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 80,
    alignItems: "start",
  },
  contactRight: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 32,
  },
  contactLabel: {
    fontSize: 11,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#3a3f55",
    marginBottom: 6,
  },
  contactValue: {
    color: "#0A0E1F",
    fontSize: 16,
    textDecoration: "none",
  },

  footer: {
    background: "#0A0E1F",
    color: "#F5EBD3",
    paddingTop: 0,
  },
  footerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "56px 56px 40px",
    marginBottom: 40,
    borderBottom: "1px solid rgba(245,235,211,0.12)",
    maxWidth: 1280,
    margin: "0 auto",
  },
  footerCredo: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 22,
    color: "#E8B86D",
    margin: 0,
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 40,
    padding: "0 56px",
  },
  footerColTitle: {
    fontSize: 11,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "#E8B86D",
    marginBottom: 16,
  },
  footerLink: {
    display: "block",
    color: "#F5EBD3",
    textDecoration: "none",
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.85,
  },
  footerBottom: {
    marginTop: 56,
    padding: "24px 56px 32px",
    borderTop: "1px solid rgba(245,235,211,0.12)",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#9BA8C9",
    letterSpacing: "0.06em",
  },
};

window.V3 = V3;
