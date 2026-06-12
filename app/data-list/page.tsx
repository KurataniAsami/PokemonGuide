// 一覧
'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import Box from '@mui/material/Box'

import { PokemonList } from "../types/pokemon";
import { PokemonIndexResponse } from "../types/pokemon";

import PokemonCard from "../components/PokemonCard";

export default function DataListPage() {
  const router = useRouter();
  
  // トータルのページ数を保存するstate
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1)

  // "pokemons"は PokemonResponseのpokemonsプロパティからきてる（配列）
  // APIが返すデータをstateに入れる
  const [pokemonLists, setPokemonLists] = useState<PokemonList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const page = Number(new URLSearchParams(window.location.search).get("page") ?? 1)
  setCurrentPage(page)
}, [])

  // レンダリングのたびにfetchを走らせないためにuseEffectを使用
  // APIにcurrentPageを送ったらdata fetch
  useEffect(() => {
    const getAllPokemon = async () => {
    const res = await fetch(`/api/pokemon?page=${currentPage}&limit=6`)
    const data = await res.json() as PokemonIndexResponse // ここで返ってきたデータを受け取る
    setPokemonLists(data.pokemons)
    setTotalPages(data.totalPages)
    setLoading(false)
  }

  getAllPokemon()
  },[currentPage]); // currentPageが変わったらfetch


  // ページ番号(配列)を作成する
  // totalPagesが2だったら2回pushが起こり、2が返る
  const generatePagiNation = () => {
    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // 指定したページ番号のURLへ移動する
  const handlePageChange = (page: number) => {
    router.push(`/data-list?page=${page}`)
    setCurrentPage(page)
  }
  
  if(loading) return <p className="text-white">loading...</p>
  if(!pokemonLists) return <p>データがありません</p>

  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 250px)',
          gap: 2,
          justifyContent: 'center'
        }}
      >
        {pokemonLists.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <div className="relative w-full max-w-5xl mt-6 mx-auto">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="text-black text-sm w-12 h-12  hover:bg-gray-400 absolute left-0 bg-gray-300 px-4 py-2 rounded"
            >
              前
            </button>
          )}

          <div className="flex justify-center items-center gap-2">
            {generatePagiNation().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                // pageがnumberだったら handlePageChange(page) を実行する
                // &&の左側（number）がtrueだったら右側(handleChange)を実行する

                className={`w-10 h-10 sm:w-12 sm:h-12 mx-1 rounded text-sm sm:text-base
                  ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}
                `}
              >
                {page}
              </button>
            ))}
          </div>

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className=" text-black text-sm w-12 h-12  hover:bg-gray-400 absolute right-0 bg-gray-300 px-4 py-2 rounded"
            >
              次
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// idとpokemon idが同じ数値
