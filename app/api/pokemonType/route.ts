import { prisma } from "@/app/libs/prisma";
import { PokemonList } from "@/app/types/pokemon";
import { NextResponse } from "next/server";

export type TypeIndexResponse = {
  type: PokemonList[]
}

export const GET = async () => {
  try {
    const pokemonTypes = await prisma.type.findMany({
      include : {
        pokemons: {
          include: {
            type: true
          }
        }
      }
    })

    return NextResponse.json({ type:pokemonTypes }, { status: 200 })
  } catch(error) {
    if(error instanceof Error)
      return NextResponse.json({ message: error.message}, { status: 400 })
  }
}