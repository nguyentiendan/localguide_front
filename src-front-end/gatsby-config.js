const colors = require('./src/styles/colors');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Local Guide Pal',
    description: 'Local Guide Pal',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/user/*'] },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/styles/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'local-guide-pal',
        short_name: 'tourguide',
        start_url: '/',
        background_color: colors.magenta[50],
        theme_color: colors.magenta[50],
        display: 'minimal-ui',
        icon: 'src/images/logo-small.png',
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': colors.magenta[50],
          'input-placeholder-color': colors.grey[50],
          'border-radius-base': '4px',
          'tag-font-size': '@font-size-base',
          'tag-line-height': '24px',
        },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-robots-txt',
    //   options: {
    //     resolveEnv: () => process.env.GATSBY_ROBOTS_TXT_ENV || process.env.NODE_ENV,
    //     env: {
    //       development: {
    //         policy: [{ userAgent: '*', disallow: ['/'] }],
    //       },
    //       staging: {
    //         policy: [{ userAgent: '*', disallow: ['/'] }],
    //       },
    //       production: {
    //         policy: [{ userAgent: '*', allow: '/' }],
    //       },
    //     },
    //   },
    // },
  ],
};
