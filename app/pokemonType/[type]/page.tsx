'use client'

import { Pokemon } from "@/app/types/pokemon"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Image from "next/image"
import { typeMeta } from "@/app/constans/typeColor"
import { PokemonType } from "@/app/types/pokemonType"

export default function TypeDetail() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { type: typeParam } = useParams<{ type: string }>()

  useEffect(() => {
    if (!typeParam) return; 

    const typeDetail = async () => {
      try {
        const response = await fetch(`/api/pokemonType/${typeParam}`)
        const data = await response.json()
        setPokemons(data.pokemons)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    typeDetail()
  },[typeParam])

  if(loading) return <p>Loading...</p>
  if(error || pokemons.length === 0) return <p>ポケモンが見つかりません</p>

  return (
    <div className="flex justify-center mt-5">
    <div className="grid grid-cols-4 gap-6 mx-6">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: '640px',
          gap: '20px'
        }}
      >

      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          variant="outlined"
          sx={{
            maxWidth: 300,
            backgroundColor: '#ffffff',
            marginTop: '20px'
          }}
        >
          <CardContent>
            <Link href={`/data-list/${pokemon.id}`}>
              <div className="mb-5">
                <div className="">No:{pokemon.id}</div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  width={120}
                  height={120}
                  className="mx-auto"
                />

                <p className="text-center">{pokemon.name}</p>
              </div>

              <div className="flex justify-center gap-3">
                {pokemon.types.map((t) => {
                  const type = t.type.name as PokemonType

                  return (
                    <Button
                      key={t.type.id}
                      variant="contained"
                      disabled
                      sx={{
                        backgroundColor: typeMeta[type].color,
                        color: '#00001C',

                        '&.Mui-disabled': {
                          backgroundColor: typeMeta[type].color,
                          color: '#00001C',
                        },
                      }}
                    >
                        {typeMeta[type].label}
                    </Button>
                  )
                })}

              </div>
            </Link>
          </CardContent>
        </Card>
        ))}
      </Box>
    </div>
  </div>
  )
}