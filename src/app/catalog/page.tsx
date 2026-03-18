"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const chips = [
  { id: "1", name: "Jetson Orin Nano 8GB", vendor: "NVIDIA", tops: 40, watts: 15, tops_w: 2.67, price: 199, category: "Module", process: "8nm", memory: "8GB LPDDR5", ai_cores: "1024 CUDA + 32 Tensor", precision: ["INT8", "FP16", "FP32"], sdk: "JetPack / TensorRT", interface: "PCIe Gen4", form: "260-pin SO-DIMM", use_cases: ["Robotics", "Vision", "NLP", "Edge Server"] },
  { id: "2", name: "Jetson Orin NX 16GB", vendor: "NVIDIA", tops: 100, watts: 25, tops_w: 4.0, price: 599, category: "Module", process: "8nm", memory: "16GB LPDDR5", ai_cores: "2048 CUDA + 64 Tensor", precision: ["INT8", "FP16", "FP32", "TF32"], sdk: "JetPack / TensorRT", interface: "PCIe Gen4 x8", form: "260-pin SO-DIMM", use_cases: ["Multi-model", "Autonomous", "Video Analytics"] },
  { id: "3", name: "Hailo-8", vendor: "Hailo", tops: 26, watts: 2.5, tops_w: 10.4, price: 120, category: "Accelerator", process: "12nm", memory: "No onboard", ai_cores: "Dataflow Architecture", precision: ["INT4", "INT8"], sdk: "Hailo Dataflow Compiler", interface: "PCIe Gen3 x4", form: "M.2 2280 / M.2 2242", use_cases: ["Vision", "Multi-camera", "Smart City"] },
  { id: "4", name: "Hailo-8L", vendor: "Hailo", tops: 13, watts: 1.5, tops_w: 8.67, price: 70, category: "Accelerator", process: "12nm", memory: "No onboard", ai_cores: "Dataflow Architecture", precision: ["INT4", "INT8"], sdk: "Hailo Dataflow Compiler", interface: "PCIe Gen3 / M.2", form: "M.2 2230", use_cases: ["RPi AI Kit", "Smart Home", "Retail"] },
  { id: "5", name: "Google Coral Edge TPU", vendor: "Google", tops: 4, watts: 2, tops_w: 2.0, price: 60, category: "Accelerator", process: "28nm", memory: "No onboard", ai_cores: "Edge TPU ASIC", precision: ["INT8"], sdk: "TFLite / PyCoral", interface: "USB 3.0 / PCIe", form: "USB Stick / M.2 / Dev Board", use_cases: ["Vision", "IoT", "Prototyping"] },
  { id: "6", name: "Qualcomm Cloud AI 100", vendor: "Qualcomm", tops: 400, watts: 75, tops_w: 5.33, price: 800, category: "Card", process: "7nm", memory: "16GB LPDDR4X", ai_cores: "16 AI Cores", precision: ["INT8", "FP16"], sdk: "Qualcomm AI Stack", interface: "PCIe Gen4 x16", form: "Half-height PCIe", use_cases: ["Edge Server", "Data Center", "Multi-model"] },
  { id: "7", name: "Apple M3 Neural Engine", vendor: "Apple", tops: 18, watts: 5, tops_w: 3.6, price: 0, category: "SoC (integrated)", process: "3nm", memory: "Unified", ai_cores: "16-core Neural Engine", precision: ["INT8", "FP16", "FP32"], sdk: "CoreML / MLX", interface: "Integrated", form: "SoC", use_cases: ["On-device ML", "Vision", "NLP", "Audio"] },
  { id: "8", name: "Rockchip RK3588 NPU", vendor: "Rockchip", tops: 6, watts: 3, tops_w: 2.0, price: 45, category: "SoC", process: "8nm", memory: "Up to 32GB", ai_cores: "3 NPU cores", precision: ["INT4", "INT8", "INT16", "FP16"], sdk: "RKNN-Toolkit", interface: "Integrated", form: "SoC", use_cases: ["SBC", "Digital Signage", "NVR"] },
];

export default function CatalogPage() {
  const [selected, setSelected] = useState<typeof chips[0] | null>(null);
  const [filterVendor, setFilterVendor] = useState("all");
  const vendors = ["all", ...new Set(chips.map((c) => c.vendor))];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edge AI Chip Catalog</h1>
          <p className="text-gray-500 mt-1">Comprehensive database of edge AI processors and accelerators</p>
        </div>
        <div className="flex gap-2 mb-6">
          {vendors.map((v) => (
            <button key={v} onClick={() => setFilterVendor(v)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filterVendor === v ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {v === "all" ? "All Vendors" : v}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {chips.filter((c) => filterVendor === "all" || c.vendor === filterVendor).map((c) => (
            <div key={c.id} onClick={() => setSelected(c)} className={`glass rounded-xl p-5 cursor-pointer card-hover ${selected?.id === c.id ? "ring-2 ring-amber-500" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div><h3 className="font-semibold text-gray-900">{c.name}</h3><p className="text-xs text-gray-500">{c.vendor} | {c.category} | {c.process}</p></div>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">{c.tops} TOPS</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">TDP</p><p className="text-sm font-bold">{c.watts}W</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">TOPS/W</p><p className="text-sm font-bold text-amber-600">{c.tops_w}</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Price</p><p className="text-sm font-bold">{c.price > 0 ? `$${c.price}` : "N/A"}</p></div>
                <div className="text-center p-2 bg-gray-50 rounded"><p className="text-xs text-gray-500">Interface</p><p className="text-xs font-bold">{c.interface}</p></div>
              </div>
              <div className="flex flex-wrap gap-1">
                {c.precision.map((p) => <span key={p} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{p}</span>)}
              </div>
            </div>
          ))}
        </div>
        {selected && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{selected.name} - Full Specs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[["AI Cores", selected.ai_cores], ["Memory", selected.memory], ["SDK", selected.sdk], ["Form Factor", selected.form]].map(([l, v]) => (
                <div key={l} className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">{l}</p><p className="font-medium text-sm">{v}</p></div>
              ))}
            </div>
            <div><p className="text-sm text-gray-500 mb-2">Recommended Use Cases:</p>
              <div className="flex flex-wrap gap-2">{selected.use_cases.map((uc) => <span key={uc} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm">{uc}</span>)}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
