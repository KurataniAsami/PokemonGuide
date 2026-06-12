'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import SidebarIcon from "./SidebarIcon";

// モーダルだけ別のcssにするのでpropsで渡す
type ModalProps = {
  isModal?: boolean
  initialValue?: string
}

export default function SearchAndNavigation({
    isModal = false,
    initialValue = "",
  }: ModalProps) {
  // ルーターと検索パラメーターを使用
  const router = useRouter();

  // 検索キーワードを管理
  const [searchTerm, setSearchTerm] = useState(initialValue);

   useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  // 検索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();  // フォームの送信してもリロードされない
    router.push(`/search?q=${(searchTerm)}`)
  }

  // 検索クリア
  const clearSearch = () => {
    setSearchTerm("");
    router.push("/search");
  }

  return (
    <div className="flex justify-center p-6 mb-8">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col gap-2">

          {/* isModalがfalseの場合表示 */}
          {!isModal && (
            <div className="flex justify-center gap-3 items-center">
            <SidebarIcon/>
            <div>フリーワード</div>
          </div>
          )}

          <div className="mt-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="名前で探す"
              // modalで適用させたい方が : より前
              className={`
                px-3 py-2 border border-gray-400 rounded-md
                focus:outline-none focus:ring-2 flex w-[250px]
                ${isModal ? "text-black focus:ring-black" : "text-white focus:ring-white"}
              `}
            />
            <button
              type="submit"
              className={`
                  px-4 py-2 rounded hover:bg-gray-300 ml-3  text-black mt-4 
                ${isModal ? "bg-gray-200 ml-22" : "bg-white ml-20"}
              `}
            >
              検索
            </button>

            {/* 検索ワードがある時だけ表示 */}
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className={`
                  px-4 py-2 rounded hover:bg-gray-300 ml-3  text-black
                ${isModal ? "bg-gray-200 mt-3" : "bg-white mt-2"}
              `}
              >
                クリア
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}