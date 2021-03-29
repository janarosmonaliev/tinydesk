module.exports = {
  pathPrefix: "/project-416",
  siteMetadata: {
    title: `Command T`,
    description: `Personal homepage that replaces the default startup page. It lets the user manage bookmarks, create to-do lists, and write notes. Start using Command T and boost your productivity.`,
    author: `Team KGB`,
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    image:
      "https://github.com/janarosmonaliev/project-416/tree/master/src/images/commandt-display.png?raw=true",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Project 416`,
        short_name: `project-416`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
