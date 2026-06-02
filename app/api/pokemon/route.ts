import { prisma } from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

// 表示
export type PokemonResponse = {
  pokemons: {   // このpokemonsは型
    id: number
    name: string
    weight: number
    types: {
      type: {
        id: number
        name: string
      }
    }[]
  }[]
}

// 作成
export type CreatePokemonRequestBody = {
  id: number
  name: string
  type: string[]
  weight: string   // formからくるからstring, 後に変換
}

export const GET = async () => {
  try {
    // const data = await...のdetaはここからきてる
    // このpokemonsはただの変数名
    // findManyで複数取得するから結果はpokemon[]
    // pokemon[]はデータの型
    const pokemons = await prisma.pokemon.findMany({
      include: {   // 関連テーブルも取得
        types: {   // types 中間テーブル取得
          include: {
            type: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    })

    // { pokemons }はレスポンスのキー
    // ここでフロントに返す
    return NextResponse.json({ pokemons }, { status: 200 })
  } catch(error) {
    if( error instanceof Error )
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// POST
export const POST = async (request: NextRequest) => {
  try {
    const body : CreatePokemonRequestBody = await request.json()
    
    const { id, name, weight, type } = body

    // typeは中間テーブルで保存する
    const pokemonData = await prisma.pokemon.create({
      data: {
        id,
        name,
        weight: Number(weight),   // stringからnumberに変換
      },
    })

    // 中間テーブルのレコード作成(PokemonとPokemon Type)
    // フォームから取得したタイプから一致するtype idを取得
    const typeData = await prisma.type.findMany({
      where: {
        name: {
          in: type
        }
      }
    })
    console.log("typeData:", typeData)

    // 取得したタイプ一覧を、中間テーブル(PokemonType) に保存
    // createManyで複数のレコードをテーブルにINSERTする
    await prisma.pokemonType.createMany({
      data: typeData.map((type) => ({
        pokemonId: Number(id),
        typeId: type.id
      }))
    })

    return NextResponse.json({
      pokemonId: Number(id)
    })
  } catch(error) {
    if(error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}
