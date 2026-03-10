export default function MapStrip({ embedUrl }: { embedUrl: string }) {
  return (
    <div className="map-strip">
      <iframe src={embedUrl} loading="lazy" title="Vienna route map" />
      <div className="map-overlay" />
    </div>
  );
}
