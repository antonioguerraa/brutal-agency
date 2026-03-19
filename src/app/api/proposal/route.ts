import { NextResponse } from "next/server";

// DrMouth proposal
const drMouthProposal = {
  clientName: "DrMouth",
  clientBusiness: "Propuesta de gestión de Instagram, creación de contenido profesional y sistema de captación de reseñas en Google para clínica dental.",
  date: "19 marzo 2026",
  intro: "DrMouth tiene algo que la mayoría de clínicas en Almería no tiene: 5 estrellas en Google y un equipo que transmite confianza. El problema es que solo 21 personas lo saben. Esta propuesta está diseñada para que esa reputación se amplifique — con contenido profesional que llene Instagram, un sistema automático que multiplique las reseñas y una presencia digital que convierta curiosos en pacientes.",
  objectives: {
    seek: "Convertir Instagram en el canal principal de captación de pacientes nuevos, multiplicar las reseñas en Google de forma automática y posicionar a DrMouth como la referencia dental en Almería.",
    outcome: "Un Instagram activo con contenido profesional mensual, un flujo constante de reseñas de 5 estrellas en Google y más pacientes llegando diciendo 'os vi en Instagram' o 'os encontré en Google'.",
    excluded: "Gestión de campañas de pago (Meta Ads / Google Ads), desarrollo web, SEO técnico avanzado y producción de foto/vídeo fuera de la sesión mensual incluida.",
  },
  scope: [
    { label: "Gestión de Instagram", description: "Gestión completa del perfil: estrategia mensual, calendario de publicaciones, copys, hashtags, publicación y optimización del perfil. Nos encargamos de todo para que vosotros solo aprobéis.", color: "#FF0000" },
    { label: "8 piezas de contenido profesional / mes", description: "Una sesión de grabación de un par de horas al mes en la clínica. De ahí sacamos 8 piezas de contenido editadas profesionalmente: Reels, carruseles, antes/después, testimonios, explicaciones de tratamientos. Todo listo para publicar.", color: "#0000FF" },
    { label: "Ideas de contenido + guía de stories diaria", description: "Cada mes os entregamos un documento con ideas de contenido que podéis grabar vosotros en el día a día (stories rápidas, detrás de cámaras, equipo). Una guía sencilla para que las stories fluyan sin pensar.", color: "#FFFF00" },
    { label: "Sistema de captación de reseñas en Google", description: "Automatización completa: después de cada visita, el paciente recibe un email y/o SMS amable pidiéndole que deje su opinión en Google. Se envía en el momento justo para maximizar respuestas. Sin esfuerzo manual.", color: "#FF0000" },
    { label: "QR físico para reseñas en clínica", description: "Diseño e impresión de un soporte con código QR para colocar en recepción, consulta o sala de espera. El paciente escanea y llega directamente a dejar su reseña en Google.", color: "#0000FF" },
    { label: "Respuesta a reseñas", description: "Respondemos a todas las reseñas de Google — las positivas para agradecer y reforzar, las negativas para gestionar con profesionalidad. Todo alineado con la voz de la clínica.", color: "#FFFF00" },
  ],
  deliverables: [
    "Estrategia y calendario de contenidos mensual para Instagram",
    "8 piezas de contenido editadas profesionalmente al mes",
    "Sesión de grabación mensual (2 horas en clínica)",
    "Guía de stories diaria con ideas de contenido fáciles",
    "Automatización de emails/SMS post-visita para pedir reseñas",
    "Diseño de soporte QR para reseñas en la clínica",
    "Gestión y respuesta a todas las reseñas de Google",
    "Reporte mensual: métricas de Instagram + evolución de reseñas",
  ],
  timeline: [
    { week: "Semana 1", tasks: "Briefing, auditoría del perfil actual, definición de estrategia de contenido y tono de voz. Configuración del sistema de reseñas.", color: "#FF0000" },
    { week: "Semana 2", tasks: "Primera sesión de grabación en clínica. Diseño del soporte QR. Activación de la automatización de emails/SMS.", color: "#0000FF" },
    { week: "Semana 3", tasks: "Edición y publicación del primer lote de contenido. Primeras reseñas llegando. Guía de stories entregada.", color: "#FFFF00" },
    { week: "Semana 4", tasks: "Ciclo completo activo. Revisión de métricas iniciales. Ajustes y planificación del mes siguiente.", color: "#FF0000" },
  ],
  pricing: [
    { concept: "Gestión mensual de Instagram (estrategia, calendario, copys, publicación)", type: "Mensual", amount: "350 €" },
    { concept: "8 piezas de contenido profesional (grabación + edición)", type: "Mensual", amount: "480 €" },
    { concept: "Guía de stories diaria + ideas de contenido adicionales", type: "Incluido", amount: "—" },
    { concept: "Sistema automatizado de captación de reseñas (email + SMS)", type: "Mensual", amount: "120 €" },
    { concept: "Diseño QR + soporte físico para clínica", type: "Pago único", amount: "90 €" },
    { concept: "Gestión y respuesta a reseñas de Google", type: "Incluido", amount: "—" },
    { concept: "Reporte mensual de resultados", type: "Incluido", amount: "—" },
  ],
  totalLabel: "Inversión mensual",
  totalAmount: "950 €/mes + IVA",
  optional: {
    concept: "Todo incluido en un solo paquete: gestión de Instagram, contenido profesional mensual, sistema de reseñas automatizado, QR en clínica, gestión de reseñas y reportes. Sin permanencia — mes a mes, cancela cuando quieras. El setup inicial del QR (90 €) se incluye gratis en el primer mes.",
    type: "Mensual · Todo incluido",
    amount: "950 €/mes",
  },
  exclusions: [
    "Campañas de Google Ads o Meta Ads",
    "Desarrollo o rediseño de página web",
    "SEO técnico o posicionamiento web",
    "Producción de vídeo fuera de la sesión mensual",
    "Gestión de otras redes sociales (TikTok, Facebook, LinkedIn)",
    "Hosting, dominio o herramientas de terceros",
  ],
  conditions: [
    "Sin permanencia — servicio mes a mes",
    "Pago mensual por adelantado",
    "Validez del presupuesto: 15 días",
    "El cliente facilita acceso a Instagram y Google Business",
    "La sesión de grabación se agenda con mínimo 5 días de antelación",
  ],
};

export async function GET() {
  return NextResponse.json(drMouthProposal);
}
