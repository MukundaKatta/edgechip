"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const chips = [
  { name: "NVIDIA Jetson Orin Nano", vendor: "NVIDIA", tops: 40, watts: 15, tops_per_watt: 2.67, price: 199, category: "Module", process_nm: 8, memory_gb: 8, interface: "PCIe/USB", form_factor: "70x45mm" },
  { name: "NVIDIA Jetson Orin NX 16GB", vendor: "NVIDIA", tops: 100, watts: 25, tops_per_watt: 4.0, price: 599, category: "Module", process_nm: 8, memory_gb: 16, interface: "PCIe", form_factor: "70x45mm" },
  { name: "Hailo-8", vendor: "Hailo", tops: 26, watts: 2.5, tops_per_watt: 10.4, price: 120, category: "Accelerator", process_nm: 12, memory_gb: 0, interface: "PCIe", form_factor: "M.2" },
  { name: "Hailo-8L", vendor: "Hailo", tops: 13, watts: 1.5, tops_per_watt: 8.67, price: 70, category: "Accelerator", process_nm: 12, memory_gb: 0, interface: "PCIe/M.2", form_factor: "M.2" },
  { name: "Google Coral Edge TPU", vendor: "Google", tops: 4, watts: 2, tops_per_watt: 2.0, price: 60, category: "Accelerator", process_nm: 28, memory_gb: 0, interface: "USB/PCIe", form_factor: "USB/M.2" },
  { name: "Intel Movidius Myriad X", vendor: "Intel", tops: 4, watts: 1.5, tops_per_watt: 2.67, price: 80, category: "Accelerator", process_nm: 16, memory_gb: 0, interface: "USB", form_factor: "USB stick" },
  { name: "Apple M3 Neural Engine", vendor: "Apple", tops: 18, watts: 5, tops_per_watt: 3.6, price: 0, category: "SoC", process_nm: 3, memory_gb: 0, interface: "Integrated", form_factor: "SoC" },
  { name: "Qualcomm Hexagon NPU (Gen 3)", vendor: "Qualcomm", tops: 73, watts: 8, tops_per_watt: 9.13, price: 0, category: "SoC", process_nm: 4, memory_gb: 0, interface: "Integrated", form_factor: "SoC" },
  { name: "Google Tensor G3 TPU", vendor: "Google", tops: 11, watts: 4, tops_per_watt: 2.75, price: 0, category: "SoC", process_nm: 4, memory_gb: 0, interface: "Integrated", form_factor: "SoC" },
  { name: "Rockchip RK3588 NPU", vendor: "Rockchip", tops: 6, watts: 3, tops_per_watt: 2.0, price: 45, category: "SoC", process_nm: 8, memory_gb: 0, interface: "Integrated", form_factor: "SoC" },
];

const topByEfficiency = [...chips].sort((a, b) => b.tops_per_watt - a.tops_per_watt);
const topByPerformance = [...chips].sort((a, b) => b.tops - a.tops);

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">EdgeChip Dashboard</h1>
          <p className="text-gray-500 mt-1">Compare edge AI hardware for optimal deployment decisions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Chips Tracked</p><p className="text-3xl font-bold text-amber-600 mt-1">{chips.length}</p></div>
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Best TOPS/Watt</p><p className="text-3xl font-bold text-green-600 mt-1">{topByEfficiency[0].tops_per_watt}</p><p className="text-xs text-gray-400">{topByEfficiency[0].name}</p></div>
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Max TOPS</p><p className="text-3xl font-bold text-blue-600 mt-1">{topByPerformance[0].tops}</p><p className="text-xs text-gray-400">{topByPerformance[0].name}</p></div>
          <div className="glass rounded-xl p-6 card-hover"><p className="text-sm text-gray-500">Vendors</p><p className="text-3xl font-bold text-purple-600 mt-1">{new Set(chips.map((c) => c.vendor)).size}</p></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">TOPS/Watt Efficiency Ranking</h2>
            <div className="space-y-3">
              {topByEfficiency.slice(0, 6).map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className={`text-lg font-bold w-6 ${i === 0 ? "text-amber-500" : "text-gray-400"}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-sm font-bold text-amber-600">{c.tops_per_watt} TOPS/W</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${(c.tops_per_watt / topByEfficiency[0].tops_per_watt) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Raw Performance Ranking</h2>
            <div className="space-y-3">
              {topByPerformance.slice(0, 6).map((c, i) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span className={`text-lg font-bold w-6 ${i === 0 ? "text-amber-500" : "text-gray-400"}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-sm font-bold text-blue-600">{c.tops} TOPS</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${(c.tops / topByPerformance[0].tops) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b">
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Chip</th>
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Vendor</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">TOPS</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">TDP (W)</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">TOPS/W</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Price</th>
              <th className="text-center py-3 px-3 text-gray-500 font-medium">Category</th>
              <th className="text-right py-3 px-3 text-gray-500 font-medium">Process</th>
            </tr></thead>
            <tbody>{chips.map((c) => (
              <tr key={c.name} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-3 font-medium">{c.name}</td>
                <td className="py-3 px-3 text-gray-600">{c.vendor}</td>
                <td className="py-3 px-3 text-right font-medium text-blue-600">{c.tops}</td>
                <td className="py-3 px-3 text-right">{c.watts}W</td>
                <td className="py-3 px-3 text-right font-medium text-amber-600">{c.tops_per_watt}</td>
                <td className="py-3 px-3 text-right">{c.price > 0 ? `$${c.price}` : "N/A"}</td>
                <td className="py-3 px-3 text-center"><span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">{c.category}</span></td>
                <td className="py-3 px-3 text-right">{c.process_nm}nm</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
