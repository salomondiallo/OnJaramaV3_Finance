import {
  Bot,
  Eye,
  EyeOff,
  Flag,
  Gauge,
  PiggyBank,
  ShieldCheck,
  Target,
  Landmark,
  Sparkles,
  Trophy,
  CreditCard,
  Route,
} from "lucide-react";

import { useState } from "react";
import { getText } from "../data/translations";

const homeText = {
  FR: {
    version: "OnJarama Path V14.1",
    start: "Départ",
    amountsHidden: "Chiffres masqués",
    heroSubtitle:
      "Situation, objectif, simulation, activation, parcours : votre chemin reste clair.",
    startPoint: "Point de départ",
    situationReady:
      "Situation renseignée. La prochaine étape est de cibler une destination.",
    situationEmpty:
      "Ajoutez votre situation pour activer les objectifs et simulations.",
    situation: "Situation",
    objectives: "Objectifs",
    simulation: "Simulation",
    plan: "Plan",
    chooseDestination: "Choisir ma destination",
    openSituation: "Ouvrir Ma Situation",
    nextAction: "Prochaine action recommandée",
    nextVictory: "Prochaine victoire",
    commandCenter: "Centre de commande",
    situationScore: "Score situation",
    toComplete: "À compléter",
    discipline: "Discipline",
    victories: "Victoires",
    quickActions: "Actions rapides utiles",
    addIncome: "Ajouter revenu",
    fundingSource: "Origine des fonds",
    addExpense: "Ajouter dépense",
    fundDestination: "Destination des fonds",
    addDebt: "Ajouter dette",
    editableDebts: "Dettes modifiables",
    simulateGoal: "Simuler objectif",
    goalSimulation: "Objectif → Simulation",
    progressTitle: "Progression OnJarama",
    pathStarted: "🚩 Parcours démarré",
    pathWillStart:
      "🚩 Votre parcours commencera dès votre première situation ou objectif.",
    companion: "Compagnon financier",
    destination: "Destination",
    goalToChoose: "Objectif à choisir",
    lastDeposit: "Dernier dépôt",
    noDeposit: "Aucun dépôt enregistré",
    lastVictory: "Dernière victoire",
    noVictory: "Aucune victoire enregistrée",
    action: "Action",
    lastActivity: "Dernière activité",
    private: "🔒 Privé",
    demo: "🌍 Démo",
    hide: "Masquer",
    show: "Afficher",
    debts: "Dettes",
    sources: "Sources",
    sourceSaved: "enregistrée",
    sourceSavedPlural: "enregistrées",
    atYourPace: "À votre rythme",
    path: "Parcours",
    continueTracking: "Continuer le suivi",
    createGoal: "Créer un objectif",
    security: "Sécurité",
    protectedData: "Données protégées",
    bankConnection: "Connexion bancaire",
    soon: "Bientôt disponible",
    assistant: "IA OnJarama",
    closestGoalTitle: "Objetivo más cercano",
    remaining: "restantes",
    continueGoal: "Continuar",
    noClosestGoal: "Ningún objetivo activo con monto objetivo.",
    closestGoalTitle: "Objectif le plus proche",
    remaining: "restants",
    continueGoal: "Continuer",
    noClosestGoal: "Aucun objectif actif avec montant cible.",
  },
  EN: {
    version: "OnJarama Path V14.1",
    start: "Start",
    amountsHidden: "Amounts hidden",
    heroSubtitle:
      "Situation, goal, simulation, activation, path: your direction stays clear.",
    startPoint: "Starting point",
    situationReady:
      "Situation completed. The next step is to choose a destination.",
    situationEmpty: "Add your situation to activate goals and simulations.",
    situation: "Situation",
    objectives: "Goals",
    simulation: "Simulation",
    plan: "Plan",
    chooseDestination: "Choose my destination",
    openSituation: "Open My Situation",
    nextAction: "Recommended next action",
    nextVictory: "Next victory",
    commandCenter: "Command center",
    situationScore: "Situation score",
    toComplete: "To complete",
    discipline: "Discipline",
    victories: "Victories",
    quickActions: "Useful quick actions",
    addIncome: "Add income",
    fundingSource: "Funding source",
    addExpense: "Add expense",
    fundDestination: "Fund destination",
    addDebt: "Add debt",
    editableDebts: "Editable debts",
    simulateGoal: "Simulate goal",
    goalSimulation: "Goal → Simulation",
    progressTitle: "OnJarama progress",
    pathStarted: "🚩 Path started",
    pathWillStart: "🚩 Your path will start with your first situation or goal.",
    companion: "Financial companion",
    destination: "Destination",
    goalToChoose: "Goal to choose",
    lastDeposit: "Last deposit",
    noDeposit: "No deposit recorded",
    lastVictory: "Last victory",
    noVictory: "No victory recorded",
    action: "Action",
    lastActivity: "Last activity",
    private: "🔒 Private",
    demo: "🌍 Demo",
    hide: "Hide",
    show: "Show",
    debts: "Debts",
    sources: "Sources",
    sourceSaved: "recorded",
    sourceSavedPlural: "recorded",
    atYourPace: "At your pace",
    path: "Path",
    continueTracking: "Continue tracking",
    createGoal: "Create a goal",
    security: "Security",
    protectedData: "Protected data",
    bankConnection: "Bank connection",
    soon: "Coming soon",
    assistant: "OnJarama AI",
    closestGoalTitle: "Closest goal",
    remaining: "remaining",
    continueGoal: "Continue",
    noClosestGoal: "No active goal with a target amount.",
  },
  ES: {
    version: "OnJarama Path V14.1",
    start: "Inicio",
    amountsHidden: "Montos ocultos",
    heroSubtitle:
      "Situación, objetivo, simulación, activación, recorrido: tu camino queda claro.",
    startPoint: "Punto de partida",
    situationReady:
      "Situación completada. El siguiente paso es elegir un destino.",
    situationEmpty: "Agrega tu situación para activar objetivos y simulaciones.",
    situation: "Situación",
    objectives: "Objetivos",
    simulation: "Simulación",
    plan: "Plan",
    chooseDestination: "Elegir mi destino",
    openSituation: "Abrir Mi Situación",
    nextAction: "Próxima acción recomendada",
    nextVictory: "Próxima victoria",
    commandCenter: "Centro de comando",
    situationScore: "Puntaje de situación",
    toComplete: "Por completar",
    discipline: "Disciplina",
    victories: "Victorias",
    quickActions: "Acciones rápidas útiles",
    addIncome: "Agregar ingreso",
    fundingSource: "Origen de fondos",
    addExpense: "Agregar gasto",
    fundDestination: "Destino de fondos",
    addDebt: "Agregar deuda",
    editableDebts: "Deudas editables",
    simulateGoal: "Simular objetivo",
    goalSimulation: "Objetivo → Simulación",
    progressTitle: "Progreso OnJarama",
    pathStarted: "🚩 Recorrido iniciado",
    pathWillStart:
      "🚩 Tu recorrido comenzará con tu primera situación u objetivo.",
    companion: "Compañero financiero",
    destination: "Destino",
    goalToChoose: "Objetivo por elegir",
    lastDeposit: "Último depósito",
    noDeposit: "Ningún depósito registrado",
    lastVictory: "Última victoria",
    noVictory: "Ninguna victoria registrada",
    action: "Acción",
    lastActivity: "Última actividad",
    private: "🔒 Privado",
    demo: "🌍 Demo",
    hide: "Ocultar",
    show: "Mostrar",
    debts: "Deudas",
    sources: "Fuentes",
    sourceSaved: "registrada",
    sourceSavedPlural: "registradas",
    atYourPace: "A tu ritmo",
    path: "Recorrido",
    continueTracking: "Continuar seguimiento",
    createGoal: "Crear un objetivo",
    security: "Seguridad",
    protectedData: "Datos protegidos",
    bankConnection: "Conexión bancaria",
    soon: "Próximamente",
    assistant: "IA OnJarama",
  },
};

