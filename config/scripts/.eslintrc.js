const options = require('../../config');

module.exports = {
    extends: [
        "eslint:recommended",
        "airbnb-base"
    ],
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    env: {
        "node": true,
        "browser": true,
        "es6": true
    },
    settings: {
        'import/resolver': {
          'alias': [
            ['@', options.sourceRootFolder]
           ]
         }
      }
}
