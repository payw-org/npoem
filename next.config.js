const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack: (config) => {
    config.resolve.alias['@@'] = __dirname
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')

    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
})
