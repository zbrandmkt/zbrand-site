import { site } from "@/lib/site";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.phone.replace("+", "");

const messages: Record<string, string> = {
  geral: "Oi! Vi o site da Zibrand e quero fechar mais orçamentos de eventos. Pode me ajudar?",
  website: "Oi! Vim pelo site e quero um site de orçamento para o meu negócio de eventos. Pode me contar mais?",
  social: "Oi! Vim pelo site e quero saber mais sobre o social media da Zibrand para o meu negócio de eventos.",
  ads: "Oi! Vim pelo site e quero saber mais sobre tráfego pago para receber mais pedidos de orçamento.",
  automacao: "Oi! Vim pelo site e quero saber mais sobre a automação de WhatsApp (Zee) para responder orçamentos na hora.",
  combo1: "Oi! Vim pelo site e tenho interesse no pacote Social + Ads da Zibrand. Pode me contar mais?",
  combo2: "Oi! Vim pelo site e tenho interesse no pacote Social + Ads + Automação da Zibrand. Pode me contar mais?",
  trafego: "Oi! Vi o anúncio da Zibrand e quero saber mais sobre a gestão de tráfego pago por R$ 800/mês. Pode me ajudar?",
  personalizado: "Oi! Vim pelo site e quero montar um pacote personalizado com a Zibrand. Pode me ajudar?",
  sobre: "Oi! Li a história de vocês no site e quero conversar sobre como a Zibrand pode ajudar meu negócio de eventos.",
  captacao: "Oi! Vi o serviço de captação de conteúdo da Zibrand e quero saber como funciona para o meu negócio de eventos.",
};

export function getWhatsAppLink(service: keyof typeof messages = "geral") {
  const text = encodeURIComponent(messages[service] || messages.geral);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
}
