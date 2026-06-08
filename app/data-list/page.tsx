// 一覧
'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";

import Box from '@mui/material/Box'

import { PokemonList } from "../types/pokemon";
import { PokemonIndexResponse } from "../types/pokemon";

import PokemonCard from "../components/PokemonCard";

export default function DataListPage() {

  // ページネーション
  // searchParamsとはクエリパラメータ（?の後ろの値） を取得するもの
  // data-list?page=2なら2ページ目を取得
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // トータルのページ数を保存するstate
  const [totalPages, setTotalPages] = useState(1);

  // const [pokemonLists, setPokemonLists] = useState<PokemonResponse[]>([])
  // "pokemons"は PokemonResponseのpokemonsプロパティからきてる（配列）
  // APIが返すデータをstateに入れる
  const [pokemonLists, setPokemonLists] = useState<PokemonList[]>([])
  const [loading, setLoading] = useState(true)

  // パラメータが取得できたらそのページを表示、取得しなければ1ページ目
  const currentPage = Number(searchParams.get('page')) || 1;

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
  const handlePageChange = (page: Number) => {
    router.push(`/data-list?page=${page}`);
  }
  
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
        {pokemonLists.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      
      </Box>

      {totalPages > 1 && (
        <div className="flex justify-center w-full max-w-5xl mt-6 space-x-2">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              前
            </button>
          )}

          <div>
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
              className="bg-gray-300 text-black px-4 py-2 rounded text-sm w-12 h-12  hover:bg-gray-400"
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
