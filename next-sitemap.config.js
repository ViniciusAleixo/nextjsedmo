const siteUrl = "https://products.edmoap.com.au";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    sitemapSize: 1000,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [
          'https://products.edmoap.com.au/server-sitemap.xml', // <==== Add here
        ],
      },
};