function Accueil({
  financeData,
  selectedGoals,
  setCurrentPage,
  settings,
  activityHistory,
  disciplineScore,
}) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = homeText[language] || homeText.FR;
  const [showAmounts, setShowAmounts] = useState(false);

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals) ? selectedGoals : [];
  const history = Array.isArray(activityHistory) ? activityHistory : [];

  const discipline = disciplineScore || {
    score: 0,
    label: p.start,
    hasActiveGoal: false,
    hasRecentActivity: false,
    hasRecentDeposit: false,
    hasOverduePayment: false,
  };

  const monthlyIncome = Number(financeData?.overview?.monthlyIncome || 0);
  const monthlyExpenses = Number(financeData?.overview?.monthlyExpenses || 0);
  const monthlySavings = Number(financeData?.overview?.monthlySavings || 0);
  const monthlyAvailable = monthlyIncome - monthlyExpenses - monthlySavings;

  const totalDebt = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  const activeGoals = goals.filter((goal) => !goal.archived);
  const mainGoal =
    activeGoals.find((goal) => goal.highlighted) || activeGoals[0];

  const firstGoal = [...activeGoals].sort(
    (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  )[0];

  const closestGoal = [...activeGoals]
    .filter((goal) => Number(goal.targetAmount || 0) > 0)
    .map((goal) => ({
      ...goal,
      progress: getGoalProgress(goal),
      remaining: Math.max(
        0,
        Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0)
      ),
    }))
    .sort((a, b) => b.progress - a.progress)[0];

  const achievedGoals = activeGoals.filter((goal) => getGoalProgress(goal) >= 100);

  const lastActivity = history[0];
  const lastDeposit = history.find((item) => item.type === "depot");
  const lastVictory =
    history.find((item) => item.type === "victoire") || achievedGoals[0];

  const situationScore = getSituationScore({
    monthlyIncome,
    monthlyExpenses,
    monthlySavings,
    monthlyAvailable,
    totalDebt,
    language,
  });

  const nextAction = getNextAction({
    totalDebt,
    mainGoal,
    closestGoal,
    monthlyIncome,
    language,
  });

  const nextVictory = getNextVictory({
    priorityDebt,
    closestGoal,
    mainGoal,
    totalDebt,
    language,
  });

  const sourceCount = getFinancialSourceCount({ monthlyIncome, financeData });
  const hasSources = sourceCount > 0;

  function money(value) {
    if (!showAmounts) return p.amountsHidden;

    return `${Number(value || 0).toLocaleString(
      language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
      { maximumFractionDigits: 2 }
    )} $`;
  }

  return (
    <div className="native-page accueil-page">
      <section className="accueil-hero" />

      <section className="accueil-headline" style={premiumHero}>
        <p className="accueil-eyebrow">{p.version}</p>

        <h1 className="accueil-title">
          {t.heroTitle}
          <br />
          <span>{t.heroAccent}</span>
        </h1>

        <p className="accueil-subtitle">{p.heroSubtitle}</p>
      </section>

      <section className="accueil-headline" style={pathStartCard}>
        <div style={sectionHead}>
          <Route size={20} color={situationScore.color} />
          <strong>{p.startPoint}</strong>
        </div>

        <p style={softText}>
          {monthlyIncome > 0 ? p.situationReady : p.situationEmpty}
        </p>

        <div style={miniPathGrid}>
          <MiniPathStep label="1" text={p.situation} active={monthlyIncome > 0} />
          <MiniPathStep label="2" text={p.objectives} active={activeGoals.length > 0} />
          <MiniPathStep label="3" text={p.simulation} active={Boolean(mainGoal?.simulation)} />
          <MiniPathStep label="4" text={p.plan} active={Boolean(mainGoal)} />
        </div>

        <button
          onClick={() =>
            setCurrentPage(
              monthlyIncome > 0 ? "objectifs" : "situation",
              monthlyIncome > 0 ? null : "origine-fonds"
            )
          }
          className="primary-action"
          style={{ marginTop: 12 }}
        >
          {monthlyIncome > 0 ? p.chooseDestination : p.openSituation}
        </button>
      </section>

      <section className="accueil-headline" style={nextActionCard}>
        <div style={sectionHead}>
          <Target size={20} color="var(--green)" />
          <strong>{p.nextAction}</strong>
        </div>

        <p style={softText}>
          <strong>{nextAction.title}</strong>
        </p>

        <p style={softText}>{nextAction.text}</p>

        <button
          onClick={() => setCurrentPage(nextAction.page)}
          className="primary-action"
          style={{ marginTop: 12 }}
        >
          {nextAction.button}
        </button>
      </section>

      <section className="accueil-headline" style={nextVictoryCard}>
        <div style={sectionHead}>
          <Trophy size={20} color="var(--gold)" />
          <strong>{p.nextVictory}</strong>
        </div>

        <p style={softText}>
          <strong>{nextVictory.title}</strong>
        </p>

        <p style={softText}>{nextVictory.text}</p>

        <div style={miniBarBg}>
          <div
            style={{
              ...miniBarFill,
              width: `${nextVictory.progress}%`,
              background: nextVictory.color,
            }}
          />
        </div>

        <button
          onClick={() => setCurrentPage(nextVictory.page)}
          className="ai-action"
          style={{ marginTop: 12 }}
        >
          {nextVictory.button}
        </button>
      </section>


      <section className="accueil-headline" style={closestGoalCard}>
        <div style={sectionHead}>
          <Trophy size={20} color="var(--green)" />
          <strong>{p.closestGoalTitle}</strong>
        </div>

        {closestGoal ? (
          <>
            <p style={softText}>
              <strong>{closestGoal.title}</strong>
            </p>

            <p style={softText}>
              {closestGoal.progress}% • {money(closestGoal.remaining)} {p.remaining}
            </p>

            <div style={miniBarBg}>
              <div
                style={{
                  ...miniBarFill,
                  width: `${closestGoal.progress}%`,
                  background:
                    closestGoal.progress >= 80 ? "var(--green)" : "var(--gold)",
                }}
              />
            </div>

            <button
              onClick={() => setCurrentPage("objectifs")}
              className="ai-action"
              style={{ marginTop: 12 }}
            >
              {p.continueGoal}
            </button>
          </>
        ) : (
          <p style={softText}>{p.noClosestGoal}</p>
        )}
      </section>

      <section className="accueil-headline" style={commandCenter}>
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--gold)" />
          <strong>{p.commandCenter}</strong>
        </div>

        <div style={commandGrid}>
          <CommandStat
            icon={<Gauge size={18} />}
            label={p.situationScore}
            value={situationScore.isReady ? `${situationScore.score}%` : p.toComplete}
            color={situationScore.color}
          />

          <CommandStat
            icon={<Flag size={18} />}
            label={p.discipline}
            value={`${discipline.score}%`}
            color={getDisciplineColor(discipline.score)}
          />

          <CommandStat
            icon={<Target size={18} />}
            label={p.objectives}
            value={`${activeGoals.length}`}
            color="var(--gold)"
          />

          <CommandStat
            icon={<Trophy size={18} />}
            label={p.victories}
            value={`${achievedGoals.length}`}
            color="var(--green)"
          />
        </div>
      </section>

      <section className="accueil-headline" style={quickActionsCard}>
        <div style={sectionHead}>
          <Sparkles size={20} color="var(--gold)" />
          <strong>{p.quickActions}</strong>
        </div>

        <div style={quickActionsGrid}>
          <QuickActionButton
            label={p.addIncome}
            text={p.fundingSource}
            color="var(--green)"
            onClick={() => setCurrentPage("situation", "origine-fonds")}
          />
          <QuickActionButton
            label={p.addExpense}
            text={p.fundDestination}
            color="var(--red)"
            onClick={() => setCurrentPage("situation", "destination-fonds")}
          />
          <QuickActionButton
            label={p.addDebt}
            text={p.editableDebts}
            color="var(--gold)"
            onClick={() => setCurrentPage("situation", "dettes")}
          />
          <QuickActionButton
            label={p.simulateGoal}
            text={p.goalSimulation}
            color="var(--blue)"
            onClick={() => setCurrentPage("simulateur")}
          />
        </div>
      </section>

      <section className="accueil-headline" style={progressFlagCard}>
        <div style={sectionHead}>
          <Flag size={20} color="var(--gold)" />
          <strong>{p.progressTitle}</strong>
        </div>

        <p style={softText}>
          {firstGoal
            ? `${p.pathStarted} ${getStartedLabel(firstGoal.createdAt, language)}.`
            : p.pathWillStart}
        </p>
      </section>

      <section className="accueil-headline" style={companionCard}>
        <div style={sectionHead}>
          <Route size={20} color="var(--gold)" />
          <strong>{p.companion}</strong>
        </div>

        <div style={companionGrid}>
          <CompanionLine
            icon="📊"
            label={p.destination}
            value={mainGoal ? mainGoal.title : p.goalToChoose}
          />
          <CompanionLine
            icon="💰"
            label={p.lastDeposit}
            value={lastDeposit ? lastDeposit.message : p.noDeposit}
          />
          <CompanionLine
            icon="🏆"
            label={p.lastVictory}
            value={lastVictory?.message || lastVictory?.title || p.noVictory}
          />
          <CompanionLine icon="➡️" label={p.action} value={nextAction.title} />
        </div>
      </section>

      {lastActivity && (
        <section className="accueil-headline">
          <div style={sectionHead}>
            <Sparkles size={20} color="var(--blue)" />
            <strong>{p.lastActivity}</strong>
          </div>

          <p style={softText}>
            <strong>{lastActivity.title}</strong>
          </p>

          <p style={softText}>{lastActivity.message}</p>
        </section>
      )}

      <div className="accueil-actions accueil-actions-single">
        <button onClick={() => setCurrentPage("assistant")} className="ai-action">
          <Bot size={18} />
          {p.assistant}
        </button>
      </div>

      <section className="accueil-safe-row">
        <span className="accueil-badge">{p.private}</span>
        <span className="accueil-badge">{p.demo}</span>

        <button
          onClick={() => setShowAmounts(!showAmounts)}
          className="eye-action"
        >
          {showAmounts ? <EyeOff size={16} /> : <Eye size={16} />}
          {showAmounts ? p.hide : p.show}
        </button>
      </section>

      <section className="accueil-grid">
        <QuickTile
          icon={<CreditCard />}
          title={p.debts}
          text={money(totalDebt)}
          color="var(--red)"
          onClick={() => setCurrentPage("situation", "dettes")}
        />

        <QuickTile
          icon={<PiggyBank />}
          title={p.sources}
          text={
            hasSources
              ? `${sourceCount} ${
                  sourceCount > 1 ? p.sourceSavedPlural : p.sourceSaved
                }`
              : p.atYourPace
          }
          color={hasSources ? "var(--green)" : "var(--gold)"}
          onClick={() => setCurrentPage("situation", "origine-fonds")}
        />

        <QuickTile
          icon={<Target />}
          title={p.path}
          text={mainGoal ? p.continueTracking : p.createGoal}
          color="var(--green)"
          onClick={() => setCurrentPage(mainGoal ? "parcours" : "objectifs")}
        />

        <QuickTile
          icon={<ShieldCheck />}
          title={p.security}
          text={p.protectedData}
          color="var(--purple)"
          onClick={() => setCurrentPage("profil")}
        />
      </section>

      <section className="accueil-headline" style={bankMiniCard}>
        <div style={sectionHeadCompact}>
          <Landmark size={18} color="var(--gold)" />
          <strong>{p.bankConnection}</strong>
          <span style={miniBadge}>{p.soon}</span>
        </div>
      </section>
    </div>
  );
}

