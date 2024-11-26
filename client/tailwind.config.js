/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        // 'light-blue' : '#637DC9',
        // 'light-blue' : '#3466F6',
        // 'light-blue' : '#A0B8FF',
        // 'light-blue' : '#1A7BB9',
        // 'light-blue' : '#80E8FF',
        // 'light-blue' : '#A5EFFF',
        // 'light-blue' : '#d0eef5',
          'light-blue' : '#dcf0f5',
          'dark-blue' : '#1D2882',
      }
    },
  },
  plugins: [],
}