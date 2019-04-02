module.exports = {
  "presets": [
    '@babel/preset-env',
  ],
  "cwd":process.cwd(),
  "env": {
    "test": {
      "presets": [["next/babel", { "preset-env": { "modules": "commonjs" }, "styled-jsx": {
        "plugins": [
          "styled-jsx-plugin-postcss"
        ]
      } }]]
    }
  }
}