function MiniPathStep({ label, text, active }) {
  return (
    <div
      style={{
        ...miniPathStep,
        borderColor: active ? "var(--gold)" : "var(--border)",
      }}
    >
      <strong style={{ color: active ? "var(--gold)" : "var(--text-muted)" }}>
        {label}
      </strong>
      <small>{text}</small>
    </div>
  );
}

function QuickActionButton({ label, text, color, onClick }) {
  return (
    <button onClick={onClick} style={{ ...quickActionBtn, borderColor: color }}>
      <strong style={{ color }}>{label}</strong>
      <small>{text}</small>
    </button>
  );
}

function getFinancialSourceCount({ monthlyIncome, financeData }) {
  const sources = financeData?.fundingSources || financeData?.incomeSources;

  if (Array.isArray(sources)) {
    return sources.filter((source) => source && !source.archived).length;
  }

  return monthlyIncome > 0 ? 1 : 0;
}

function getGoalProgress(goal) {
  if (Array.isArray(goal?.pathSteps) && goal.pathSteps.length > 0) {
    const done = goal.pathSteps.filter((step) => step.done).length;
    return Math.round((done / goal.pathSteps.length) * 100);
  }

  const target = Number(goal?.targetAmount || 0);
  if (target <= 0) return 0;

  return Math.min(
    100,
    Math.round((Number(goal?.currentAmount || 0) / target) * 100)
  );
}

