import { PokemonType } from "../types/pokemonType"

// Recordはキー（ほのお）と値(colorとlabel)のセットを作る
export const typeMeta: Record<PokemonType, {
  color: string
  label: string
}> = {
  fire: {
    color: "#F08030",
    label: "ほのお",
  },
  water: {
    color: "#6890F0",
    label: "みず",
  },
  grass: {
    color: "#78C850",
    label: "くさ",
  },
  electric: {
    color: "#F8D030",
    label: "でんき",
  },
  normal: {
    color: "#A8A878",
    label: "ノーマル",
  },
  poison: {
    color: "#A040A0",
    label: "どく",
  },
  ground: {
    color: "#E0C068",
    label: "じめん",
  },
  flying: {
    color: "#A7D8FF",
    label: "ひこう",
  },
  psychic: {
    color: "#F85888",
    label: "エスパー",
  },
  bug: {
    color: "#A8B820",
    label: "むし",
  },
  rock: {
    color: "#B8A038",
    label: "いわ",
  },
  ghost: {
    color: "#705898",
    label: "ゴースト",
  },
}
