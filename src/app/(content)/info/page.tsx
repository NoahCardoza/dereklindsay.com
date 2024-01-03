import PictureBook from "@/components/PictureBook";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'derek lindsay | info',
}

export default function Landing() {
  return (
    <PictureBook>
      <h1 className="uppercase text-2xl">Info</h1>
      <p className="text-lg mt-3">
        Derek Lindsay is an audio/visual artist interested in exploring the intersection between humanity, art, and nature.
        He experiments in various mediums and has worked for major studios like Warner Bros. Discovery and artists like Abby Cates and Joiner.
        He is proficient in visual and audio storytelling.
      </p>
      <p className="text-lg mt-3">
        You can see his sound design portfolio at <a className="text-blue-500" target="_blank" href="https://www.dereklindsayaudio.com">www.dereklindsayaudio.com</a>, or reach him by email at <a className="text-blue-500" target="_blank" href="mailto:dereklindsayaudio@gmail.com">dereklindsayaudio@gmail.com</a>.
      </p>
    </PictureBook>
  );
}
