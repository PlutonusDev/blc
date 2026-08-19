import Link from "next/link";
import { clubs } from "@/lib/clubs";

// A stylised outline of Queensland, drawn from a simplified set of boundary
// points and projected the same way the club pins are, so the pins always land
// where they should.
const OUTLINE: [number, number][] = [
  [142.53, -10.7],
  [142.85, -11.3],
  [143.2, -11.95],
  [143.6, -12.7],
  [143.95, -13.4],
  [144.35, -14.1],
  [144.85, -14.45],
  [145.3, -14.95],
  [145.3, -15.5],
  [145.45, -16.1],
  [145.78, -16.9],
  [146.05, -17.55],
  [146.3, -18.2],
  [146.6, -18.8],
  [146.9, -19.4],
  [147.4, -19.75],
  [148.0, -20.1],
  [148.55, -20.3],
  [149.1, -20.8],
  [149.3, -21.3],
  [149.55, -22.0],
  [150.3, -22.4],
  [150.75, -23.0],
  [151.2, -23.7],
  [151.6, -24.2],
  [152.1, -24.6],
  [152.55, -25.1],
  [152.9, -25.7],
  [153.05, -26.3],
  [153.2, -27.0],
  [153.45, -27.6],
  [153.55, -28.2],
  [152.6, -28.3],
  [151.6, -28.75],
  [150.6, -28.95],
  [148.0, -29.0],
  [144.0, -29.0],
  [141.0, -29.0],
  [141.0, -26.0],
  [138.0, -26.0],
  [138.0, -16.55],
  [138.2, -16.6],
  [138.9, -16.95],
  [139.6, -17.4],
  [140.3, -17.7],
  [140.9, -17.55],
  [141.15, -17.05],
  [141.4, -16.2],
  [141.55, -15.3],
  [141.45, -14.6],
  [141.6, -13.7],
  [141.8, -12.9],
  [141.9, -12.3],
  [142.15, -11.5],
];

// Reference towns, for scale. Not clubs, so they stay quiet.
const LANDMARKS: { name: string; lng: number; lat: number; anchor: "start" | "end" }[] = [
  { name: "Weipa", lng: 141.87, lat: -12.63, anchor: "start" },
  { name: "Mount Isa", lng: 139.49, lat: -20.73, anchor: "start" },
  { name: "Mackay", lng: 149.19, lat: -21.14, anchor: "end" },
  { name: "Brisbane", lng: 153.03, lat: -27.47, anchor: "start" },
];

const LNG_MIN = 137.4;
const LNG_MAX = 154.4;
const LAT_TOP = -10.0;
const LAT_BOTTOM = -29.6;

const WIDTH = 760;
const HEIGHT = 930;

function project(lng: number, lat: number) {
  return {
    x: ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * WIDTH,
    y: ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * HEIGHT,
  };
}

// Cairns and Innisfail sit close together on the coast, so their labels are
// nudged apart vertically and joined back to the pin with a leader line.
const LABEL_OFFSET: Record<string, number> = {
  cairns: -26,
  innisfail: 34,
  townsville: 0,
  ipswich: 0,
};

