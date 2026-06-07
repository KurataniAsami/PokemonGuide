import DataList from "./components/DataList";
import SidebarIcon from "./components/SidebarIcon";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex justify-center gap-5 my-5">
        <SidebarIcon/>
        <p className="text-2xl">ポケモン図鑑</p>
      </div>

      <DataList/>
    </div>
  );
}
