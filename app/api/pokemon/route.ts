import { prisma } from "@/app/libs/prisma"
import { NextResponse } from "next/server"

export type PokemonResponse = {
  pokemons: {
    name: string
    type: string
    level: string
    PokemonType: {
      type: {
        id: number
        name: string
      }[]
    }[]
  }
}

export const GET = async () => {
  try {
    // const data = await...のdetaはここからきてる
    const pokemons = await prisma.pokemon.findMany({
      include: {   // 関連テーブルも取得
        types: {   // types 中間テーブル取得
          include: {
            type: true
          }
        }
      }
    })

    return NextResponse.json({ pokemons }, { status: 200 })
  } catch(error) {
    if( error instanceof Error )
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
