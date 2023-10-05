import React, { useState } from 'react'
import { Box, Flex, Grid, Spacer, useToast } from '@chakra-ui/react'
import { Button, Center, Badge, Input } from '@chakra-ui/react'
import { TMenu } from '../types/menu'
import { AddIcon, DeleteIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import useData from '../hooks/useData'

const Visualizer = () => {
  const [searchWord, setSearchWord] = useState('')
  const [isDescription, setIsDescription] = useState({ open: false, id: 0 })
  const [isEditing, setIsEditing] = useState({ state: false, id: 0 })
  const [pagination, setPagination] = useState({ start: 0, end: 10 })
  const { data, error, loading, handleDeleteData } = useData('menus')
  const toast = useToast()

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

  const handlePagination = (direction: string) => {
    setPagination((prev) => ({
      start: direction === "back" ? prev.start - 5 : prev.start + 5,
      end: direction === "back" ? prev.end - 5 : prev.end + 5,
    }))
  }

  const filteredData = data?.filter((item: TMenu) => new RegExp(searchWord, 'gi').test(item.nombre))
  return (
    <Box>
      <Center>
        <Input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Inserte nombre del menu que desea buscar"
          width="80%"
          backgroundColor="blue.300"
          color="white"
        />
      </Center>
      <Flex align="center" justify="center" mt="2rem">
        {
          pagination.start > 0 && <Button size="xs" onClick={() => handlePagination('back')}>Mostrar menos</Button>
        }

        <Badge mx="2rem">
          Actualmente mostrando
          {' '}
          del
          {' '}
          {pagination.start}
          {' '}
          {pagination.end}
        </Badge>
        {
          pagination.end <= data.length && <Button size="xs" onClick={() => handlePagination('forward')}>Mostrar mas</Button>
        }
      </Flex>
      <Grid sx={templateMediaQuery} gap={6} m="3rem 0">
        <>

          {
            filteredData
              ?.slice(pagination.start, pagination.end)
              ?.map((item: TMenu) => (
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
          <Flex {...descriptionStyle} direction="column" backgroundColor="white" width="60%" margin="0 auto">
            <Flex justify="flex-end" gap="3">
              <Button size="xs" colorScheme='blue'>
                <EditIcon />
              </Button>
              <Button size="xs" colorScheme='red' onClick={() => {
                handleDeleteData(isDescription.id)
                toast({
                  title: 'Menu Eliminado.',
                  description: "El menu ha sido eliminado exitosamente",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
                setIsDescription({ open: false, id: 0 })
              }}>
                <DeleteIcon />
              </Button>
            </Flex>
            <Box p="0 0.5rem" mb="1rem">
              {filteredData.find((item: TMenu) => item.id === isDescription.id)?.descripcion}
            </Box>
            <Badge fontStyle="italic" w="50%">
              Cuenta con {filteredData.find((item: TMenu) => item.id === isDescription.id)?.platos?.length} platos
            </Badge>
          </Flex>
        )
      }
      {
        isEditing.state && (
          <Flex {...descriptionStyle} direction="column" backgroundColor="white" width="60%" margin="0 auto">
            <Flex justify="flex-end" gap="3">
              <Button size="xs" colorScheme='blue'>
                <SmallCloseIcon />
              </Button>
              <Button size="xs" colorScheme='red' onClick={() => {
                handleDeleteData(isDescription.id)
                toast({
                  title: 'Menu Editado.',
                  description: "El menu ha sido editado exitosamente",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
                setIsDescription({ open: false, id: 0 })
              }}>
                <AddIcon />
              </Button>
            </Flex>


            <Box p="0 0.5rem" mb="1rem">
              <Input />
            </Box>
            <Badge fontStyle="italic" w="50%">
              Cuenta con {filteredData.find((item: TMenu) => item.id === isDescription.id)?.platos?.length} platos
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