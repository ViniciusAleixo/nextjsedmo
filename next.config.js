const { NodeNextRequest } = require('next/dist/server/base-http/node')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // matching all API routes
        source: "/api/inventory.dearsystems.com/ExternalApi/v2/Product",
        destination: 'http://localhost:3000/:path*'
      }
      ]
  },


  reactStrictMode: true,
  swcMinify: true,
  images: {
   
    domains: ['inventory.dearsystems.com'],

},

}


module.exports = nextConfig

  
