import React from "react";

interface PresetCronsProps {
  onSelect: (cron: string) => void;
}

const presets = [
  { label: "Mỗi giờ (vào phút 0)", value: "0 * * * *" },
  { label: "9 giờ sáng hàng ngày (GMT+7)", value: "0 9 * * *" },
  { label: "Nửa đêm hàng ngày", value: "0 0 * * *" },
  { label: "Mỗi 15 phút", value: "*/15 * * * *" },
  { label: "Thứ Hai lúc 8 giờ sáng", value: "0 8 * * 1" },
  { label: "Ngày đầu tiên mỗi tháng", value: "0 0 1 * *" },
];

const PresetCrons: React.FC<PresetCronsProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {presets.map((preset) => (
        <button
          key={preset.value}
          onClick={() => onSelect(preset.value)}
          className="text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm transition-all hover:translate-x-1 group"
        >
          <span className="block font-medium text-white group-hover:text-indigo-300 transition-colors">
            {preset.label}
          </span>
          <code className="text-xs text-indigo-300/70 font-mono">{preset.value}</code>
        </button>
      ))}
    </div>
  );
};

export default PresetCrons;
