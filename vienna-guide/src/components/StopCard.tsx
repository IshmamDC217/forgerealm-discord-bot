import type { Stop } from "@/data/vienna";

export default function StopCard({
  stop,
  index,
  isLast,
}: {
  stop: Stop;
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="stop">
      <div className="stop-num">
        <div
          className="n"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {index + 1}
        </div>
        {!isLast && <div className="stop-connector" />}
      </div>
      <div className="stop-card">
        <div className="stop-header">
          <div className="stop-title-block">
            <h3 style={{ fontFamily: "'Playfair Display', serif" }}>
              {stop.name}
            </h3>
            <div className="subtitle">{stop.subtitle}</div>
          </div>
          <div className="stop-badges">
            <span className="badge badge-time">{stop.time}</span>
            <span
              className={`badge ${stop.cost.type === "free" ? "badge-free" : "badge-paid"}`}
            >
              {stop.cost.label}
            </span>
          </div>
        </div>
        <div className="stop-body">
          <p className="stop-desc">{stop.description}</p>
          <p className="tips-label">Maximise your time here</p>
          <ul className="tips-list">
            {stop.tips.map((tip, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: tip }} />
            ))}
          </ul>
        </div>
        <div className="stop-footer">
          {stop.footer.map((item, i) => (
            <span
              key={i}
              className="meta-item"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
