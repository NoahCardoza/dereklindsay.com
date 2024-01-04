import { SidebarNavigation } from "@/components/Navigation";
import { Socials } from "@/components/Socials";
import { getAlbums, getConfig } from "@/lib/hygraph";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const albums = await getAlbums();
  const config = await getConfig();

  const nav = [
    {
      children: "home",
      href: "/"
    },
    ...albums.map((album) => ({
      children: album.title,
      href: `/album/${album.slug}`
    })),
    {
      children: "motion",
      href: "/motion"
    },
    {
      children: "info",
      href: "/info"
    },
  ]
  
  return (
    <div className="flex flex-grow p-0 sm:p-5 flex-col sm:flex-row mt-5 sm:mt-0" style={{ maxWidth: '100vw' }}>
      <SidebarNavigation nav={nav} config={config} />
      <div className="p-0 sm:p-5 flex flex-col flex-grow min-w-0 overflow-hidden">
        {children}
        <div className="text-sm text-center w-full block sm:hidden pt-2">
          Made with &lt;3 by <a target="blank" href="https://github.com/NoahCardoza">Noah Cardoza</a>
        </div>
        <div className="text-sm text-center w-full block sm:hidden pb-2">
          &copy; {new Date().getFullYear()} Derek Lindsay
        </div>
      </div>
    </div>
  )
}