function getNextVictory({
  priorityDebt,
  closestGoal,
  mainGoal,
  totalDebt,
  language = "FR",
}) {
  const x = {
    FR: {
      threshold: "avant le prochain palier.",
      debtReady: "Dette prête à être finalisée.",
      achieved: "Objectif atteint. Une victoire à célébrer.",
      completed: "complété",
      remaining: "restants",
      seeDebt: "Voir mes dettes",
      seeGoals: "Voir Objectifs",
      seePlan: "Voir Mon Plan",
      mainText:
        "Objectif principal identifié. Ajoutez une progression pour créer la prochaine victoire.",
      debtReduction: "Réduction des dettes",
      debtText: "Créez un objectif dette pour suivre votre prochaine victoire.",
      createGoal: "Créer un objectif",
      firstGoal: "Premier objectif",
      firstText: "Ajoutez une destination pour activer votre prochaine victoire.",
    },
    EN: {
      threshold: "before the next milestone.",
      debtReady: "Debt ready to be finalized.",
      achieved: "Goal reached. A victory to celebrate.",
      completed: "completed",
      remaining: "remaining",
      seeDebt: "View my debts",
      seeGoals: "View Goals",
      seePlan: "View My Plan",
      mainText:
        "Main goal identified. Add progress to create the next victory.",
      debtReduction: "Debt reduction",
      debtText: "Create a debt goal to track your next victory.",
      createGoal: "Create a goal",
      firstGoal: "First goal",
      firstText: "Add a destination to activate your next victory.",
    },
    ES: {
      threshold: "antes del próximo hito.",
      debtReady: "Deuda lista para finalizar.",
      achieved: "Objetivo alcanzado. Una victoria para celebrar.",
      completed: "completado",
      remaining: "restantes",
      seeDebt: "Ver mis deudas",
      seeGoals: "Ver objetivos",
      seePlan: "Ver Mi Plan",
      mainText:
        "Objetivo principal identificado. Agrega progreso para crear la próxima victoria.",
      debtReduction: "Reducción de deudas",
      debtText: "Crea un objetivo de deuda para seguir tu próxima victoria.",
      createGoal: "Crear un objetivo",
      firstGoal: "Primer objetivo",
      firstText: "Agrega un destino para activar tu próxima victoria.",
    },
  }[language] || {};

  if (priorityDebt) {
    const balance = Number(priorityDebt.balance || 0);
    const nextThreshold = Math.max(0, Math.floor((balance - 1) / 1000) * 1000);
    const remainingToThreshold = Math.max(0, balance - nextThreshold);
    const progress =
      balance > 0
        ? Math.min(
            100,
            Math.max(6, Math.round(((1000 - remainingToThreshold) / 1000) * 100))
          )
        : 100;

    return {
      title: priorityDebt.name,
      text:
        remainingToThreshold > 0
          ? `${remainingToThreshold.toLocaleString(
              language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
              { maximumFractionDigits: 0 }
            )} $ ${x.threshold}`
          : x.debtReady,
      button: x.seeDebt,
      page: "dettes",
      progress,
      color: "var(--gold)",
    };
  }

  if (closestGoal) {
    return {
      title: closestGoal.title,
      text:
        closestGoal.progress >= 100
          ? x.achieved
          : `${closestGoal.progress}% ${x.completed} • ${closestGoal.remaining.toLocaleString(
              language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA",
              { maximumFractionDigits: 0 }
            )} $ ${x.remaining}.`,
      button: x.seeGoals,
      page: "objectifs",
      progress: closestGoal.progress,
      color: closestGoal.progress >= 80 ? "var(--green)" : "var(--blue)",
    };
  }

  if (mainGoal) {
    return {
      title: mainGoal.title,
      text: x.mainText,
      button: x.seePlan,
      page: "monplan",
      progress: 12,
      color: "var(--gold)",
    };
  }

  if (totalDebt > 0) {
    return {
      title: x.debtReduction,
      text: x.debtText,
      button: x.createGoal,
      page: "objectifs",
      progress: 8,
      color: "var(--red)",
    };
  }

  return {
    title: x.firstGoal,
    text: x.firstText,
    button: x.createGoal,
    page: "objectifs",
    progress: 0,
    color: "var(--gold)",
  };
}

