// import { PropostaData } from "@/types/proposta";
//
// Template para criar uma nova proposta.
// 1. Copie este arquivo e renomeie com o slug do cliente (ex: nome-do-cliente.ts)
// 2. Preencha todos os campos obrigatórios
// 3. Registre no index.ts: import + adicionar ao Record
//
// export const nomeDoCliente: PropostaData = {
//   slug: "nome-do-cliente",
//   cliente: {
//     nome: "Nome do Cliente",
//     negocio: "Descrição curta do negócio",
//     dataAnalise: "mês de 2026",
//     validade: "7 dias",
//   },
//   hero: {
//     etiqueta: "Análise e proposta · Nome do Cliente",
//     headline: "Parte normal da headline antes de ",
//     headlineDestaque: "parte em destaque.",
//     subheadline: "Texto de introdução da proposta.",
//     chips: [
//       { texto: "Preparado para Nome do Cliente" },
//       { texto: "Análise feita em mês de 2026" },
//       { texto: "Válida por 7 dias", destaque: true },
//     ],
//   },
//   metodologia: {
//     etiqueta: "Antes de tudo",
//     intro: ["Parágrafo 1", "Parágrafo 2 com **negrito**"],
//     cards: [
//       { titulo: "Título do card", texto: "Descrição do que foi analisado" },
//     ],
//   },
//   achados: {
//     etiqueta: "O raio-x",
//     titulo: "X coisas que encontramos",
//     intro: "Texto introdutório dos achados.",
//     items: [
//       {
//         numero: "01",
//         titulo: "Título do achado",
//         blocos: [
//           { rotulo: "O QUE VIMOS", conteudo: ["Parágrafo 1"] },
//           { rotulo: "POR QUE É PROBLEMA", conteudo: ["Parágrafo 1"] },
//           { rotulo: "O QUE MUDA", conteudo: ["Parágrafo 1"] },
//         ],
//       },
//     ],
//   },
//   recomendacao: {
//     etiqueta: "Nossa recomendação",
//     intro: "Texto resumindo os achados e introduzindo a recomendação.",
//     movimentos: [
//       { numero: 1, titulo: "Título.", texto: "Descrição do movimento." },
//     ],
//     fechamento: "Texto em itálico de fechamento.",
//   },
//   fases: {
//     etiqueta: "O plano",
//     intro: "Texto introdutório das fases.",
//     items: [
//       {
//         tag: "FASE 1",
//         titulo: "Título da fase",
//         prazo: "Primeiros 30 dias",
//         cor: "#00C2FF",
//         intro: "O que essa fase faz.",
//         entregaveis: [
//           { titulo: "Entregável", descricao: "O que é e por que importa." },
//         ],
//       },
//     ],
//   },
//   prova: {
//     etiqueta: "Por que a gente",
//     headline: "Headline de prova social",
//     paragrafos: ["Texto com **negrito** sobre a experiência da ZBRAND."],
//     numeros: [{ valor: "10k", label: "Descrição do número" }],
//     subtituloImagens: "Subtítulo para os prints",
//     subSubtituloImagens: "Descrição curta dos prints.",
//     imagens: [
//       // { src: "/images/propostas/cliente/print-1.png", legenda: "Legenda" },
//     ],
//   },
//   contaQueImporta: {
//     etiqueta: "A conta",
//     headline: "Headline da seção de conta",
//     subtituloExplicacao: "Frase introduzindo a explicação verba vs gestão.",
//     explicacaoVerba: "Explicação sobre a verba de anúncio com **negrito**.",
//     explicacaoGestao: "Explicação sobre a gestão com **negrito**.",
//     separador: "Frase em itálico separando as explicações.",
//     corpo: ["Parágrafo 1", "Parágrafo 2 com **negrito**"],
//     perguntaDestaque: "Pergunta que introduz o cálculo principal.",
//     respostaDestaque: ["Parágrafo 1 com cálculo", "Parágrafo 2 com conclusão"],
//     cardDestaque: "Texto do card em destaque com **negrito**.",
//     fechamento: "Texto de fechamento da seção.",
//   },
//   investimento: {
//     etiqueta: "Investimento",
//     titulo: "Quanto custa",
//     intro: "Sem letra miúda. O que está aqui é o que você paga.",
//     itens: [
//       {
//         nome: "Nome do item",
//         descricao: "O que está incluído.",
//         valor: "R$ X.XXX",
//         valorRiscado: "R$ X.XXX",  // opcional
//         selo: "50% OFF",           // opcional
//       },
//     ],
//     titulosCenarios: "Formas de pagamento",
//     cenarios: [
//       {
//         titulo: "CENÁRIO 1 — À vista",
//         subtitulo: undefined,       // opcional
//         linhas: [
//           { periodo: "Mês 1", composicao: "Detalhes", valor: "R$ X.XXX" },
//         ],
//       },
//     ],
//     notaCenarios: "Nota explicativa sobre os cenários.",
//     cardsJustificativa: [
//       { titulo: "Título", texto: "Justificativa." },
//     ],
//   },
//   cta: {
//     headline: "Headline do CTA final",
//     texto: "Texto principal do CTA.",
//     reforco: "Texto de reforço em negrito.",
//     textoBotao: "Texto do botão",
//     linkWhatsapp: "https://api.whatsapp.com/send?phone=5511940502929&text=...",
//     rodape: "Texto do rodapé do CTA",
//   },
//   rodape: {
//     marca: "Z.brand",
//     tagline: "Marketing digital sem mimimi. Feito por quem já empreendeu de verdade.",
//     links: "zbrand.com.br · @zbrand.mkt · contato@zbrand.com.br",
//   },
// };
