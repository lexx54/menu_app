import React from 'react'
import {
  Grid, Flex, Center, Text, FormControl, Select, FormLabel, Button, Box
} from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import useData from '../hooks/useData'
import { useFieldArray, useForm } from 'react-hook-form'
import { TBuyItem, TBuyList } from '../types/buyList'
import { TMenu } from '../types/menu'
import { TIngredient, TIngredientField } from '../types/ingredient'

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
  const { data, error, loading } = useData('listas_de_compra')
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
  return (
    <Grid templateColumns="25% 1fr" gap={3} height="100%" mt="2rem">
      <Flex direction="column" {...recipesListStyles}>
        <Text>
          Lista de compra
        </Text>
        {
          data?.map((d: any) => (
            <p>{d.nombre}</p>
          ))
        }
      </Flex>
      <Flex direction="column" align="center" {...recipesCreatorStyles}>
        <Text fontWeight={700} color="white">
          Generador de Lista de Compra
        </Text>
        <FormControl mt="2">
          <FormLabel>Anade Recetas:</FormLabel>
          <Select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => append(
              removeDuplicatesByIngredientId(
                handleGetPlatesFromMenu(Number(e.target.value))
                  .map((item: any) => ({ ...item, ingrediente_id: item.ingrediente_id ?? item.id }))
                // .concat(fields)
              )
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

export default Dashboard