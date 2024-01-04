'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SoundButton } from "@/components/SoundButton";
import { HygraphConfig } from "@/lib/hygraph";
import { Socials } from "./Socials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function SidebarNavigation({ nav, config }: Readonly<{
  nav: { children: string, href: string }[],
  config: HygraphConfig,
}>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname()

  return (
    <div className={`sidebar pt-3 sm:p-5 flex flex-col ${isExpanded ? 'expanded' : ''}`} > 
        <div className="flex px-6">
          <h1 className="uppercase text-3xl">Derek Lindsay</h1>
        <button className="ml-auto sm:hidden" onClick={() => {
          setIsExpanded(s => !s)
          }}>
            <FontAwesomeIcon icon={isExpanded ? faXmark : faBars} size="lg"/>
          </button>
        </div>
        <div className="ul-wrapper order-3 sm:order-2 border-b-2 pb-6 sm:pb-0 sm:border-b-0 border-gray-200">
          <ul className="px-6">
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
      </div>
        <div className="mt-3  order-2 sm:order-3">
          <Socials className="px-6" config={config} />
          <div className="text-sm text-center w-full hidden sm:block">
            Made with &lt;3 by <br/><a target="blank" href="https://github.com/NoahCardoza">Noah Cardoza</a>
          </div>
        </div>
      </div>
  )
}
