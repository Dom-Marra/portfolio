import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Navbar from "./navbar"

const Layout = ({ children }) => {
  const {
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
