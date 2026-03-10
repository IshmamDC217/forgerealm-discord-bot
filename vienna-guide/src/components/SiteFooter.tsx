export default function SiteFooter({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <footer className="site-footer">
      <p>{left}</p>
      <p>{right}</p>
    </footer>
  );
}
