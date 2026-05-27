'use client'

import Link from "next/link"
import { SidebarData } from "./SidebarData"

export default function Sidebar() {
  return (
    // w-full h-fullはwidthとheightが100%
    <div className="w-[250px] h-full bg-blue-800">
      <ul className="h-auto">
        {SidebarData.map((value, key) => (
          <li
            key={key}
            className="w-full h-[60px] "
          >
            <Link href={value.link}>
              <div>{value.icon}</div>
              <div>{value.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}