/* Shared building blocks for the Boundless Skies variations */

// ─── Logo + wordmark ──────────────────────────────────────────────────
const Wordmark = ({ size = 22, light = true, logoOnly = false, withTag = false }) => {
  const ink = light ? "#F5EBD3" : "#0A0E1F";
  const dim = size * 2.2;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.7, color: ink }}>
      <img
        src="assets/logo.png"
        alt="Boundless Skies logo"
        style={{
          width: dim,
          height: dim,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: light ? "0 0 0 1px rgba(245,235,211,0.18)" : "0 0 0 1px rgba(10,14,31,0.12)",
        }}
      />
      {!logoOnly && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 4 }}>
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 500,
              fontSize: size * 1.05,
              letterSpacing: "0.02em",
            }}
          >
            Boundless Skies
          </span>
          {withTag && (
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: size * 0.55,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#E8B86D",
              }}
            >
              For All
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Starfield (canvas, slow drift, respects reduced motion) ─────────
const Starfield = ({ density = 1, intensity = 1, hue = 220, className }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, w, h, stars;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      w = cv.width = r.width * dpr;
      h = cv.height = r.height * dpr;
      cv.style.width = r.width + "px";
      cv.style.height = r.height + "px";
      const count = Math.floor((r.width * r.height) / 2400 * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.4 + 0.2) * dpr,
        a: Math.random() * 0.7 + 0.2,
        tw: Math.random() * 0.02 + 0.005,
        ph: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04 * dpr,
        vy: (Math.random() - 0.5) * 0.04 * dpr,
      }));
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = reduce ? s.a : s.a + Math.sin(t * s.tw + s.ph) * 0.3;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${hue + (s.r > 1.5 ? 20 : 0)}, 30%, ${88 + Math.random() * 4}%, ${Math.max(0, tw) * intensity})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = w;
          if (s.x > w) s.x = 0;
          if (s.y < 0) s.y = h;
          if (s.y > h) s.y = 0;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw(0);
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, intensity, hue]);
  return <canvas ref={ref} className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
};

// ─── Striped image placeholder ───────────────────────────────────────
const ImgPlaceholder = ({ label, ratio = "4 / 3", tone = "dark", style }) => {
  const dark = tone === "dark";
  return (
    <div
      style={{
        aspectRatio: ratio,
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        background: dark
          ? "repeating-linear-gradient(135deg, #1a2240 0 8px, #141b33 8px 16px)"
          : "repeating-linear-gradient(135deg, #efe4c8 0 8px, #e6d8b4 8px 16px)",
        border: dark ? "1px solid #232c50" : "1px solid #d6c7a0",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          textAlign: "center",
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: dark ? "#9BA8C9" : "#6b5d3a",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// ─── Constellation map (interactive) ──────────────────────────────────
// Each constellation = {name, story, points:[[x,y]…], lines:[[i,j]…]}
const CONSTELLATIONS = [
  {
    id: "ursa",
    name: "Ursa Major",
    story: "For the family attending their first event — the easiest path into the sky.",
    points: [[80, 220], [140, 200], [200, 215], [255, 230], [305, 195], [355, 175], [330, 130]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,3]],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    story: "For the wheelchair user reaching the eyepiece without bending — hands-free optics on a parallelogram mount.",
    points: [[470, 110], [535, 140], [600, 100], [665, 145], [725, 115]],
    lines: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    id: "orion",
    name: "Orion",
    story: "For the student at the residential school — smart telescopes with high-contrast displays they can read.",
    points: [[860, 280], [905, 230], [950, 195], [930, 320], [905, 360], [880, 400], [990, 290], [1020, 350]],
    lines: [[0,1],[1,2],[3,4],[4,5],[1,3],[1,6],[6,7]],
  },
  {
    id: "lyra",
    name: "Lyra",
    story: "For the autistic child who needs quiet — sessions in low-stimulation, predictable settings.",
    points: [[1110, 150], [1160, 180], [1200, 140], [1175, 95], [1130, 105]],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,0]],
  },
];

const ConstellationMap = ({ height = 520 }) => {
  const [active, setActive] = React.useState(null);
  const current = CONSTELLATIONS.find((c) => c.id === active);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 8,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 30% 40%, #1b2447 0%, #0c1126 60%, #070b1c 100%)",
        border: "1px solid rgba(245, 235, 211, 0.08)",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Starfield density={1.4} intensity={0.9} />
      </div>

      <svg
        viewBox="0 0 1280 520"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        role="img"
        aria-label="Interactive constellation map. Hover or focus a constellation to read who Boundless Skies serves."
      >
        {CONSTELLATIONS.map((c) => {
          const isOn = active === c.id;
          return (
            <g
              key={c.id}
              onMouseEnter={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(c.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              style={{ cursor: "pointer", outline: "none" }}
              aria-label={c.name}
            >
              {/* Hit area */}
              <polygon
                points={c.points.map((p) => p.join(",")).join(" ")}
                fill="rgba(0,0,0,0.001)"
              />
              {/* Lines */}
              {c.lines.map(([a, b], i) => {
                const [x1, y1] = c.points[a];
                const [x2, y2] = c.points[b];
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#E8B86D"
                    strokeWidth={isOn ? 1.2 : 0.6}
                    strokeOpacity={isOn ? 0.9 : 0}
                    style={{ transition: "stroke-opacity 600ms ease, stroke-width 400ms ease" }}
                  />
                );
              })}
              {/* Stars */}
              {c.points.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={isOn ? 14 : 8} fill="#E8B86D" opacity={isOn ? 0.18 : 0.08}
                    style={{ transition: "all 400ms ease" }} />
                  <circle cx={x} cy={y} r={isOn ? 2.6 : 1.8} fill="#F5EBD3"
                    style={{ transition: "all 400ms ease" }} />
                </g>
              ))}
              {/* Name label when on */}
              {isOn && (
                <text
                  x={c.points[0][0]}
                  y={c.points[0][1] - 26}
                  fill="#F5EBD3"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                    fontSize: 22,
                  }}
                >
                  {c.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Story panel */}
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 24,
          right: 24,
          maxWidth: 640,
          padding: "20px 24px",
          background: "rgba(10, 14, 31, 0.55)",
          backdropFilter: "blur(10px)",
          borderRadius: 6,
          border: "1px solid rgba(245, 235, 211, 0.1)",
          color: "#F5EBD3",
          minHeight: 96,
          transition: "opacity 300ms ease",
        }}
        aria-live="polite"
      >
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#9BA8C9",
            marginBottom: 8,
          }}
        >
          {current ? "From the sky" : "Hover a constellation"}
        </div>
        <div
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
            fontSize: 22,
            lineHeight: 1.4,
          }}
        >
          {current
            ? current.story
            : "Each constellation here stands for someone we observe with — a child, a parent, a student, a neighbor."}
        </div>
      </div>
    </div>
  );
};

