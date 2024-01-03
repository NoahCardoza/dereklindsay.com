
import database from "@/database.json";
import Slideshow from "@/components/Slideshow";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'derek lindsay | stills',
}

export default function Stills() {
  const images = database.images.filter((image) => image.tag === "stills")

  return (
    <Slideshow
      album="Stills"
      images={images}
    />  
  );
}
