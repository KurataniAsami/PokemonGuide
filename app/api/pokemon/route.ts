import { prisma } from "@/app/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import { PokemonList } from "@/app/types/pokemon"

// 作成
export type CreatePokemonRequestBody = {
  id: number
  name: string
  type: string[]
  weight: string 
  detail: string  // formからくるからstring, 後に変換
}

// 表示
export type PokemonIndexResponse = {
  pokemons: PokemonList[]
}

export const GET = async (request: NextRequest) => {

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 6)

  // 検索の開始位置を取得
  const skip = (page -1) * limit;

  try {
    // const data = await...のdetaはここからきてる
    // このpokemonsはただの変数名
    // findManyで複数取得するから結果はpokemon[]
    // pokemon[]はデータの型

    // ページネーションなし
    // const pokemons = await prisma.pokemon.findMany({
    //   include: {   // 関連テーブルも取得
    //     types: {   // types 中間テーブル取得
    //       include: {
    //         type: true
    //       }
    //     }
    //   },
    //   orderBy: {
    //     id: 'asc'
    //   }
    // })

    const pokemons = await prisma.pokemon.findMany({
      skip,
      take: limit,
      include: {
        types: {
          include: {
            type: true
          }
        }
      }
    })

    const totalPokemons = await prisma.pokemon.count()

    const totalPages = Math.ceil(totalPokemons / limit)


    // { pokemons }はレスポンスのキー
    // ここでフロントに返す
    return NextResponse.json({
      pokemons,
      totalPokemons,
      page,
      totalPages,
      }, { status: 200 });
  } catch(error) {
    if( error instanceof Error )
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}

// POST
export const POST = async (request: NextRequest) => {
  try {
    const body : CreatePokemonRequestBody = await request.json()
    
    const { id, name, weight, type, detail } = body

    // typeは中間テーブルで保存する
    const pokemonData = await prisma.pokemon.create({
      data: {
        id,
        name,
        weight: Number(weight),  // stringからnumberに変換
        detail,   
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

    // 取得したタイプ一覧を、中間テーブル(PokemonType) に保存
    // createManyで複数のレコードをテーブルにINSERTする
    // await prisma.pokemonType.createMany({
    //   data: typeData.map((pokemonType: Type) => ({
    //     pokemonId: Number(id),
    //     typeId:  pokemonType.id
    //   }))
    // })

    await prisma.pokemonType.createMany({
      data: typeData.map((item: { id: number; name: string }) => ({
        pokemonId: Number(id),
        typeId: item.id
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
