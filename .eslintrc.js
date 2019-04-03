module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module",
    "ecmaVersion": 2018
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-unused-vars": "off",
    "indent": [
      "warn",
      "tab"
    ],
    "linebreak-style": [
      "warn",
      "windows"
    ],
    "quotes": [
      "warn",
      "double"
    ],
    "semi": [
      "warn",
      "never"
    ]
  }
};