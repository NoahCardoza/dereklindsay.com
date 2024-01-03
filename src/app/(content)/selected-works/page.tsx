
import database from "@/database.json";
import Slideshow from "@/components/Slideshow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'derek lindsay | selected works',
}

export default function SelectedWorks() {
  const images = database.images.filter((image) => image.tag === "selected works")

  return (  
    <Slideshow
      album="Selected Works"
      images={images} />  
  );
}
