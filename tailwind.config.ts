import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './content/**/*.{md,yml,json}'
  ],
  theme: {
    container: {
      center: true,
      screens: { lg: '760px', xl: '760px' }
      // screens: { lg: '800px', xl: '940px', '2xl': '1100px' }
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}


