import { ImageResponse } from "next/og";

// Imagem de compartilhamento (WhatsApp, Instagram, Google) usada em todas as páginas.

export const runtime = "edge";
export const alt = "Zibrand — Assessoria de marketing para fornecedores de eventos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const svg = await fetch(
    new URL("../../public/images/brand/logo-zibrand-branco.svg", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1A1A1A",
          borderBottom: "16px solid #FF6100",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={500} height={150} alt="" />
        <div style={{ marginTop: 48, fontSize: 52, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.15 }}>
          Assessoria de marketing para
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: "#FF6100", lineHeight: 1.15 }}>
          fornecedores de eventos
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
          Site de orçamento · Tráfego pago · WhatsApp com IA · Social media
        </div>
      </div>
    ),
    size
  );
}
