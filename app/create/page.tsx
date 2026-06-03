'use client'
import { useState } from "react"
import { CreatePokemonRequestBody } from "../api/pokemon/route"

export default function CreatePage() {
  const [id, setId] = useState('')
  const [pokemonName, setPokemonName] = useState('')
  const [type, setType] = useState<string[]>([])
  const [weight, setWeight] = useState('')
  const [detail, setDetail] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    setLoading(true)

    const body: CreatePokemonRequestBody = {
      id: Number(id),
      name: pokemonName,
      type,
      weight,
      detail
    }

    try {
      const res = await fetch(`/api/pokemon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
    } catch(error) {
      setError(error instanceof Error ? error.message: 'ポケモンを登録することができませんでした')
    } finally {
      setLoading(false)
    }
  }

  const typeOptions = [
  "ノーマル",
  "ほのお",
  "みず",
  "でんき",
  "くさ",
  "どく",
  "じめん",
  "ひこう",
  "エスパー",
  "むし",
  "いわ",
  "ゴースト",
]

  return (
    <div className="mt-5 px-5">
      <p className="text-center">図鑑登録</p>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col mt-3">
            <label className="text-start mb-1">ポケモン</label>
            <input
              type="text"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              placeholder="ポケモンの名前を入力してください"
              className="border border-white w-72 text-base caret-white focus:outline focus:outline-white"
              style={{
                caretColor: "white",
                color: "white"
              }}
            />
          </div>

          <div className="flex flex-col mt-3">
            <label className="w-24 mb-1 flex">ID<span className="text-nowrap text-red-500">（IDが一致しないと画像が表示されません）</span></label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="IDを入力してください"
              className="border border-white w-72 text-base caret-white focus:outline focus:outline-white"
              style={{
                caretColor: "white",
                color: "white"
              }}
            />
          </div>

          <div className="flex flex-col mt-3">
            <label className="w-24 mb-1">おもさ</label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="おもさを入力"
              className="border border-white w-72 text-base caret-white focus:outline focus:outline-white"
              style={{
                caretColor: "white",
                color: "white"
              }}
            />
          </div>

          <div className="flex flex-col mt-3">
            <label className="w-24 mb-1">データ</label>
            <input
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="ポケモンのデータを入力"
              className="border border-white w-72 text-base caret-white focus:outline focus:outline-white"
              style={{
                caretColor: "white",
                color: "white"
              }}
            />
          </div>

          <fieldset className="mt-3">
            <legend>タイプ</legend>

            {typeOptions.map((typeName) => (
              <label key={typeName} className="mr-2">
                <input
                  type="checkbox"
                  value={typeName}
                  className="mr-2"
                  onChange={(e) => {
                    if(e.target.checked) {
                      setType((prev) => [...type, typeName])
                    } else {
                      setType((prev) => type.filter((t) => t !== typeName))
                    }
                  }}
                />
                {typeName}
              </label>
            ))}
          </fieldset>

          <a
            href="https://pokemonote.com/pokedex"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 border-b items-center inline-flex w-fit"  // w-fitでテキストの長さまで下線
          >
            ポケモンID一覧を見る
            <span
              className="text-xl text-white ml-3"
            >
              → 
            </span>
          </a>    

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="text-blue-500 text-bold text-xl bg-white p-2 rounded"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}




// base-study
