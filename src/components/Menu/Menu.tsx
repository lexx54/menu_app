import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Center,
  Flex
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HamburgerIcon } from "@chakra-ui/icons"
export function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex align="center" justify="flex-end" p="1rem" position="absolute" w="100vw">
        <Button colorScheme='blue' onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent fontSize={20}>
          <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
          <DrawerBody>
            <Center mt="2rem">
              <Link to="/" >
                Dashboard
              </Link>
            </Center>
            <Center mt="2rem">
              <Link to="/creation" >
                Create Menu
              </Link>
            </Center>
            <Center m="2rem">
              <Link to="/visualizer" >
                Menu List
              </Link>
            </Center>
            <hr />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}