// 一覧
'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PokemonIndexResponse } from "../api/pokemon/route";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { PokemonList } from "../types/pokemon";
import { typeMeta } from "../constans/typeColor";
import Image from "next/image";
import { PokemonType } from "../types/pokemonType";

export default function DataListPage() {
  // const [pokemonLists, setPokemonLists] = useState<PokemonResponse[]>([])
  // "pokemons"は PokemonResponseのpokemonsプロパティからきてる（配列）
  // APIが返すデータをstateに入れる
  const [pokemonLists, setPokemonLists] = useState<PokemonList[]>([])
  const [loading, setLoading] = useState(true)

  // レンダリングのたびにfetchを走らせないためにuseEffectを使用
  useEffect(() => {
    const getAllPokemon = async () => {
    const res = await fetch(`/api/pokemon`)
    const data: PokemonIndexResponse = await res.json()   // ここで返ってきたデータを受け取る
    setPokemonLists(data.pokemons)
    setLoading(false)
  }

  getAllPokemon()
  },[])
  
  if(loading) return <p className="text-white">loading...</p>
  if(!pokemonLists) return <p>データがありません</p>

  return (
    <div className="ml-8">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >

      {pokemonLists.map((list) => (
        <Card
          key={list.id}
          variant="outlined"
          sx={{
            maxWidth: 300,
            backgroundColor: '#ffffff',
          }}
        >
          <CardContent>
            <Link href={`/data-list/${list.id}`}>
              <div className="mb-5">
                <div className="">No:{list.id}</div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${list.id}.png`}
                  alt={list.name}
                  width={120}
                  height={120}
                  className="mx-auto"
                />

                <p className="text-center">{list.name}</p>
              </div>

                {/*  listの中で再びmap */}
                {/* pokemonsの中のtypes */} 
              <div className="flex justify-center gap-3">
                {/* as PokemonTypeはこの型はPokemonTypeとして扱ってねという意味 */}
                {/* typesの中にtypeが入っている, それを取り出して変数typeに入れる */}
                {list.types.map((t) => {
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
  )
}

// idとpokemon idが同じ数値
// https://pokeapi.co/api/v2/pokemon-species/390
// 複数のタイプ、詳細、カラーパレット増やす
