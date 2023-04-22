/* tailwind.config.js */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  mode: 'jit',
  //purge: ['./public/**/*.html'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        dunes: "url('/bg-1.png')",
        bgsmoke: "url('/bg-smoke.jpg')",
        bean: "url('/bean.jpeg')",
        sunflower: "url('/sunflower.jpeg')",
        techno: "url('/techno.jpeg')",
        bg1: "url('/bg-1.png')",
        bg2: "url('/bg-2.jpeg')",
        bg3: "url('/bg-3.jpeg')",
        bgink: "url('/bg-ink.jpg')",
        music: "url('/music.jpeg')",
        leaves: "url('/leaves.jpeg')",
        astronaut: "url('/astronaut.jpeg')",
        banp1: "url('/banner-Pat-1.jpg')",
        banp2: "url('/banner-brick.jpg')",
        bangear: "url('/banner-gears.jpg')",
        bandigitz: "url('/banner-digitz.jpg')",
        banpat2: "url('/banner-pat2.jpg')",
        banpat3: "url('/banner-pat3.jpg')",
        banpat4: "url('/banner-pat4.jpg')",
        banred: "url('/banner-red.jpg')",
        bandigitz2: "url('/banner-digitz2.jpg')",
        nftenia: "url('/nftenia.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require("flowbite/plugin"),
  ],
}