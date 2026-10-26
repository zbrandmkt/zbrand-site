import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zibrand — Assessoria de Marketing para Fornecedores de Eventos",
    template: "%s | Zibrand",
  },
  description:
    "Assessoria de marketing para carrinhos gourmet, food trucks, estações, fotógrafos e serviços de evento. Site de orçamento, tráfego pago, WhatsApp automático e social media para fechar mais orçamentos. Atendimento remoto em todo o Brasil.",
  keywords: [
    "marketing para eventos",
    "marketing para fornecedores de eventos",
    "marketing para carrinho gourmet",
    "site para carrinho gourmet",
    "tráfego pago para food truck",
    "assessoria de marketing",
    "Zibrand",
  ],
  openGraph: {
    title: "Zibrand — Assessoria de Marketing para Fornecedores de Eventos",
    description:
      "Site de orçamento, tráfego pago e WhatsApp automático para fornecedores de eventos fecharem mais orçamentos.",
    url: SITE_URL,
    siteName: "Zibrand",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-body antialiased bg-branco text-preto">
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7SVR21K7D9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7SVR21K7D9');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '881288214930588');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=881288214930588&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
