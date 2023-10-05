export type TBuyList = {
  id?: number,
  name: string,
  items: TBuyItem[]
}

export type TBuyItem = {
  ingrediente_id?: number,
  cantidad: number
}

export type TListaCompra = {
  id?: number,
  nombre: string,
  items: TBuyItem[]
}