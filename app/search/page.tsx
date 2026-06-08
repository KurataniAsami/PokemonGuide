// 検索結果画面
'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { PokemonList } from "../types/pokemon";

import Box from '@mui/material/Box'

import PokemonCard from "../components/PokemonCard";
import SearchAndNavigation from "../components/SearchAndNavigation";

export default function SearchPage() {
  const [searchPokemons, setSearchPokemons] = useState<PokemonList[]>([])
  const searchParams = useSearchParams()
  const q = searchParams.get("q")

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`/api/pokemon/search?q=${q}`)
      const data = await res.json()
      setSearchPokemons(data.pokemons)  // pokemonsはAPIに合わせる
    }

    if (q) {
      fetchPokemon()
    }
  }, [q])

  return (
    <div>
      <SearchAndNavigation/>
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