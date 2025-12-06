/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 开启手动暗色模式支持
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // 可选，如果后面需要排版插件
  ],
}