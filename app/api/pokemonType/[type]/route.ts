import { prisma } from "@/app/libs/prisma";
import { Pokemon } from "@/app/types/pokemon";
import { NextRequest, NextResponse } from "next/server";

export type TypeShowResponse = {
  pokemon: Pokemon[]
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ type: string }>}
) => {
  try {
    const { type } = await params
    const pokemons = await prisma.pokemon.findMany({
      where: {
        types: {    // 中間テーブル
          some: {
            type: {
              name: type,
            }
          }
        }
      },
      include: {    // Typeテーブル
        types: {
          include: {
            type: true
          }
        }
      }
    })
    if(!pokemons) {
      return NextResponse.json(
        { message: 'ポケモンが見つかりません'},
        { status: 404 }
      )
    }

    return NextResponse.json({ pokemons }, { status: 200 })
  } catch(error) {
    if(error instanceof Error) 
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}