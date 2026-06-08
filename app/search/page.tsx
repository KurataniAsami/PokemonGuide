// 検索結果画面

import { Suspense } from "react"
import SearchClient from "./SearchClient";

// propsを渡す
export default async function SearchPage() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <SearchClient />
    </Suspense>
  )
}