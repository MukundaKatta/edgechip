"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const chips = [
  { name: "Hailo-8", vendor: "Hailo", tops: 26, watts: 2.5, tops_w: 10.4, price: 120, perf_dollar: 0.217 },
  { name: "Hailo-8L", vendor: "Hailo", tops: 13, watts: 1.5, tops_w: 8.67, price: 70, perf_dollar: 0.186 },
  { name: "Qualcomm Hexagon NPU", vendor: "Qualcomm", tops: 73, watts: 8, tops_w: 9.13, price: 0, perf_dollar: 0 },
  { name: "Qualcomm Cloud AI 100", vendor: "Qualcomm", tops: 400, watts: 75, tops_w: 5.33, price: 800, perf_dollar: 0.5 },
  { name: "Jetson Orin NX 16GB", vendor: "NVIDIA", tops: 100, watts: 25, tops_w: 4.0, price: 599, perf_dollar: 0.167 },
  { name: "Apple M3 Neural Engine", vendor: "Apple", tops: 18, watts: 5, tops_w: 3.6, price: 0, perf_dollar: 0 },
  { name: "Google Tensor G3", vendor: "Google", tops: 11, watts: 4, tops_w: 2.75, price: 0, perf_dollar: 0 },
  { name: "Jetson Orin Nano", vendor: "NVIDIA", tops: 40, watts: 15, tops_w: 2.67, price: 199, perf_dollar: 0.201 },
  { name: "Intel Movidius Myriad X", vendor: "Intel", tops: 4, watts: 1.5, tops_w: 2.67, price: 80, perf_dollar: 0.05 },
  { name: "Coral Edge TPU", vendor: "Google", tops: 4, watts: 2, tops_w: 2.0, price: 60, perf_dollar: 0.067 },
  { name: "Rockchip RK3588 NPU", vendor: "Rockchip", tops: 6, watts: 3, tops_w: 2.0, price: 45, perf_dollar: 0.133 },
];

export default function ComparisonPage() {
  const [metric, setMetric] = useState<"tops_w" | "tops" | "perf_dollar">("tops_w");
  const labels = { tops_w: "TOPS per Watt", tops: "Raw TOPS", perf_dollar: "TOPS per Dollar" };
  const sorted = [...chips].sort((a, b) => b[metric] - a[metric]).filter((c) => metric !== "perf_dollar" || c[metric] > 0);
  const maxVal = Math.max(...sorted.map((c) => c[metric]));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TOPS/Watt Comparison</h1>
          <p className="text-gray-500 mt-1">Compare edge AI chips by efficiency, performance, and value</p>
        </div>
        <div className="flex gap-2 mb-6">
          {(Object.entries(labels) as [typeof metric, string][]).map(([k, v]) => (
            <button key={k} onClick={() => setMetric(k)} className={`px-4 py-2 rounded-lg text-sm font-medium ${metric === k ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{v}</button>
          ))}
        </div>
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{labels[metric]} Ranking</h2>
          <div className="space-y-4">
            {sorted.map((c, i) => (
              <div key={c.name} className="flex items-center gap-4">
                <span className={`w-8 text-center text-lg font-bold ${i === 0 ? "text-amber-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-700" : "text-gray-300"}`}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div><span className="font-medium text-gray-900">{c.name}</span><span className="text-xs text-gray-400 ml-2">({c.vendor})</span></div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{c.tops} TOPS | {c.watts}W</span>
                      <span className="font-bold text-amber-600">{c[metric].toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all" style={{ width: `${(c[metric] / maxVal) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
