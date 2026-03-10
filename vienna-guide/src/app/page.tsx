import { viennaRoute } from "@/data/vienna";
import Hero from "@/components/Hero";
import MapStrip from "@/components/MapStrip";
import StopCard from "@/components/StopCard";
import DaySummary from "@/components/DaySummary";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  const route = viennaRoute;

  return (
    <>
      <Hero route={route} />
      <MapStrip embedUrl={route.mapEmbedUrl} />

      <main className="route-main">
        <div className="section-heading">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
            Route &amp; Tips
          </h2>
        </div>

        {route.stops.map((stop, i) => (
          <StopCard
            key={i}
            stop={stop}
            index={i}
            isLast={i === route.stops.length - 1}
          />
        ))}

        <div className="section-heading">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
            Day at a glance
          </h2>
        </div>
        <DaySummary items={route.summary} />
      </main>

      <SiteFooter left={route.footerLeft} right={route.footerRight} />
    </>
  );
}
