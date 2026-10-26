// Tipos de negócio dos formulários de lead (gravados em leads.business_type).

export const BUSINESS_TYPES = [
  { value: "carrinho-gourmet", label: "Carrinho gourmet" },
  { value: "food-truck", label: "Food truck / food bike" },
  { value: "estacao-buffet", label: "Estação / buffet de evento" },
  { value: "foto-video", label: "Fotografia / filmagem" },
  { value: "doces-bolos", label: "Doces / bolos" },
  { value: "decoracao-dj-outros", label: "Decoração / DJ / outros serviços de evento" },
  { value: "casa-de-eventos", label: "Casa de eventos" },
] as const;

export const BUSINESS_TYPE_LABELS = BUSINESS_TYPES.map((t) => t.label);
