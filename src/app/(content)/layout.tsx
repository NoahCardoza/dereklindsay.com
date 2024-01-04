import { SidebarNavigation } from "@/components/Navigation";
import { Socials } from "@/components/Socials";
import { getAlbums } from "@/lib/hygraph";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const albums = await getAlbums();

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
    <div className="flex flex-grow p-0 sm:p-5 flex-col sm:flex-row" style={{ maxWidth: '100vw' }}>
      <div className="sidebar p-3 sm:p-5 flex flex-row sm:flex-col" > 
        <h1 className="uppercase text-3xl hidden sm:block">Derek Lindsay</h1>
        <div className="grow">
          <h1 className="uppercase text-3xl block sm:hidden">Derek Lindsay</h1>
          <SidebarNavigation nav={nav} />
        </div>
        <Socials className="mt-3 flex-col sm:flex-row" />
      </div>
      <div className="p-0 sm:p-5 flex flex-col flex-grow min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
