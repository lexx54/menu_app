import React from 'react'
import {
  Flex,
  Center,
  Spacer
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <Flex {...styles}>
      <Center>
        Logo
      </Center>
      <Spacer />
      <Flex dir='row' flex="30% 0 0" justify="space-evenly" align="center">
        <Link to="/">
          Dashboard
        </Link>
        <Link to="/creation">
          Create Menu
        </Link>
        <Link to="/visualizer">
          Menu List
        </Link>
      </Flex>
    </Flex>
  )
}

export default NavMenu

const styles = {
  align: "center",
  justif: "center",
  p: "1rem 2rem",
  backgroundColor: "blue.300",
  color: "white"
}