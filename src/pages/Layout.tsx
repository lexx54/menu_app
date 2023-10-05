import React, { FC, ReactNode } from 'react'
import NavMenu from '../components/Menu/NavMenu'
import { Box } from "@chakra-ui/react"
import { Menu } from '../components/Menu/Menu'
import { ContextProvider } from '../context/ContextMenu'
import image from '../assets/background.jpg'


const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ContextProvider>
      <Box>
        {/* <NavMenu /> */}
        <Menu />
        <Box p="2rem 1rem" bgImage={image} backgroundRepeat="no-repeat" backgroundSize="cover" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </ContextProvider>
  )
}

export default Layout