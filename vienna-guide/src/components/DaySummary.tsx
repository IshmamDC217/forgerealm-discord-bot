import type { RouteSummary } from "@/data/vienna";

export default function DaySummary({ items }: { items: RouteSummary[] }) {
  return (
    <div className="day-summary">
      {items.map((item, i) => (
        <div key={i} className="summary-item">
          <div
            className="val"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {item.value}
          </div>
          <div className="lbl">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
