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
    <div className="flex flex-grow p-5" style={{ maxWidth: '100vw' }}>
      <div className="p-5 flex flex-col" style={{ minWidth: '200px', width: '200px'}}>
        <h1 className="uppercase text-3xl">Derek Lindsay</h1>
        <SidebarNavigation nav={nav} />
        <Socials className="mt-3" />
      </div>
      <div className="p-5 flex flex-col flex-grow min-w-0">
        {children}
      </div>
    </div>
  )
}
