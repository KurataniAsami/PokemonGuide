'use client'

import { useParams } from "next/navigation"
import { PokemonShowResponse } from "@/app/api/pokemon/[id]/route"
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button'
import Image from "next/image";
import { typeMeta } from "@/app/constans/typeColor";
import { PokemonType } from "@/app/types/pokemonType";

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const params = useParams()

  const [pokemon, setPokemon] = useState<PokemonShowResponse["pokemon"] | null>(null)
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(`/api/pokemon/${id}`)

        const data = await response.json()
        setPokemon(data.pokemon)
      } catch(error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getPokemon() 
  },[id])

  if(loading) return <p>Loading...</p>
  if(!pokemon) return <p>データがありません</p>
  if(error) return <p>エラーが発生しました</p>

  return (
    <div className="flex justify-center mt-5">

      <Card
        key={pokemon.id}
        variant="outlined"
        sx={{
          width: 400,
          backgroundColor: '#ffffff',
        }}
      >
        <CardContent>
          <div className="mb-4">
            
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
              width={250}
              height={250}
              className="mx-auto"
            />
            <div className="text-center">No:{pokemon.id}</div>
            <p className="text-center text-xl mt-2">{pokemon.name}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className=" border border-gray-400 mx-auto px-8 py-4 rounded">
              {/* as PokemonTypeはこの型はPokemonTypeとして扱ってねという意味 */}
              {/* typesの中にtypeが入っている, それを取り出して変数typeに入れる */}
              {pokemon.types.map((t) => {
                const type = t.type.name as PokemonType

                return (
                  <p>タイプ： 
                    <Button
                      key={t.type.id}
                      variant="contained"
                      disabled
                      sx={{
                        backgroundColor: typeMeta[type].color,
                        color: '#00001C',
                        marginTop: '4px',

                        '&.Mui-disabled': {
                          backgroundColor: typeMeta[type].color,
                          color: '#00001C',
                        },
                      }}
                    >
                      <span key={t.type.id}>
                        {typeMeta[type].label}
                      </span>
                    </Button>
                  </p>
                )
              })}

              <p className="mt-2">おもさ: {pokemon.weight}kg</p>
            </div>
          </div>
          <div className="border border-gray-400 w-fit mx-auto mt-5 p-3 rounded">
            <p>特徴: {pokemon.detail}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 進化系表示