"use client";
import Sidebar from "@/components/Sidebar";

const chips = ["Jetson Orin Nano", "Jetson Orin NX", "Hailo-8", "Hailo-8L", "Coral Edge TPU", "Apple M3 ANE", "Hexagon NPU", "RK3588 NPU"];
const models = [
  { name: "Phi-3 Mini 3.8B", compat: [true, true, false, false, false, true, true, false] },
  { name: "Gemma 2B", compat: [true, true, false, false, false, true, true, false] },
  { name: "TinyLlama 1.1B", compat: [true, true, false, false, false, true, true, true] },
  { name: "Llama 3.2 3B", compat: [true, true, false, false, false, true, true, false] },
  { name: "Whisper Tiny", compat: [true, true, true, true, true, true, true, true] },
  { name: "MobileNet V3", compat: [true, true, true, true, true, true, true, true] },
  { name: "YOLO v8 Nano", compat: [true, true, true, true, true, true, true, true] },
  { name: "EfficientNet-Lite", compat: [true, true, true, true, true, true, true, true] },
  { name: "ResNet-50", compat: [true, true, true, true, true, true, true, true] },
  { name: "BERT-Base", compat: [true, true, false, false, false, true, true, false] },
  { name: "Stable Diffusion", compat: [false, true, false, false, false, true, false, false] },
  { name: "Mistral 7B", compat: [false, true, false, false, false, true, false, false] },
];

export default function CompatibilityPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Model Compatibility Matrix</h1>
          <p className="text-gray-500 mt-1">Check which AI models run on which edge chips</p>
        </div>
        <div className="glass rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-3 text-gray-500 font-medium sticky left-0 bg-gray-50 z-10">Model</th>
                {chips.map((c) => <th key={c} className="text-center py-3 px-2 text-gray-500 font-medium text-xs whitespace-nowrap">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900 sticky left-0 bg-white">{m.name}</td>
                  {m.compat.map((ok, i) => (
                    <td key={i} className="py-3 px-2 text-center">
                      {ok ? <span className="inline-block w-6 h-6 rounded-full bg-green-100 text-green-700 leading-6 text-xs font-bold">Y</span>
                           : <span className="inline-block w-6 h-6 rounded-full bg-red-100 text-red-400 leading-6 text-xs">N</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 glass rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Compatibility Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <p>* Hailo and Coral are optimized for vision models (INT8 quantized CNNs)</p>
            <p>* LLMs require chips with significant memory (4GB+) and general compute</p>
            <p>* Apple ANE requires CoreML model conversion for optimal performance</p>
            <p>* Jetson supports the widest range of model types via CUDA/TensorRT</p>
          </div>
        </div>
      </main>
    </div>
  );
}
