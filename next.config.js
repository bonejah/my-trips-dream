// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withPWA = require('next-pwa')
// const isProd = process.env.NODE_ENV === 'production'

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     disable: !isProd
//   },
//   images: {
//     domains: ['media.graphassets.com']
//   }
// })

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

module.exports = withPWA({
  // next.js config
  images: {
    domains: ['media.graphassets.com']
  }
})