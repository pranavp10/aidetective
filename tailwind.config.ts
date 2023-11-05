import type { Config } from 'tailwindcss'
const path = require("path")

const uiPath = path.resolve(require.resolve("@medusajs/ui"), "../..", "\*_/_.{js,jsx,ts,tsx}")

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    uiPath
  ],
  theme: {},
  plugins: [],
  darkMode: 'class',
  presets: [require("@medusajs/ui-preset")],
}
export default config
