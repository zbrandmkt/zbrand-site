import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "HUB365 — Estratégia Meta Ads | ZBRAND",
  description: "Estratégia de Tráfego Pago · Meta Ads para o HUB365. Funil completo: reconhecimento, geração de leads e retargeting.",
  robots: "noindex",
};

// ── Data ────────────────────────────────────────────────────────────────────

const campaigns = [
  {
    tag: "TOPO",
    label: "Reconhecimento",
    budget: "R$ 350",
    pct: 35,
    daily: "~R$ 11,60/dia",
    color: "#00C2FF",
    goal: "Fazer o decisor saber que o HUB365 existe e resolve um problema real.",
    objective: "Reconhecimento de Marca ou Alcance",
    audience: [
      "Cargos: Gerente de TI, CFO, Diretor de Operações, CEO, Sócio",
      "Empresas: 20 – 200 funcionários",
      "Interesses: Microsoft 365, SaaS, gestão empresarial, tecnologia corporativa",
      "Geo: São Paulo + RJ, BH, Curitiba, Porto Alegre",
    ],
    creatives: [
      "Vídeo 15–20s vertical (9:16): abre com a dor → mostra o painel em 5s → fecha com 'Controle total. Um único painel.'",
      "Imagem estática: screenshot do dashboard + headline 'Governança do Microsoft 365 em um único painel'",
    ],
    kpis: ["CPM — custo por mil impressões", "Frequência — manter entre 2× e 4× por pessoa", "% de vídeo assistido — meta: acima de 25%"],
  },
  {
    tag: "MEIO",
    label: "Geração de Leads",
    budget: "R$ 450",
    pct: 45,
    daily: "~R$ 15/dia",
    color: "#FF6100",
    goal: "Capturar quem demonstrou interesse — lead chega quente para o comercial.",
    objective: "Geração de Leads (formulário nativo Meta) ou Mensagens (WhatsApp)",
    audience: [
      "Lookalike da base de clientes atual (1–3% de similaridade)",
      "Quem interagiu com anúncios da Campanha 1",
      "Mesmo perfil de cargo e interesse do topo",
    ],
    iscas: [
      "'Diagnóstico gratuito do seu Microsoft 365'",
      "'Descubra quanto sua empresa está desperdiçando em licenças'",
      "'Demo gratuita — veja o HUB365 funcionando em 20 minutos'",
    ],
    creatives: [
      "Carrossel: Card 1 — 'Até 14% de redução de custos' · Card 2 — '100% acuracidade' · Card 3 — 'Suporte 24/7' · Card 4 — CTA 'Quero uma demo'",
      "Imagem: screenshot do dashboard + headline de benefício direto e CTA claro",
    ],
    kpis: ["CPL — Custo por Lead (meta B2B: R$ 30 a R$ 60)", "Taxa de preenchimento do formulário", "Volume de leads por semana"],
  },
  {
    tag: "FUNDO",
    label: "Retargeting",
    budget: "R$ 200",
    pct: 20,
    daily: "~R$ 6,60/dia",
    color: "#AAFF00",
    goal: "Reconquistar quem visitou o site ou interagiu mas não converteu ainda.",
    objective: "Conversão ou Mensagens",
    audience: [
      "Visitantes do site nos últimos 30 dias (exige Pixel Meta instalado)",
      "Quem assistiu mais de 50% do vídeo da Campanha 1",
      "Quem clicou no anúncio mas não preencheu o formulário",
    ],
    creatives: [
      "Stories/feed com prova social: depoimento de cliente ou resultado concreto de economia",
      "Urgência leve: 'Agende sua demo esta semana — vagas limitadas por mês'",
      "CTA direto para WhatsApp ou página de agendamento",
    ],
    kpis: ["CPA — Custo por Aquisição (agendamento ou contato)", "Taxa de conversão final (visitante → lead → reunião)"],
  },
];

const timeline = [
  {
    period: "Dias 1–30",
    phase: "Aprender",
    color: "#00C2FF",
    items: [
      "Rodar topo + meio simultaneamente",
      "Testar 2 criativos por campanha",
      "Coletar dados: qual público responde melhor, qual formato performa mais",
    ],
  },
  {
    period: "Dias 31–60",
    phase: "Otimizar",
    color: "#FF6100",
    items: [
      "Pausar o que não performa",
      "Dobrar a verba no que gerou leads",
      "Ativar retargeting com o pixel já aquecido",
    ],
  },
  {
    period: "Dias 61–90",
    phase: "Escalar",
    color: "#AAFF00",
    items: [
      "Expandir com Lookalike maiores",
      "Testar novos formatos (Reels, Stories)",
      "Revisar meta de CPL e redistribuir budget conforme resultados",
    ],
  },
];

