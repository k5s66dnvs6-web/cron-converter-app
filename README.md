# Cron Converter App

A beautiful, modern web application for converting cron expressions between GMT+7 and UTC timezones.

## Features

- 🔄 **Timezone Conversion**: Convert cron expressions between GMT+7 (Bangkok) and UTC
- 📖 **Expression Explanation**: Get human-readable explanations of cron expressions using cronstrue
- 🎯 **Preset Crons**: Quick access to common cron patterns (hourly, daily, weekly, etc.)
- 🎨 **Beautiful UI**: Modern glassmorphic design with indigo-violet gradient theme
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🔔 **Toast Notifications**: User-friendly feedback for actions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui inspired design
- **Icons**: Lucide React
- **Cron Parsing**: cron-parser and cronstrue
- **Timezone Handling**: date-fns-tz

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Development

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Production Build

\`\`\`bash
npm run build
npm start
# or
yarn build
yarn start
\`\`\`

## Usage

1. **Enter a Cron Expression**: Paste or type a valid cron expression in the format \`minute hour day month day-of-week\`
2. **View Explanation**: The app automatically displays what the cron expression does
3. **Convert Timezone**: Select source and target timezones to convert between GMT+7 and UTC
4. **Use Presets**: Click on any preset to quickly load common cron patterns
5. **Copy Result**: Use the copy button to copy expressions to your clipboard

## Preset Examples

- Every hour: \`0 * * * *\`
- Every day at 9 AM (GMT+7): \`0 9 * * *\`
- Every day at 6 PM (GMT+7): \`0 18 * * *\`
- Every Monday at 9 AM: \`0 9 * * 1\`
- Every 15 minutes: \`*/15 * * * *\`

## Cron Expression Format

Cron expressions use the following format (5 fields):

\`\`\`
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
* * * * *
\`\`\`

### Special Characters

- \`*\` - Any value
- \`,\` - Value list separator
- \`-\` - Range of values
- \`/\` - Step values

## License

MIT

## Author

Created for efficient cron expression management across different timezones.