const SALES_MANAGER_PHONE = "60126280096";

type WhatsAppLeadOptions = {
  source?: string;
  machine?: string;
  requirement?: string;
};

export function buildWhatsAppUrl({
  source = "website",
  machine = "",
  requirement = "",
}: WhatsAppLeadOptions = {}) {
  const message = [
    "Hello Hung Ta Instrument, I need support for testing machine / calibration.",
    "",
    `Source: ${source}`,
    `Machine / service needed: ${machine || "Please advise"}`,
    "Capacity / model: ",
    "Location: ",
    "Required date / audit deadline: ",
    "",
    `Requirement: ${requirement || "Please contact me for recommendation / quotation."}`,
  ].join("\n");

  return `https://wa.me/${SALES_MANAGER_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage({
  name,
  company,
  email,
  phone,
  machine,
  message,
}: {
  name: FormDataEntryValue | null;
  company: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  phone: FormDataEntryValue | null;
  machine: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
}) {
  return [
    "Hello Hung Ta Instrument, I would like to request support / quotation.",
    "",
    `Name: ${name || ""}`,
    `Company: ${company || ""}`,
    `Email: ${email || ""}`,
    `Phone / WhatsApp: ${phone || ""}`,
    `Machine / service: ${machine || "Not specified"}`,
    "",
    "Testing / calibration requirement:",
    `${message || ""}`,
    "",
    "Please advise the suitable next step.",
  ].join("\n");
}
