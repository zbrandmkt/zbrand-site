export interface PropostaChip {
  texto: string;
  destaque?: boolean;
}

export interface PropostaHeroData {
  etiqueta: string;
  headline: string;
  headlineDestaque: string;
  subheadline: string;
  chips: PropostaChip[];
}

export interface MetodologiaCard {
  titulo: string;
  texto: string;
}

export interface PropostaMetodologia {
  etiqueta: string;
  intro: string[];
  cards: MetodologiaCard[];
}

export interface AchadoBloco {
  rotulo: string;
  conteudo: string[];
}

export interface Achado {
  numero: string;
  titulo: string;
  blocos: AchadoBloco[];
}

export interface Movimento {
  numero: number;
  titulo: string;
  texto: string;
}

export interface PropostaRecomendacao {
  etiqueta: string;
  intro: string;
  movimentos: Movimento[];
  fechamento: string;
}

export interface FaseEntregavel {
  titulo: string;
  descricao: string;
}

export interface Fase {
  tag: string;
  titulo: string;
  prazo: string;
  cor: string;
  intro: string;
  entregaveis: FaseEntregavel[];
}

export interface ProvaNumero {
  valor: string;
  label: string;
}

export interface ProvaImagem {
  src: string;
  legenda: string;
}

export interface PropostaProva {
  etiqueta: string;
  headline: string;
  paragrafos: string[];
  subtituloImagens: string;
  subSubtituloImagens: string;
  numeros: ProvaNumero[];
  imagens: ProvaImagem[];
}

export interface PropostaContaQueImporta {
  etiqueta: string;
  headline: string;
  subtituloExplicacao: string;
  explicacaoVerba: string;
  explicacaoGestao: string;
  separador: string;
  corpo: string[];
  perguntaDestaque: string;
  respostaDestaque: string[];
  cardDestaque: string;
  fechamento: string;
}

export interface InvestimentoItem {
  nome: string;
  descricao: string;
  valor: string;
  valorRiscado?: string;
  selo?: string;
  parcelamento?: string;
}

export interface CenarioLinha {
  periodo: string;
  composicao: string;
  valor: string;
}

export interface Cenario {
  titulo: string;
  subtitulo?: string;
  linhas: CenarioLinha[];
}

export interface CardJustificativa {
  titulo: string;
  texto: string;
}

export interface PropostaInvestimento {
  etiqueta: string;
  titulo: string;
  intro: string;
  itens: InvestimentoItem[];
  titulosCenarios: string;
  cenarios: Cenario[];
  notaCenarios: string;
  cardsJustificativa: CardJustificativa[];
}

export interface PropostaCTAData {
  headline: string;
  texto: string;
  reforco: string;
  textoBotao: string;
  linkWhatsapp: string;
  rodape: string;
}

export interface PropostaData {
  slug: string;
  cliente: {
    nome: string;
    negocio: string;
    dataAnalise: string;
    validade: string;
  };
  hero: PropostaHeroData;
  metodologia: PropostaMetodologia;
  achados: {
    etiqueta: string;
    titulo: string;
    intro: string;
    items: Achado[];
  };
  recomendacao: PropostaRecomendacao;
  fases: {
    etiqueta: string;
    intro: string;
    items: Fase[];
  };
  prova: PropostaProva;
  contaQueImporta: PropostaContaQueImporta;
  investimento: PropostaInvestimento;
  cta: PropostaCTAData;
  rodape: {
    marca: string;
    tagline: string;
    links: string;
  };
}