function getNextAction({
  totalDebt,
  mainGoal,
  closestGoal,
  monthlyIncome,
  language = "FR",
}) {
  const x = {
    FR: {
      completeSituation: "Compléter votre situation",
      completeText:
        "Ajoutez vos revenus et vos sorties pour activer une lecture plus précise.",
      openSituation: "Ouvrir Ma Situation",
      createDebtGoal: "Créer un objectif dette",
      debtGoalText:
        "Votre dette existe déjà dans Situation. L’étape suivante est d’en faire une destination mesurable.",
      openGoals: "Ouvrir Objectifs",
      simulateBest: "Simuler le meilleur chemin",
      simulateText: "Comparez les rythmes pour avancer sans perdre votre cap.",
      openSimulator: "Ouvrir Simulateur",
      finalize: "Finaliser",
      progress: "Progression",
      closeVictory: "Vous êtes proche d’une victoire.",
      seePlan: "Voir Mon Plan",
      advance: "Avancer",
      keepFocus: "Gardez le cap sur votre objectif principal.",
      firstGoal: "Créer votre premier objectif",
      firstText:
        "Ajoutez une destination pour que OnJarama Path construise votre parcours.",
    },
    EN: {
      completeSituation: "Complete your situation",
      completeText:
        "Add your income and outflows to activate a more precise view.",
      openSituation: "Open My Situation",
      createDebtGoal: "Create a debt goal",
      debtGoalText:
        "Your debt already exists in Situation. The next step is to make it a measurable destination.",
      openGoals: "Open Goals",
      simulateBest: "Simulate the best path",
      simulateText: "Compare rhythms to move forward without losing direction.",
      openSimulator: "Open Simulator",
      finalize: "Finalize",
      progress: "Progress",
      closeVictory: "You are close to a victory.",
      seePlan: "View My Plan",
      advance: "Advance",
      keepFocus: "Keep focus on your main goal.",
      firstGoal: "Create your first goal",
      firstText: "Add a destination so OnJarama Path can build your path.",
    },
    ES: {
      completeSituation: "Completar tu situación",
      completeText:
        "Agrega tus ingresos y salidas para activar una lectura más precisa.",
      openSituation: "Abrir Mi Situación",
      createDebtGoal: "Crear un objetivo de deuda",
      debtGoalText:
        "Tu deuda ya existe en Situación. El siguiente paso es convertirla en un destino medible.",
      openGoals: "Abrir objetivos",
      simulateBest: "Simular el mejor camino",
      simulateText: "Compara ritmos para avanzar sin perder tu dirección.",
      openSimulator: "Abrir simulador",
      finalize: "Finalizar",
      progress: "Progreso",
      closeVictory: "Estás cerca de una victoria.",
      seePlan: "Ver Mi Plan",
      advance: "Avanzar",
      keepFocus: "Mantén el rumbo hacia tu objetivo principal.",
      firstGoal: "Crear tu primer objetivo",
      firstText:
        "Agrega un destino para que OnJarama Path construya tu recorrido.",
    },
  }[language] || {};

  if (!monthlyIncome || monthlyIncome <= 0) {
    return {
      title: x.completeSituation,
      text: x.completeText,
      button: x.openSituation,
      page: "situation",
    };
  }

  if (totalDebt > 0 && !mainGoal) {
    return {
      title: x.createDebtGoal,
      text: x.debtGoalText,
      button: x.openGoals,
      page: "objectifs",
    };
  }

  if (totalDebt > 0) {
    return {
      title: x.simulateBest,
      text: x.simulateText,
      button: x.openSimulator,
      page: "simulateur",
    };
  }

  if (closestGoal && closestGoal.progress >= 80 && closestGoal.progress < 100) {
    return {
      title: `${x.finalize} ${closestGoal.title}`,
      text: `${x.progress}: ${closestGoal.progress} %. ${x.closeVictory}`,
      button: x.seePlan,
      page: "monplan",
    };
  }

  if (mainGoal) {
    return {
      title: `${x.advance} ${mainGoal.title}`,
      text: x.keepFocus,
      button: x.seePlan,
      page: "monplan",
    };
  }

  return {
    title: x.firstGoal,
    text: x.firstText,
    button: x.openGoals,
    page: "objectifs",
  };
}

