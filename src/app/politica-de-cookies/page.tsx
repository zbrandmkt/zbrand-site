import { LegalPage } from "@/components/layout/legal-page";

export const metadata = {
  title: "Política de Cookies | ZBRAND",
  description: "Entenda como a ZBRAND utiliza cookies e tecnologias similares no site zbrand.com.br.",
  robots: { index: false, follow: false },
};

export default function PoliticaCookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      subtitle="Esta política explica o que são cookies, quais utilizamos em zbrand.com.br, para que servem e como você pode controlá-los."
      updatedAt="24 de abril de 2026"
      sections={[
        {
          title: "O que são Cookies?",
          content: [
            "Cookies são pequenos arquivos de texto armazenados no seu navegador ou dispositivo quando você visita um site. Eles permitem que o site reconheça seu dispositivo em visitas futuras, lembre suas preferências e colete informações sobre como você usa o site.",
            "Além de cookies tradicionais, utilizamos tecnologias similares como pixels de rastreamento (tiny images 1×1 pixel), armazenamento local (localStorage) e identificadores de sessão.",
          ],
        },
        {
          title: "Categorias de Cookies que Utilizamos",
          content: [
            "Classificamos nossos cookies em quatro categorias:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Estritamente necessários:</strong> Essenciais para o funcionamento do site. Não podem ser desativados.",
                "<strong class='text-white/70'>Funcionais:</strong> Lembram suas preferências para melhorar a experiência.",
                "<strong class='text-white/70'>Analíticos/de desempenho:</strong> Coletam informações sobre como o site é usado (páginas visitadas, tempo na página). Dados anonimizados.",
                "<strong class='text-white/70'>De marketing/rastreamento:</strong> Utilizados para mensurar campanhas de publicidade e exibir anúncios relevantes.",
              ],
            },
          ],
        },
        {
          title: "Cookies Utilizados no Site",
          content: [
            "A tabela abaixo detalha os cookies ativos em zbrand.com.br:",
            {
              type: "table",
              headers: ["Cookie / Tecnologia", "Provedor", "Categoria", "Finalidade", "Duração"],
              rows: [
                ["sb-access-token", "Supabase", "Necessário", "Autenticação segura na Área do Cliente", "Sessão"],
                ["sb-refresh-token", "Supabase", "Necessário", "Renovação da sessão autenticada", "7 dias"],
                ["_ga", "Google Analytics", "Analítico", "Distingue usuários únicos para análise de tráfego", "2 anos"],
                ["_ga_XXXXXXXX", "Google Analytics", "Analítico", "Armazena estado e contagem de sessões", "2 anos"],
                ["_fbp", "Meta (Facebook)", "Marketing", "Identifica navegadores para mensuração de anúncios Meta Ads", "3 meses"],
                ["_fbc", "Meta (Facebook)", "Marketing", "Armazena cliques em links de anúncios Facebook", "3 meses"],
                ["next-auth.session-token", "NextAuth / App", "Necessário", "Mantém sessão autenticada", "30 dias"],
              ],
            },
            "Esta lista pode ser atualizada conforme novos serviços são adicionados ao site. A data da última atualização indica a versão vigente.",
          ],
        },
        {
          title: "Cookies de Terceiros",
          content: [
            "Alguns cookies são definidos por terceiros cujos serviços integramos. Esses terceiros podem usar cookies para coletar informações sobre sua atividade online em múltiplos sites:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Google Analytics (Google LLC):</strong> Analisamos o comportamento de navegação de forma anonimizada. O IP é mascarado antes do processamento. Política: <a href='https://policies.google.com/privacy' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>policies.google.com/privacy</a>",
                "<strong class='text-white/70'>Meta Pixel (Meta Platforms):</strong> Mensuramos a eficácia de campanhas no Facebook e Instagram. Política: <a href='https://www.facebook.com/privacy/policy' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>facebook.com/privacy/policy</a>",
                "<strong class='text-white/70'>Supabase:</strong> Gerencia autenticação e armazenamento seguro de dados. Política: <a href='https://supabase.com/privacy' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>supabase.com/privacy</a>",
              ],
            },
            "A ZBRAND não controla os cookies de terceiros. Recomendamos consultar as políticas de privacidade de cada provedor.",
          ],
        },
        {
          title: "Base Legal para Uso de Cookies",
          content: [
            "Utilizamos cookies com base nas seguintes fundamentações legais (LGPD Art. 7):",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Cookies necessários:</strong> Legítimo interesse — indispensáveis para o funcionamento do site e da Área do Cliente.",
                "<strong class='text-white/70'>Cookies analíticos:</strong> Legítimo interesse — melhoria contínua do site com dados anonimizados.",
                "<strong class='text-white/70'>Cookies de marketing:</strong> Consentimento — ativados apenas quando você aceita o uso de cookies de rastreamento.",
              ],
            },
          ],
        },
        {
          title: "Como Gerenciar e Desativar Cookies",
          content: [
            "Você tem controle sobre os cookies. Veja como gerenciá-los:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Configurações do navegador:</strong> Todos os navegadores permitem bloquear ou excluir cookies. Atenção: desativar cookies necessários pode impedir o acesso à Área do Cliente.",
                "<strong class='text-white/70'>Google Analytics:</strong> Instale o <a href='https://tools.google.com/dlpage/gaoptout' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Add-on de desativação do Google Analytics</a> para bloquear o rastreamento.",
                "<strong class='text-white/70'>Meta Ads:</strong> Gerencie suas preferências em <a href='https://www.facebook.com/ads/preferences' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>facebook.com/ads/preferences</a>.",
                "<strong class='text-white/70'>Opt-out global:</strong> Utilize ferramentas como o <a href='https://optout.aboutads.info' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Digital Advertising Alliance</a> para recusar rastreamento de múltiplos provedores.",
              ],
            },
            "Guias rápidos para bloquear cookies por navegador:",
            {
              type: "list",
              items: [
                "<a href='https://support.google.com/chrome/answer/95647' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Google Chrome</a>",
                "<a href='https://support.mozilla.org/pt-BR/kb/cookies-informacoes-websites-armazenam-no-seu-comp' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Mozilla Firefox</a>",
                "<a href='https://support.apple.com/pt-br/guide/safari/sfri11471/mac' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Apple Safari</a>",
                "<a href='https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Microsoft Edge</a>",
              ],
            },
          ],
        },
        {
          title: "Alterações nesta Política",
          content: [
            "Esta Política de Cookies pode ser atualizada para refletir mudanças nos serviços utilizados ou na legislação. A data no topo desta página indica a versão vigente.",
            "Para dúvidas sobre cookies ou sobre o tratamento dos seus dados, entre em contato pelo e-mail <strong class='text-white/70'>contato@zbrand.com.br</strong>.",
          ],
        },
      ]}
    />
  );
}
