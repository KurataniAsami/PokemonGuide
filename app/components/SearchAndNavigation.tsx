'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";

export default function SearchAndNavigation() {
  // ルーターと検索パラメーターを使用
  const router = useRouter();

  // 検索パラメータ
  const searchParams = useSearchParams();

  // 検索キーワードを管理
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // 検索
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();  // フォームの送信してもリロードされない
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
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
          <div className="flex gap-3 items-center">
            <SidebarIcon/>
            <div>フリーワード</div>
          </div>

          <div className="mt-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="キーワードを入力してください"
              className="px-3 py-2 border border-gray-400 rounded-md
                focus:outline-none focus:ring-2 focus:ring-white text-white w-[250px]"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 ml-3"
            >
              検索
            </button>

            {/* 検索ワードがある時だけ表示 */}
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 ml-3"
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