function getSituationScore({
  monthlyIncome,
  monthlyExpenses,
  monthlySavings,
  monthlyAvailable,
  totalDebt,
  language = "FR",
}) {
  const x = {
    FR: {
      empty:
        "Complétez vos sources et vos sorties pour générer un score fiable.",
      solid: "Base solide. Continuez à protéger votre marge.",
      stable: "Situation stable, mais quelques ajustements peuvent aider.",
      priority: "Priorité : reprendre du souffle mensuel.",
    },
    EN: {
      empty: "Complete your sources and outflows to generate a reliable score.",
      solid: "Solid base. Keep protecting your margin.",
      stable: "Stable situation, but a few adjustments can help.",
      priority: "Priority: rebuild monthly breathing room.",
    },
    ES: {
      empty: "Completa tus fuentes y salidas para generar un puntaje confiable.",
      solid: "Base sólida. Sigue protegiendo tu margen.",
      stable: "Situación estable, pero algunos ajustes pueden ayudar.",
      priority: "Prioridad: recuperar margen mensual.",
    },
  }[language] || {};

  if (!monthlyIncome || monthlyIncome <= 0) {
    return {
      score: 0,
      isReady: false,
      color: "var(--gold)",
      label: x.empty,
    };
  }

  let score = 50;

  if (monthlyIncome > 0) score += 15;
  if (monthlyAvailable > 0) score += 15;
  if (monthlySavings > 0) score += 10;
  if (totalDebt === 0) score += 10;
  if (monthlyIncome > 0 && totalDebt > monthlyIncome * 6) score -= 18;
  if (monthlyIncome > 0 && monthlyExpenses > monthlyIncome) score -= 15;
  if (monthlyAvailable < 0) score -= 25;

  const safeScore = Math.max(0, Math.min(100, score));

  if (safeScore >= 80) {
    return {
      score: safeScore,
      isReady: true,
      color: "var(--green)",
      label: x.solid,
    };
  }

  if (safeScore >= 55) {
    return {
      score: safeScore,
      isReady: true,
      color: "var(--gold)",
      label: x.stable,
    };
  }

  return {
    score: safeScore,
    isReady: true,
    color: "var(--red)",
    label: x.priority,
  };
}

