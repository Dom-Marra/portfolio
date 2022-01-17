/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

module.exports = {
  siteMetadata: {
    title: `Dominic Marra`,
    description: `Welcome to my portfolio website! View my projects or just learn a little bit more about me.`,
    author: `Dominic Marra`,
  },
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */
  plugins: [
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url: `https://www.dominicmarra.com/portfolio/graphql`,
        html: {
          useGatsbyImage: true,
          generateWebpImages: true,
        },
      },
    },
    
    //WordPress GraphQL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Remote schema query type. This is an arbitrary name.
        typeName: "WPGraphQL",
        // Field name under which it will be available. Used in your Gatsby query. This is also an arbitrary name.
        fieldName: "portfolio",
        // GraphQL endpoint, relative to your WordPress home URL.
        url: "https://dominicmarra.com/portfolio/graphql",
      },
    },

    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
     `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dominic Marra`,
        short_name: `Dominic Marra`,
        start_url: `/`,
        background_color: `#1d1d1d`,
        theme_color: `#00AEEF`,
        display: `minimal-ui`,
        icon: `content/assets/favicon-196x196.png`,
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    // `gatsby-plugin-offline`,

    `gatsby-plugin-sass`
  ],
}
