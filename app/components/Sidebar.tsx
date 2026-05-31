'use client'

import Link from "next/link"
import { SidebarData } from "./SidebarData"
import SidebarIcon from "./SidebarIcon"

export default function Sidebar() {
  return (
    // h-screenはheightが100%
    <div className="w-[250px] bg-blue-800 pt-5 h-screen">
      <div className="ml-4.5 mb-4">
        <SidebarIcon/>
      </div>

      <ul className="h-auto">
        {SidebarData.map((value, key) => (
          <li
            key={key}
            className="w-full h-[60px] text-white"
          >
            <Link
              href={value.link}
              className="flex items-center cursor-pointer hover:bg-blue-500"
            >
              <div className="flex px-5 w-8 items-center">{value.icon}</div>
              <div className="ml-8">{value.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}