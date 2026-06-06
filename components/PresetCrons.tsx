'use client';

import { Clock, Calendar, Sun, Moon } from 'lucide-react';

interface PresetProps {
  onSelect: (cron: string) => void;
}

export const PRESET_CRONS = [
  {
    label: 'Every hour',
    cron: '0 * * * *',
    icon: Clock,
    description: 'Runs at the start of every hour',
  },
  {
    label: 'Every day at 9 AM (GMT+7)',
    cron: '0 9 * * *',
    icon: Sun,
    description: 'Runs daily at 9:00 AM Bangkok time',
  },
  {
    label: 'Every day at 6 PM (GMT+7)',
    cron: '0 18 * * *',
    icon: Moon,
    description: 'Runs daily at 6:00 PM Bangkok time',
  },
  {
    label: 'Every Monday at 9 AM',
    cron: '0 9 * * 1',
    icon: Calendar,
    description: 'Runs every Monday at 9:00 AM',
  },
  {
    label: 'Every day at midnight',
    cron: '0 0 * * *',
    icon: Moon,
    description: 'Runs daily at 12:00 AM (midnight)',
  },
  {
    label: 'Every 15 minutes',
    cron: '*/15 * * * *',
    icon: Clock,
    description: 'Runs every 15 minutes',
  },
  {
    label: 'Every 30 minutes',
    cron: '*/30 * * * *',
    icon: Clock,
    description: 'Runs every 30 minutes',
  },
  {
    label: 'Every weekday at 9 AM',
    cron: '0 9 * * 1-5',
    icon: Calendar,
    description: 'Runs Monday to Friday at 9:00 AM',
  },
];

export function PresetCrons({ onSelect }: PresetProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {PRESET_CRONS.map((preset) => {
        const IconComponent = preset.icon;
        return (
          <button
            key={preset.cron}
            onClick={() => onSelect(preset.cron)}
            className="glass-dark hover:bg-opacity-40 p-4 rounded-lg transition-smooth text-left hover:scale-105 transform"
          >
            <div className="flex items-start gap-3">
              <IconComponent className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm">{preset.label}</h4>
                <p className="text-xs text-gray-300 mt-1">{preset.description}</p>
                <code className="text-xs text-indigo-300 mt-2 block font-mono">{preset.cron}</code>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}