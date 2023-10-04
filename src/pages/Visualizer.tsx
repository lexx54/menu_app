import React, { useState } from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import { Button, Center, Badge, Input } from '@chakra-ui/react'
import { TMenu } from '../types/menu'
import { AddIcon } from '@chakra-ui/icons'
import useData from '../hooks/useData'

const Visualizer = () => {
  const [searchWord, setSearchWord] = useState('')
  const [isDescription, setIsDescription] = useState({ open: false, id: 0 })
  const { data, error, loading } = useData('menus')

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

  const filteredData = data?.filter((item: TMenu) => new RegExp(searchWord, 'gi').test(item.nombre))
  return (
    <Box>
      <Center>
        <Input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Inserte nombre del menu que desea buscar"
        />
      </Center>
      <Grid sx={templateMediaQuery} gap={6} mt={6}>
        <>
          {
            filteredData?.map((item: TMenu) => (
              <>
                <Flex
                  {...itemStyle}
                  as="button"
                  onClick={() => handleItemClick(Number(item.id))}
                  key={item.id}
                  flexDirection="column"
                  color={isDescription.id === item.id ? 'white' : 'black'}
                  backgroundColor={isDescription.id === item.id ? 'blue.700' : 'blue.300'}
                >
                  <Center color="black" fontWeight={700} m="1rem 0">
                    {item.nombre}
                  </Center>
                </Flex>
              </>
            ))
          }
        </>
      </Grid>
      {
        isDescription.open && (
          <Flex {...descriptionStyle} direction="column">
            <Button position="absolute" top="1.5" left="1.5" size="xs">
              <AddIcon />
            </Button>
            <Box p="0 0.5rem" mb="1rem">
              {filteredData.find((item: TMenu) => item.id === isDescription.id).descripcion}
            </Box>
            <Badge fontStyle="italic" w="50%">
              Cuenta con {filteredData.find((item: TMenu) => item.id === isDescription.id).platos.length} platos
            </Badge>
          </Flex>
        )
      }
    </Box >
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
  padding: '1rem 0',
  align: "center"
}

const descriptionStyle = {
  border: "2px solid gray",
  borderRadius: '24px',
  padding: '2rem 1rem',
  margin: '1rem 0',
}

const descriptionMediaQuery = {
  '@media screen and (max-width: 768px)': {
    flexDirection: "repeat(3, 1fr)",
  },
  '@media screen and (min-width: 769px)': {
    flexDirection: "repeat(5, 1fr)",
  },
}

export default Visualizer