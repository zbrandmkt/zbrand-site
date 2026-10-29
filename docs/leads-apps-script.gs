/**
 * Zibrand — recebe leads do site, grava na planilha e manda e-mail de aviso.
 *
 * Cole este arquivo em Extensões → Apps Script, dentro da planilha de leads.
 * Passo a passo completo em docs/LEADS.md.
 */

// Mesmo valor de LEADS_WEBHOOK_SECRET na Vercel.
const SECRET = "COLE_AQUI_O_SEGREDO";

// Quem recebe o aviso de lead novo (separe vários por vírgula).
const NOTIFY_EMAIL = "contato@zbrand.com.br";

const SHEET_NAME = "Leads";

const COLUMNS = [
  ["received_at", "Data"],
  ["name", "Nome"],
  ["whatsapp", "WhatsApp"],
  ["business_type", "Tipo de negócio"],
  ["services", "Interesse"],
  ["message", "Mensagem"],
  ["source", "Formulário"],
  ["page", "Página"],
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_content", "utm_content"],
];

function doPost(e) {
  try {
    const lead = JSON.parse(e.postData.contents);
    if (lead.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    const sheet = getSheet();
    const when = lead.received_at ? new Date(lead.received_at) : new Date();
    sheet.appendRow(
      COLUMNS.map(([key]) => (key === "received_at" ? when : lead[key] || ""))
    );

    notify(lead, when);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, label]) => label));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function notify(lead, when) {
  const nome = lead.name || "sem nome";
  const digits = String(lead.whatsapp || "").replace(/\D/g, "");
  const primeiroNome = String(lead.name || "").split(" ")[0];
  const saudacao =
    "Oi" + (primeiroNome ? " " + primeiroNome : "") +
    "! Aqui é da Zibrand 🦓 Recebemos seu contato pelo site. Podemos conversar sobre os seus eventos?";
  const wa = digits
    ? "https://wa.me/" + (digits.length <= 11 ? "55" + digits : digits) + "?text=" + encodeURIComponent(saudacao)
    : "";
  const origem =
    [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ") || "Acesso direto";
  const quando = Utilities.formatDate(when, "America/Sao_Paulo", "dd/MM/yyyy 'às' HH:mm");
  const planilha = SpreadsheetApp.getActiveSpreadsheet().getUrl();

  const campos = [
    ["WhatsApp", lead.whatsapp],
    ["Tipo de negócio", lead.business_type],
    ["Interesse", lead.services],
    ["Mensagem", lead.message],
  ];
  const detalhes = [
    ["Formulário", (lead.source || "-") + (lead.page ? " · " + lead.page : "")],
    ["Origem", origem],
    ["Recebido em", quando],
  ];

  const linhaHtml = (label, valor, destaque) =>
    '<tr><td style="padding:10px 0;border-bottom:1px solid #F0EDE6;width:140px;vertical-align:top;' +
    'font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#999">' + esc(label) +
    '</td><td style="padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:15px;color:#1A1A1A;' +
    (destaque ? "font-weight:700;" : "") + '">' + (valor ? esc(valor).replace(/\n/g, "<br>") : '<span style="color:#bbb">—</span>') +
    "</td></tr>";

  const html =
    '<div style="margin:0;padding:24px 12px;background:#F5F5F0;font-family:Arial,Helvetica,sans-serif">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;' +
    'background:#FFFFFF;border:2px solid #1A1A1A;border-radius:16px;overflow:hidden">' +
    // Cabeçalho
    '<tr><td style="background:#1A1A1A;padding:22px 28px">' +
    '<div style="font-size:24px;font-weight:900;color:#FFFFFF;letter-spacing:-0.5px">Z<span style="color:#FF6100">·</span>ibrand</div>' +
    '<div style="font-size:12px;color:#FFFFFF;opacity:0.6;margin-top:2px">Novo lead pelo site</div>' +
    "</td></tr>" +
    '<tr><td style="background:#FF6100;height:6px;line-height:6px;font-size:0">&nbsp;</td></tr>' +
    // Nome + botão
    '<tr><td style="padding:28px 28px 8px">' +
    '<div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FF6100">🦓 Chegou orçamento</div>' +
    '<div style="font-size:26px;font-weight:900;color:#1A1A1A;margin-top:6px">' + esc(nome) + "</div>" +
    (lead.business_type ? '<div style="font-size:15px;color:#666;margin-top:4px">' + esc(lead.business_type) + "</div>" : "") +
    (wa
      ? '<a href="' + wa + '" style="display:inline-block;margin-top:20px;background:#25D366;color:#FFFFFF;' +
        'text-decoration:none;font-weight:700;font-size:15px;padding:14px 24px;border-radius:12px;border:2px solid #1A1A1A">' +
        "💬 Chamar no WhatsApp</a>"
      : "") +
    "</td></tr>" +
    // Dados
    '<tr><td style="padding:16px 28px 8px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    campos.map(([l, v], i) => linhaHtml(l, v, i === 0)).join("") +
    "</table></td></tr>" +
    // Detalhes de origem
    '<tr><td style="padding:8px 28px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    detalhes.map(([l, v]) => linhaHtml(l, v, false)).join("") +
    "</table></td></tr>" +
    // Rodapé
    '<tr><td style="background:#F5F5F0;padding:16px 28px;font-size:12px;color:#888">' +
    '<a href="' + planilha + '" style="color:#FF6100;font-weight:700;text-decoration:none">Abrir a planilha de leads →</a>' +
    '<div style="margin-top:6px">Responda rápido: quem chama primeiro fecha o evento. ⚡</div>' +
    "</td></tr>" +
    "</table></div>";

  const texto = [
    "Novo lead pelo site da Zibrand 🦓",
    "",
    "Nome: " + nome,
    ...campos.map(([l, v]) => l + ": " + (v || "-")),
    wa ? "Chamar no WhatsApp: " + wa : "",
    "",
    ...detalhes.map(([l, v]) => l + ": " + v),
    "Planilha: " + planilha,
  ];

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "🦓 Novo lead: " + nome + " — " + (lead.business_type || lead.services || "site"),
    body: texto.join("\n"),
    htmlBody: html,
    name: "Site Zibrand",
  });
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Rode esta função uma vez pelo editor para autorizar a planilha e o e-mail.
function testar() {
  doPost({
    postData: {
      contents: JSON.stringify({
        secret: SECRET,
        name: "Teste Zibrand",
        whatsapp: "(11) 90000-0000",
        business_type: "Carrinho gourmet",
        services: "Site de orçamento",
        message: "Lead de teste — pode apagar",
        source: "teste_apps_script",
        page: "/",
      }),
    },
  });
}
