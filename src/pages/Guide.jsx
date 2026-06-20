import {
  BookOpen,
  Brain,
  Cloud,
  CreditCard,
  HelpCircle,
  Lightbulb,
  Lock,
  Route,
  ShieldCheck,
  Target,
} from "lucide-react";

const pageText = {
  FR: {
    title: "Guide & Astuces",
    subtitle: "Comprendre OnJarama Path étape par étape.",
    start: "Bien démarrer",
    situation: "1. Ajouter votre situation",
    situationText:
      "Entrez vos revenus, dépenses, épargne et dettes pour permettre à OnJarama Path de lire votre point de départ.",
    debts: "2. Ajouter vos dettes",
    debtsText:
      "Ajoutez chaque dette avec son solde, son taux et son paiement minimum. L’application repère automatiquement la priorité.",
    goals: "3. Créer vos objectifs",
    goalsText:
      "Maison, auto, voyage, épargne, dette ou projet : chaque objectif peut être suivi avec un montant cible et une progression.",
    plan: "4. Utiliser Mon Plan",
    planText:
      "Mon Plan vous montre l’action principale à faire maintenant pour avancer sans vous disperser.",
    simulator: "5. Utiliser le simulateur",
    simulatorText:
      "Testez un montant mensuel et une durée, puis transformez la simulation en objectif actif.",
    discipline: "Discipline OnJarama",
    disciplineText:
      "L’objectif n’est pas de mettre la pression. L’idée est de garder une action claire à la fois.",
    privacy: "Confidentialité",
    privacyText:
      "Les données restent locales tant que la synchronisation cloud n’est pas activée. Aucune transaction bancaire n’est possible.",
    cloud: "Cloud",
    cloudText:
      "La base Supabase est préparée. La sauvegarde cloud arrivera progressivement dans les prochaines versions.",
    faq: "Questions rapides",
  },

  EN: {
    title: "Guide & Tips",
    subtitle: "Understand OnJarama Path step by step.",
    start: "Getting started",
    situation: "1. Add your situation",
    situationText:
      "Enter your income, expenses, savings and debts so OnJarama Path can read your starting point.",
    debts: "2. Add your debts",
    debtsText:
      "Add each debt with its balance, rate and minimum payment. The app automatically detects the priority.",
    goals: "3. Create your goals",
    goalsText:
      "Home, car, travel, savings, debt or project: each goal can be tracked with a target amount and progress.",
    plan: "4. Use My Plan",
    planText:
      "My Plan shows the main action to take now so you can move forward without spreading yourself too thin.",
    simulator: "5. Use the simulator",
    simulatorText:
      "Test a monthly amount and duration, then turn the simulation into an active goal.",
    discipline: "OnJarama Discipline",
    disciplineText:
      "The goal is not pressure. The idea is to keep one clear action at a time.",
    privacy: "Privacy",
    privacyText:
      "Data stays local until cloud sync is enabled. No banking transaction is possible.",
    cloud: "Cloud",
    cloudText:
      "The Supabase base is prepared. Cloud backup will arrive gradually in future versions.",
    faq: "Quick questions",
  },
};

function Guide({ settings }) {
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;

  return (
    <div className="native-page">
      <h1>{p.title}</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={heroCard}>
        <BookOpen color="var(--gold)" size={36} />
        <h2>{p.start}</h2>
        <p style={muted}>{p.subtitle}</p>
      </section>

      <GuideItem icon={<Route />} title={p.situation} text={p.situationText} color="var(--green)" />
      <GuideItem icon={<CreditCard />} title={p.debts} text={p.debtsText} color="var(--red)" />
      <GuideItem icon={<Target />} title={p.goals} text={p.goalsText} color="var(--gold)" />
      <GuideItem icon={<Brain />} title={p.plan} text={p.planText} color="var(--purple)" />
      <GuideItem icon={<Lightbulb />} title={p.simulator} text={p.simulatorText} color="var(--blue)" />

      <section style={premiumCard}>
        <ShieldCheck color="var(--gold)" />
        <h2>{p.discipline}</h2>
        <p style={muted}>{p.disciplineText}</p>
      </section>

      <section style={card}>
        <Lock color="var(--green)" />
        <h2>{p.privacy}</h2>
        <p style={muted}>{p.privacyText}</p>
      </section>

      <section style={card}>
        <Cloud color="var(--blue)" />
        <h2>{p.cloud}</h2>
        <p style={muted}>{p.cloudText}</p>
      </section>

      <section style={card}>
        <HelpCircle color="var(--purple)" />
        <h2>{p.faq}</h2>
        <p style={muted}>FR / EN actifs. 中文 bientôt disponible.</p>
      </section>
    </div>
  );
}

function GuideItem({ icon, title, text, color }) {
  return (
    <section style={{ ...card, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <h2>{title}</h2>
      <p style={muted}>{text}</p>
    </section>
  );
}

const heroCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const premiumCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "16px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "16px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

export default Guide;