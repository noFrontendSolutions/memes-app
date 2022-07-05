module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
}
//These postcss plugins are required and used by the postcss-loader, one of which is the tailwindcss plugin.
//autoprefixer is a PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from "Can I Use".
//Postcss-import is a plugin that offers the ability to organize your CSS into multiple files and combine them at build time by processing @import statements in advance, instead of in the browser.
