import cronParser from 'cron-parser';
import cronstrue from 'cronstrue';

export const convertCron = (cron: string, fromOffset: number, toOffset: number) => {
  try {
    const parts = cron.trim().split(' ');
    if (parts.length !== 5) return null;
    
    const [min, hour, dom, month, dow] = parts;
    
    if (hour !== '*') {
      const hourShift = toOffset - fromOffset;
      const hours = hour.split(',').map(h => {
        const parsedHour = parseInt(h);
        if (isNaN(parsedHour)) return h;
        let newHour = (parsedHour + hourShift) % 24;
        if (newHour < 0) newHour += 24;
        return newHour.toString();
      });
      return \`\${min} \${hours.join(',')} \${dom} \${month} \${dow}\`;
    }

    return cron;
  } catch (e) {
    return null;
  }
};

export const getExplanation = (cron: string) => {
  try {
    return cronstrue.toString(cron);
  } catch (e) {
    return "Invalid cron expression";
  }
};