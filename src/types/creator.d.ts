export type TCreatorValues = {
  name: string;
  description: string;
  plates: TPlate[]
}

export type TPlate = {
  receta_id: number;
  porciones: number;
}