# Leads do site → planilha + e-mail

Todos os formulários do site chamam `submitLead()` (`src/lib/leads.ts`), que envia para
`/api/lead` (`src/app/api/lead/route.ts`). A rota repassa o lead para um **Google Apps Script**
ligado a uma planilha do Google. O script grava uma linha na aba **Leads** e manda um e-mail de aviso.

Se algo falhar (variável faltando, planilha fora do ar), o visitante é levado para o WhatsApp
com os dados já preenchidos, então o lead não se perde.

O Supabase não é mais usado para leads (o projeto está pausado).

## Configuração (uma vez só)

1. **Crie a planilha.** No Google Drive da conta da empresa, crie uma planilha chamada
   "Leads — Site Zibrand".
2. **Cole o script.** Na planilha, vá em **Extensões → Apps Script**. Apague o conteúdo e cole
   o arquivo `docs/leads-apps-script.gs` inteiro.
3. **Crie o segredo.** Troque `COLE_AQUI_O_SEGREDO` por uma senha longa e aleatória
   (ex.: 32 letras e números). Ajuste `NOTIFY_EMAIL` se quiser outro destinatário.
4. **Autorize.** No editor, selecione a função `testar` e clique em **Executar**. O Google pede
   permissão para editar a planilha e enviar e-mail: aceite. Deve aparecer uma linha de teste
   na aba "Leads" e chegar um e-mail.
5. **Publique.** **Implantar → Nova implantação → Tipo: App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**

   Copie a **URL do app da Web** (termina em `/exec`).
6. **Vercel → Settings → Environment Variables** (Production e Preview):
   - `LEADS_WEBHOOK_URL` = a URL `/exec` do passo 5
   - `LEADS_WEBHOOK_SECRET` = o mesmo segredo do passo 3
   - `NEXT_PUBLIC_SITE_URL` = `https://www.zibrand.com.br`

   Faça um novo deploy para as variáveis valerem.

Para testar localmente, coloque as mesmas variáveis no `.env.local`.

## Se mudar o script depois

Em **Implantar → Gerenciar implantações → editar → Versão: nova versão**. Assim a URL `/exec`
continua a mesma e não precisa mexer na Vercel.

## Conversões

Quando o envio dá certo, o site dispara `generate_lead` no Google Analytics e `Lead` no
Meta Pixel. No GA4, marque `generate_lead` como **evento principal** (Administrador → Eventos)
para aparecer como conversão.
