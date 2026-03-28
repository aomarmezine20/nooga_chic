export default function NotFoundShell({ children }: { children: React.ReactNode }) {
  // A minimal, localized shell to avoid "Missing tags" error during 404s
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
