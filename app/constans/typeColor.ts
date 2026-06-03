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
  ノーマル: {
    color: "#A8A878",
    label: "ノーマル",
  },
  こおり: {
    color: "#98D8D8",
    label: "こおり",
  },
  かくとう: {
    color: "#C03028",
    label: "かくとう",
  },
  どく: {
    color: "#A040A0",
    label: "どく",
  },
  じめん: {
    color: "#E0C068",
    label: "じめん",
  },
  ひこう: {
    color: "#A890F0",
    label: "ひこう",
  },
  エスパー: {
    color: "#F85888",
    label: "エスパー",
  },
  むし: {
    color: "#A8B820",
    label: "むし",
  },
  いわ: {
    color: "#B8A038",
    label: "いわ",
  },
  ゴースト: {
    color: "#705898",
    label: "ゴースト",
  },
  ドラゴン: {
    color: "#7038F8",
    label: "ドラゴン",
  },
  あく: {
    color: "#705848",
    label: "あく",
  },
  はがね: {
    color: "#B8B8D0",
    label: "はがね",
  },
  フェアリー: {
    color: "#EE99AC",
    label: "フェアリー",
  },
}
