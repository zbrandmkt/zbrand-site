const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511940502929";

const messages: Record<string, string> = {
  geral: "Oi! Vi o site da ZBRAND e quero tirar a zebra do meu marketing. Pode me ajudar?",
  social: "Oi! Vim pelo site e quero saber mais sobre o Z-SOCIAL pra gestão do meu restaurante.",
  ads: "Oi! Vim pelo site e quero saber mais sobre o Z-ADS pra tráfego pago do meu negócio.",
  automacao: "Oi! Vim pelo site e quero saber mais sobre Z-AUTOMAÇÃO pra WhatsApp do meu restaurante.",
  combo1: "Oi! Vim pelo site e tenho interesse no Z-COMBO 1 (Social + Ads). Pode me contar mais?",
  combo2: "Oi! Vim pelo site e tenho interesse no Z-COMBO 2 (Social + Ads + Automação). Pode me contar mais?",
  trafego: "Oi! Vi o anúncio da ZBRAND e quero saber mais sobre a gestão de tráfego pago por R$ 800/mês. Pode me ajudar?",
  personalizado: "Oi! Vim pelo site e quero montar um pacote personalizado com a ZBRAND. Pode me ajudar?",
  sobre: "Oi! Li a história de vocês no site e quero conversar sobre como a ZBRAND pode ajudar meu negócio. Pode me ajudar?",
  captacao: "Oi! Vi o serviço de Captação de Conteúdo da ZBRAND e quero saber mais sobre como funciona uma sessão para o meu negócio. Pode me ajudar?",
};

export function getWhatsAppLink(service: keyof typeof messages = "geral") {
  const text = encodeURIComponent(messages[service] || messages.geral);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
}
