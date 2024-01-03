import Link from "next/link";
import PictureBook from "../components/PictureBook";
import { SoundButton } from "@/components/SoundButton";
import { Socials } from "@/components/Socials";

export default function Landing() {
  return (
    <PictureBook>
        <h1 className="uppercase font-bold text-4xl">Derek Lindsay</h1>
        <div className="flex text-lg my-4 justify-between w-full">
          <Link href="/selected-works">selected works</Link> |
          <Link href="/stills">stills</Link> |
          <Link href="/motion" >motion</Link> |
          <Link href="/info">info</Link> | 
          <SoundButton />
        </div>
        <Socials className="w-full justify-center" />
    </PictureBook>
  );
}
