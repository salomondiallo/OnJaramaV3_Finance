import {
  BookOpen,
  Brain,
  CheckCircle,
  Cloud,
  CreditCard,
  EyeOff,
  Flag,
  HelpCircle,
  Lightbulb,
  Lock,
  Route,
  ShieldCheck,
  Target,
  Trophy,
  Wallet,
} from "lucide-react";

const pageText = {
  FR: {
    title: "Guide & Astuces",
    subtitle: "Comprendre OnJarama Path étape par étape.",
    start: "Bien démarrer",
    flowTitle: "Le parcours officiel OnJarama Path",
    flowText:
      "Situation → Objectifs → Simulation → Activation → Parcours → Progression → Victoire.",
    situation: "1. Ajouter votre situation",
    situationText:
      "Entrez vos revenus, dépenses, épargne et dettes pour permettre à OnJarama Path de lire votre point de départ.",
    goals: "2. Choisir un objectif",
    goalsText:
      "Voyage, maison, auto, dette, épargne, études ou entreprise : chaque objectif possède ses propres critères.",
    simulator: "3. Simuler l’objectif",
    simulatorText:
      "Le simulateur sert à planifier : montant visé, montant déjà disponible, contribution mensuelle, durée et financement.",
    activate: "4. Activer l’objectif",
    activateText:
      "Une simulation devient réellement suivie seulement après avoir appuyé sur Activer cet objectif.",
    path: "5. Suivre le parcours",
    pathText:
      "Une fois activé, l’objectif apparaît dans Parcours. C’est là que les étapes deviennent cochables.",
    checkSteps: "6. Valider les étapes",
    checkStepsText:
      "Cochez chaque étape terminée. La progression augmente automatiquement jusqu’à 100 %.",
    victory: "7. Atteindre l’objectif",
    victoryText:
      "Quand toutes les étapes sont validées, l’objectif est marqué comme atteint et une victoire apparaît.",
    simulationVsPath: "Simulation ou Parcours ?",
    simulationVsPathText:
      "Simulation = planifier. Parcours = suivre, cocher et mesurer la progression réelle.",
    savings: "Épargne et projets",
    savingsText:
      "Dans Situation, les montants indiquent ce que vous possédez déjà. Les objectifs visés se configurent dans Objectifs ou Simulateur.",
    privacy: "Confidentialité",
    privacyText:
      "Les données restent locales tant que la synchronisation cloud n’est pas activée. Aucune transaction bancaire n’est possible.",
    trust: "Pourquoi faire confiance à OnJarama Path ?",
    trustText:
      "L’application ne fait aucun paiement, ne déplace aucun argent et ne prend aucune décision à votre place.",
    cloud: "Cloud",
    cloudText:
      "La sauvegarde cloud arrivera progressivement. La connexion bancaire future sera en lecture seule.",
    discreet: "Accueil discret",
    discreetText:
      "Les montants sensibles peuvent être masqués pour protéger votre confidentialité.",
    faq: "Question fréquente",
    faqText:
      "Pourquoi les étapes ne sont pas cochables dans le simulateur ? Parce que le simulateur affiche seulement un aperçu. Activez l’objectif, puis ouvrez Parcours.",
  },
  EN: {
    title: "Guide & Tips",
    subtitle: "Understand OnJarama Path step by step.",
    start: "Getting started",
    flowTitle: "Official OnJarama Path flow",
    flowText:
      "Situation → Goals → Simulation → Activation → Path → Progress → Victory.",
    situation: "1. Add your situation",
    situationText:
      "Enter your income, expenses, savings and debts so OnJarama Path can read your starting point.",
    goals: "2. Choose a goal",
    goalsText:
      "Travel, home, car, debt, savings, studies or business: each goal has its own criteria.",
    simulator: "3. Simulate the goal",
    simulatorText:
      "The simulator is for planning: target amount, amount already available, monthly contribution, duration and financing.",
    activate: "4. Activate the goal",
    activateText:
      "A simulation becomes truly tracked only after pressing Activate this goal.",
    path: "5. Follow the path",
    pathText:
      "Once activated, the goal appears in Path. That is where steps become checkable.",
    checkSteps: "6. Validate steps",
    checkStepsText:
      "Check each completed step. Progress increases automatically up to 100%.",
    victory: "7. Achieve the goal",
    victoryText:
      "When all steps are validated, the goal is marked as achieved and a victory appears.",
    simulationVsPath: "Simulation or Path?",
    simulationVsPathText:
      "Simulation = planning. Path = tracking, checking and measuring real progress.",
    savings: "Savings and projects",
    savingsText:
      "In Situation, amounts show what you already own. Target goals are configured in Goals or Simulator.",
    privacy: "Privacy",
    privacyText:
      "Data stays local until cloud sync is enabled. No banking transaction is possible.",
    trust: "Why trust OnJarama Path?",
    trustText:
      "The app does not make payments, move money or make decisions for you.",
    cloud: "Cloud",
    cloudText:
      "Cloud backup will arrive progressively. Future bank connection will be read-only.",
    discreet: "Discreet home screen",
    discreetText:
      "Sensitive amounts can be hidden to protect your privacy.",
    faq: "Frequent question",
    faqText:
      "Why are steps not checkable in the simulator? Because the simulator only shows a preview. Activate the goal, then open Path.",
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
        <p style={muted}>{p.flowText}</p>
      </section>

      <GuideItem icon={<Route />} title={p.flowTitle} text={p.flowText} color="var(--gold)" />
      <GuideItem icon={<Wallet />} title={p.situation} text={p.situationText} color="var(--green)" />
      <GuideItem icon={<Target />} title={p.goals} text={p.goalsText} color="var(--gold)" />
      <GuideItem icon={<Lightbulb />} title={p.simulator} text={p.simulatorText} color="var(--blue)" />
      <GuideItem icon={<CheckCircle />} title={p.activate} text={p.activateText} color="var(--green)" />
      <GuideItem icon={<Route />} title={p.path} text={p.pathText} color="var(--gold)" />
      <GuideItem icon={<Flag />} title={p.checkSteps} text={p.checkStepsText} color="var(--green)" />
      <GuideItem icon={<Trophy />} title={p.victory} text={p.victoryText} color="var(--gold)" />

      <section style={premiumCard}>
        <Brain color="var(--purple)" />
        <h2>{p.simulationVsPath}</h2>
        <p style={muted}>{p.simulationVsPathText}</p>
      </section>

      <section style={card}>
        <CreditCard color="var(--green)" />
        <h2>{p.savings}</h2>
        <p style={muted}>{p.savingsText}</p>
      </section>

      <section style={card}>
        <EyeOff color="var(--gold)" />
        <h2>{p.discreet}</h2>
        <p style={muted}>{p.discreetText}</p>
      </section>

      <section style={card}>
        <Lock color="var(--green)" />
        <h2>{p.privacy}</h2>
        <p style={muted}>{p.privacyText}</p>
      </section>

      <section style={premiumCard}>
        <ShieldCheck color="var(--green)" />
        <h2>{p.trust}</h2>
        <p style={muted}>{p.trustText}</p>
      </section>

      <section style={card}>
        <Cloud color="var(--blue)" />
        <h2>{p.cloud}</h2>
        <p style={muted}>{p.cloudText}</p>
      </section>

      <section style={card}>
        <HelpCircle color="var(--purple)" />
        <h2>{p.faq}</h2>
        <p style={muted}>{p.faqText}</p>
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