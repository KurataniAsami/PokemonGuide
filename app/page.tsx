import DataList from "./components/DataList";
import SearchModal from "./components/search-modal";
import SidebarIcon from "./components/SidebarIcon";
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="w-full">
      <div className="flex justify-center items-center gap-5 my-5">
        <SidebarIcon/>
        <p className="text-2xl">ポケモン図鑑</p>
        <SearchModal/>
      </div>

      <DataList/>
    </div>
    </Suspense>
  );
}