const prereqs = [
  { item: "Pixel Meta instalado na landing page", priority: "Obrigatório", status: "Pendente" },
  { item: "Landing page com CTA claro e visível", priority: "Obrigatório", status: "Pendente" },
  { item: "WhatsApp Business configurado", priority: "Recomendado", status: "Pendente" },
  { item: "Lista de clientes para Lookalike (CSV com e-mails)", priority: "Ideal ter", status: "Pendente" },
  { item: "Conta do Meta Ads com método de pagamento", priority: "Obrigatório", status: "Pendente" },
];

const nextSteps = [
  "Criação das copies dos anúncios para cada fase do funil",
  "Estruturação das campanhas no Gerenciador de Anúncios do Meta",
  "Briefing de criativos (vídeo e imagem) para produção",
  "Instalação e teste do Pixel Meta na landing page do HUB365",
  "Configuração do formulário de lead nativo no Meta",
  "Definição do fluxo de atendimento dos leads (WhatsApp + CRM)",
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function Hub365PropostaPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/zebra-texture-black.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "280px 280px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 lg:py-24">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <Link href="/">
              <Image src="/images/logo-zbrand.png" alt="ZBRAND" width={120} height={36} className="h-9 w-auto" />
            </Link>
            <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
              <span className="w-2 h-2 bg-[#FF6100] rounded-full animate-pulse" />
              Abril 2026 · Confidencial
            </div>
          </div>

          {/* Title block */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-[#FF6100] text-white rounded-full">
                Meta Ads
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-white/20 text-white/60 rounded-full">
                Tráfego Pago
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-white/20 text-white/60 rounded-full">
                B2B · SaaS
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight leading-none">
              HUB<span className="text-[#FF6100]">365</span>
            </h1>
            <p className="text-xl lg:text-2xl font-bold text-white/70 uppercase tracking-wide">
              Estratégia de Tráfego Pago
            </p>
            <p className="text-sm text-white/40 max-w-xl leading-relaxed">
              Funil completo de Meta Ads para venda do SaaS HUB365 — FinOps · Governança ·
              Otimização de Custos Microsoft 365.
            </p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12">
            {[
              { label: "Orçamento Mensal", value: "R$ 1.000", sub: "~R$ 33/dia" },
              { label: "Público-alvo", value: "20–200", sub: "funcionários" },
              { label: "Alcance Mês 1", value: "15k–30k", sub: "pessoas" },
              { label: "Leads Esperados", value: "10–25", sub: "qualificados/mês" },
            ].map((k) => (
              <div
                key={k.label}
                className="bg-white/05 border border-white/10 rounded-2xl p-4 flex flex-col gap-1"
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40">{k.label}</p>
                <p className="text-2xl font-black text-white">{k.value}</p>
                <p className="text-[11px] text-white/40 font-medium">{k.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISÃO GERAL ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>Visão Geral</SectionLabel>
        <h2 className="text-3xl font-black uppercase mb-4">Como a estratégia funciona</h2>
        <p className="text-sm text-white/50 max-w-2xl leading-relaxed mb-10">
          O HUB365 é um produto SaaS B2B com ciclo de decisão médio a longo. O decisor (Gerente de TI,
          CFO, CEO) não assina uma plataforma no primeiro clique — ele precisa reconhecer o problema,
          considerar a solução e então agir. Por isso, a estratégia trabalha em{" "}
          <strong className="text-white">3 camadas simultâneas</strong> dentro do Meta Ads.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "📡", phase: "Reconhecimento", desc: "Topo de funil — criar consciência sobre o problema: licenças M365 desperdiçadas, falta de governança, custos invisíveis.", color: "#00C2FF" },
            { icon: "🎯", phase: "Geração de Leads", desc: "Meio de funil — capturar leads qualificados com isca de valor: diagnóstico grátis, demo. Lead chega quente para o comercial.", color: "#FF6100" },
            { icon: "🔁", phase: "Retargeting", desc: "Fundo de funil — reconquistar quem demonstrou interesse mas não converteu. Prova social + urgência leve.", color: "#AAFF00" },
          ].map((f) => (
            <div
              key={f.phase}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col gap-3"
              style={{ boxShadow: `4px 4px 0px 0px ${f.color}` }}
            >
              <span className="text-3xl">{f.icon}</span>
              <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: f.color === "#AAFF00" ? "#5a8a00" : f.color }}>
                {f.phase}
              </p>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORÇAMENTO ── */}
      <section className="bg-white/03 border-y border-white/08">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionLabel>Distribuição de Orçamento</SectionLabel>
          <h2 className="text-3xl font-black uppercase mb-8">
            R$ 1.000/mês distribuídos por etapa
          </h2>
          <div className="flex flex-col gap-4">
            {campaigns.map((c) => (
              <div key={c.tag} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: c.color + "22",
                        color: c.color === "#AAFF00" ? "#4a7a00" : c.color,
                        border: `1px solid ${c.color}55`,
                      }}
                    >
                      {c.tag}
                    </span>
                    <span className="font-bold text-white/80">{c.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-white">{c.budget}/mês</span>
                    <span className="text-white/40 text-xs ml-2">· {c.daily}</span>
                  </div>
                </div>
                <div className="h-3 bg-white/08 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  />
                </div>
                <p className="text-xs text-white/30 text-right">{c.pct}% do total</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-white/35 italic border-l-2 border-[#FF6100]/50 pl-4">
            O meio de funil recebe a maior fatia pois é onde o ROI é mais mensurável: cada lead
            capturado tem custo rastreável e pode ser trabalhado pelo comercial.
          </p>
        </div>
      </section>

      {/* ── CAMPANHAS ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>As 3 Campanhas</SectionLabel>
        <h2 className="text-3xl font-black uppercase mb-10">Detalhamento por fase</h2>

        <div className="flex flex-col gap-8">
          {campaigns.map((c, i) => (
            <div
              key={c.tag}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
              style={{ boxShadow: `5px 5px 0px 0px ${c.color}` }}
            >
              {/* Header */}
              <div
                className="px-6 py-4 flex flex-wrap items-center justify-between gap-3"
                style={{ backgroundColor: c.color + "15", borderBottom: `2px solid ${c.color}30` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: c.color === "#AAFF00" ? "#5a8a00" : c.color }}
                  >
                    Campanha {i + 1} — {c.tag}
                  </span>
                  <span className="font-black text-[#1A1A1A] text-lg">{c.label}</span>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#1A1A1A] text-xl">{c.budget}<span className="text-sm font-medium text-[#1A1A1A]/50">/mês</span></p>
                  <p className="text-xs text-[#1A1A1A]/50">{c.daily}</p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left */}
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Objetivo</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">{c.goal}</p>
                    <p className="text-xs text-[#1A1A1A]/50 mt-1">{c.objective}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Público-alvo</p>
                    <ul className="flex flex-col gap-1.5">
                      {c.audience.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-xs text-[#1A1A1A]/70">
                          <span style={{ color: c.color === "#AAFF00" ? "#5a8a00" : c.color }} className="mt-0.5 font-black">▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"iscas" in c && Array.isArray((c as { iscas?: string[] }).iscas) && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Isca de captação — testar uma</p>
                      <ul className="flex flex-col gap-1.5">
                        {((c as { iscas: string[] }).iscas).map((isca) => (
                          <li key={isca} className="flex items-start gap-2 text-xs text-[#1A1A1A]/70">
                            <span className="text-[#FF6100] mt-0.5 font-black">✓</span>
                            {isca}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">Criativos Recomendados</p>
                    <ul className="flex flex-col gap-2">
                      {c.creatives.map((cr) => (
                        <li key={cr} className="text-xs text-[#1A1A1A]/70 bg-black/05 rounded-xl p-3 leading-relaxed">
                          {cr}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">KPIs de Controle</p>
                    <ul className="flex flex-col gap-1.5">
                      {c.kpis.map((kpi) => (
                        <li key={kpi} className="flex items-start gap-2 text-xs text-[#1A1A1A]/70">
                          <span style={{ color: c.color === "#AAFF00" ? "#5a8a00" : c.color }} className="mt-0.5">📊</span>
                          {kpi}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CRIATIVOS ── */}
      <section className="bg-white/03 border-y border-white/08">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionLabel>Criativos</SectionLabel>
          <h2 className="text-3xl font-black uppercase mb-3">Peças desenvolvidas</h2>
          <p className="text-sm text-white/40 mb-10">
            Criativos produzidos pela ZBRAND para as campanhas do HUB365.
          </p>

          {/* Main creatives grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Story 9:16 */}
            <div
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
              style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
            >
              <div className="bg-[#FF6100]/10 border-b-2 border-[#FF6100]/20 px-4 py-3 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">Stories · 9:16 · Topo de Funil</p>
                <span className="text-[10px] text-[#1A1A1A]/40">1080×1920px</span>
              </div>
              <div className="p-4">
                <div className="relative w-full rounded-xl overflow-hidden bg-black/05" style={{ aspectRatio: "9/16", maxHeight: "500px" }}>
                  <Image
                    src="/images/hub365/criativo-story.png"
                    alt="Criativo Story HUB365"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Feed post */}
            <div
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
              style={{ boxShadow: "5px 5px 0px 0px #00C2FF" }}
            >
              <div className="bg-[#00C2FF]/10 border-b-2 border-[#00C2FF]/20 px-4 py-3 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00C2FF]">Post Feed · Meio de Funil</p>
                <span className="text-[10px] text-[#1A1A1A]/40">1080×1080px</span>
              </div>
              <div className="p-4">
                <div className="relative w-full rounded-xl overflow-hidden bg-black/05" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src="/images/hub365/post-hub365.png"
                    alt="Post Feed HUB365"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
              style={{ boxShadow: "5px 5px 0px 0px #AAFF00" }}
            >
              <div className="bg-[#AAFF00]/10 border-b-2 border-[#AAFF00]/20 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#5a8a00]">Dado de Referência · Custo por Licença</p>
              </div>
              <div className="p-4">
                <div className="relative w-full rounded-xl overflow-hidden bg-black/05" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src="/images/hub365/custo-por-licenca.png"
                    alt="Custo por licença Microsoft 365"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
              style={{ boxShadow: "5px 5px 0px 0px #AAFF00" }}
            >
              <div className="bg-[#AAFF00]/10 border-b-2 border-[#AAFF00]/20 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#5a8a00]">Dado de Referência · Custo Excedente</p>
              </div>
              <div className="p-4">
                <div className="relative w-full rounded-xl overflow-hidden bg-black/05" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src="/images/hub365/custo-excedente.png"
                    alt="Custo excedente por licença"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Landing page full width */}
          <div
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
            style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
          >
            <div className="bg-[#FF6100]/10 border-b-2 border-[#FF6100]/20 px-4 py-3 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">Landing Page HUB365 · Referência de produto</p>
              <span className="text-[10px] text-[#1A1A1A]/40">hub365.staytrix.com.br</span>
            </div>
            <div className="p-4">
              <div className="relative w-full rounded-xl overflow-hidden bg-black/05">
                <Image
                  src="/images/hub365/pagina-hub365.png"
                  alt="Página HUB365"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIA DE CRIATIVOS POR FASE ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>Guia de Criativos</SectionLabel>
        <h2 className="text-3xl font-black uppercase mb-4">O que mostrar em cada fase</h2>
        <p className="text-sm text-white/40 mb-8">
          Em B2B, ROI concreto converte muito mais que branding genérico.
        </p>

        <div className="flex flex-col gap-3">
          {[
            {
              fase: "Topo",
              color: "#00C2FF",
              what: "Dor + visão do painel",
              how: "Vídeo curto mostrando o problema (licenças invisíveis) e o produto como solução. Sem CTA agressivo.",
            },
            {
              fase: "Meio",
              color: "#FF6100",
              what: "Benefícios concretos",
              how: "14% redução · 100% acuracidade · 98% satisfação + isca de valor (demo grátis, diagnóstico). CTA: 'Fale com um especialista'.",
            },
            {
              fase: "Fundo",
              color: "#AAFF00",
              what: "Prova social + urgência",
              how: "Depoimento ou resultado de cliente + urgência leve. CTA direto: WhatsApp ou agendamento de reunião.",
            },
          ].map((row) => (
            <div
              key={row.fase}
              className="flex flex-col sm:flex-row gap-4 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
              style={{ boxShadow: `3px 3px 0px 0px ${row.color}` }}
            >
              <div className="sm:w-20 shrink-0">
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: row.color + "22",
                    color: row.color === "#AAFF00" ? "#4a7a00" : row.color,
                    border: `1px solid ${row.color}55`,
                  }}
                >
                  {row.fase}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="sm:w-1/3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">O que mostrar</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">{row.what}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Como executar</p>
                  <p className="text-sm text-[#1A1A1A]/70">{row.how}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 90 DIAS ── */}
      <section className="bg-white/03 border-y border-white/08">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionLabel>Plano de Rodagem</SectionLabel>
          <h2 className="text-3xl font-black uppercase mb-10">Primeiros 90 dias</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((t, i) => (
              <div key={t.phase} className="flex flex-col gap-4">
                {/* Step indicator */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 border-[#1A1A1A]"
                    style={{ backgroundColor: t.color, color: t.color === "#AAFF00" ? "#1A1A1A" : "#fff" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white/40">{t.period}</p>
                    <p className="font-black text-white text-lg">{t.phase}</p>
                  </div>
                </div>
                {/* Card */}
                <div
                  className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex-1"
                  style={{ boxShadow: `4px 4px 0px 0px ${t.color}` }}
                >
                  <ul className="flex flex-col gap-3">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#1A1A1A]/75">
                        <span style={{ color: t.color === "#AAFF00" ? "#5a8a00" : t.color }} className="mt-0.5 shrink-0 font-black">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRÉ-REQUISITOS ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>Pré-requisitos</SectionLabel>
        <h2 className="text-3xl font-black uppercase mb-4">O que deve estar pronto</h2>
        <p className="text-sm text-white/40 mb-8">
          Esses itens devem estar configurados antes de subir qualquer campanha.
        </p>

        <div className="flex flex-col gap-3">
          {prereqs.map((p) => (
            <div
              key={p.item}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              style={{ boxShadow: "3px 3px 0px 0px rgba(26,26,26,0.15)" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {p.priority === "Obrigatório" ? "🔴" : p.priority === "Recomendado" ? "🟡" : "🟢"}
                </span>
                <p className="text-sm font-bold text-[#1A1A1A]">{p.item}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/08 text-[#1A1A1A]/50">
                  {p.priority}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FF6100]/15 text-[#FF6100] border border-[#FF6100]/30">
                  ☐ {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── METAS MÊS 1 ── */}
      <section className="bg-white/03 border-y border-white/08">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <SectionLabel>Metas Realistas</SectionLabel>
          <h2 className="text-3xl font-black uppercase mb-3">Mês 1 — Referências</h2>
          <p className="text-sm text-white/40 mb-10">
            À medida que o algoritmo do Meta aprende o perfil do lead ideal, espera-se redução no CPL e
            aumento no volume a partir do mês 2.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: "Alcance estimado", value: "15k–30k", sub: "pessoas", color: "#00C2FF" },
              { label: "Leads qualificados", value: "10–25", sub: "leads/mês", color: "#FF6100" },
              { label: "CPL alvo B2B", value: "R$ 30–60", sub: "por lead", color: "#FF6100" },
              { label: "Frequência ideal", value: "2×–4×", sub: "por pessoa", color: "#00C2FF" },
              { label: "Budget diário médio", value: "~R$ 33", sub: "por dia", color: "#AAFF00" },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4 flex flex-col gap-2"
                style={{ boxShadow: `4px 4px 0px 0px ${m.color}` }}
              >
                <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{m.label}</p>
                <p className="text-xl font-black text-[#1A1A1A] leading-tight">{m.value}</p>
                <p className="text-[11px] text-[#1A1A1A]/50 font-medium">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRÓXIMOS PASSOS ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <SectionLabel>Próximos Passos</SectionLabel>
        <h2 className="text-3xl font-black uppercase mb-8">Com a estratégia definida</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nextSteps.map((step, i) => (
            <div
              key={step}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex items-start gap-4"
              style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
            >
              <span className="w-8 h-8 shrink-0 rounded-full bg-[#FF6100] text-white font-black text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-[#1A1A1A]/80 font-medium leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/08 bg-white/03">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <Image src="/images/logo-zbrand.png" alt="ZBRAND" width={100} height={30} className="h-8 w-auto mb-2" />
            <p className="text-xs text-white/30">Estratégia desenvolvida pela equipe ZBRAND para HUB365 / Staytrix</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-white/30 text-right">
            <p>contato@staytrix.com.br</p>
            <p>(11) 3743-0099</p>
            <a href="https://hub365.staytrix.com.br" target="_blank" rel="noopener noreferrer" className="text-[#FF6100] hover:underline">
              hub365.staytrix.com.br
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-2">
      {children}
    </p>
  );
}
