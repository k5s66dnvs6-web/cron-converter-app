"use client";

import React, { useState, useEffect } from "react";
import { Clock, ArrowRightLeft, Info, Copy, Check, Zap } from "lucide-react";
import { shiftCron, getCronExplanation } from "../lib/cron-utils";
import PresetCrons from "../components/PresetCrons";
import Toast from "../components/Toast";

export default function CronConverter() {
  const [cronInput, setCronInput] = useState("0 9 * * *");
  const [direction, setDirection] = useState<"TO_UTC" | "TO_LOCAL">("TO_UTC");
  const [result, setResult] = useState("");
  const [explanation, setExplanation] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleConvert = () => {
    try {
      const offset = direction === "TO_UTC" ? -7 : 7;
      const converted = shiftCron(cronInput, offset);
      setResult(converted);
      setExplanation(getCronExplanation(converted));
    } catch (err) {
      setToastMsg("Biểu thức Cron không hợp lệ. Vui lòng kiểm tra lại.");
      setShowToast(true);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [cronInput, direction]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMsg("Đã sao chép vào bộ nhớ tạm!");
    setShowToast(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-4 md:p-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Bộ Chuyển Đổi Cron
          </h1>
          <p className="text-indigo-100 text-lg opacity-90">
            Chuyển đổi biểu thức Cron giữa múi giờ GMT+7 và UTC một cách dễ dàng.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-indigo-200 mb-2 ml-1">
                    Nhập biểu thức Cron
                  </label>
                  <input
                    type="text"
                    value={cronInput}
                    onChange={(e) => setCronInput(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                    placeholder="e.g. 0 9 * * *"
                  />
                </div>
                
                <button 
                  onClick={() => setDirection(direction === "TO_UTC" ? "TO_LOCAL" : "TO_UTC")}
                  className="mt-6 p-4 bg-indigo-500 hover:bg-indigo-400 rounded-2xl transition-all shadow-lg hover:scale-105 active:scale-95"
                  title="Đổi chiều chuyển đổi"
                >
                  <ArrowRightLeft className={`transition-transform duration-500 ${direction === "TO_LOCAL" ? "rotate-180" : ""}`} />
                </button>

                <div className="flex-1 w-full text-center md:text-left">
                  <p className="text-sm font-medium text-indigo-200 mb-2 ml-1">Chiều chuyển đổi</p>
                  <div className="bg-indigo-900/40 rounded-2xl px-5 py-4 border border-white/10 flex items-center justify-center space-x-3">
                    <span className="font-bold">{direction === "TO_UTC" ? "GMT+7" : "UTC"}</span>
                    <span className="opacity-50">→</span>
                    <span className="font-bold text-indigo-300">{direction === "TO_UTC" ? "UTC" : "GMT+7"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs uppercase tracking-wider text-indigo-300 font-bold">Kết quả</span>
                    <button onClick={() => copyToClipboard(result)} className="text-indigo-200 hover:text-white transition-colors">
                      <Copy size={18} />
                    </button>
                  </div>
                  <div className="text-3xl md:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                    {result}
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-indigo-900/30 rounded-2xl border border-indigo-400/20">
                  <Info className="text-indigo-300 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-indigo-200 mb-1">Giải nghĩa (Kết quả)</p>
                    <p className="text-white/90">{explanation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-900/20 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
              <div className="bg-indigo-500/20 p-3 rounded-2xl">
                <Clock className="text-indigo-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">Ghi chú về múi giờ</p>
                <p className="text-xs text-indigo-200 opacity-80">
                  Hệ thống sử dụng độ lệch cố định là 7 giờ cho GMT+7. Bạn có thể sử dụng kết quả này cho các tác vụ lên lịch tự động.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-indigo-200">
                <Zap size={18} />
                <h2 className="font-bold uppercase tracking-tight text-sm">Mẫu Cron Phổ Biến</h2>
              </div>
              <PresetCrons onSelect={(c) => setCronInput(c)} />
            </div>
          </div>
        </div>
      </div>

      <Toast show={showToast} message={toastMsg} onClose={() => setShowToast(false)} />
    </main>
  );
}
