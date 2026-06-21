export const objectiveTemplates = {
  voyage: {
    id: "voyage",
    title: { FR: "Voyage", EN: "Travel", ES: "Viaje" },
    defaultAmount: 3500,
    defaultMonthly: 500,
    steps: {
      FR: ["Passeport / documents", "Billet", "Hébergement", "Budget sur place", "Marge sécurité"],
      EN: ["Passport / documents", "Ticket", "Lodging", "Local budget", "Safety margin"],
      ES: ["Pasaporte / documentos", "Boleto", "Alojamiento", "Presupuesto local", "Margen de seguridad"],
    },
  },

  maison: {
    id: "maison",
    title: { FR: "Maison", EN: "Home", ES: "Casa" },
    defaultAmount: 10000,
    defaultMonthly: 700,
    steps: {
      FR: ["Terrain", "Fondation", "Murs", "Toiture", "Électricité", "Finition"],
      EN: ["Land", "Foundation", "Walls", "Roof", "Electricity", "Finishing"],
      ES: ["Terreno", "Fundación", "Muros", "Techo", "Electricidad", "Finalización"],
    },
  },

  auto: {
    id: "auto",
    title: { FR: "Auto", EN: "Car", ES: "Auto" },
    defaultAmount: 8000,
    defaultMonthly: 450,
    financing: true,
    steps: {
      FR: ["Véhicule choisi", "Mise de fonds", "Financement", "Assurance", "Achat"],
      EN: ["Vehicle chosen", "Down payment", "Financing", "Insurance", "Purchase"],
      ES: ["Vehículo elegido", "Pago inicial", "Financiamiento", "Seguro", "Compra"],
    },
  },

  dette: {
    id: "dette",
    title: { FR: "Dette", EN: "Debt", ES: "Deuda" },
    defaultAmount: 5000,
    defaultMonthly: 500,
    financing: true,
    steps: {
      FR: ["Solde confirmé", "Taux confirmé", "Plan validé", "50 % atteint", "Dette effacée"],
      EN: ["Balance confirmed", "Rate confirmed", "Plan approved", "50% reached", "Debt cleared"],
      ES: ["Saldo confirmado", "Tasa confirmada", "Plan validado", "50% alcanzado", "Deuda eliminada"],
    },
  },

  epargne: {
    id: "epargne",
    title: { FR: "Épargne", EN: "Savings", ES: "Ahorro" },
    defaultAmount: 3000,
    defaultMonthly: 250,
    steps: {
      FR: ["Compte séparé", "Premier dépôt", "3 mois", "6 mois", "12 mois"],
      EN: ["Separate account", "First deposit", "3 months", "6 months", "12 months"],
      ES: ["Cuenta separada", "Primer depósito", "3 meses", "6 meses", "12 meses"],
    },
  },

  hypotheque: {
    id: "hypotheque",
    title: { FR: "Hypothèque", EN: "Mortgage", ES: "Hipoteca" },
    defaultAmount: 300000,
    defaultMonthly: 1800,
    financing: true,
    steps: {
      FR: ["Mise de fonds", "Préapprobation", "Taux confirmé", "Offre acceptée", "Hypothèque active"],
      EN: ["Down payment", "Pre-approval", "Rate confirmed", "Offer accepted", "Mortgage active"],
      ES: ["Pago inicial", "Preaprobación", "Tasa confirmada", "Oferta aceptada", "Hipoteca activa"],
    },
  },

  etudes: {
    id: "etudes",
    title: { FR: "Études", EN: "Studies", ES: "Estudios" },
    defaultAmount: 4000,
    defaultMonthly: 300,
    steps: {
      FR: ["Programme choisi", "Frais estimés", "Matériel", "Inscription", "Début formation"],
      EN: ["Program chosen", "Fees estimated", "Equipment", "Registration", "Training starts"],
      ES: ["Programa elegido", "Costos estimados", "Material", "Inscripción", "Inicio formación"],
    },
  },

  mariage: {
    id: "mariage",
    title: { FR: "Mariage", EN: "Wedding", ES: "Boda" },
    defaultAmount: 12000,
    defaultMonthly: 800,
    steps: {
      FR: ["Date", "Budget", "Salle", "Invités", "Cérémonie"],
      EN: ["Date", "Budget", "Venue", "Guests", "Ceremony"],
      ES: ["Fecha", "Presupuesto", "Sala", "Invitados", "Ceremonia"],
    },
  },

  business: {
    id: "business",
    title: { FR: "Entreprise", EN: "Business", ES: "Empresa" },
    defaultAmount: 5000,
    defaultMonthly: 400,
    steps: {
      FR: ["Idée validée", "Capital départ", "Équipement", "Marketing", "Lancement"],
      EN: ["Idea validated", "Startup capital", "Equipment", "Marketing", "Launch"],
      ES: ["Idea validada", "Capital inicial", "Equipo", "Marketing", "Lanzamiento"],
    },
  },
};

export function getObjectiveTemplate(category, language = "FR") {
  const template = objectiveTemplates[category] || objectiveTemplates.voyage;

  return {
    ...template,
    label: template.title[language] || template.title.FR,
    steps: template.steps[language] || template.steps.FR,
  };
}