import { SidebarNavigation } from "@/components/Navigation";
import { Socials } from "@/components/Socials";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  }>) {
  return (
    <div className="flex flex-grow p-5" style={{ maxWidth: '100vw' }}>
      <div className="p-5 flex flex-col" style={{ minWidth: '200px', width: '200px'}}>
        <h1 className="uppercase text-3xl">Derek Lindsay</h1>
        <SidebarNavigation />
        <Socials className="mt-3" />
        {/* <img src="/images/ezgif-5-3d03bd47dd.gif" className="mt-auto" style={{
          filter: 'grayscale(100%)',
        }} /> */}
      </div>
      <div className="p-5 flex flex-col flex-grow min-w-0">
        {children}
      </div>
    </div>
  )
}
