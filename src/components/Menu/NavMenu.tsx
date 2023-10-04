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
            Dashboard
          </Link>
        </Center>
        <Center sx={linkMediaQuery}>
          <Link to="/creation" >
            Create Menu
          </Link>
        </Center>
        <Center sx={linkMediaQuery}>
          <Link to="/visualizer" >
            Menu List
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