function getStartedLabel(createdAt, language = "FR") {
  if (!createdAt) {
    return language === "EN" ? "today" : language === "ES" ? "hoy" : "aujourd’hui";
  }

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) {
    return language === "EN" ? "today" : language === "ES" ? "hoy" : "aujourd’hui";
  }

  const days = Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );

  if (days === 0) {
    return language === "EN" ? "today" : language === "ES" ? "hoy" : "aujourd’hui";
  }

  if (days === 1) {
    return language === "EN"
      ? "1 day ago"
      : language === "ES"
        ? "hace 1 día"
        : "il y a 1 jour";
  }

  return language === "EN"
    ? `${days} days ago`
    : language === "ES"
      ? `hace ${days} días`
      : `il y a ${days} jours`;
}

function getDisciplineColor(score) {
  if (score <= 25) return "var(--red)";
  if (score <= 50) return "var(--gold)";
  if (score <= 75) return "var(--blue)";
  return "var(--green)";
}

function CompanionLine({ icon, label, value }) {
  return (
    <div style={companionLine}>
      <span>{icon}</span>
      <div>
        <small style={companionLabel}>{label}</small>
        <strong style={companionValue}>{value}</strong>
      </div>
    </div>
  );
}

function CommandStat({ icon, label, value, color }) {
  return (
    <div style={{ ...commandStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function QuickTile({ icon, title, text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="accueil-tile"
      style={{ borderColor: color }}
    >
      <span className="accueil-tile-icon" style={{ color }}>
        {icon}
      </span>
      <strong>{title}</strong>
      <small>{text}</small>
    </button>
  );
}

const quickActionsCard = {
  border: "1px solid rgba(212,175,55,.45)",
  background: "linear-gradient(135deg, rgba(212,175,55,.10), var(--bg-card))",
};

const quickActionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
  marginTop: "10px",
};

const quickActionBtn = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  color: "var(--text-main)",
  textAlign: "left",
  display: "grid",
  gap: "4px",
};

const sectionHead = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginBottom: 8,
};

const sectionHeadCompact = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "space-between",
};

