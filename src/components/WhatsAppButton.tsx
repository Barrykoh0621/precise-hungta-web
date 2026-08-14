import { MessageCircle } from "lucide-react";
import { trackLeadEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/leadLinks";

const WhatsAppButton = () => (
  <a
    href={buildWhatsAppUrl({ source: "floating_whatsapp_button" })}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackLeadEvent("whatsapp_click", { location: "floating_button" })}
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-[hsl(0,0%,100%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

export default WhatsAppButton;
