"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const thermalData = [
  { chip: "Jetson Orin Nano", idle_c: 35, load_c: 65, max_c: 85, throttle_c: 78, tdp_w: 15, cooling: "Active (fan)", ambient_c: 25, thermal_margin: 20, recommendation: "Adequate with stock heatsink. Add fan for sustained workloads." },
  { chip: "Jetson Orin NX 16GB", idle_c: 38, load_c: 72, max_c: 90, throttle_c: 82, tdp_w: 25, cooling: "Active (fan required)", ambient_c: 25, thermal_margin: 18, recommendation: "Requires active cooling. Consider liquid cooling for enclosed deployments." },
  { chip: "Hailo-8", idle_c: 28, load_c: 42, max_c: 105, throttle_c: 95, tdp_w: 2.5, cooling: "Passive (heatsink)", ambient_c: 25, thermal_margin: 63, recommendation: "Excellent thermal profile. Passive heatsink sufficient for most environments." },
  { chip: "Hailo-8L", idle_c: 25, load_c: 38, max_c: 105, throttle_c: 95, tdp_w: 1.5, cooling: "Passive (minimal)", ambient_c: 25, thermal_margin: 67, recommendation: "Near-zero thermal concern. Can operate without heatsink in many cases." },
  { chip: "Coral Edge TPU", idle_c: 30, load_c: 50, max_c: 80, throttle_c: 70, tdp_w: 2, cooling: "Passive", ambient_c: 25, thermal_margin: 30, recommendation: "Adequate for indoor use. USB stick form factor limits cooling options." },
  { chip: "Rockchip RK3588", idle_c: 32, load_c: 58, max_c: 90, throttle_c: 80, tdp_w: 8, cooling: "Active recommended", ambient_c: 25, thermal_margin: 32, recommendation: "Heatsink required. Add fan for outdoor or enclosed deployments." },
  { chip: "Apple M3 ANE", idle_c: 30, load_c: 48, max_c: 110, throttle_c: 100, tdp_w: 5, cooling: "Passive (laptop)", ambient_c: 25, thermal_margin: 62, recommendation: "Excellent thermal management by Apple. No additional cooling needed." },
];

export default function ThermalPage() {
  const [sortBy, setSortBy] = useState<"thermal_margin" | "load_c" | "tdp_w">("thermal_margin");
  const sorted = [...thermalData].sort((a, b) => sortBy === "thermal_margin" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thermal Analysis</h1>
          <p className="text-gray-500 mt-1">Analyze thermal characteristics and cooling requirements for edge AI chips</p>
        </div>
        <div className="flex gap-2 mb-6">
          {([["thermal_margin", "Best Margin"], ["load_c", "Coolest Under Load"], ["tdp_w", "Lowest TDP"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setSortBy(k)} className={`px-4 py-2 rounded-lg text-sm font-medium ${sortBy === k ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{l}</button>
          ))}
        </div>
        <div className="space-y-4 mb-8">
          {sorted.map((t) => (
            <div key={t.chip} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div><h3 className="font-semibold text-gray-900">{t.chip}</h3><p className="text-xs text-gray-500">{t.cooling} | TDP: {t.tdp_w}W</p></div>
                <span className={`text-lg font-bold ${t.thermal_margin > 50 ? "text-green-600" : t.thermal_margin > 25 ? "text-amber-600" : "text-red-600"}`}>
                  {t.thermal_margin}C margin
                </span>
              </div>
              <div className="mb-4">
                <div className="relative h-8 bg-gradient-to-r from-blue-400 via-green-400 via-amber-400 to-red-500 rounded-full overflow-hidden">
                  <div className="absolute top-0 h-full w-1 bg-white" style={{ left: `${(t.idle_c / t.max_c) * 100}%` }} title={`Idle: ${t.idle_c}C`} />
                  <div className="absolute top-0 h-full w-1.5 bg-gray-900" style={{ left: `${(t.load_c / t.max_c) * 100}%` }} title={`Load: ${t.load_c}C`} />
                  <div className="absolute top-0 h-full w-1 bg-red-900" style={{ left: `${(t.throttle_c / t.max_c) * 100}%` }} title={`Throttle: ${t.throttle_c}C`} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Idle: {t.idle_c}C</span>
                  <span className="font-medium">Load: {t.load_c}C</span>
                  <span className="text-amber-600">Throttle: {t.throttle_c}C</span>
                  <span className="text-red-600">Max: {t.max_c}C</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">{t.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
