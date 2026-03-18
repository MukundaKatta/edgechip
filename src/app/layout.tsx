import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "EdgeChip - Edge AI Hardware Comparison", description: "Compare edge AI chips and accelerators for optimal deployment" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
