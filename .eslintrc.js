// http://eslint.org/docs/user-guide/configuring
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'airbnb',
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, `build/webpack.${isProduction? 'prod' : 'dev'}.conf.js`)
      }
    },
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'arrow-parens': 0,
    'global-require': 0,
    'generator-star-spacing': 0,
    'no-debugger': isProduction ? 2 : 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    'import/no-dynamic-require': 0,
    'jsx-a11y/href-no-hash': 0,
    'semi': 0,
  },
}
