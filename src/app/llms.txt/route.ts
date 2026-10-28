import { absoluteUrl, site } from "@/lib/site";

// llms.txt: resumo do site para assistentes de IA (ChatGPT, Gemini, Perplexity).

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.name} (pronuncia-se "Zi-brand") é uma assessoria de marketing especializada em fornecedores de eventos no Brasil: carrinhos gourmet, food trucks e food bikes, estações e buffets, fotógrafos e filmmakers, doces e bolos, decoração, DJs e casas de eventos. O atendimento é 100% remoto, para todo o Brasil. O objetivo é fazer o fornecedor fechar mais orçamentos.

A ${site.name} nasceu da Churruts, marca de carrinhos de churros para eventos dos fundadores Bruna e Guilherme, com 10 anos de experiência em gastronomia e eventos. Entre os clientes está a Promo Indoor, rede de mídia indoor que leva food trucks, food bikes e carrinhos gourmet a cerca de 70 prédios em São Paulo e reúne mais de 130 parceiros.

## Serviços (na ordem em que o cliente costuma contratar)

- [Site de orçamento](${absoluteUrl("/servicos/website")}): site ou landing page com formulário que coleta data, local e número de convidados e envia o pedido de orçamento para o WhatsApp. Inclui SEO local.
- [Tráfego pago](${absoluteUrl("/servicos/trafego-pago")}): anúncios no Meta (Instagram/Facebook) e no Google planejados pelo calendário de eventos (casamentos, 15 anos, corporativos, festas juninas, fim de ano).
- [WhatsApp automático com a Zee](${absoluteUrl("/servicos/automacao")}): a Zee é a assistente de IA da ${site.name}. Responde na hora, tira dúvidas e qualifica o pedido de orçamento, mesmo quando o fornecedor está no evento.
- [Social media automatizado](${absoluteUrl("/servicos/social-media")}): Instagram ativo o ano inteiro com IA, templates e vídeos produzidos em lote a partir do material real dos eventos.
- [Captação de conteúdo](${absoluteUrl("/servicos/captacao")}): complemento opcional. Sessão de 4h no evento que vira 10 vídeos editados.

## Sobre

- [Quem somos](${absoluteUrl("/sobre")})
- Instagram: ${site.social.instagramHandle} (${site.social.instagram})
- Contato: WhatsApp ${site.phoneDisplay}, e-mail ${site.email}
- Preços: definidos em diagnóstico gratuito, de acordo com o momento e a região do fornecedor.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
