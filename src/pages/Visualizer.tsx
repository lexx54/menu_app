import React, { useState } from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import { Button, Center, Badge } from '@chakra-ui/react'
import useMenu from '../hooks/useMenu'
import { TMenu } from '../types/menu'
import { AddIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Visualizer = () => {
  const [isDescription, setIsDescription] = useState({ open: false, id: 0 })
  const { data, error, loading } = useMenu()

  const handleItemClick = (id: number) => {
    if (isDescription.id === id) setIsDescription({ open: false, id: 0 })
    else setIsDescription({ open: true, id })
  }

  if (error) return (
    <Center>
      Something went wrong
    </Center>
  )

  if (loading) return (
    <Center>
      Loading
    </Center>
  )
  return (
    <Box>
      <Center>
        <Button as={Link} to="/creation">
          Add Menu
        </Button>
      </Center>
      <Grid sx={templateMediaQuery} gap={6} mt={6}>
        <>
          {
            data?.map((item: TMenu) => (
              <>
                <Flex
                  {...itemStyle}
                  as="button"
                  onClick={() => handleItemClick(item.id)}
                  key={item.id}
                  direction="column"
                  align="center"
                  position="relative"
                >
                  <Center color="black" fontWeight={700} m="1rem 0">
                    {item.nombre}
                  </Center>
                  {
                    (isDescription.open && isDescription.id === item.id) && (
                      <>
                        <Button position="absolute" top="1.5" left="1.5" size="xs">
                          <AddIcon />
                        </Button>
                        <hr />
                        <Box p="0 0.5rem" mb="1rem">
                          {item.descripcion}
                        </Box>
                        <Badge fontStyle="italic">
                          Cuenta con {item.platos.length} platos
                        </Badge>
                      </>
                    )
                  }
                </Flex>
              </>
            ))
          }
        </>
      </Grid>
    </Box>
  )
}

const templateMediaQuery = {
  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  '@media screen and (min-width: 769px)': {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
}

const itemStyle = {
  borderRadius: ' 0 25px 0 25px',
  backgroundColor: 'blue.300',
  color: 'white',
  padding: '1rem 0',
}

export default Visualizer