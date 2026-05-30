import { PokemonType } from "../types/pokemonType"

// Recordはキー（ほのお）と値(colorとlabel)のセットを作る
export const typeMeta: Record<PokemonType, {
  color: string
  label: string
}> = {
  ほのお: {
    color: "#F08030",
    label: "ほのお",
  },
  みず: {
    color: "#6890F0",
    label: "みず",
  },
  くさ: {
    color: "#78C850",
    label: "くさ",
  },
  でんき: {
    color: "#F8D030",
    label: "でんき",
  },
}
