import { LegalPage } from "@/components/layout/legal-page";

export const metadata = {
  title: "Termos de Uso | ZBRAND",
  description: "Leia os termos e condições de uso do site zbrand.com.br e da Área do Cliente ZBRAND.",
  robots: { index: false, follow: false },
};

export default function TermosDeUsoPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      subtitle="Ao acessar e utilizar o site zbrand.com.br ou a Área do Cliente, você concorda com estes Termos de Uso. Leia com atenção antes de prosseguir."
      updatedAt="24 de abril de 2026"
      sections={[
        {
          title: "Aceitação dos Termos",
          content: [
            "O acesso e uso do site zbrand.com.br e da Área do Cliente ZBRAND estão condicionados à aceitação integral destes Termos de Uso.",
            "Ao navegar no site, preencher formulários, criar conta ou acessar a Área do Cliente, você declara ter lido, compreendido e concordado com estes termos. Se não concordar, interrompa o uso imediatamente.",
            "Estes termos se aplicam a todos os usuários: visitantes, leads e clientes com acesso à Área do Cliente.",
          ],
        },
        {
          title: "Sobre a ZBRAND",
          content: [
            "A ZBRAND é uma agência de marketing digital especializada no setor de gastronomia e alimentação, prestando serviços de gestão de redes sociais, tráfego pago, produção de conteúdo, automação de WhatsApp, desenvolvimento de websites e estratégias digitais integradas.",
            "Os serviços são prestados mediante contrato formal assinado entre a ZBRAND e o cliente, cujas condições específicas prevalecem sobre estes Termos de Uso em caso de conflito.",
          ],
        },
        {
          title: "Área do Cliente — Cadastro e Acesso",
          content: [
            "O acesso à Área do Cliente é restrito a clientes com contrato ativo com a ZBRAND. O cadastro é realizado pela equipe ZBRAND mediante solicitação formal.",
            "Ao acessar a Área do Cliente, você se compromete a:",
            {
              type: "list",
              items: [
                "Manter suas credenciais de acesso (e-mail e senha) em sigilo, sendo responsável por todo o uso feito com sua conta.",
                "Notificar imediatamente a ZBRAND em caso de uso não autorizado da sua conta pelo e-mail contato@zbrand.com.br.",
                "Não compartilhar seu acesso com terceiros não autorizados.",
                "Fornecer informações verdadeiras e atualizadas no momento do cadastro.",
                "Usar a Área do Cliente exclusivamente para acompanhar os serviços contratados.",
              ],
            },
            "A ZBRAND se reserva o direito de suspender ou encerrar o acesso de qualquer usuário que viole estes termos ou o contrato de serviços.",
          ],
        },
        {
          title: "Propriedade Intelectual",
          content: [
            "Todo o conteúdo disponível em zbrand.com.br — incluindo, mas não se limitando a: textos, imagens, logotipos, ícones, vídeos, layouts, código-fonte, marcas e outros materiais — é de propriedade exclusiva da ZBRAND CONSULTORIA EM PUBLICIDADE LTDA ou foi devidamente licenciado por terceiros.",
            "É expressamente proibido, sem autorização prévia e escrita da ZBRAND:",
            {
              type: "list",
              items: [
                "Copiar, reproduzir, modificar, distribuir ou comercializar qualquer conteúdo do site.",
                "Utilizar a marca ZBRAND, logotipos ou elementos visuais em qualquer material sem autorização.",
                "Fazer engenharia reversa, descompilar ou extrair o código-fonte do site ou da Área do Cliente.",
                "Criar obras derivadas baseadas no conteúdo do site.",
              ],
            },
            "Os conteúdos produzidos pela ZBRAND para seus clientes no âmbito de contrato específico seguem as regras de propriedade intelectual estabelecidas no respectivo contrato de serviços.",
          ],
        },
        {
          title: "Uso Permitido e Proibições",
          content: [
            "O site deve ser utilizado apenas para fins legítimos e em conformidade com a legislação brasileira. É expressamente proibido:",
            {
              type: "list",
              items: [
                "Utilizar scripts automatizados, bots ou técnicas de scraping para extrair dados do site.",
                "Tentar acessar áreas restritas do site sem autorização.",
                "Interferir no funcionamento do site ou de seus servidores (ataques DDoS, injeção de código, etc.).",
                "Utilizar o site para fins fraudulentos, ilegais ou que violem direitos de terceiros.",
                "Transmitir vírus, malware ou qualquer código malicioso.",
                "Acessar dados de outros clientes da ZBRAND, mesmo que haja falha técnica que permita tal acesso.",
                "Usar a Área do Cliente para finalidade diversa do acompanhamento dos serviços contratados.",
              ],
            },
            "Violações poderão resultar em: encerramento imediato do acesso, rescisão contratual e responsabilização civil e criminal nos termos da legislação brasileira (Marco Civil da Internet — Lei 12.965/2014, Lei 9.609/1998, Código Penal).",
          ],
        },
        {
          title: "Disponibilidade e Manutenção",
          content: [
            "A ZBRAND emprega esforços razoáveis para manter o site e a Área do Cliente disponíveis 24 horas por dia, 7 dias por semana. No entanto, não garantimos disponibilidade ininterrupta.",
            "Podem ocorrer interrupções para:",
            {
              type: "list",
              items: [
                "Manutenções programadas (geralmente comunicadas com antecedência).",
                "Atualizações de segurança emergenciais.",
                "Falhas de infraestrutura de terceiros (hospedagem, banco de dados, CDN).",
                "Situações de força maior ou caso fortuito.",
              ],
            },
            "A ZBRAND não será responsabilizada por danos decorrentes de indisponibilidade temporária do site.",
          ],
        },
        {
          title: "Limitação de Responsabilidade",
          content: [
            "O site zbrand.com.br e as informações nele contidas são fornecidos 'no estado em que se encontram'. A ZBRAND não garante que:",
            {
              type: "list",
              items: [
                "O site estará livre de erros ou disponível ininterruptamente.",
                "Os resultados obtidos com o uso do site atenderão às suas expectativas específicas.",
                "O conteúdo do site é sempre atual, completo ou preciso (pode estar sujeito a alterações sem aviso prévio).",
              ],
            },
            "A ZBRAND não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou incapacidade de uso do site, exceto nos casos previstos expressamente no contrato de serviços.",
            "Resultados de marketing (seguidores, leads, conversões, ROI) dependem de múltiplos fatores externos ao controle da ZBRAND. Estimativas e cases de sucesso exibidos no site são referenciais, não garantias de resultados.",
          ],
        },
        {
          title: "Privacidade",
          content: [
            "O tratamento dos seus dados pessoais é regido pela nossa <a href='/politica-de-privacidade' class='text-[#FF6100]/80 hover:text-[#FF6100] transition-colors'>Política de Privacidade</a>, que integra estes Termos de Uso por referência.",
            "Ao aceitar estes termos, você também declara ter lido e concordado com a Política de Privacidade.",
          ],
        },
        {
          title: "Modificações nos Termos",
          content: [
            "A ZBRAND reserva-se o direito de modificar estes Termos de Uso a qualquer momento, a seu exclusivo critério.",
            "Alterações relevantes serão comunicadas com antecedência mínima de 7 dias por aviso no site ou por e-mail (quando disponível). O uso continuado do site após a data de vigência das novas condições implica aceitação tácita das alterações.",
            "Para clientes com contrato ativo, alterações que impactem direitos contratuais serão negociadas individualmente.",
          ],
        },
        {
          title: "Disposições Gerais",
          content: [
            "Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.",
            "A omissão da ZBRAND em exercer qualquer direito previsto nestes Termos não constitui renúncia a tal direito.",
            "Estes Termos constituem o acordo integral entre você e a ZBRAND em relação ao uso do site, substituindo quaisquer acordos anteriores sobre o mesmo objeto.",
          ],
        },
        {
          title: "Legislação Aplicável e Foro",
          content: [
            "Estes Termos de Uso são regidos exclusivamente pela legislação brasileira, em especial:",
            {
              type: "list",
              items: [
                "Código Civil Brasileiro (Lei 10.406/2002)",
                "Código de Defesa do Consumidor (Lei 8.078/1990)",
                "Marco Civil da Internet (Lei 12.965/2014)",
                "Lei Geral de Proteção de Dados — LGPD (Lei 13.709/2018)",
              ],
            },
            "Fica eleito o foro da Comarca de São Paulo – SP como competente para dirimir quaisquer litígios decorrentes destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.",
            "Para clientes consumidores (pessoa física), aplicam-se também as regras de foro do domicílio do consumidor, conforme o Código de Defesa do Consumidor.",
          ],
        },
        {
          title: "Contato",
          content: [
            "Para dúvidas, sugestões ou reclamações relacionadas a estes Termos de Uso, entre em contato:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>E-mail:</strong> contato@zbrand.com.br",
                "<strong class='text-white/70'>WhatsApp:</strong> (11) 94050-2929",
                "<strong class='text-white/70'>Razão Social:</strong> ZBRAND CONSULTORIA EM PUBLICIDADE LTDA — CNPJ 63.534.147/0001-81",
                "<strong class='text-white/70'>Localização:</strong> São Paulo – SP, Brasil",
              ],
            },
          ],
        },
      ]}
    />
  );
}
