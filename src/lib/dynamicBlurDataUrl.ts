// dynamicBlurDataUrl.ts
import sharp from "sharp";

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

async function fetchAsBuffer(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

export async function dynamicBlurDataUrl(imageUrl: string) {
  try {
    // 1) fetch the original image (remote or local URL that is publicly reachable)
    const input = await fetchAsBuffer(imageUrl);

    // 2) downscale aggressively
    const tiny = await sharp(input)
      .resize(16) // width 16, auto height
      .toFormat("webp", { quality: 50 }) // or "avif" if you prefer
      .toBuffer();

    const base64str = tiny.toString("base64");

    // 3) wrap in an SVG blur (same idea you already have)
    const blurSvg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id='b' color-interpolation-filters='sRGB'>
          <feGaussianBlur stdDeviation='1' />
        </filter>
        <image preserveAspectRatio='none' filter='url(#b)'
          x='0' y='0' width='100%' height='100%'
          href='data:image/webp;base64,${base64str}' />
      </svg>
    `;

    return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
  } catch (error) {
    console.error("Error generating blur data URL:", error);
    return imageUrl; // fallback
  }
}