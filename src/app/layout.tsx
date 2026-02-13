import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iglesia Revoluciona",
  description: "Transformando vidas, construyendo comunidad, impactando ciudades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full font-body antialiased">
        {children}
      </body>
    </html>
  );
}
