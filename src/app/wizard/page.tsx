"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type WizardStep = { question: string; options: { label: string; value: string }[] };

const steps: WizardStep[] = [
  { question: "What type of AI workload?", options: [{ label: "Computer Vision", value: "vision" }, { label: "Language Model (LLM)", value: "llm" }, { label: "Speech/Audio", value: "audio" }, { label: "Multi-modal", value: "multi" }] },
  { question: "What is your power budget?", options: [{ label: "< 5W (Battery)", value: "low" }, { label: "5-15W (Portable)", value: "medium" }, { label: "15-30W (Plugged in)", value: "high" }, { label: "30W+ (No limit)", value: "unlimited" }] },
  { question: "What is your budget?", options: [{ label: "< $100", value: "budget" }, { label: "$100-$300", value: "mid" }, { label: "$300-$600", value: "premium" }, { label: "$600+", value: "enterprise" }] },
  { question: "Deployment environment?", options: [{ label: "Indoor (controlled)", value: "indoor" }, { label: "Outdoor (weather)", value: "outdoor" }, { label: "Vehicle/Mobile", value: "vehicle" }, { label: "Data Center Edge", value: "datacenter" }] },
];

type Recommendation = { chip: string; reason: string; price: string; tops: number; watts: number };

const getRecommendation = (answers: string[]): Recommendation[] => {
  const [workload, power, budget] = answers;
  if (workload === "vision" && power === "low") return [
    { chip: "Hailo-8L", reason: "Best vision TOPS/watt at low power", price: "$70", tops: 13, watts: 1.5 },
    { chip: "Coral Edge TPU", reason: "Simple, proven vision accelerator", price: "$60", tops: 4, watts: 2 },
  ];
  if (workload === "llm") return [
    { chip: "Jetson Orin Nano", reason: "Best affordable option for LLMs with 8GB memory", price: "$199", tops: 40, watts: 15 },
    { chip: "Jetson Orin NX 16GB", reason: "Run larger models with 16GB memory", price: "$599", tops: 100, watts: 25 },
  ];
  if (workload === "vision" && budget !== "budget") return [
    { chip: "Hailo-8", reason: "Industry-leading vision efficiency at 10.4 TOPS/W", price: "$120", tops: 26, watts: 2.5 },
    { chip: "Jetson Orin Nano", reason: "Versatile GPU for vision + other tasks", price: "$199", tops: 40, watts: 15 },
  ];
  if (workload === "audio") return [
    { chip: "Coral Edge TPU", reason: "Low power, great for audio classification", price: "$60", tops: 4, watts: 2 },
    { chip: "Hailo-8L", reason: "Efficient for audio feature extraction", price: "$70", tops: 13, watts: 1.5 },
  ];
  return [
    { chip: "Jetson Orin NX 16GB", reason: "Most versatile for multi-modal workloads", price: "$599", tops: 100, watts: 25 },
    { chip: "Jetson Orin Nano", reason: "Budget multi-modal option", price: "$199", tops: 40, watts: 15 },
    { chip: "Hailo-8 + RPi 5", reason: "Modular approach: vision offload + CPU for LLM", price: "$200", tops: 13, watts: 10 },
  ];
};

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const selectOption = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    else setShowResult(true);
  };

  const reset = () => { setCurrentStep(0); setAnswers([]); setShowResult(false); };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deployment Wizard</h1>
          <p className="text-gray-500 mt-1">Answer a few questions to find the perfect edge AI chip</p>
        </div>

        {!showResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full ${i <= currentStep ? "bg-amber-500" : "bg-gray-200"}`} />
              ))}
            </div>
            <div className="glass rounded-xl p-8">
              <p className="text-sm text-amber-600 font-medium mb-2">Step {currentStep + 1} of {steps.length}</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{steps[currentStep].question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps[currentStep].options.map((opt) => (
                  <button key={opt.value} onClick={() => selectOption(opt.value)}
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-amber-500 hover:bg-amber-50 transition-all text-left">
                    <p className="font-medium text-gray-900">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Chips</h2>
              <div className="space-y-4 mb-6">
                {getRecommendation(answers).map((rec, i) => (
                  <div key={rec.chip} className={`p-5 rounded-xl border-2 ${i === 0 ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
                    {i === 0 && <span className="text-xs font-bold text-amber-600 uppercase">Best Match</span>}
                    <h3 className="text-lg font-semibold text-gray-900">{rec.chip}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="text-gray-500">Price: <span className="font-medium text-gray-900">{rec.price}</span></span>
                      <span className="text-gray-500">TOPS: <span className="font-medium text-gray-900">{rec.tops}</span></span>
                      <span className="text-gray-500">TDP: <span className="font-medium text-gray-900">{rec.watts}W</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={reset} className="px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700">Start Over</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
