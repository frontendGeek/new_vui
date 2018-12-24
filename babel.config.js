module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: ["transform-vue-jsx", "transform-runtime"],
  env: {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["transform-vue-jsx", "istanbul"]
    }
  }
}