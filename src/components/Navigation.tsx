'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSpotifyPlayer } from "@/providers/SpotifyPlayer";
import { SoundButton } from "@/components/SoundButton";

export function SidebarNavigation() {
  const nav = [
    {
      children: "home",
      href: "/"
    },
    {
      children: "selected works",
      href: "/selected-works"
    },
    {
      children: "stills",
      href: "/stills"
    },
    {
      children: "motion",
      href: "/motion"
    },
    {
      children: "info",
      href: "/info"
    },
  ]

  const pathname = usePathname()


  return (
    <ul>
      {nav.map((item) => (
        <li
          key={item.href}
          className={`mt-2 ${item.href != '/' && pathname?.startsWith(item.href) ? 'font-bold' : ''}`}
        >
          <Link {...item} />
        </li>
      ))}
      <li className="mt-2">
        <SoundButton />
      </li>
    </ul>
  )
}
