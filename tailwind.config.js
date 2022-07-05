module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./template/index.html"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        reactGray: "#1F232A",
        reactBlue: "#60DAF8",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
}

//this file is required by tailwind. See excellent tailwind documentation if you want to extend colors, fonts, etc...
