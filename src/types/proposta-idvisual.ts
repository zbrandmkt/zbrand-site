export interface IdVisualChip {
  texto: string;
  destaque?: boolean;
}

export interface IdVisualHero {
  etiqueta: string;
  saudacao: string;
  headline: string;
  headlineDestaque: string;
  subtexto: string;
  chips: IdVisualChip[];
}

export interface IdVisualEntregavel {
  texto: string;
}

export interface IdVisualPacote {
  numero: number;
  titulo: string;
  cor: string;
  entregaveis: IdVisualEntregavel[];
}

export interface IdVisualPortfolioItem {
  src: string;
  legenda: string;
}

export interface IdVisualPortfolio {
  etiqueta: string;
  headline: string;
  subtexto: string;
  itens: IdVisualPortfolioItem[];
}

export interface OpcaoPagamento {
  titulo: string;
  destaque?: boolean;
  linhas: string[];
}

export interface IdVisualInvestimento {
  etiqueta: string;
  headline: string;
  nomePacote: string;
  valorTotal: string;
  opcoesPagamento: OpcaoPagamento[];
  prazo: string;
  inclui: string;
}

export interface IdVisualCTA {
  headline: string;
  texto: string;
  reforco: string;
  textoBotao: string;
  linkWhatsapp: string;
  rodape: string;
}

export interface IdVisualData {
  slug: string;
  cliente: {
    nome: string;
    segmento: string;
  };
  hero: IdVisualHero;
  pacotes: IdVisualPacote[];
  portfolio: IdVisualPortfolio;
  investimento: IdVisualInvestimento;
  cta: IdVisualCTA;
  rodape: {
    marca: string;
    tagline: string;
    links: string;
  };
}
