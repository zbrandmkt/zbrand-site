import { LegalPage } from "@/components/layout/legal-page";

export const metadata = {
  title: "Política de Privacidade | ZBRAND",
  description: "Saiba como a ZBRAND coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.",
  robots: { index: false, follow: false },
};

export default function PoliticaPrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      subtitle="Esta política descreve como a ZBRAND coleta, utiliza, armazena e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)."
      updatedAt="24 de abril de 2026"
      sections={[
        {
          title: "Identificação do Controlador",
          content: [
            "O controlador dos seus dados pessoais é:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Razão Social:</strong> ZBRAND CONSULTORIA EM PUBLICIDADE LTDA",
                "<strong class='text-white/70'>CNPJ:</strong> 63.534.147/0001-81",
                "<strong class='text-white/70'>Endereço:</strong> São Paulo – SP, Brasil",
                "<strong class='text-white/70'>E-mail:</strong> contato@zbrand.com.br",
                "<strong class='text-white/70'>Site:</strong> zbrand.com.br",
              ],
            },
            "Caso tenha dúvidas sobre o tratamento dos seus dados, entre em contato pelo e-mail acima. Respondemos em até 15 dias úteis.",
          ],
        },
        {
          title: "Quais Dados Coletamos",
          content: [
            "Coletamos dados pessoais de diferentes formas ao longo da sua interação com nosso site e serviços:",
            {
              type: "table",
              headers: ["Dado", "Como é coletado", "Obrigatoriedade"],
              rows: [
                ["Nome completo", "Formulários de contato e cadastro", "Obrigatório"],
                ["Número de WhatsApp", "Formulários de contato e cadastro", "Obrigatório"],
                ["E-mail", "Formulários e Área do Cliente", "Obrigatório"],
                ["Tipo de negócio", "Formulários de qualificação", "Opcional"],
                ["Desafio/necessidade", "Formulários de qualificação", "Opcional"],
                ["Redes sociais de interesse", "Formulários de serviço", "Opcional"],
                ["Dados de navegação (IP, dispositivo, páginas visitadas)", "Cookies e analytics", "Automático"],
                ["Dados de acesso à Área do Cliente (login, sessão)", "Autenticação via Supabase", "Automático"],
              ],
            },
            "Não coletamos dados sensíveis (saúde, biometria, origem racial, convicções religiosas ou políticas). Não coletamos dados de menores de 18 anos.",
          ],
        },
        {
          title: "Finalidade do Tratamento",
          content: [
            "Cada dado coletado tem uma finalidade específica e legítima:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Contato comercial:</strong> Nome e WhatsApp são usados para retornar seu pedido de orçamento ou informação.",
                "<strong class='text-white/70'>Qualificação de lead:</strong> Tipo de negócio e desafio nos ajudam a personalizar a proposta antes do contato.",
                "<strong class='text-white/70'>Prestação de serviços:</strong> Dados de clientes ativos são usados para produzir relatórios, calendários de conteúdo e acompanhamento de resultados na Área do Cliente.",
                "<strong class='text-white/70'>Melhoria do site:</strong> Dados de navegação anônimos nos ajudam a entender como o site é utilizado e otimizar a experiência.",
                "<strong class='text-white/70'>Segurança e autenticação:</strong> Dados de sessão garantem o acesso seguro à Área do Cliente.",
                "<strong class='text-white/70'>Cumprimento de obrigações legais:</strong> Podemos reter dados quando exigido por lei ou autoridade competente.",
              ],
            },
            "Não utilizamos seus dados para tomada de decisão exclusivamente automatizada que produza efeitos jurídicos ou impactos significativos.",
          ],
        },
        {
          title: "Base Legal para o Tratamento (LGPD Art. 7)",
          content: [
            "Todo tratamento de dados realizado pela ZBRAND possui fundamento legal:",
            {
              type: "table",
              headers: ["Tratamento", "Base Legal"],
              rows: [
                ["Resposta a formulários de contato", "Legítimo interesse (Art. 7, IX) / Consentimento (Art. 7, I)"],
                ["Qualificação de leads", "Legítimo interesse (Art. 7, IX)"],
                ["Prestação dos serviços contratados", "Execução de contrato (Art. 7, V)"],
                ["Análise de navegação (analytics)", "Legítimo interesse (Art. 7, IX)"],
                ["Cumprimento de obrigação legal", "Obrigação legal (Art. 7, II)"],
                ["Envio de comunicações comerciais", "Consentimento (Art. 7, I)"],
              ],
            },
          ],
        },
        {
          title: "Compartilhamento de Dados",
          content: [
            "A ZBRAND não vende, aluga ou cede seus dados pessoais a terceiros. Compartilhamos dados apenas nas situações necessárias à prestação do serviço:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Supabase (EUA):</strong> Plataforma de banco de dados e autenticação onde os dados são armazenados com criptografia em repouso e em trânsito.",
                "<strong class='text-white/70'>Vercel (EUA):</strong> Infraestrutura de hospedagem do site com conexões HTTPS.",
                "<strong class='text-white/70'>Google Analytics:</strong> Análise de tráfego do site de forma anonimizada.",
                "<strong class='text-white/70'>Meta (Facebook/Instagram):</strong> Pixel para mensuração de campanhas (quando ativo). Os dados são anonimizados antes do envio.",
                "<strong class='text-white/70'>Autoridades públicas:</strong> Quando exigido por lei, decisão judicial ou autoridade regulatória competente.",
              ],
            },
            "Todos os fornecedores acima foram avaliados quanto às suas práticas de segurança e possuem políticas de privacidade próprias.",
          ],
        },
        {
          title: "Transferência Internacional de Dados",
          content: [
            "Alguns de nossos fornecedores (Supabase, Vercel, Google, Meta) estão localizados nos Estados Unidos. A transferência internacional dos seus dados ocorre com as seguintes garantias:",
            {
              type: "list",
              items: [
                "Supabase e Vercel são signatários do EU-US Data Privacy Framework e adotam cláusulas contratuais padrão compatíveis com a LGPD.",
                "Google e Meta possuem políticas de privacidade globais e mecanismos de transferência aprovados por autoridades de proteção de dados.",
                "Todos os dados são transmitidos com criptografia TLS 1.2 ou superior.",
              ],
            },
          ],
        },
        {
          title: "Prazo de Retenção dos Dados",
          content: [
            "Mantemos seus dados pelo tempo necessário às finalidades que motivaram sua coleta:",
            {
              type: "table",
              headers: ["Dado", "Prazo de retenção"],
              rows: [
                ["Leads (formulário de contato)", "12 meses após o último contato"],
                ["Dados de clientes ativos", "Duração do contrato + 5 anos (obrigação fiscal)"],
                ["Dados de clientes encerrados", "5 anos após o encerramento"],
                ["Logs de acesso", "6 meses (Marco Civil da Internet, Art. 15)"],
                ["Dados de cookies de analytics", "Até 26 meses (configuração padrão Google Analytics)"],
              ],
            },
            "Após o prazo, os dados são eliminados ou anonimizados de forma irreversível, salvo obrigação legal de retenção.",
          ],
        },
        {
          title: "Segurança dos Dados",
          content: [
            "Adotamos medidas técnicas e administrativas para proteger seus dados pessoais contra acesso não autorizado, perda ou destruição:",
            {
              type: "list",
              items: [
                "Criptografia em trânsito (HTTPS/TLS 1.2+) em todas as páginas e APIs.",
                "Criptografia em repouso no banco de dados (Supabase, AES-256).",
                "Autenticação segura na Área do Cliente com tokens JWT e sessões com expiração.",
                "Acesso aos dados restrito apenas aos colaboradores que precisam para execução do serviço.",
                "Monitoramento de acesso e logs de auditoria.",
                "Senhas nunca armazenadas em texto claro — utilização de hash bcrypt.",
              ],
            },
            "Em caso de incidente de segurança que possa acarretar risco ou dano relevante a titulares, notificaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados no prazo legal.",
          ],
        },
        {
          title: "Seus Direitos como Titular (LGPD Art. 18)",
          content: [
            "A LGPD garante a você, como titular dos dados, os seguintes direitos:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessar uma cópia.",
                "<strong class='text-white/70'>Correção:</strong> Solicitar a atualização de dados incompletos, inexatos ou desatualizados.",
                "<strong class='text-white/70'>Anonimização, bloqueio ou eliminação:</strong> Dados desnecessários ou tratados em desconformidade.",
                "<strong class='text-white/70'>Portabilidade:</strong> Receber seus dados em formato estruturado para transferência a outro fornecedor.",
                "<strong class='text-white/70'>Eliminação:</strong> Solicitar a exclusão dos dados tratados com base em consentimento.",
                "<strong class='text-white/70'>Informação sobre compartilhamento:</strong> Saber com quais entidades compartilhamos seus dados.",
                "<strong class='text-white/70'>Revogação do consentimento:</strong> Retirar o consentimento a qualquer momento, sem prejuízo ao tratamento anterior.",
                "<strong class='text-white/70'>Oposição:</strong> Opor-se a tratamento realizado com base em legítimo interesse.",
              ],
            },
            "Para exercer qualquer direito, envie solicitação para <strong class='text-white/70'>contato@zbrand.com.br</strong> com assunto 'LGPD — [Seu Direito]'. Respondemos em até 15 dias úteis, podendo solicitar verificação de identidade.",
          ],
        },
        {
          title: "Cookies",
          content: [
            "Utilizamos cookies e tecnologias similares para melhorar sua experiência no site. Consulte nossa <a href='/politica-de-cookies' class='text-[#FF6100]/80 hover:text-[#FF6100] transition-colors'>Política de Cookies</a> completa para detalhes sobre quais cookies usamos, suas finalidades e como gerenciá-los.",
          ],
        },
        {
          title: "Links para Sites de Terceiros",
          content: [
            "Nosso site pode conter links para sites externos (redes sociais, parceiros). A ZBRAND não é responsável pelas práticas de privacidade desses sites. Recomendamos que você leia a política de privacidade de cada site que visitar.",
          ],
        },
        {
          title: "Alterações nesta Política",
          content: [
            "Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas, nos serviços oferecidos ou na legislação aplicável.",
            "Em caso de alterações relevantes que impactem seus direitos, notificaremos por e-mail (quando disponível) ou por aviso em destaque no site com antecedência mínima de 7 dias.",
            "A data da última atualização sempre estará indicada no topo desta página. O uso continuado do site após as alterações implica aceitação da política revisada.",
          ],
        },
        {
          title: "Foro e Legislação Aplicável",
          content: [
            "Esta Política de Privacidade é regida pela legislação brasileira, especialmente a Lei 13.709/2018 (LGPD) e o Marco Civil da Internet (Lei 12.965/2014).",
            "Fica eleito o foro da Comarca de São Paulo – SP como competente para dirimir quaisquer controvérsias decorrentes desta política, com renúncia a qualquer outro, por mais privilegiado que seja.",
          ],
        },
      ]}
    />
  );
}
