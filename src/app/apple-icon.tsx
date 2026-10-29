import { ImageResponse } from "next/og";

// Ícone da tela inicial do iPhone: o "Z·" laranja da Zibrand.

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const svg = await fetch(new URL("./icon.svg", import.meta.url)).then((res) => res.arrayBuffer());
  const icon = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} width={140} height={140} alt="" />
      </div>
    ),
    size
  );
}