function outlinePath() {
  return (
    OUTLINE.map((point, index) => {
      const { x, y } = project(point[0], point[1]);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ") + " Z"
  );
}

// The coastal run linking the three tropical clubs, drawn as a hairline arc.
function coastalLink() {
  const points = ["cairns", "innisfail", "townsville"]
    .map((slug) => clubs.find((club) => club.slug === slug))
    .filter((club): club is NonNullable<typeof club> => Boolean(club))
    .map((club) => project(club.coords.lng, club.coords.lat));

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

export function QueenslandMap({ activeSlug }: { activeSlug?: string }) {
  const graticuleLng = [140, 144, 148, 152];
  const graticuleLat = [-14, -18, -22, -26];
  const scaleStart = project(139.2, -27.2);
  const scaleEnd = project(139.2 + 3.85, -27.2); // roughly 400km at this latitude

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label="Map of Queensland showing the four Brothers Leagues Clubs at Cairns, Innisfail, Townsville and Ipswich."
    >
      <defs>
        <linearGradient id="qld-fill" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#c5a25c" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#c5a25c" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id="qld-glow" cx="0.6" cy="0.3" r="0.72">
          <stop offset="0%" stopColor="#c5a25c" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#c5a25c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill="url(#qld-glow)" />

      <g stroke="#c5a25c" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 9">
        {graticuleLng.map((lng) => {
          const { x } = project(lng, 0);
          return <line key={`v${lng}`} x1={x} y1="0" x2={x} y2={HEIGHT} />;
        })}
        {graticuleLat.map((lat) => {
          const { y } = project(0, lat);
          return <line key={`h${lat}`} x1="0" y1={y} x2={WIDTH} y2={y} />;
        })}
      </g>

      <g
        fill="#c5a25c"
        fillOpacity="0.3"
        style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "9.5px", letterSpacing: "0.18em" }}
      >
        {graticuleLat.map((lat) => {
          const { y } = project(0, lat);
          return (
            <text key={`lb${lat}`} x="6" y={y - 6}>
              {Math.abs(lat)}°S
            </text>
          );
        })}
      </g>

      {/* Land */}
      <path d={outlinePath()} fill="url(#qld-fill)" stroke="none" />
      <path
        d={outlinePath()}
        className="coastline"
        fill="none"
        stroke="#c5a25c"
        strokeOpacity="0.6"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Sea and gulf labels, set the way a chart would */}
      <text
        x={project(151.6, -19.4).x}
        y={project(151.6, -19.4).y}
        fill="#c5a25c"
        fillOpacity="0.28"
        transform={`rotate(-58 ${project(151.6, -19.4).x} ${project(151.6, -19.4).y})`}
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "17px",
          fontStyle: "italic",
          letterSpacing: "0.34em",
        }}
      >
        Coral Sea
      </text>
      <text
        x={project(139.9, -14.6).x}
        y={project(139.9, -14.6).y}
        fill="#c5a25c"
        fillOpacity="0.24"
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-display), Georgia, serif",
          fontSize: "13px",
          fontStyle: "italic",
          letterSpacing: "0.24em",
        }}
      >
        Gulf of Carpentaria
      </text>

      <text
        x={project(140.6, -24.1).x}
        y={project(140.6, -24.1).y}
        fill="#c5a25c"
        fillOpacity="0.22"
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "15px",
          letterSpacing: "0.46em",
          fontWeight: 600,
        }}
      >
        QUEENSLAND
      </text>

      {/* Reference towns */}
      <g>
        {LANDMARKS.map((place) => {
          const { x, y } = project(place.lng, place.lat);
          const dx = place.anchor === "start" ? 9 : -9;
          return (
            <g key={place.name}>
              <circle cx={x} cy={y} r="2.5" fill="none" stroke="#c5a25c" strokeOpacity="0.4" />
              <text
                x={x + dx}
                y={y + 3.5}
                textAnchor={place.anchor === "start" ? "start" : "end"}
                fill="#c5a25c"
                fillOpacity="0.4"
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "10.5px",
                  letterSpacing: "0.1em",
                }}
              >
                {place.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* The coastal run between the three tropical clubs */}
      <path
        d={coastalLink()}
        fill="none"
        stroke="#c5a25c"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />

      {/* Scale bar and compass */}
      <g stroke="#c5a25c" strokeOpacity="0.35" strokeWidth="1">
        <line x1={scaleStart.x} y1={scaleStart.y} x2={scaleEnd.x} y2={scaleEnd.y} />
        <line x1={scaleStart.x} y1={scaleStart.y - 4} x2={scaleStart.x} y2={scaleStart.y + 4} />
        <line x1={scaleEnd.x} y1={scaleEnd.y - 4} x2={scaleEnd.x} y2={scaleEnd.y + 4} />
      </g>
      <text
        x={scaleStart.x}
        y={scaleStart.y + 18}
        fill="#c5a25c"
        fillOpacity="0.4"
        style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "9.5px", letterSpacing: "0.2em" }}
      >
        400 KM
      </text>

      <g transform={`translate(${WIDTH - 52} 62)`}>
        <circle r="17" fill="none" stroke="#c5a25c" strokeOpacity="0.25" />
        <path d="M0 -13 4 3 0 0 -4 3Z" fill="#c5a25c" fillOpacity="0.55" />
        <text
          y="-21"
          textAnchor="middle"
          fill="#c5a25c"
          fillOpacity="0.5"
          style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "9.5px", letterSpacing: "0.2em" }}
        >
          N
        </text>
      </g>

      {/* Clubs */}
      {clubs.map((club) => {
        const { x, y } = project(club.coords.lng, club.coords.lat);
        const dy = LABEL_OFFSET[club.slug] ?? 0;
        const labelX = x - 34;
        const labelY = y + dy;
        const active = activeSlug === club.slug;
        const dim = Boolean(activeSlug) && !active;

        return (
          <Link key={club.slug} href={`/clubs/${club.slug}`} className="group">
            <g
              style={{ opacity: dim ? 0.42 : 1, transition: "opacity 500ms var(--ease-out-soft)" }}
            >
              <circle cx={x} cy={y} r="38" fill="transparent" />

              {active ? (
                <circle
                  className="pin-ping"
                  cx={x}
                  cy={y}
                  r="11"
                  fill="none"
                  stroke={club.accent}
                  strokeWidth="1.5"
                />
              ) : null}

              <circle
                cx={x}
                cy={y}
                r={active ? 20 : 15}
                fill={club.accent}
                fillOpacity={active ? 0.26 : 0.12}
                style={{ transition: "all 500ms var(--ease-out-soft)" }}
              />
              <circle
                cx={x}
                cy={y}
                r={active ? 7.5 : 6}
                fill={club.accent}
                stroke="#03060f"
                strokeWidth="2.5"
                style={{ transition: "all 500ms var(--ease-out-soft)" }}
              />

              <polyline
                points={`${x - 14},${y} ${x - 24},${labelY} ${labelX + 2},${labelY}`}
                fill="none"
                stroke={active ? club.accent : "#c5a25c"}
                strokeOpacity={active ? 0.9 : 0.4}
                strokeWidth="1.25"
              />

              <text
                x={labelX}
                y={labelY - 5}
                textAnchor="end"
                fill={active ? "#f8f5ee" : "#ece6d9"}
                fillOpacity={active ? 1 : 0.8}
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: active ? "30px" : "26px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  transition: "all 500ms var(--ease-out-soft)",
                }}
              >
                {club.city}
              </text>
              <text
                x={labelX}
                y={labelY + 15}
                textAnchor="end"
                fill={active ? club.accent : "#c5a25c"}
                fillOpacity={active ? 1 : 0.6}
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  fontWeight: 600,
                }}
              >
                {club.region.toUpperCase()}
              </text>
            </g>
          </Link>
        );
      })}
    </svg>
  );
}
