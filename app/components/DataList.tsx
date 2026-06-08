import DataListPage from "../data-list/page";
import { Suspense } from "react"

export default function DataList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataListPage/>
    </Suspense>
  )
}