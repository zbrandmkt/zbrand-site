import { PropostaData } from "@/types/proposta";

export const ecoaBrownies: PropostaData = {
  slug: "ecoa-brownies",
  cliente: {
    nome: "Ecoa Brownies",
    negocio: "Brownies gourmet, carrinho de eventos e revenda",
    dataAnalise: "agosto de 2026",
    validade: "7 dias",
  },
  hero: {
    etiqueta: "Análise e proposta · Ecoa Brownies",
    headline: "A gente olhou o seu perfil antes de ",
    headlineDestaque: "falar de preço.",
    subheadline:
      "Você pediu ajuda com o marketing da Ecoa. Antes de responder com um pacote pronto, a gente fez o que faria com qualquer cliente: analisou o seu Instagram do jeito que um cliente novo olharia. O que está aqui é o que encontramos, o que isso está custando em venda, e o caminho que a gente recomenda pra resolver.",
    chips: [
      { texto: "Preparado para Ecoa Brownies" },
      { texto: "Análise feita em agosto de 2026" },
      { texto: "Válida por 7 dias", destaque: true },
    ],
  },
  metodologia: {
    etiqueta: "Antes de tudo",
    intro: [
      "Passamos pelo seu perfil como um cliente novo passaria — sem saber nada sobre a Ecoa. Fizemos o caminho completo: achamos o perfil, lemos a bio, clicamos no link, olhamos os destaques, percorremos o feed e tentamos entender o que comprar e como comprar.",
      "O objetivo era simples: **descobrir onde uma pessoa interessada desiste.** Porque é exatamente ali que está a venda que você não fez e nem ficou sabendo.",
    ],
    cards: [
      {
        titulo: "A clareza da oferta",
        texto:
          "Se dá pra entender rápido o que você vende, pra quem, e como cada tipo de cliente segue o caminho dele.",
      },
      {
        titulo: "O caminho de compra",
        texto:
          "O que acontece quando alguém clica no link. Quantos passos até conseguir pedir um orçamento.",
      },
      {
        titulo: "O que está no ar hoje",
        texto:
          "Conteúdo publicado, destaques, catálogos ativos e o que isso comunica sobre o momento do negócio.",
      },
    ],
  },
  achados: {
    etiqueta: "O raio-x",
    titulo: "6 coisas que encontramos",
    intro:
      "Nada disso é culpa sua. Todos esses pontos são normais em negócio de comida que cresceu no boca a boca e que é tocado por quem também produz, entrega e atende. Mas todos custam venda — e todos têm conserto.",
    items: [
      {
        numero: "01",
        titulo:
          "Você atende três públicos diferentes, mas só existe uma porta",
        blocos: [
          {
            rotulo: "O QUE VIMOS",
            conteudo: [
              "A Ecoa vende para três clientes que não têm nada a ver um com o outro. **O comércio** que quer revender seus brownies. **A pessoa física** que quer encomendar pra consumo ou presente. **Quem organiza festa** e quer o carrinho gourmet.",
              'Sua bio fala principalmente com o primeiro ("Gourmetize seu Comércio com Brownies"), mas o link leva os três pro mesmo lugar, misturados.',
            ],
          },
          {
            rotulo: "POR QUE É PROBLEMA",
            conteudo: [
              "Atender três públicos está certíssimo — isso é força do negócio, não defeito. O problema é que hoje cada visitante precisa se achar sozinho no meio de tudo.",
              "O dono de padaria cai num cardápio de Páscoa. A mãe da festa cai num convite pra virar revendedora. E quando a pessoa precisa fazer esforço pra entender o que serve pra ela, ela não faz. Ela sai.",
            ],
          },
          {
            rotulo: "O QUE MUDA",
            conteudo: [
              "Três públicos precisam de três caminhos claros. Não é dividir o negócio — é organizar a entrada.",
            ],
          },
        ],
      },
      {
        numero: "02",
        titulo:
          "O carrinho gourmet é o seu produto mais caro e o menos explicado",
        blocos: [
          {
            rotulo: "O QUE VIMOS",
            conteudo: [
              "Um evento fechado com o carrinho vale muito mais que uma caixa de brownie. Mas a única imagem dele no perfil é o carrinho **vazio, desmontado, dentro de casa.**",
              "Não existe em lugar nenhum: foto dele montado numa festa de verdade, o que fica servido em cima, quantas pessoas ele atende, quanto tempo fica no evento, se vai alguém junto pra servir, se atende casamento ou só infantil, ou qualquer faixa de preço.",
            ],
          },
          {
            rotulo: "POR QUE É O ACHADO MAIS CARO",
            conteudo: [
              "Ninguém pede orçamento de uma coisa que não entendeu. Quem está organizando festa está comparando fornecedores e precisa de resposta rápida na cabeça: serve quantos? fica quanto tempo? custa mais ou menos quanto? como fica na foto? Se não acha, vai no concorrente que mostra.",
            ],
          },
          {
            rotulo: "O QUE MUDA",
            conteudo: [
              "Esse é o produto com maior potencial de retorno da Ecoa hoje, e ele está praticamente invisível. É por isso que ele ganha uma página só dele nessa proposta.",
            ],
          },
        ],
      },
      {
        numero: "03",
        titulo: "Não conseguimos descobrir onde vocês ficam",
        blocos: [
          {
            rotulo: "O QUE VIMOS",
            conteudo: [
              "Passamos pelo perfil inteiro, pela bio, pelos destaques e pelo link — e não achamos cidade, bairro, região ou raio de atendimento em lugar nenhum.",
            ],
          },
          {
            rotulo: "POR QUE É GRAVE",
            conteudo: [
              "Se a gente, que trabalha com isso todo dia, não descobriu depois de vários minutos procurando, um cliente não vai descobrir em 8 segundos de visita.",
              "Comida é decisão local. Antes de qualquer coisa, a pessoa precisa saber se você entrega onde ela mora, ou se o carrinho vai até o salão da festa dela. Sem essa informação, ela não pergunta — ela assume que não atende e vai embora.",
            ],
          },
          {
            rotulo: "O QUE MUDA",
            conteudo: [
              "Região visível na bio, nas páginas e no conteúdo. É a informação mais barata de arrumar e uma das que mais destrava contato.",
            ],
          },
        ],
      },
      {
        numero: "04",
        titulo: "Um revendedor não consegue fazer a conta dele",
        blocos: [
          {
            rotulo: "O QUE VIMOS",
            conteudo: [
              "Você até divulga preço, mas ele aparece só dentro dos catálogos sazonais de Páscoa e Natal, nos destaques. Fora dali, não existe referência nenhuma — principalmente pra revenda.",
            ],
          },
          {
            rotulo: "POR QUE TRAVA A VENDA",
            conteudo: [
              "Revendedor não compra brownie, ele compra **margem.** Antes de te chamar, ele precisa conseguir montar essa conta na cabeça: quanto eu pago, por quanto eu revendo, quanto sobra, e quanto eu preciso vender pra valer a pena?",
              "Hoje ele não tem nenhum desses números. Sem conseguir enxergar o próprio lucro, ele não vê potencial e não abre conversa. E o revendedor é justamente o cliente que compra de novo todo mês.",
            ],
          },
          {
            rotulo: "O QUE MUDA",
            conteudo: [
              "Uma página de revenda com quantidade mínima, faixa de preço, margem sugerida e como funciona a parceria. Ele faz a conta sozinho e chega no WhatsApp já querendo fechar.",
            ],
          },
        ],
      },
      {
        numero: "05",
        titulo: "O perfil ainda está na Páscoa, e o Natal está logo ali",
        blocos: [
          {
            rotulo: "O QUE VIMOS",
            conteudo: [
              "Estamos em agosto. O destaque de **Páscoa 2026** continua sendo o primeiro da fileira e o catálogo de Páscoa segue como link ativo — sendo que a Páscoa foi em abril.",
            ],
          },
          {
            rotulo: "POR QUE IMPORTA",
            conteudo: [
              "Quem chega no perfil hoje bate primeiro numa data que já passou há quatro meses. Isso passa a impressão de que o negócio parou, mesmo você estando produzindo e vendendo normalmente.",
            ],
          },
          {
            rotulo: "E TEM UMA OPORTUNIDADE AQUI",
            conteudo: [
              "Natal é a maior data do calendário de doceria, e quem vende para comércio precisa fechar **antes** — revendedor e empresa que compra kit corporativo decidem fornecedor entre setembro e outubro, não em dezembro.",
            ],
          },
          {
            rotulo: "O QUE MUDA",
            conteudo: [
              "Se a gente arrumar a casa agora, em agosto e setembro, você chega na temporada de Natal com página pronta, preço claro e caminho de compra funcionando. Chegar em novembro correndo atrás é perder a melhor janela do ano.",
            ],
          },
        ],
      },
      {
        numero: "06",
        titulo: "O link atual não deixa rastro nenhum",
        blocos: [
          {
            rotulo: "O QUE VIMOS",
            conteudo: [
              "O link da bio é um agregador gratuito com quatro botões. Ele organiza, mas é uma página de outra empresa — não é sua.",
            ],
          },
          {
            rotulo: "POR QUE ISSO LIMITA TUDO",
            conteudo: [
              "Numa página própria, dá pra instalar um código de acompanhamento invisível (no mercado ele é chamado de **pixel**). Ele não aparece pro visitante e não atrapalha nada. Serve pra duas coisas: mostrar quantas pessoas **realmente pediram orçamento**, e não apenas clicaram; e permitir mostrar seu conteúdo de novo pra quem visitou e não finalizou.",
              "No agregador gratuito, nada disso é possível. Você não sabe quantas pessoas chegaram perto de comprar e desistiram.",
            ],
          },
          {
            rotulo: "O QUE MUDA",
            conteudo: [
              "Página própria = você passa a enxergar o que funciona. E enxergar é o que permite melhorar mês a mês em vez de repetir no escuro.",
            ],
          },
        ],
      },
    ],
  },
  recomendacao: {
    etiqueta: "Nossa recomendação",
    intro:
      "Junta tudo: três públicos entrando pela mesma porta, o produto mais caro sem explicação, ninguém sabendo se você atende a região dela, revendedor sem conseguir calcular a margem e nenhum jeito de medir o que funciona.\n\nNada disso se resolve postando mais. **Se resolve arrumando o caminho e depois trazendo gente pra ele.**",
    movimentos: [
      {
        numero: 1,
        titulo: "Arrumar a casa.",
        texto:
          "Organizar as três entradas, criar as páginas que faltam, deixar preço e região visíveis. É o que faz cada visitante virar conversa.",
      },
      {
        numero: 2,
        titulo: "Movimentar o orgânico.",
        texto:
          "A gente entrega uma orientação mensal de conteúdo com tema e formato de cada publicação — você executa. Você já produz e já sabe filmar, o que falta é direção estratégica. Isso é o que mantém o perfil vivo sem custo extra.",
      },
      {
        numero: 3,
        titulo: "Trazer interessados novos com tráfego pago.",
        texto:
          "Com a casa arrumada, os anúncios entram pra colocar seu carrinho na frente de quem está organizando festa agora, e sua revenda na frente de quem tem comércio. É aqui que o crescimento deixa de depender só de quem já te conhece.",
      },
    ],
    fechamento:
      "A ordem importa. Fazer o 3 antes do 1 é pagar pra trazer gente pra uma casa bagunçada.",
  },
  fases: {
    etiqueta: "O plano",
    intro: "Dois blocos, na ordem. Nada acontece sem você aprovar antes.",
    items: [
      {
        tag: "FASE 1",
        titulo: "Arrumar a casa",
        prazo: "Primeiros 30 dias",
        cor: "#00C2FF",
        intro:
          "Antes de qualquer real investido em anúncio, a gente constrói a estrutura que vai receber essas pessoas e organiza o que já existe.",
        entregaveis: [
          {
            titulo: "Reunião de diagnóstico (1h)",
            descricao:
              "Onde a gente descobre o que não achamos sozinhos: sua região de entrega, o raio do carrinho, o que ele serve, capacidade de produção, seus preços e a margem de cada produto.",
          },
          {
            titulo: "Página do Carrinho Gourmet",
            descricao:
              "O que é, o que serve, quantas pessoas atende, quanto tempo fica, o que está incluso, fotos reais e uma faixa de \"a partir de\". Com formulário de orçamento que já pergunta data, local e número de convidados — você recebe o pedido já qualificado.",
          },
          {
            titulo: "Página de Revenda / Atacado",
            descricao:
              "Como funciona a parceria, quantidade mínima, faixa de preço, margem que ele ganha e como recebe o produto. O revendedor faz a conta dele sozinho antes de te chamar.",
          },
          {
            titulo: "Instalação do pixel",
            descricao:
              "O código invisível que mostra quantas pessoas realmente pediram orçamento. É o que transforma resultado em número, e não em achismo.",
          },
          {
            titulo: "Reorganização do Instagram",
            descricao:
              "Nova bio deixando claro o que você vende e pra quem, região de atendimento visível, destaques reordenados por jornada de compra (e não por data), Páscoa arquivada, e link único apontando pras páginas novas.",
          },
          {
            titulo: "Roteiro de captação de conteúdo",
            descricao:
              "A lista exata do que você precisa registrar nas próximas festas e entregas pra construir a prova que hoje falta: carrinho montado em evento, depoimento de revendedor, ponto de venda funcionando.",
          },
          {
            titulo: "Calendário de conteúdo do mês 1",
            descricao:
              "Uma orientação mensal com tema e formato de cada publicação (o que falar e se é reels, carrossel ou foto). A criação fica com você, que já conhece o seu produto — a gente entra com a direção estratégica pra você não postar no escuro.",
          },
        ],
      },
      {
        tag: "FASE 2",
        titulo: "Tráfego pago: trazer gente nova",
        prazo: "Mês 2 em diante",
        cor: "#AAFF00",
        intro:
          "Aqui entram os **anúncios**. Com a casa arrumada e o caminho de compra funcionando, a verba entra em campanhas de tráfego pago no Meta (Instagram e Facebook) separadas por objetivo — cada uma falando com um dos seus três públicos, sem misturar.",
        entregaveis: [
          {
            titulo: "Campanha de carrinho gourmet",
            descricao:
              "Anúncio pra quem está organizando festa na sua região. Leva pra página do carrinho com formulário de orçamento. É a campanha de maior retorno por contato fechado.",
          },
          {
            titulo: "Campanha de revenda",
            descricao:
              "Anúncio pra dono de comércio: cafeteria, padaria, mercadinho, lanchonete. Leva pra página de atacado.",
          },
          {
            titulo: "Campanha de encomendas",
            descricao:
              "Anúncio pra pessoa física da sua região que compra doce pra consumo, presente ou pequeno evento.",
          },
          {
            titulo: "Remarketing",
            descricao:
              "Mostra seu anúncio de novo pra quem já visitou e não fechou. É como aquele produto que você olhou e ficou te seguindo pela internet. Funciona bem porque fala com quem já demonstrou interesse — costuma ser o contato mais barato de todos.",
          },
          {
            titulo: "Otimização semanal",
            descricao:
              "A gente acompanha o que está performando, corta o que não rende, aumenta o que rende e testa novos textos e imagens toda semana.",
          },
          {
            titulo: "Relatório semanal em português",
            descricao:
              "Quanto foi investido, quantas pessoas chegaram, quantos pediram orçamento e quanto custou cada contato. Sem termo técnico sem explicação.",
          },
          {
            titulo: "Calendário de conteúdo todo mês",
            descricao:
              "Continua vindo mensalmente com tema e formato, pra você manter o perfil ativo enquanto os anúncios rodam. Orgânico e pago se reforçam: quem vê o anúncio vai conferir o perfil antes de chamar.",
          },
        ],
      },
    ],
  },
  prova: {
    etiqueta: "Por que a gente",
    headline: "A gente também empurrou carrinho",
    paragrafos: [
      "Antes da ZBRAND existir, a gente teve a **Churruts** por quase 10 anos: começou como carrinho de churros na rua e em eventos, virou loja física e delivery na pandemia.",
      "Ou seja: a gente sabe o que é montar carrinho em festa, fechar orçamento de evento, calcular quanto sobra em cada produto e responder WhatsApp de cliente às 22h. **Não somos agência olhando de fora — a gente já foi você.**",
    ],
    numeros: [
      { valor: "1,5k → 10k", label: "Seguidores em 1 ano, sem anúncio pago" },
      { valor: "3k", label: "Inscritos no YouTube em 3 meses" },
      {
        valor: "R$ 7k",
        label: "Em vendas de produto digital, tudo orgânico",
      },
    ],
    subtituloImagens: "Resultados de tráfego pago da Churruts",
    subSubtituloImagens: "Campanhas reais, gerenciador real.",
    imagens: [],
  },
  contaQueImporta: {
    etiqueta: "A conta",
    headline: "Isso é custo ou é investimento?",
    subtituloExplicacao:
      "Antes da conta, uma explicação importante — são duas coisas separadas:",
    explicacaoVerba:
      "**A verba de anúncio** é o dinheiro que vai pro Meta pra colocar seu anúncio na tela das pessoas. Ela é paga direto na plataforma, com o seu cartão ou pix, na sua própria conta. **Esse dinheiro não passa pela ZBRAND** — você controla, aumenta, diminui e enxerga cada centavo no seu painel.",
    explicacaoGestao:
      "**A gestão** é o nosso trabalho: montar as campanhas, criar os anúncios, acompanhar todo dia, otimizar o que está rendendo, cortar o que não está e te entregar relatório. É o que você paga pra ZBRAND.",
    separador: "Uma coisa é o combustível. A outra é quem dirige.",
    corpo: [
      "Feita essa separação, vamos à conta — com o número mais conservador possível.",
      "**A verba de anúncio sugerida pra começar é de R$ 750 por mês. Isso dá R$ 25 por dia** — menos do que a maioria dos negócios de comida gasta em embalagem.",
      "Com esse valor a gente não vai inundar a cidade. Mas dá pra colocar o carrinho na frente de quem está organizando festa na sua região, todos os dias, de forma consistente.",
    ],
    perguntaDestaque: "Agora a pergunta que vale:",
    respostaDestaque: [
      'Um evento de carrinho gourmet para 30 pessoas, com brownies recheados e confeitados servidos durante a festa e uma atendente no local, gira em torno de **R$ 1.500**.',
      '**Um único evento fechado no mês já cobre a verba de anúncio inteira e ainda sobra.** Dois eventos cobrem a verba e a gestão juntas, com folga. E isso sem contar nenhuma encomenda e nenhum revendedor novo — que entram pelas mesmas campanhas, no mesmo investimento.',
    ],
    cardDestaque:
      "E tem uma parte que não aparece na conta do mês: **o revendedor.** Ele não compra uma vez — ele compra todo mês. Um revendedor fechado em setembro ainda está comprando em março. É o tipo de cliente que transforma investimento em receita recorrente.",
    fechamento:
      "Por isso a gente sugere começar com R$ 750. É baixo o suficiente pra não pesar no caixa e alto o suficiente pra funcionar. Conforme os eventos e as encomendas começarem a entrar, a gente aumenta junto — sempre em cima de número, nunca no escuro.",
  },
  investimento: {
    etiqueta: "Investimento",
    titulo: "Quanto custa",
    intro: "Sem letra miúda. O que está aqui é o que você paga.",
    itens: [
      {
        nome: "Duas páginas de venda",
        descricao:
          "Página do carrinho gourmet + página de revenda/atacado, com formulários, pixel instalado e textos escritos por nós. Pode ser dividido em até 3x sem juros.",
        valor: "R$ 1.500",
        valorRiscado: "R$ 3.000",
        selo: "50% OFF",
      },
      {
        nome: "Gestão de campanhas + conteúdo",
        descricao:
          "Campanhas de tráfego pago estruturadas, otimização semanal, relatório semanal e calendário mensal de conteúdo. Contrato de 6 meses.",
        valor: "R$ 1.200/mês",
        valorRiscado: "R$ 1.500",
      },
      {
        nome: "Verba de anúncios",
        descricao:
          "R$ 25 por dia, pago direto ao Meta no seu cartão ou pix. Não passa pela ZBRAND.",
        valor: "R$ 750/mês",
      },
    ],
    titulosCenarios: "Duas formas de começar",
    cenarios: [
      {
        titulo: "CENÁRIO 1 — Páginas à vista",
        linhas: [
          {
            periodo: "Mês 1 (estruturação, sem anúncio ainda)",
            composicao: "R$ 1.500 páginas + R$ 1.200 gestão",
            valor: "R$ 2.700",
          },
          {
            periodo: "Mês 2 ao 6",
            composicao: "R$ 1.200 gestão + R$ 750 verba",
            valor: "R$ 1.950/mês",
          },
        ],
      },
      {
        titulo: "CENÁRIO 2 — Páginas em 3x sem juros",
        subtitulo: "As parcelas entram na mesma fatura mensal.",
        linhas: [
          {
            periodo: "Mês 1 (estruturação, sem anúncio ainda)",
            composicao: "R$ 500 parcela + R$ 1.200 gestão",
            valor: "R$ 1.700",
          },
          {
            periodo: "Mês 2 e 3",
            composicao: "R$ 500 parcela + R$ 1.200 gestão + R$ 750 verba",
            valor: "R$ 2.450/mês",
          },
          {
            periodo: "Mês 4 ao 6",
            composicao: "R$ 1.200 gestão + R$ 750 verba",
            valor: "R$ 1.950/mês",
          },
        ],
      },
    ],
    notaCenarios:
      "O cenário 2 existe pra você não precisar de um desembolso maior logo na entrada. O valor total é o mesmo nos dois.",
    cardsJustificativa: [
      {
        titulo: "Por que o desconto nas páginas",
        texto:
          "Separadas, as duas páginas sairiam por R$ 3.000. Dentro do pacote elas caem pela metade porque são a base do nosso trabalho — a gente precisa delas prontas pra fazer bem feito o que vem depois.",
      },
      {
        titulo: "Por que 6 meses",
        texto:
          "Mês 1 é estruturação, mês 2 e 3 é aprendizado das campanhas, do mês 4 em diante é escala. Contrato mais curto entrega só a parte difícil e nenhuma da parte boa. E encaixa exatamente na janela do Natal.",
      },
    ],
  },
  cta: {
    headline: "Bora tirar a zebra do seu marketing?",
    texto:
      "O próximo passo é uma conversa de 30 minutos onde a gente preenche as lacunas dessa análise — sua região, o que o carrinho serve, seus preços e sua capacidade de produção. Sem compromisso.",
    reforco:
      "Se fizer sentido pra você, a gente começa. Se não fizer, você fica com essa análise de qualquer jeito.",
    textoBotao: "Falar com a ZBRAND no WhatsApp",
    linkWhatsapp:
      "https://api.whatsapp.com/send?phone=5511940502929&text=Oi!%20Recebi%20a%20proposta%20da%20Ecoa%20Brownies%20e%20quero%20conversar.",
    rodape: "Proposta válida por 7 dias · Bruna e Guilherme · (11) 94050-2929",
  },
  rodape: {
    marca: "Z.brand",
    tagline:
      "Marketing digital sem mimimi. Feito por quem já empreendeu de verdade.",
    links: "zbrand.com.br · @zbrand.mkt · contato@zbrand.com.br",
  },
};
