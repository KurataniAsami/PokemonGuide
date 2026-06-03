import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/app/libs/prisma"
import { Pokemon } from "@/app/types/pokemon"

export type PokemonShowResponse = {
  pokemon: Pokemon
}

export const GET = async (
  request: NextRequest,
  { params }:{ params: Promise<{ id: string }>},
) => {
  const { id } = await params
  console.log(await prisma.pokemon.findMany())

  try {
    // findUniqueは1件
    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        types: {
          include: {
            type: true,
          }
        }
      }
    })

    if(!pokemon) {
      return NextResponse.json(
        { message: 'ポケモンが見つかりません'},
        { status: 404 },
      )
    }

    return NextResponse.json({ pokemon }, { status: 200 })
  } catch (error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
