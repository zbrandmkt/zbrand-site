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
  const digits = String(lead.whatsapp || "").replace(/\D/g, "");
  const wa = digits ? "https://wa.me/" + (digits.length <= 11 ? "55" + digits : digits) : "";
  const linhas = [
    "Novo lead pelo site da Zibrand 🦓",
    "",
    "Nome: " + (lead.name || "-"),
    "WhatsApp: " + (lead.whatsapp || "-") + (wa ? "  →  " + wa : ""),
    "Tipo de negócio: " + (lead.business_type || "-"),
    "Interesse: " + (lead.services || "-"),
    "Mensagem: " + (lead.message || "-"),
    "",
    "Formulário: " + (lead.source || "-") + " (" + (lead.page || "-") + ")",
    "Origem: " + [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(String).join(" / "),
    "Recebido em: " + Utilities.formatDate(when, "America/Sao_Paulo", "dd/MM/yyyy HH:mm"),
  ];
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "🦓 Novo lead: " + (lead.name || "sem nome") + " — " + (lead.business_type || lead.services || "site"),
    body: linhas.join("\n"),
  });
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
