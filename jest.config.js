module.exports = {
    rootDir: 'src/test',
    testRegex: '/src/test/.*test\\.js$',
    setupFiles: ['<rootDir>/setup.js'],
    "moduleNameMapper": {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    "transform": {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.svg$": "jest-svg-transformer"
  }
  };