// 一覧表示の型
export type PokemonList = {
    id: number
    name: string
    weight: number
    types: {    // schemaの　types  PokemonType[]から
      type: {
        id: number
        name: string
      }
    }[]
  }

// 一覧
export type PokemonIndexResponse = {
  pokemons: PokemonList[]     
}

// 表示用（詳細）とAPI用の型
export type Pokemon = {
    id: number
    name: string
    weight: number
    detail: string
    types: {    // schemaの　types  PokemonType[]から
      type: {
        id: number
        name: string
      }
    }[]
  }  // 複数のタイプ持つから[]

// 詳細
export type PokemonShowResponse = {
  pokemon: Pokemon
}