import "./globals.css";
import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="flex min-h-screen">
            <Sidebar/>
        {/* flex-1がないとメインが広がらない */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
