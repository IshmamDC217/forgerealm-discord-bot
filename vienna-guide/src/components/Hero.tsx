import type { RouteData } from "@/data/vienna";

export default function Hero({ route }: { route: RouteData }) {
  const { label, nativeName, meta, stops } = route;

  return (
    <header>
      <p className="hero-label">{label}</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif" }}>
        One Day
        <br />
        in <em>{nativeName}</em>
      </h1>
      <div className="hero-meta">
        <span>
          <strong>{meta.stops}</strong> stops
        </span>
        <span>
          <strong>{meta.distance}</strong> on foot
        </span>
        <span>
          Start at <strong>{meta.start}</strong>
        </span>
        <span>
          End at <strong>{meta.end}</strong>
        </span>
      </div>
      <div className="progress-bar">
        {stops.map((_, i) => (
          <div key={i} className="seg active" />
        ))}
      </div>
    </header>
  );
}
