import React, { useState } from 'react'
import {
  Grid, Flex, Center, Text, FormControl, Select, FormLabel, Button, Box, Input, Badge
} from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import useData from '../hooks/useData'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { TBuyItem, TBuyList } from '../types/buyList'
import { TMenu } from '../types/menu'

function removeDuplicatesByIngredientId(originalArray: TBuyItem[]) {
  const uniqueObjects: { [index: number]: TBuyItem } = {};

  originalArray.forEach((obj: TBuyItem) => {
    const ingredientId = obj.ingrediente_id;

    if (ingredientId === undefined) return;
    if (!uniqueObjects[ingredientId]) {
      uniqueObjects[ingredientId] = obj;
    }
  });

  const uniqueArray = Object.values(uniqueObjects);
  return uniqueArray;
}

const Dashboard = () => {
  const [isView, setIsView] = useState({ state: false, id: 0 })
  const { control, handleSubmit, reset } = useForm<TBuyList>({
    defaultValues: {
      name: '',
      items: []
    },
  })
  const { fields, append, remove, update } = useFieldArray({
    name: 'items',
    control: control
  })
  const { data, error, loading, handleAddData, handleDeleteData } = useData('listas_de_compra')
  const { data: menuData } = useData('menus')
  const { data: recipesData } = useData('recetas')
  const { data: ingredientData } = useData('ingredientes')

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

  const handleGetPlatesFromMenu = (idMenu: number) => {
    const menu = menuData.find((menu: TMenu) => menu.id === idMenu)
    const recipes = menu.platos.map((plate: any) => recipesData.find((recipe: any) => recipe.id === plate.receta_id))

    const ingredients = recipes.map((recipe: any) => {
      return recipe.ingredientes.map((id: number) => ingredientData?.find((ingredient: any) => ingredient.id === id))
    })

    // const ingredient = recipesData.find((recipe: any) => recipe.id === menu.id).plates
    return ingredients.flat()
  }

  const onSubmit = (data: TBuyList) => {
    const dataRefactor = {
      nombre: data.name,
      items: data.items.map((item: TBuyItem) => ({ ingrediente_id: item.ingrediente_id, cantidad: item.cantidad }))
    }
    handleAddData(dataRefactor)
    reset()
  }
  console.log('data', data)
  return (
    <Grid templateColumns="25% 1fr" gap={3} height="100%" mt="2rem">
      <Flex direction="column" {...recipesListStyles}>
        <Badge mb="0.5rem">
          Lista de compra
        </Badge>
        {
          data?.map((d: any) => (
            <Flex justify="space-between">
              <Button size="xs" variant="ghost" onClick={() => setIsView({ state: true, id: d.id })}>{d.nombre}</Button>
              <Button size="xs" variant="outline" onClick={() => handleDeleteData(d.id)}>-</Button>
            </Flex>
          ))
        }
      </Flex>
      <Flex direction="column" align="center" {...recipesCreatorStyles}>
        {
          isView.state && (
            <Flex {...descriptionStyle} direction="column" backgroundColor="white" width="60%" margin="0 auto">
              <Flex justify="flex-end" gap="3">
                <Button size="xs" colorScheme='blue' onClick={() => {
                  setIsView({ state: false, id: 0 })
                }}>
                  cancel
                </Button>

              </Flex>
              <Box p="0 0.5rem" mb="1rem">
                {data.find((item: TBuyList) => item.id === isView.id)?.nombre}
              </Box>
              <Flex justify="center" direction="column">
                <Badge fontStyle="italic" >
                  Cuenta con {data.find((item: TMenu) => item.id === isView.id)?.items?.length} Ingredientes a comprar
                </Badge>
                {
                  data.find((item: TMenu) => item.id === isView.id)?.items
                    .map((plate: TBuyItem) => {
                      const { nombre } = ingredientData.find((ingredient: any) => plate.ingrediente_id === ingredient.id)
                      return (<p>{`Se debe comprar ${nombre}`}</p>)
                    })
                }
              </Flex>
            </Flex>
          )
        }
        {
          !isView.state && (
            <>
              <Text fontWeight={700} color="white">
                Generador de Lista de Compra
              </Text>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <FormControl >
                      <FormLabel>Nombre de la lista</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                />
                <FormControl mt="2">
                  <FormLabel>Anade Recetas de los menus:</FormLabel>
                  <Select
                    defaultValue=""
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => append(
                      handleGetPlatesFromMenu(Number(e.target.value))
                        .map((item: any) => ({ ingrediente_id: item.id, cantidad: 0 }))
                    )}
                  >
                    <option value={0} disabled>Seleccionar</option>
                    {
                      menuData?.map((d: any) => (
                        <option value={d.id}>{d.nombre}</option>
                      ))
                    }
                  </Select>
                </FormControl>
                <Grid templateColumns="repeat(5, 1fr)" gap={1} w="100%">

                  {fields.map((field, index) => (
                    <Flex key={field.ingrediente_id} justify="center" align="center" m="1rem 0 0" direction="column" backgroundColor="whiteAlpha.500" borderRadius="24px" py="0.5rems">
                      <p style={{ textAlign: 'center' }}>{ingredientData.find((i: any) => i.id === field.ingrediente_id)?.nombre}</p>
                      <p>
                        Cantidad:
                      </p>
                      <Box my="0.5rem">
                        <Button
                          size="xs"
                          onClick={() => update(index, { ...field, cantidad: field.cantidad + 1 })}
                        >
                          <ArrowUpIcon />
                        </Button>
                        {' '}
                        {field.cantidad}
                        {' '}
                        <Button
                          size="xs"
                          disabled={field.cantidad <= 0}

                          onClick={() => update(index, { ...field, cantidad: field.cantidad - 1 })}
                        >
                          <ArrowDownIcon />
                        </Button>
                      </Box>
                      <Button type="button" onClick={() => remove(index)} size="xs" variant="outline" colorScheme="red">
                        Remove
                      </Button>
                    </Flex>
                  ))}
                </Grid>
                <Flex justify="flex-end" mt="1rem">

                  <Button type='submit'>
                    Guardar
                  </Button>
                </Flex>
              </form>
            </>
          )
        }
      </Flex>
    </Grid>
  )
}

const recipesListStyles = {
  backgroundColor: 'blue.300',
  padding: '1rem 1.5rem',
  height: '95%',
  overflow: "auto",
  borderRadius: '24px'
}

const recipesCreatorStyles = {
  backgroundColor: 'blue.300',
  padding: '1rem 1.5rem',
  height: '95%',
  borderRadius: '24px',
  overflow: "auto",
}

const descriptionStyle = {
  border: "2px solid gray",
  borderRadius: '24px',
  padding: '2rem 1rem',
  margin: '1rem 0',
}

export default Dashboard