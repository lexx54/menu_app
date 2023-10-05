import React from 'react'
import {
  Flex,
  Center,
  Spacer,
  useBreakpointValue
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <Flex {...mainStyles} sx={directionMediaQuery}>
      <Center>
        Logo
      </Center>
      <Spacer />
      <Flex {...subMenuStyles} sx={directionMediaQuery}>
        <Center sx={linkMediaQuery}>
          <Link to="/" >
            Principal
          </Link>
        </Center>
        <Center sx={linkMediaQuery}>
          <Link to="/creation" >
            Crear Lista de compra
          </Link>
        </Center>
        <Center sx={linkMediaQuery}>
          <Link to="/visualizer" >
            Lista de menus
          </Link>
        </Center>
      </Flex>
    </Flex>
  )
}

export default NavMenu

const directionMediaQuery = {
  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
  },
  '@media screen and (min-width: 769px)': {
    flexDirection: 'row',
  },
}

const linkMediaQuery = {
  '@media screen and (max-width: 768px)': {
    marginTop: '1rem'
  },
}

const mainStyles = {
  align: "center",
  justify: "center",
  p: "1rem 2rem",
  backgroundColor: "blue.300",
  color: "white"
}

const subMenuStyles = {
  flex: "30% 0 0",
  justify: "space-evenly",
  align: "center"
}