import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler, useFieldArray } from "react-hook-form"
import { TCreatorValues } from '../types/creator'
import { Input, Flex, Text, Button, Select, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons"
import useData from '../hooks/useData'
import { TMenu } from '../types/menu'

type TCreatorState = "main" | "add"


const Creator = () => {
  const [state, setState] = useState<TCreatorState>('main')
  const { data, error, loading } = useData('recetas')
  const { handleAddData } = useData('menus')
  const toast = useToast()
  const { control, handleSubmit, reset } = useForm<TCreatorValues>({
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


  const onSubmit: SubmitHandler<TCreatorValues> = (data) => {
    const dataRefactor: TMenu = {
      nombre: data.name,
      descripcion: data.description,
      platos: data.plates
    }
    handleAddData(dataRefactor)
    reset()
    toast({
      title: 'Menu Creado',
      description: "Tu menu a sido creado exitosamente.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const filteredData = data?.filter((d: any) => !fields.find((field) => field.receta_id === d.id))
  return (
    <Flex mt="2rem" align="center" justify="center" direction="column" height="100%">
      <Text m="1rem 0" fontSize="4xl" color="white" fontWeight={700}>
        Creacion de Menu
      </Text>
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
            <FormControl mt="2">
              <FormLabel>Descripcion de la receta</FormLabel>
              <Input {...field} />
            </FormControl>
          )}
        />

        <FormControl mt="2">
          <FormLabel>Anade Recetas:</FormLabel>
          <Select
            defaultValue=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => append({ receta_id: Number(e.target.value), porciones: 0 })}
          >
            <option value={0} disabled>Seleccionar</option>
            {
              filteredData?.map((d: any) => (
                <option value={d.id}>{d.nombre}</option>
              ))
            }
          </Select>
        </FormControl>
        {fields.map((field, index) => (
          <Flex key={field.id} justify="space-between" m="1rem 0 0">
            <p>
              {data.find((i: any) => i.id === field.receta_id).nombre}
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

const formStyle = {
  width: "50vw",
  border: "1px solid gray",
  borderRadius: '24px',
  padding: '3rem 1rem',
  backgroundColor: 'white'
}

export default Creator