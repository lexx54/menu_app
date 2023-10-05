import React, { useState } from 'react'
import { Box, Flex, FormControl, FormLabel, Grid, Select, Spacer, useToast } from '@chakra-ui/react'
import { Button, Center, Badge, Input } from '@chakra-ui/react'
import { TMenu } from '../types/menu'
import { TCreatorValues, TPlate } from '../types/creator'
import { AddIcon, ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import useData from '../hooks/useData'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

const Visualizer = () => {
  const [searchWord, setSearchWord] = useState('')
  const [isDescription, setIsDescription] = useState({ open: false, id: 0 })
  const [isEditing, setIsEditing] = useState({ state: false, id: 0 })
  const [pagination, setPagination] = useState({ start: 0, end: 10 })
  const { data, error, loading, handleDeleteData, handleEditData } = useData('menus')
  const { data: recipesData } = useData('recetas')
  const toast = useToast()
  const { control, handleSubmit, reset, setValue } = useForm<TCreatorValues>({
    defaultValues: {
      name: '',
      description: '',
      plates: []
    },
  })
  const { fields, append, remove, update } = useFieldArray({
    name: 'plates',
    control: control
  })

  React.useEffect(() => {
    if (isEditing.state) {
      setValue('name', data.find((item: TMenu) => item.id === isEditing.id).nombre);
      setValue('description', data.find((item: TMenu) => item.id === isEditing.id).descripcion);
      setValue('plates', data.find((item: TMenu) => item.id === isEditing.id).platos);
    }
  }, [isEditing]);

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
  const onSubmit: SubmitHandler<TCreatorValues> = (data) => {
    const dataRefactor: TMenu = {
      nombre: data.name,
      descripcion: data.description,
      platos: data.plates.map((plate) => {
        const newPlate = Object.assign({}, plate) as any
        // to delete the id recived in the field
        delete newPlate.id
        return newPlate
      })
    }
    handleEditData(dataRefactor, isEditing.id)
    setIsEditing({ state: false, id: 0 })
    toast({
      title: 'Menu Editado',
      description: "Tu menu a sido editado exitosamente.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
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
              <Button size="xs" colorScheme='blue' onClick={() => {
                setIsEditing({ state: true, id: isDescription.id })
                setIsDescription({ open: false, id: 0 })
              }}>
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
            <Flex justify="center" direction="column" margin="0 auto">
              <Badge fontStyle="italic" >
                Cuenta con {filteredData.find((item: TMenu) => item.id === isDescription.id)?.platos?.length} platos
              </Badge>
              {
                filteredData.find((item: TMenu) => item.id === isDescription.id)?.platos
                  .map((plate: TPlate) => {
                    const name = recipesData.find((recipe: any) => plate.receta_id === recipe.id).nombre
                    return (<p>{name}</p>)
                  })
              }
            </Flex>
          </Flex>
        )
      }
      {
        isEditing.state && (
          <Flex {...descriptionStyle} direction="column" backgroundColor="white" width="60%" margin="0 auto">
            <Flex justify="flex-end" gap="3">
              <Button size="xs" colorScheme='blue' onClick={() => {
                setIsEditing({ state: false, id: 0 })
                setIsDescription({ open: true, id: isEditing.id })
              }}>
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

            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormControl >
                    <FormLabel>Nombre de la receta</FormLabel>
                    <Input {...field} />
                  </FormControl>
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Descripcion de la receta</FormLabel>
                    <Input {...field} />
                  </FormControl>
                )}
              />

              <FormControl>
                <FormLabel>Anade Recetas:</FormLabel>
                <Select
                  defaultValue=""
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => append({ receta_id: Number(e.target.value), porciones: 0 })}
                >
                  <option value={0} disabled>Seleccionar</option>
                  {
                    recipesData?.map((d: any) => (
                      <option value={d.id}>{d.nombre}</option>
                    ))
                  }
                </Select>
              </FormControl>
              {fields.map((field, index) => (
                <Flex key={field.id} justify="space-between" m="1rem 0 0">
                  <p>
                    {recipesData.find((i: any) => i.id === field.receta_id).nombre}
                    {' '}
                    - porciones:
                    {' '}
                    <Button
                      size="xs"
                      onClick={() => update(index, { ...field, porciones: field.porciones + 1 })}
                    >
                      <ArrowUpIcon />
                    </Button>
                    {' '}
                    {field.porciones}
                    {' '}
                    <Button
                      size="xs"
                      disabled={field.porciones <= 0}

                      onClick={() => update(index, { ...field, porciones: field.porciones - 1 })}
                    >
                      <ArrowDownIcon />
                    </Button>
                  </p>
                  <Button type="button" onClick={() => remove(index)} size="xs" variant="outline" colorScheme="red">
                    Remove
                  </Button>
                </Flex>
              ))}
              <Flex justify="flex-end" mt="3rem">

                <Button type="submit" colorScheme="blue">
                  Guardar
                </Button>
              </Flex>
            </form>
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
const formStyle = {
  border: "1px solid gray",
  borderRadius: '24px',
  padding: '1rem 0.5rem',
  backgroundColor: 'white'
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