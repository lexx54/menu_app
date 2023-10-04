import React, { FC, ReactNode } from 'react'
import NavMenu from '../components/Menu/NavMenu'
import { Box } from "@chakra-ui/react"
import { Menu } from '../components/Menu/Menu'
import { ContextProvider } from '../context/ContextMenu'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ContextProvider>
      <Box>
        {/* <NavMenu /> */}
        <Menu />
        <Box p="2rem 1rem">
          {children}
        </Box>
      </Box>
    </ContextProvider>
  )
}

export default Layout