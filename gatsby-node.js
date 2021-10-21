const path = require(`path`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const projects = await getProjects(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!projects.length) {
    return
  }

  // If there are projects, create pages for them
  await createIndividualProjectPages({ projects, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualProjectPages = async ({ projects, gatsbyUtilities }) =>
  Promise.all(
    projects.map(({ previous, project, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `projects/${project.slug}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/project.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: project.id,

          // We also use the next and previous id's to query them and add links!
          previousProjectId: previous ? previous.id : projects[0].project.id,
          nextProjectId: next ? next.id : projects[projects.length - 1].project.id,
        },
      })
    )
  )

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress projects. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getProjects({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query {
        allWpProject {
            edges {
                previous {
                    id
                }
                next {
                    id
                }
                project: node {
                    id
                    slug
                }
            }
        }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return;
  }

  return graphqlResult.data.allWpProject.edges
}
