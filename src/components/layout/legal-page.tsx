import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface LegalSection {
  title: string;
  content: (string | { type: "list"; items: string[] } | { type: "table"; headers: string[]; rows: string[][] })[];
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: LegalSection[];
}

export function LegalPage({ title, subtitle, updatedAt, sections }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="bg-[#1A1A1A] min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/25 mb-10">
            <Link href="/" className="hover:text-white/50 transition-colors">Início</Link>
            <span>/</span>
            <span className="text-white/40">{title}</span>
          </div>

          {/* Header */}
          <div className="mb-12 pb-10 border-b border-white/08">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-4">
              ZBRAND — Legal
            </p>
            <h1 className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight mb-4">
              {title}
            </h1>
            <p className="text-white/40 text-sm leading-relaxed mb-6">{subtitle}</p>
            <div className="flex flex-wrap gap-4 text-[11px] text-white/25">
              <span>Última atualização: <span className="text-white/40 font-medium">{updatedAt}</span></span>
              <span>·</span>
              <span>ZBRAND CONSULTORIA EM PUBLICIDADE LTDA</span>
              <span>·</span>
              <span>CNPJ 63.534.147/0001-81</span>
            </div>
          </div>

          {/* Índice rápido */}
          <nav className="bg-white/03 border border-white/08 rounded-2xl p-6 mb-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6100] mb-4">Índice</p>
            <ol className="flex flex-col gap-2">
              {sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#secao-${i + 1}`}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-2"
                  >
                    <span className="text-white/20 font-mono tabular-nums w-5">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {sections.map((s, i) => (
              <section key={i} id={`secao-${i + 1}`} className="scroll-mt-28">
                <div className="flex items-start gap-4 mb-5">
                  <span className="font-mono text-[11px] text-[#FF6100]/60 pt-1 shrink-0 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    {s.title}
                  </h2>
                </div>

                <div className="ml-8 flex flex-col gap-4">
                  {s.content.map((block, j) => {
                    if (typeof block === "string") {
                      return (
                        <p key={j} className="text-sm text-white/50 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: block }} />
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={j} className="flex flex-col gap-2">
                          {block.items.map((item, k) => (
                            <li key={k} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                              <span className="text-[#FF6100] mt-1 shrink-0">›</span>
                              <span dangerouslySetInnerHTML={{ __html: item }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.type === "table") {
                      return (
                        <div key={j} className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-white/10">
                                {block.headers.map((h, k) => (
                                  <th key={k} className="text-left text-[10px] font-black uppercase tracking-widest text-white/30 pb-3 pr-6">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row, k) => (
                                <tr key={k} className="border-b border-white/05">
                                  {row.map((cell, l) => (
                                    <td key={l} className="text-white/45 py-3 pr-6 leading-relaxed align-top">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Footer da página legal */}
          <div className="mt-16 pt-8 border-t border-white/08 flex flex-col sm:flex-row justify-between items-start gap-4">
            <p className="text-[11px] text-white/25 leading-relaxed">
              Dúvidas sobre esta política? Entre em contato:<br />
              <a href="mailto:contato@zbrand.com.br" className="text-[#FF6100]/70 hover:text-[#FF6100] transition-colors">
                contato@zbrand.com.br
              </a>
            </p>
            <Link
              href="/"
              className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors"
            >
              ← Voltar ao site
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
