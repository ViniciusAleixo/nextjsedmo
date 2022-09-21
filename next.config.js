const { NodeNextRequest } = require('next/dist/server/base-http/node')

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  

  reactStrictMode: true,
  swcMinify: true,
  images: {
   
    domains: ['inventory.dearsystems.com'],

},
compiler: {
  // ssr and displayName are configured by default
  styledComponents: true,
},
experimental: {
  largePageDataBytes: 16000 * 1000,
},

}


module.exports = nextConfig

  