// ─── Events list ─────────────────────────────────────────────────────
const EVENTS = [
  {
    date: ["MAY", "16"],
    title: "Spring Stars at Cedar Ridge School",
    where: "Cedar Ridge Residential School · Asheville, NC",
    tags: ["Hands-free optics", "Quiet hour", "Wheelchair accessible"],
    time: "8:30 – 10:30 PM",
  },
  {
    date: ["JUN", "07"],
    title: "Saturn & The Summer Triangle",
    where: "Greene Memorial Library lawn · Roanoke, VA",
    tags: ["Smart-display scopes", "ASL interpreter"],
    time: "9:00 – 11:00 PM",
  },
  {
    date: ["JUN", "21"],
    title: "Solstice Sunset & Moon Walk",
    where: "Holly House Adult Care · Lynchburg, VA",
    tags: ["Seated viewing", "Large-print guides"],
    time: "7:00 – 9:30 PM",
  },
  {
    date: ["JUL", "12"],
    title: "Family Night Under the Milky Way",
    where: "Pisgah State Park · Brevard, NC",
    tags: ["Family", "Sensory-friendly tent", "Parallelogram mount"],
    time: "9:00 PM – Midnight",
  },
];

const EventCard = ({ ev, variant = "dark" }) => {
  const dark = variant === "dark";
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "88px 1fr auto",
        gap: 28,
        alignItems: "start",
        padding: "28px 0",
        borderTop: dark
          ? "1px solid rgba(245,235,211,0.12)"
          : "1px solid rgba(10,14,31,0.12)",
        color: dark ? "#F5EBD3" : "#0A0E1F",
      }}
    >
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#E8B86D",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {ev.date[0]}
        </div>
        <div
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 52,
            lineHeight: 0.95,
            fontWeight: 400,
          }}
        >
          {ev.date[1]}
        </div>
      </div>
      <div>
        <h3
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 28,
            lineHeight: 1.2,
            margin: 0,
            fontWeight: 500,
          }}
        >
          {ev.title}
        </h3>
        <div
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 15,
            opacity: 0.78,
            marginTop: 6,
          }}
        >
          {ev.where} · {ev.time}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {ev.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                padding: "5px 10px",
                borderRadius: 999,
                border: dark
                  ? "1px solid rgba(245,235,211,0.22)"
                  : "1px solid rgba(10,14,31,0.18)",
                color: dark ? "#F5EBD3" : "#0A0E1F",
                opacity: 0.9,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <a
        href="#"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#E8B86D",
          textDecoration: "none",
          borderBottom: "1px solid #E8B86D",
          paddingBottom: 4,
          alignSelf: "start",
          marginTop: 8,
          whiteSpace: "nowrap",
        }}
      >
        RSVP →
      </a>
    </article>
  );
};

// ─── Section heading ─────────────────────────────────────────────────
const SectionEyebrow = ({ children, color = "#E8B86D" }) => (
  <div
    style={{
      fontFamily: '"Inter", sans-serif',
      fontSize: 12,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color,
      marginBottom: 18,
    }}
  >
    {children}
  </div>
);

// ─── Newsletter form ─────────────────────────────────────────────────
const Newsletter = ({ tone = "dark" }) => {
  const dark = tone === "dark";
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        gap: 0,
        alignItems: "stretch",
        maxWidth: 520,
        borderBottom: dark
          ? "1px solid rgba(245,235,211,0.4)"
          : "1px solid rgba(10,14,31,0.4)",
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        aria-label="Email address"
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          padding: "14px 0",
          fontFamily: '"Inter", sans-serif',
          fontSize: 17,
          color: dark ? "#F5EBD3" : "#0A0E1F",
        }}
      />
      <button
        type="submit"
        style={{
          background: "transparent",
          border: "none",
          padding: "14px 4px 14px 18px",
          fontFamily: '"Inter", sans-serif',
          fontSize: 12,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#E8B86D",
          cursor: "pointer",
        }}
      >
        Subscribe →
      </button>
    </form>
  );
};

Object.assign(window, {
  Wordmark,
  Starfield,
  ImgPlaceholder,
  ConstellationMap,
  EVENTS,
  EventCard,
  SectionEyebrow,
  Newsletter,
  CONSTELLATIONS,
});
