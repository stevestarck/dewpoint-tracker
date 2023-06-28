import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Dewpoint Tracker",
  description: "Tracking when the Dewpoint exceeds 55 degrees Farenheight.",
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <body>
        <div className="to-cyan-20 fixed h-screen w-full bg-gradient-to-br from-cyan-200 dark:from-stone-900 dark:to-stone-800" />
        <main className="flex min-h-screen w-full flex-col items-center p-1">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
