"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type UseCase = { name: string; category: string; requirements: { min_tops: number; max_watts: number; precision: string[]; models: string[] }; recommended_chips: { chip: string; reason: string; score: number }[] };

const useCases: UseCase[] = [
  { name: "Multi-Camera Video Analytics", category: "Vision", requirements: { min_tops: 20, max_watts: 30, precision: ["INT8"], models: ["YOLO v8", "ReID Model"] }, recommended_chips: [
    { chip: "Hailo-8", reason: "Best TOPS/watt for vision, handles 8+ camera streams", score: 95 },
    { chip: "Jetson Orin Nano", reason: "Versatile GPU compute with TensorRT optimization", score: 88 },
    { chip: "Jetson Orin NX", reason: "Overkill but future-proof for scaling", score: 82 },
  ]},
  { name: "On-Device LLM Chat", category: "NLP", requirements: { min_tops: 10, max_watts: 20, precision: ["INT8", "FP16"], models: ["Phi-3 Mini", "Gemma 2B"] }, recommended_chips: [
    { chip: "Jetson Orin Nano", reason: "8GB memory, TensorRT LLM support, affordable", score: 92 },
    { chip: "Apple M3 ANE", reason: "Excellent for CoreML/MLX optimized models", score: 90 },
    { chip: "Qualcomm Hexagon", reason: "Mobile-optimized NPU with good LLM support", score: 85 },
  ]},
  { name: "Smart Home Automation", category: "IoT", requirements: { min_tops: 2, max_watts: 5, precision: ["INT8"], models: ["Whisper Tiny", "MobileNet V3"] }, recommended_chips: [
    { chip: "Hailo-8L", reason: "Low power, affordable, great for RPi integration", score: 94 },
    { chip: "Coral Edge TPU", reason: "Ultra-simple deployment, TFLite ecosystem", score: 90 },
    { chip: "Rockchip RK3588", reason: "Affordable SoC with built-in NPU", score: 82 },
  ]},
  { name: "Autonomous Robot Navigation", category: "Robotics", requirements: { min_tops: 30, max_watts: 25, precision: ["INT8", "FP16"], models: ["YOLO v8", "Depth Estimation", "SLAM"] }, recommended_chips: [
    { chip: "Jetson Orin NX", reason: "Multi-model inference with CUDA + TensorRT", score: 96 },
    { chip: "Jetson Orin Nano", reason: "Budget option with sufficient compute", score: 84 },
    { chip: "Hailo-8", reason: "Add as co-processor for vision offload", score: 75 },
  ]},
  { name: "Real-Time Speech Processing", category: "Audio", requirements: { min_tops: 2, max_watts: 3, precision: ["INT8", "FP16"], models: ["Whisper Tiny/Small", "VAD"] }, recommended_chips: [
    { chip: "Apple M3 ANE", reason: "CoreML Whisper runs excellently on Neural Engine", score: 95 },
    { chip: "Qualcomm Hexagon", reason: "Optimized for always-on audio processing", score: 92 },
    { chip: "Coral Edge TPU", reason: "Low power, good for keyword spotting", score: 78 },
  ]},
];

export default function MatcherPage() {
  const [selected, setSelected] = useState<UseCase>(useCases[0]);
  const [filterCat, setFilterCat] = useState("all");
  const categories = ["all", ...new Set(useCases.map((u) => u.category))];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Use Case Matcher</h1>
          <p className="text-gray-500 mt-1">Find the best edge AI chip for your specific use case</p>
        </div>
        <div className="flex gap-2 mb-6">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilterCat(c)} className={`px-4 py-2 rounded-lg text-sm font-medium ${filterCat === c ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{c === "all" ? "All" : c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {useCases.filter((u) => filterCat === "all" || u.category === filterCat).map((uc) => (
            <div key={uc.name} onClick={() => setSelected(uc)} className={`glass rounded-xl p-5 cursor-pointer card-hover ${selected.name === uc.name ? "ring-2 ring-amber-500" : ""}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{uc.name}</h3>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">{uc.category}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Min {uc.requirements.min_tops} TOPS | Max {uc.requirements.max_watts}W</p>
              <p className="text-xs text-gray-500">Top pick: <span className="font-medium text-amber-700">{uc.recommended_chips[0].chip}</span> ({uc.recommended_chips[0].score}%)</p>
            </div>
          ))}
        </div>
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{selected.name}</h2>
          <p className="text-sm text-gray-500 mb-4">Requirements: {selected.requirements.min_tops}+ TOPS | {selected.requirements.max_watts}W max | {selected.requirements.precision.join(", ")} | Models: {selected.requirements.models.join(", ")}</p>
          <div className="space-y-3">
            {selected.recommended_chips.map((rec, i) => (
              <div key={rec.chip} className={`p-4 rounded-lg border ${i === 0 ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${i === 0 ? "text-amber-500" : "text-gray-400"}`}>#{i + 1}</span>
                    <span className="font-semibold text-gray-900">{rec.chip}</span>
                  </div>
                  <span className={`text-lg font-bold ${rec.score >= 90 ? "text-green-600" : rec.score >= 80 ? "text-blue-600" : "text-amber-600"}`}>{rec.score}%</span>
                </div>
                <p className="text-sm text-gray-600 ml-8">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
