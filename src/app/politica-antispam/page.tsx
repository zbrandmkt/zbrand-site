import { LegalPage } from "@/components/layout/legal-page";

export const metadata = {
  title: "Política Antispam | ZBRAND",
  description: "Conheça o compromisso da ZBRAND contra o envio de comunicações não solicitadas.",
  robots: { index: false, follow: false },
};

export default function PoliticaAntispamPage() {
  return (
    <LegalPage
      title="Política Antispam"
      subtitle="A ZBRAND tem tolerância zero com spam. Esta política descreve como tratamos comunicações, como coletamos contatos e como você pode optar por não receber mensagens a qualquer momento."
      updatedAt="24 de abril de 2026"
      sections={[
        {
          title: "Nosso Compromisso",
          content: [
            "A ZBRAND CONSULTORIA EM PUBLICIDADE LTDA repudia qualquer prática de spam e se compromete a enviar comunicações comerciais apenas para pessoas que expressamente consentiram em recebê-las.",
            "Entendemos por spam qualquer mensagem eletrônica não solicitada enviada em massa, sem consentimento do destinatário, independentemente do canal: e-mail, WhatsApp, SMS, redes sociais ou qualquer outra plataforma de comunicação digital.",
            "Esta política está em conformidade com a Lei 12.965/2014 (Marco Civil da Internet), a Lei 13.709/2018 (LGPD), as regras da ANATEL para comunicações eletrônicas e as Políticas de Uso das plataformas que utilizamos (WhatsApp Business, Meta, Google).",
          ],
        },
        {
          title: "Como Coletamos Contatos",
          content: [
            "A ZBRAND coleta dados de contato exclusivamente por meios legítimos e com o consentimento do titular:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Formulários do site:</strong> O usuário preenche voluntariamente nome e WhatsApp/e-mail ao solicitar contato ou orçamento.",
                "<strong class='text-white/70'>Contato direto:</strong> Pessoa que iniciou conversa espontânea pelo WhatsApp, Instagram ou outros canais.",
                "<strong class='text-white/70'>Indicações:</strong> Contatos indicados por clientes, desde que o indicado seja avisado previamente da indicação.",
                "<strong class='text-white/70'>Networking presencial ou digital:</strong> Troca voluntária de contato em eventos, feiras ou plataformas profissionais.",
              ],
            },
            "A ZBRAND <strong class='text-white/70'>não compra, aluga, permuta ou adquire listas de contatos</strong> de terceiros. Não utilizamos bases de dados obtidas por meios não transparentes.",
          ],
        },
        {
          title: "Conteúdo das Comunicações",
          content: [
            "Toda comunicação enviada pela ZBRAND segue os seguintes princípios:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>Identificação clara:</strong> Todas as mensagens identificam a ZBRAND como remetente, com dados de contato para retorno.",
                "<strong class='text-white/70'>Relevância:</strong> Enviamos apenas comunicações pertinentes à relação estabelecida (retorno de orçamento, atualizações de serviço, conteúdo solicitado).",
                "<strong class='text-white/70'>Frequência razoável:</strong> Não bombardeamos contatos. Leads recebem no máximo 2 tentativas de contato inicial; após isso, aguardamos manifestação.",
                "<strong class='text-white/70'>Ausência de conteúdo malicioso:</strong> Nunca enviamos links suspeitos, anexos não solicitados ou qualquer conteúdo prejudicial.",
                "<strong class='text-white/70'>Opt-out em toda comunicação:</strong> Todo e-mail ou mensagem inclui instrução clara de como parar de receber comunicações.",
              ],
            },
          ],
        },
        {
          title: "Canais de Comunicação Utilizados",
          content: [
            "A ZBRAND pode utilizar os seguintes canais para comunicação com leads e clientes, sempre dentro das políticas de uso de cada plataforma:",
            {
              type: "table",
              headers: ["Canal", "Uso", "Política da Plataforma"],
              rows: [
                ["WhatsApp Business", "Retorno de orçamentos e atendimento a clientes ativos", "WhatsApp Business Policy"],
                ["E-mail", "Comunicações formais, relatórios, propostas", "CAN-SPAM Act / LGPD"],
                ["Instagram DM", "Resposta a mensagens iniciadas pelo usuário", "Meta Community Standards"],
                ["SMS", "Não utilizamos atualmente", "—"],
              ],
            },
            "Não realizamos ligações de telemarketing ativo sem agendamento prévio.",
          ],
        },
        {
          title: "Como Cancelar o Recebimento (Opt-Out)",
          content: [
            "Você pode parar de receber comunicações da ZBRAND a qualquer momento, sem custo ou burocracia:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>WhatsApp:</strong> Responda 'PARAR', 'STOP' ou 'NÃO QUERO' em qualquer mensagem. Removeremos seu contato em até 24 horas.",
                "<strong class='text-white/70'>E-mail:</strong> Clique no link 'Cancelar inscrição' no rodapé de qualquer e-mail ou responda com 'DESCADASTRAR'.",
                "<strong class='text-white/70'>Contato direto:</strong> Envie e-mail para contato@zbrand.com.br com assunto 'OPT-OUT' informando seu nome e contato. Processamos em até 5 dias úteis.",
              ],
            },
            "Após o opt-out, manteremos o registro do seu pedido para garantir que não seja recontactado inadvertidamente. Este registro não constitui tratamento de dados para fins comerciais.",
          ],
        },
        {
          title: "Tratamento de Spam Recebido",
          content: [
            "A ZBRAND também é alvo de spam. Adotamos as seguintes medidas para combatê-lo internamente:",
            {
              type: "list",
              items: [
                "Filtros de spam ativos em todos os e-mails corporativos.",
                "Bloqueio imediato de contatos identificados como spammers.",
                "Não interagimos com e-mails suspeitos que solicitem dados sigilosos (phishing).",
                "Colaboradores são treinados para identificar e reportar tentativas de engenharia social.",
              ],
            },
          ],
        },
        {
          title: "Denúncias e Canal de Contato",
          content: [
            "Se você recebeu uma comunicação não solicitada identificada como sendo da ZBRAND, ou suspeita que alguém está se passando pela ZBRAND (spoofing), entre em contato imediatamente:",
            {
              type: "list",
              items: [
                "<strong class='text-white/70'>E-mail:</strong> contato@zbrand.com.br — Assunto: 'DENÚNCIA SPAM'",
                "<strong class='text-white/70'>WhatsApp:</strong> (11) 94050-2929",
              ],
            },
            "Investigamos todas as denúncias em até 5 dias úteis e, se confirmado uso indevido da nossa marca, tomamos as medidas legais cabíveis.",
            "Você também pode reportar abusos diretamente às plataformas: <a href='https://www.whatsapp.com/contact' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>WhatsApp</a>, <a href='https://www.facebook.com/help/instagram/454925799265246' target='_blank' class='text-[#FF6100]/70 hover:text-[#FF6100]'>Instagram</a> e às autoridades competentes (ANATEL, SENACON).",
          ],
        },
        {
          title: "Vigência e Alterações",
          content: [
            "Esta Política Antispam entra em vigor na data de sua publicação e permanece válida até nova versão ser publicada.",
            "Alterações serão comunicadas pelo site. A data de atualização no topo desta página indica a versão vigente.",
          ],
        },
      ]}
    />
  );
}
