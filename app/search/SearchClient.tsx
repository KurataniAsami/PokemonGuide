'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import Box from '@mui/material/Box'

import PokemonCard from "../components/PokemonCard";
import SearchAndNavigation from "../components/SearchAndNavigation";

import { PokemonList } from "../types/pokemon";

// propsを受け取る
// UI
export default function SearchClient() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const q = searchParams.get("q") || ""

  // 検索ワードを保持する
  const [searchTerm, setSearchTerm] = useState("")
  
  // 検索結果のポケモン一覧を保存する
  const [searchPokemons, setSearchPokemons] = useState<PokemonList[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${searchTerm}`)
  }

  useEffect(() => {
    if (!q) return

    const fetchData = async () => {
      // new URLSearchParamsはクエリパラメータを扱いやすくするための標準API
      // window.location.searchはURLの?以降の部分


      // const params = new URLSearchParams(window.location.search)
      // const q = params.get("q") || ""    //  || ""は検索ワードがなければ空文字にする

      const res = await fetch(`/api/pokemon/search?q=${q}`)
      const data = await res.json()

      setSearchPokemons(data.pokemons)  // pokemonsはAPIに合わせる
      setSearchTerm(q)
    }

    fetchData()
  }, [q])

  return (
    <div>
        <SearchAndNavigation />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginLeft: '20px'
        }}
      >
        {searchPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </Box>
    </div>
  )
}