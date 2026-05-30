// 一覧
'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PokemonResponse } from "../api/pokemon/route";
import Button from '@mui/material/Button'
import { PokemonType } from "../types/pokemonType";
import { typeMeta } from "../constans/typeColor";
import Typography from '@mui/material/Typography'

export default function DataListPage() {
  // const [pokemonLists, setPokemonLists] = useState<PokemonResponse[]>([])
  // "pokemons"は PokemonResponseのpokemonsプロパティからきてる（配列）
  const [pokemonLists, setPokemonLists] = useState<PokemonResponse["pokemons"]>([])
  const [loading, setLoading] = useState(true)

  // レンダリングのたびにfetchを走らせないためにuseEffectを使用
  useEffect(() => {
    const getAllPokemon = async () => {
    const res = await fetch(`/api/pokemon`)
    // const data: PokemonResponseでfetchする時だけバックエンドの型を使用
    const data: PokemonResponse = await res.json()
    setPokemonLists(data.pokemons)
    setLoading(false)
  }

  getAllPokemon()
  },[])
  
  // if(loading) return <p>loading...</p>
  if(!pokemonLists) return <p>データがありません</p>

  return (
    <div>
      {/* Cardの書き方はMUI専用の書き方 */}
      <Card
        variant="outlined"
        sx={{ maxWidth: 300 }}
      >
        <CardContent>
          <ul>
            {pokemonLists.map((list) => (
              <li key={list.id}>
                <Link
                  href={`/pokemon/${list.id}`}
                >
                <div>
                  {list.name}
                  <p>レベル:{list.level}</p>
                </div>

                {/* listの中で再びmap */}
                {/* pokemonsの中のtypes */}
                <div>
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
                        color: "#00001C",
                        mr: 1,   // margin right 1(8px)

                        // disable時
                        // 押せない、hoverしない時もtypeMeta[type]にする
                        '&.Mui-disabled': {
                          backgroundColor: typeMeta[type].color,
                          color: "#00001C",
                        },
                      }}
                    >
                      {/* <Typography sx={{ fontWeight: 900 }}> */}
                        {/* {t.type.name} */}
                        {typeMeta[type].label}
                      {/* </Typography> */}
                    </Button>
                  )
                  })}
                </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}