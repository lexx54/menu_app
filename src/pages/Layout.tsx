import React, { FC, ReactNode } from 'react'
import NavMenu from '../components/Menu/NavMenu'
import { Box } from "@chakra-ui/react"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box>
      <NavMenu />
      {children}
    </Box>
  )
}

export default Layout