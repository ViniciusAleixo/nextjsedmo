const siteUrl = "https://products.edmoap.com.au";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
          'https://products.edmoap.com.au/server-sitemap.xml', // <==== Add here
        ],
      },
};