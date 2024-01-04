'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SoundButton } from "@/components/SoundButton";

export async function SidebarNavigation({ nav }: Readonly<{
  nav: { children: string, href: string }[]
}>) {
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
