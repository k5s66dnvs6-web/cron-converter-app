'use client';

import { useState } from 'react';
import { ArrowRightLeft, Copy, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import cronstrue from 'cronstrue';
import { PresetCrons } from '@/components/PresetCrons';
import { Toast } from '@/components/Toast';
import { cn } from '@/lib/utils';

const TIMEZONE_OFFSETS = {
  'UTC': 0,
  'GMT+7 (Bangkok)': 7,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'converter' | 'presets'>('converter');
  const [cronExpression, setCronExpression] = useState('0 9 * * *');
  const [sourceTimezone, setSourceTimezone] = useState<'UTC' | 'GMT+7 (Bangkok)'>('GMT+7 (Bangkok)');
  const [targetTimezone, setTargetTimezone] = useState<'UTC' | 'GMT+7 (Bangkok)'>('UTC');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const isValidCron = (cron: string): boolean => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return false;
    
    try {
      cronstrue.toString(cron);
      return true;
    } catch {
      return false;
    }
  };

  const convertCronTimezone = (cron: string): string => {
    try {
      const sourceOffset = TIMEZONE_OFFSETS[sourceTimezone];
      const targetOffset = TIMEZONE_OFFSETS[targetTimezone];
      const hourShift = targetOffset - sourceOffset;

      const parts = cron.trim().split(/\s+/);
      if (parts.length !== 5) return cron;

      const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

      if (hour !== '*' && !hour.includes('-') && !hour.includes('/')) {
        const hourValues = hour.split(',').map(h => {
          const parsed = parseInt(h);
          if (isNaN(parsed)) return h;
          
          let newHour = (parsed + hourShift) % 24;
          if (newHour < 0) newHour += 24;
          return newHour.toString();
        });

        return \`\${minute} \${hourValues.join(',')} \${dayOfMonth} \${month} \${dayOfWeek}\`;
      }

      return cron;
    } catch (e) {
      return cron;
    }
  };

  const getExplanation = (cron: string): string => {
    try {
      return cronstrue.toString(cron);
    } catch {
      return 'Invalid cron expression';
    }
  };

  const convertedCron = convertCronTimezone(cronExpression);
  const explanation = getExplanation(cronExpression);
  const convertedExplanation = sourceTimezone !== targetTimezone ? getExplanation(convertedCron) : explanation;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const handleSwapTimezones = () => {
    setSourceTimezone(targetTimezone);
    setTargetTimezone(sourceTimezone);
  };

  const handleSelectPreset = (preset: string) => {
    setCronExpression(preset);
    showToast('Preset loaded!', 'success');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">
            Cron Expression Converter
          </h1>
          <p className="text-gray-300 text-lg">
            Convert cron expressions between GMT+7 and UTC timezones
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setActiveTab('converter')}
            className={cn(
              'px-6 py-2 rounded-lg font-semibold transition-smooth',
              activeTab === 'converter'
                ? 'bg-gradient-indigo-violet text-white'
                : 'glass text-gray-300 hover:text-white'
            )}
          >
            Converter
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={cn(
              'px-6 py-2 rounded-lg font-semibold transition-smooth',
              activeTab === 'presets'
                ? 'bg-gradient-indigo-violet text-white'
                : 'glass text-gray-300 hover:text-white'
            )}
          >
            Presets
          </button>
        </div>

        {activeTab === 'converter' && (
          <div className="space-y-6">
            <div className="glass-dark rounded-xl p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Cron Expression
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cronExpression}
                    onChange={(e) => setCronExpression(e.target.value)}
                    placeholder="0 9 * * *"
                    className="w-full bg-slate-800 border border-indigo-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-smooth"
                  />
                  {isValidCron(cronExpression) && (
                    <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                  )}
                  {!isValidCron(cronExpression) && cronExpression.trim() && (
                    <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Format: minute hour day month day-of-week
                </p>
              </div>

              {isValidCron(cronExpression) && (
                <div className="bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 rounded-lg p-4">
                  <div className="flex gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-indigo-200 mb-1">Meaning:</p>
                      <p className="text-sm text-gray-200">{explanation}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      From Timezone
                    </label>
                    <select
                      value={sourceTimezone}
                      onChange={(e) => setSourceTimezone(e.target.value as any)}
                      className="w-full bg-slate-800 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      {Object.keys(TIMEZONE_OFFSETS).map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={handleSwapTimezones}
                      className="p-2 rounded-lg glass hover:bg-opacity-40 transition-smooth"
                      title="Swap timezones"
                    >
                      <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      To Timezone
                    </label>
                    <select
                      value={targetTimezone}
                      onChange={(e) => setTargetTimezone(e.target.value as any)}
                      className="w-full bg-slate-800 border border-indigo-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      {Object.keys(TIMEZONE_OFFSETS).map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {sourceTimezone !== targetTimezone && (
                  <div className="bg-slate-800 border border-indigo-500/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-300">Converted Expression:</span>
                      <button
                        onClick={() => handleCopy(convertedCron)}
                        className="p-1 rounded hover:bg-slate-700 transition-smooth"
                      >
                        <Copy className="w-4 h-4 text-indigo-400" />
                      </button>
                    </div>
                    <code className="block bg-slate-900 rounded px-3 py-2 text-indigo-300 font-mono text-sm">
                      {convertedCron}
                    </code>
                    {isValidCron(convertedCron) && (
                      <p className="text-sm text-gray-300">
                        <span className="text-indigo-300 font-semibold">In {targetTimezone}:</span> {convertedExplanation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(cronExpression)}
                  className="flex-1 bg-gradient-indigo-violet hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-smooth"
                >
                  <Copy className="w-4 h-4 inline mr-2" />
                  Copy Cron
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'presets' && (
          <div className="glass-dark rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Common Cron Presets</h2>
            <PresetCrons onSelect={handleSelectPreset} />
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
        />
      )}
    </main>
  );
}