const softText = {
  margin: 0,
  color: "var(--text-muted)",
  lineHeight: 1.4,
};

const premiumHero = {
  border: "1px solid var(--gold)",
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), var(--bg-card)",
};

const progressFlagCard = {
  border: "1px solid rgba(212,175,55,.5)",
  background: "linear-gradient(135deg, rgba(212,175,55,.13), var(--bg-card))",
};


const closestGoalCard = {
  border: "1px solid var(--green)",
  background:
    "radial-gradient(circle at top right, rgba(34,197,94,.22), transparent 34%), linear-gradient(135deg, rgba(34,197,94,.13), rgba(212,175,55,.08), var(--bg-card))",
};

const commandCenter = {
  border: "1px solid rgba(212,175,55,.48)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(56,189,248,.08), var(--bg-card))",
};

const commandGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const commandStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
};

const companionCard = {
  border: "1px solid var(--gold)",
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))",
};

const pathStartCard = {
  border: "1px solid var(--gold)",
  background:
    "linear-gradient(135deg, rgba(212,175,55,.14), rgba(34,197,94,.06), var(--bg-card))",
};

const nextVictoryCard = {
  border: "1px solid var(--gold)",
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.24), transparent 34%), linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
};

const miniBarBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  marginTop: "12px",
  overflow: "hidden",
};

const miniBarFill = {
  height: "100%",
  borderRadius: "999px",
};

const miniPathGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "7px",
  marginTop: "12px",
};

const miniPathStep = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "13px",
  padding: "9px 6px",
  display: "grid",
  gap: "3px",
  textAlign: "center",
};

const companionGrid = {
  display: "grid",
  gap: "10px",
  marginTop: "12px",
};

const companionLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "11px",
  display: "grid",
  gridTemplateColumns: "28px 1fr",
  gap: "8px",
  alignItems: "center",
};

const companionLabel = {
  color: "var(--text-muted)",
  fontSize: "12px",
  display: "block",
};

const companionValue = {
  color: "var(--text-main)",
  display: "block",
  marginTop: "2px",
};

const nextActionCard = {
  border: "1px solid var(--green)",
  background: "linear-gradient(135deg, rgba(34,197,94,.12), var(--bg-card))",
};

const bankMiniCard = {
  border: "1px solid rgba(212,175,55,.36)",
  background: "linear-gradient(135deg, rgba(212,175,55,.08), var(--bg-card))",
};

const miniBadge = {
  border: "1px solid var(--gold)",
  borderRadius: "999px",
  padding: "5px 8px",
  color: "var(--gold)",
  fontSize: "11px",
  fontWeight: "900",
};

export default Accueil;