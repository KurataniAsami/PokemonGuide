import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
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
