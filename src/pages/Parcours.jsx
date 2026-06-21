import {
  AlertTriangle,
  Award,
  Calendar,
  CheckCircle,
  CreditCard,
  Flag,
  Home,
  Lock,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Wallet,
  TrendingDown,
  PiggyBank,
  History,
} from "lucide-react";
import { formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Votre chemin financier, étape par étape.",
    smartJourney: "Parcours intelligent",
    journeyStart: "Départ du parcours",
    journeyDays: "Jours de parcours",
    globalProgress: "Progression globale",
    mainGoal: "Objectif principal",
    featuredGoal: "Objectif vedette",
    noMainGoal: "À définir",
    today: "Aujourd’hui",
    todaySubtitle: "Une action simple pour continuer sans pression.",
    rhythm: "Rythme OnJarama",
    activeDays: "jours actifs",
    lastUpdate: "Dernière mise à jour",
    nextVictory: "Prochaine victoire",
    recommendedAction: "Action recommandée",
    priorityDebt: "Dette prioritaire",
    totalDebt: "Dette totale",
    activeGoals: "Objectifs actifs",
    goalsProgress: "Progression objectifs",
    goalsAmount: "Montant objectifs",
    story: "Une histoire claire, pas seulement des chiffres.",
    startingPoint: "Point de départ",
    noDebt: "Aucune dette prioritaire",
    highRate: "Taux élevé",
    remaining: "Reste",
    current: "Actuel",
    target: "Objectif",
    targetDate: "Date cible",
    travel: "Voyage",
    travelSubtitle: "Projet personnel ou familial",
    house: "Maison",
    houseSubtitle: "Construction, achat ou rénovation",
    freedom: "Liberté financière",
    freedomSubtitle: "Vision long terme",
    aiReading: "Lecture IA",
    updateSituation: "Mettre à jour ma situation",
    manageGoals: "Gérer mes objectifs",
    openSimulator: "Ouvrir le simulateur",
    addDebtGoal: "Ajoutez une dette ou un objectif pour créer votre parcours.",
    debtAdvice:
      "Votre priorité actuelle est la dette au taux le plus élevé. Une fois réduite, vos objectifs avanceront plus vite.",
    goalAdvice:
      "Votre objectif principal est actif. Continuez à l’alimenter régulièrement.",
    startAdvice:
      "Commencez par ajouter votre situation financière et un objectif principal.",
    simulatorAdvice:
      "Un objectif créé depuis le simulateur peut maintenant être suivi ici.",
    eliminateDebt: "Éliminer la dette prioritaire",
    secureBase: "Sécuriser la base",
    emergencySubtitle: "Créer une sécurité minimale",
    buildGoals: "Construire les objectifs",
    discipline: "Discipline OnJarama",
    started: "Vous avez commencé votre parcours",
    notStarted: "Votre parcours commencera dès votre premier objectif.",
    nextStep: "Prochaine étape",
    victories: "Victoires",
    noVictory: "Aucune victoire enregistrée pour le moment.",
    openPlan: "Ouvrir Mon Plan",
    createdGoal: "Premier objectif créé",
    firstDeposit: "Premier dépôt enregistré",
    firstVictory: "Première victoire",
    cloudReady: "Préparation V12 Smart Plan Engine",
    cloudText:
      "Mon Plan deviendra le cerveau, Parcours le GPS, Objectifs les destinations et Simulateur le moteur de calcul.",
    journeyInsights: "Regards sur le parcours",
    realEvolution: "Évolution réelle",
    startedWith: "Départ",
    now: "Aujourd’hui",
    changed: "Changement",
    debtReduced: "Dette réduite",
    savingsBuilt: "Épargne construite",
    goalFunded: "Objectifs financés",
    nextWinSmart: "Prochaine victoire",
    fundingOrigin: "Origine des fonds",
    fundingConfigured: "Configurée",
    fundingMissing: "À compléter",
    fundingPrivate:
      "Visible ici de façon discrète. Les montants détaillés restent protégés dans le profil financier.",
    openFinancialProfile: "Ouvrir Profil / Finances",
    historyVictories: "Historique des victoires",
    firstDebtAdded: "Première dette ajoutée",
    progressSinceStart: "Progression depuis le départ",
    underThreshold: "sous le prochain palier",
    youAreHere: "Vous êtes ici",
    currentPosition: "Position actuelle",
    badges: "Badges OnJarama",
    badgesSubtitle: "Les étapes se débloquent naturellement avec votre parcours.",
    premiumTimeline: "Frise Premium",
    nextMilestone: "Prochain palier",
    monthlyContribution: "Contribution mensuelle",
  },

  EN: {
    subtitle: "Your financial path, step by step.",
    smartJourney: "Smart journey",
    journeyStart: "Journey start",
    journeyDays: "Journey days",
    globalProgress: "Global progress",
    mainGoal: "Main goal",
    featuredGoal: "Featured goal",
    noMainGoal: "To define",
    today: "Today",
    todaySubtitle: "One simple action to keep moving without pressure.",
    rhythm: "OnJarama Rhythm",
    activeDays: "active days",
    lastUpdate: "Last update",
    nextVictory: "Next victory",
    recommendedAction: "Recommended action",
    priorityDebt: "Priority debt",
    totalDebt: "Total debt",
    activeGoals: "Active goals",
    goalsProgress: "Goals progress",
    goalsAmount: "Goals amount",
    story: "A clear story, not just numbers.",
    startingPoint: "Starting point",
    noDebt: "No priority debt",
    highRate: "High rate",
    remaining: "Remaining",
    current: "Current",
    target: "Target",
    targetDate: "Target date",
    travel: "Travel",
    travelSubtitle: "Personal or family project",
    house: "Home",
    houseSubtitle: "Construction, purchase or renovation",
    freedom: "Financial freedom",
    freedomSubtitle: "Long-term vision",
    aiReading: "AI reading",
    updateSituation: "Update my situation",
    manageGoals: "Manage my goals",
    openSimulator: "Open simulator",
    addDebtGoal: "Add a debt or goal to create your path.",
    debtAdvice:
      "Your current priority is the debt with the highest rate. Once reduced, your goals will move faster.",
    goalAdvice: "Your main goal is active. Keep funding it regularly.",
    startAdvice: "Start by adding your financial situation and one main goal.",
    simulatorAdvice: "A goal created from the simulator can now be tracked here.",
    eliminateDebt: "Eliminate priority debt",
    secureBase: "Secure the base",
    emergencySubtitle: "Build minimum security",
    buildGoals: "Build goals",
    discipline: "OnJarama Discipline",
    started: "You started your path",
    notStarted: "Your path will start with your first goal.",
    nextStep: "Next step",
    victories: "Victories",
    noVictory: "No victory recorded yet.",
    openPlan: "Open My Plan",
    createdGoal: "First goal created",
    firstDeposit: "First deposit recorded",
    firstVictory: "First victory",
    cloudReady: "V12 Smart Plan Engine preparation",
    cloudText:
      "My Plan becomes the brain, Path the GPS, Goals the destinations and Simulator the calculation engine.",
    journeyInsights: "Journey insights",
    realEvolution: "Real evolution",
    startedWith: "Start",
    now: "Today",
    changed: "Change",
    debtReduced: "Debt reduced",
    savingsBuilt: "Savings built",
    goalFunded: "Goals funded",
    nextWinSmart: "Smart next win",
    fundingOrigin: "Funding source",
    fundingConfigured: "Configured",
    fundingMissing: "To complete",
    fundingPrivate:
      "Shown here discreetly. Detailed amounts stay protected in the financial profile.",
    openFinancialProfile: "Open Profile / Finances",
    historyVictories: "Victory history",
    firstDebtAdded: "First debt added",
    progressSinceStart: "Progress since start",
    underThreshold: "under the next threshold",
    youAreHere: "You are here",
    currentPosition: "Current position",
    badges: "OnJarama badges",
    badgesSubtitle: "Steps unlock naturally with your journey.",
    premiumTimeline: "Premium timeline",
    nextMilestone: "Next milestone",
    monthlyContribution: "Monthly contribution",
  },

  ES: {
    subtitle: "Tu camino financiero, paso a paso.",
    smartJourney: "Recorrido inteligente",
    journeyStart: "Inicio del camino",
    journeyDays: "Días de camino",
    globalProgress: "Progreso global",
    mainGoal: "Objetivo principal",
    featuredGoal: "Objetivo destacado",
    noMainGoal: "Por definir",
    today: "Hoy",
    todaySubtitle: "Una acción simple para avanzar sin presión.",
    rhythm: "Ritmo OnJarama",
    activeDays: "días activos",
    lastUpdate: "Última actualización",
    nextVictory: "Próxima victoria",
    recommendedAction: "Acción recomendada",
    priorityDebt: "Deuda prioritaria",
    totalDebt: "Deuda total",
    activeGoals: "Objetivos activos",
    goalsProgress: "Progreso de objetivos",
    goalsAmount: "Monto de objetivos",
    story: "Una historia clara, no solo números.",
    startingPoint: "Punto de partida",
    noDebt: "No hay deuda prioritaria",
    highRate: "Tasa alta",
    remaining: "Restante",
    current: "Actual",
    target: "Objetivo",
    targetDate: "Fecha objetivo",
    travel: "Viaje",
    travelSubtitle: "Proyecto personal o familiar",
    house: "Casa",
    houseSubtitle: "Construcción, compra o renovación",
    freedom: "Libertad financiera",
    freedomSubtitle: "Visión a largo plazo",
    aiReading: "Lectura IA",
    updateSituation: "Actualizar mi situación",
    manageGoals: "Gestionar mis objetivos",
    openSimulator: "Abrir simulador",
    addDebtGoal: "Agrega una deuda u objetivo para crear tu camino.",
    debtAdvice:
      "Tu prioridad actual es la deuda con la tasa más alta. Una vez reducida, tus objetivos avanzarán más rápido.",
    goalAdvice:
      "Tu objetivo principal está activo. Sigue financiándolo regularmente.",
    startAdvice:
      "Empieza agregando tu situación financiera y un objetivo principal.",
    simulatorAdvice:
      "Un objetivo creado desde el simulador ahora puede seguirse aquí.",
    eliminateDebt: "Eliminar deuda prioritaria",
    secureBase: "Asegurar la base",
    emergencySubtitle: "Crear una seguridad mínima",
    buildGoals: "Construir objetivos",
    discipline: "Disciplina OnJarama",
    started: "Empezaste tu camino",
    notStarted: "Tu camino empezará con tu primer objetivo.",
    nextStep: "Próxima etapa",
    victories: "Victorias",
    noVictory: "No hay victoria registrada por ahora.",
    openPlan: "Abrir Mi Plan",
    createdGoal: "Primer objetivo creado",
    firstDeposit: "Primer depósito registrado",
    firstVictory: "Primera victoria",
    cloudReady: "Preparación V12 Smart Plan Engine",
    cloudText:
      "Mi Plan será el cerebro, Recorrido el GPS, Objetivos los destinos y Simulador el motor de cálculo.",
    journeyInsights: "Mirada del recorrido",
    realEvolution: "Evolución real",
    startedWith: "Inicio",
    now: "Hoy",
    changed: "Cambio",
    debtReduced: "Deuda reducida",
    savingsBuilt: "Ahorro construido",
    goalFunded: "Objetivos financiados",
    nextWinSmart: "Próxima victoria inteligente",
    fundingOrigin: "Origen de los fondos",
    fundingConfigured: "Configurada",
    fundingMissing: "Por completar",
    fundingPrivate:
      "Visible aquí de forma discreta. Los montos detallados siguen protegidos en el perfil financiero.",
    openFinancialProfile: "Abrir Perfil / Finanzas",
    historyVictories: "Historial de victorias",
    firstDebtAdded: "Primera deuda agregada",
    progressSinceStart: "Progreso desde el inicio",
    underThreshold: "bajo el próximo nivel",
    youAreHere: "Estás aquí",
    currentPosition: "Posición actual",
    badges: "Insignias OnJarama",
    badgesSubtitle: "Las etapas se desbloquean naturalmente con tu recorrido.",
    premiumTimeline: "Cronología Premium",
    nextMilestone: "Próximo nivel",
    monthlyContribution: "Contribución mensual",
  },
};

function Parcours({
  financeData,
  selectedGoals,
  settings,
  setCurrentPage,
  disciplineScore,
}) {
  const t = getText(settings);
  const language = settings?.language || "FR";
  const p = pageText[language] || pageText.FR;
  const currency = settings?.currency || "CAD";

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];

  const totalDebt = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  const highlightedGoal = goals.find((goal) => goal.highlighted) || goals[0];
  const simulatorGoal = goals.find((goal) => goal.source === "simulateur");

  const totalGoalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const totalGoalCurrent = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const globalGoalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 0;

  const achievedGoals = goals.filter(
    (goal) =>
      Number(goal.targetAmount || 0) > 0 &&
      Number(goal.currentAmount || 0) >= Number(goal.targetAmount || 0)
  );

  const goalsWithDeposit = goals.filter((goal) => goal.lastDeposit);
  const firstGoal = [...goals]
    .filter((goal) => goal.createdAt)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];

  const lastDepositGoal = [...goalsWithDeposit]
    .sort(
      (a, b) =>
        new Date(b.lastDeposit?.date || 0) - new Date(a.lastDeposit?.date || 0)
    )[0];

  const daysSinceStart = getDaysSinceStart(firstGoal?.createdAt);
  const journeyStartDate = formatDate(firstGoal?.createdAt, language);
  const disciplineValue = disciplineScore?.score || 0;

  const journeyStats = {
    journeyStartDate,
    daysSinceStart,
    globalGoalProgress,
    mainGoal: highlightedGoal?.title || p.noMainGoal,
    activeDays: Math.max(
      0,
      Math.min(daysSinceStart + 1, goals.length + goalsWithDeposit.length)
    ),
    lastUpdate: lastDepositGoal?.lastDeposit?.date
      ? formatDate(lastDepositGoal.lastDeposit.date, language)
      : firstGoal?.createdAt
        ? formatDate(firstGoal.createdAt, language)
        : "—",
  };

  const nextStep = getNextStep({
    priorityDebt,
    highlightedGoal,
    simulatorGoal,
    goals,
    p,
  });

  const todayActions = getTodayActions({
    priorityDebt,
    highlightedGoal,
    simulatorGoal,
    goals,
    p,
  });

  const nextVictory = priorityDebt || highlightedGoal || simulatorGoal;

  const monthlyIncome = Number(financeData?.overview?.monthlyIncome || 0);
  const fundingConfigured = monthlyIncome > 0;

  const startingDebt = getStartingDebt(debts);
  const debtReduced = Math.max(0, startingDebt - totalDebt);
  const savingsBuilt = totalGoalCurrent;

  const nextVictoryInsight = getNextVictoryInsight({
    priorityDebt,
    highlightedGoal,
    currency,
    p,
  });

  const victoryHistory = buildVictoryHistory({
    debts,
    firstGoal,
    lastDepositGoal,
    achievedGoals,
    p,
    currency,
  });

  const disciplineV2 = getDisciplineLevelV2(disciplineValue, language);

  const youAreHere = getCurrentPosition({
    firstGoal,
    lastDepositGoal,
    achievedGoals,
    highlightedGoal,
    priorityDebt,
    globalGoalProgress,
    nextStep,
    p,
  });

  const badges = buildBadges({
    firstGoal,
    lastDepositGoal,
    achievedGoals,
    globalGoalProgress,
    p,
  });

  const premiumTimeline = buildPremiumTimeline({
    firstGoal,
    lastDepositGoal,
    achievedGoals,
    youAreHere,
    nextVictoryInsight,
    p,
  });

  return (
    <div className="native-page" style={pageWrap}>
      <h1>Mon histoire financière</h1>
      <p style={muted}>{p.subtitle}</p>

      <section style={smartHeaderCard}>
        <div style={header}>
          <Route color="var(--gold)" />
          <div>
            <p style={eyebrow}>{p.smartJourney}</p>
            <h2>{p.journeyStart}</h2>
          </div>
        </div>

        <div style={journeyGrid}>
          <JourneyStat
            icon={<Flag size={18} />}
            label={p.journeyStart}
            value={firstGoal ? journeyStats.journeyStartDate : "—"}
            color="var(--gold)"
          />
          <JourneyStat
            icon={<Calendar size={18} />}
            label={p.journeyDays}
            value={firstGoal ? `${daysSinceStart}` : "0"}
            color="var(--blue)"
          />
          <JourneyStat
            icon={<Target size={18} />}
            label={p.featuredGoal}
            value={journeyStats.mainGoal}
            color="var(--green)"
          />
          <JourneyStat
            icon={<Trophy size={18} />}
            label={p.globalProgress}
            value={`${globalGoalProgress}%`}
            color="var(--purple)"
          />
        </div>

        <p style={muted}>
          {firstGoal
            ? `${p.started} il y a ${daysSinceStart} jour${
                daysSinceStart > 1 ? "s" : ""
              }.`
            : p.notStarted}
        </p>
      </section>

      <JourneyMilestones progress={globalGoalProgress} p={p} />

      <YouAreHereCard
        data={youAreHere}
        progress={globalGoalProgress}
        featuredGoal={highlightedGoal}
        currency={currency}
        p={p}
      />

      <FeaturedGoalCard goal={highlightedGoal} currency={currency} p={p} />

      <OnJaramaBadges badges={badges} p={p} />

      <PremiumVerticalTimeline steps={premiumTimeline} p={p} />

      <section style={insightsCard}>
        <div style={header}>
          <Sparkles color="var(--gold)" />
          <div>
            <p style={eyebrow}>{p.journeyInsights}</p>
            <h2>{p.realEvolution}</h2>
            <p style={muted}>{p.progressSinceStart}</p>
          </div>
        </div>

        <div style={insightsGrid}>
          <InsightStat
            icon={<TrendingDown size={18} />}
            label={p.debtReduced}
            start={formatMoney(startingDebt, currency)}
            current={formatMoney(totalDebt, currency)}
            change={`-${formatMoney(debtReduced, currency)}`}
            color="var(--green)"
            p={p}
          />

          <InsightStat
            icon={<PiggyBank size={18} />}
            label={p.savingsBuilt}
            start={formatMoney(0, currency)}
            current={formatMoney(savingsBuilt, currency)}
            change={`+${formatMoney(savingsBuilt, currency)}`}
            color="var(--blue)"
            p={p}
          />

          <InsightStat
            icon={<Target size={18} />}
            label={p.goalFunded}
            start={formatMoney(0, currency)}
            current={formatMoney(totalGoalCurrent, currency)}
            change={`${globalGoalProgress}%`}
            color="var(--gold)"
            p={p}
          />
        </div>
      </section>

      <section style={nextVictorySmartCard}>
        <div style={header}>
          <Trophy color="var(--gold)" />
          <div>
            <p style={eyebrow}>{p.nextWinSmart}</p>
            <h2>{nextVictoryInsight.title}</h2>
            <p style={muted}>{nextVictoryInsight.text}</p>
          </div>
        </div>

        <div style={miniBarBg}>
          <div
            style={{
              ...miniBarFill,
              width: `${nextVictoryInsight.progress}%`,
              background: nextVictoryInsight.color,
            }}
          />
        </div>
      </section>

      <section style={fundingOriginCard}>
        <div style={header}>
          <Wallet color={fundingConfigured ? "var(--green)" : "var(--gold)"} />
          <div>
            <p style={eyebrow}>{p.fundingOrigin}</p>
            <h2>{fundingConfigured ? p.fundingConfigured : p.fundingMissing}</h2>
            <p style={muted}>{p.fundingPrivate}</p>
          </div>
        </div>

        <button onClick={() => setCurrentPage("profil")} style={blueBtn}>
          <Lock size={17} />
          {p.openFinancialProfile}
        </button>
      </section>

      <section style={todayCard}>
        <div style={header}>
          <Sparkles color="var(--green)" />
          <div>
            <p style={eyebrowGreen}>{p.today}</p>
            <h2>{nextStep.text}</h2>
            <p style={muted}>{p.todaySubtitle}</p>
          </div>
        </div>

        <div style={todayList}>
          {todayActions.map((action) => (
            <div key={action} style={todayLine}>
              <CheckCircle size={17} color="var(--green)" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={heroCard}>
        <Trophy color="var(--gold)" size={38} />

        <p style={muted}>{p.nextVictory}</p>

        <h2>{priorityDebt?.name || highlightedGoal?.title || p.recommendedAction}</h2>

        <h1 style={{ color: "var(--gold)" }}>
          {priorityDebt
            ? formatMoney(priorityDebt.balance, currency)
            : highlightedGoal
              ? formatMoney(
                  getRemaining(
                    highlightedGoal.currentAmount,
                    highlightedGoal.targetAmount
                  ),
                  currency
                )
              : formatMoney(0, currency)}
        </h1>

        <p style={muted}>
          {priorityDebt
            ? p.debtAdvice
            : highlightedGoal
              ? highlightedGoal.source === "simulateur"
                ? p.simulatorAdvice
                : p.goalAdvice
              : p.addDebtGoal}
        </p>
      </section>

      <section style={disciplineCard}>
        <Flag color={disciplineV2.color} />

        <div>
          <h2>{p.discipline}</h2>

          <p style={muted}>
            {journeyStats.activeDays} {p.activeDays} • {p.lastUpdate} :{" "}
            {journeyStats.lastUpdate}
          </p>

          <strong style={{ color: disciplineV2.color }}>
            {disciplineValue}% • {disciplineV2.label}
          </strong>

          <div style={miniBarBg}>
            <div
              style={{
                ...miniBarFill,
                width: `${disciplineValue}%`,
                background: disciplineV2.color,
              }}
            />
          </div>

          <p style={muted}>{disciplineV2.message}</p>
        </div>
      </section>

      <section style={historyCard}>
        <div style={header}>
          <History color="var(--gold)" />
          <div>
            <p style={eyebrow}>{p.historyVictories}</p>
            <h2>{p.victories}</h2>
            <p style={muted}>{p.story}</p>
          </div>
        </div>

        {victoryHistory.map((victory) => (
          <Milestone
            key={victory.id}
            icon={victory.icon}
            title={victory.title}
            subtitle={victory.subtitle}
            active={victory.active}
            color={victory.color}
          />
        ))}
      </section>

      <section style={nextStepCard}>
        <Star color="var(--green)" />

        <div>
          <h2>{p.nextStep}</h2>
          <p style={muted}>{nextStep.text}</p>
        </div>
      </section>

      <section style={victoryCard}>
        <Trophy color="var(--gold)" />

        <div>
          <h2>{p.victories}</h2>

          {achievedGoals.length > 0 ? (
            <p style={muted}>
              {achievedGoals.length} objectif
              {achievedGoals.length > 1 ? "s" : ""} atteint
              {achievedGoals.length > 1 ? "s" : ""}.
            </p>
          ) : (
            <p style={muted}>{p.noVictory}</p>
          )}
        </div>
      </section>

      <div className="grid-2" style={grid}>
        <InfoCard
          icon={<AlertTriangle />}
          title={p.totalDebt}
          value={formatMoney(totalDebt, currency)}
          color="var(--red)"
        />

        <InfoCard
          icon={<Target />}
          title={p.activeGoals}
          value={goals.length}
          color="var(--gold)"
        />

        <InfoCard
          icon={<ShieldCheck />}
          title={p.goalsProgress}
          value={`${globalGoalProgress}%`}
          color="var(--green)"
        />

        <InfoCard
          icon={<Flag />}
          title={p.goalsAmount}
          value={formatMoney(totalGoalTarget, currency)}
          color="var(--purple)"
        />
      </div>

      <section style={card}>
        <div style={header}>
          <Route color="var(--green)" />
          <div>
            <h2>Timeline du parcours</h2>
            <p style={muted}>{p.story}</p>
          </div>
        </div>

        <Milestone
          icon={<Flag />}
          title={p.startingPoint}
          subtitle={
            firstGoal ? `${p.journeyStart} : ${journeyStartDate}` : p.notStarted
          }
          active={Boolean(firstGoal)}
          color="var(--blue)"
        />

        <Milestone
          icon={<Target />}
          title={p.createdGoal}
          subtitle={firstGoal?.title || p.addDebtGoal}
          active={Boolean(firstGoal)}
          color="var(--gold)"
        />

        <Milestone
          icon={<CreditCard />}
          title={priorityDebt ? p.eliminateDebt : p.priorityDebt}
          subtitle={
            priorityDebt
              ? `${priorityDebt.name} · ${p.highRate} : ${priorityDebt.interestRate}%`
              : p.noDebt
          }
          active={Boolean(priorityDebt)}
          color={priorityDebt ? "var(--red)" : "var(--green)"}
        />

        <Milestone
          icon={<ShieldCheck />}
          title={p.firstDeposit}
          subtitle={
            lastDepositGoal
              ? `${lastDepositGoal.title} • +${formatMoney(
                  lastDepositGoal.lastDeposit.amount,
                  currency
                )}`
              : p.emergencySubtitle
          }
          active={Boolean(lastDepositGoal)}
          color="var(--green)"
        />

        <Milestone
          icon={<Trophy />}
          title={p.firstVictory}
          subtitle={achievedGoals[0] ? achievedGoals[0].title : p.noVictory}
          active={achievedGoals.length > 0}
          color="var(--gold)"
        />
      </section>

      <section style={card}>
        <div style={header}>
          <Route color="var(--green)" />
          <div>
            <h2>Étapes du parcours</h2>
            <p style={muted}>{p.story}</p>
          </div>
        </div>

        <TimelineStep
          icon={<CreditCard />}
          stepLabel="💳 Dette"
          title={priorityDebt ? p.eliminateDebt : p.priorityDebt}
          subtitle={
            priorityDebt
              ? `${priorityDebt.name} · ${p.highRate} : ${priorityDebt.interestRate}%`
              : p.noDebt
          }
          current={
            priorityDebt
              ? formatMoney(priorityDebt.balance, currency)
              : formatMoney(0, currency)
          }
          target={formatMoney(0, currency)}
          remaining={
            priorityDebt
              ? formatMoney(priorityDebt.balance, currency)
              : formatMoney(0, currency)
          }
          progress={priorityDebt ? getDebtProgress(priorityDebt.balance) : 100}
          action={
            priorityDebt
              ? `${p.recommendedAction} : ${priorityDebt.name}`
              : p.addDebtGoal
          }
          color={priorityDebt ? "var(--gold)" : "var(--green)"}
          p={p}
        />

        <TimelineStep
          icon={<ShieldCheck />}
          stepLabel="🛡 Sécurité"
          title={p.secureBase}
          subtitle={p.emergencySubtitle}
          current={formatMoney(0, currency)}
          target="3 mois"
          remaining="À définir"
          progress={priorityDebt ? 20 : 40}
          action={p.emergencySubtitle}
          color="var(--green)"
          p={p}
        />

        <GoalStep
          goals={goals}
          category="voyage"
          stepLabel="✈️ Voyage"
          fallbackTitle={p.travel}
          fallbackSubtitle={p.travelSubtitle}
          icon={<Plane />}
          color="var(--blue)"
          currency={currency}
          p={p}
        />

        <GoalStep
          goals={goals}
          category="maison"
          stepLabel="🏠 Maison"
          fallbackTitle={p.house}
          fallbackSubtitle={p.houseSubtitle}
          icon={<Home />}
          color="var(--gold)"
          currency={currency}
          p={p}
        />

        <GoalStep
          goals={goals}
          category="liberte"
          stepLabel="🏆 Liberté"
          fallbackTitle={p.freedom}
          fallbackSubtitle={p.freedomSubtitle}
          icon={<Trophy />}
          color="var(--purple)"
          currency={currency}
          p={p}
        />

        {nextVictory &&
          !["voyage", "maison", "liberte"].includes(nextVictory.category) && (
            <GoalStep
              goals={[nextVictory]}
              category={nextVictory.category}
              stepLabel={p.buildGoals}
              fallbackTitle={nextVictory.title}
              fallbackSubtitle={nextVictory.option || p.recommendedAction}
              icon={<Star />}
              color="var(--gold)"
              currency={currency}
              p={p}
            />
          )}
      </section>

      <section style={adviceCard}>
        <Calendar color="var(--purple)" />
        <div>
          <h2>{p.aiReading}</h2>
          <p style={muted}>
            {priorityDebt
              ? `${p.debtAdvice} ${p.rhythm} : ${disciplineValue}% (${disciplineV2.label}).`
              : goals.length > 0
                ? simulatorGoal
                  ? p.simulatorAdvice
                  : `${p.goalAdvice} ${p.rhythm} : ${disciplineValue}% (${disciplineV2.label}).`
                : p.startAdvice}
          </p>
        </div>
      </section>

      <section style={cloudCard}>
        <Sparkles color="var(--blue)" />
        <div>
          <h2>{p.cloudReady}</h2>
          <p style={muted}>{p.cloudText}</p>
        </div>
      </section>
    </div>
  );
}

function JourneyStat({ icon, label, value, color }) {
  return (
    <div style={{ ...journeyStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

function YouAreHereCard({ data, progress, featuredGoal, currency, p }) {
  return (
    <section style={youAreHereCard}>
      <div style={header}>
        <MapPin color="var(--gold)" />
        <div>
          <p style={eyebrow}>{p.currentPosition}</p>
          <h2>📍 {p.youAreHere}</h2>
          <p style={muted}>{data.text}</p>
        </div>
      </div>

      <div style={youAreHereGrid}>
        <SmallStat label={p.globalProgress} value={`${progress}%`} />
        <SmallStat label={p.featuredGoal} value={featuredGoal?.title || p.noMainGoal} />
        <SmallStat label={p.nextStep} value={data.nextLabel} />
      </div>

      <div style={miniBarBg}>
        <div
          style={{
            ...miniBarFill,
            width: `${Math.min(100, Math.max(0, Number(progress || 0)))}%`,
            background: "linear-gradient(90deg,var(--gold),var(--green))",
          }}
        />
      </div>
    </section>
  );
}

function FeaturedGoalCard({ goal, currency, p }) {
  if (!goal) {
    return (
      <section style={featuredGoalCard}>
        <div style={header}>
          <Star color="var(--gold)" />
          <div>
            <p style={eyebrow}>{p.featuredGoal}</p>
            <h2>{p.noMainGoal}</h2>
            <p style={muted}>{p.addDebtGoal}</p>
          </div>
        </div>
      </section>
    );
  }

  const current = Number(goal.currentAmount || 0);
  const target = Number(goal.targetAmount || 0);
  const remaining = getRemaining(current, target);
  const progress = getGoalProgress(current, target);
  const nextMilestone = getNextMilestone(progress);

  return (
    <section style={featuredGoalCard}>
      <div style={header}>
        <Star color="var(--gold)" />
        <div>
          <p style={eyebrow}>⭐ {p.featuredGoal}</p>
          <h2>{goal.title}</h2>
          <p style={muted}>{goal.option || goal.categoryLabel || p.nextVictory}</p>
        </div>
      </div>

      <div style={youAreHereGrid}>
        <SmallStat label={p.globalProgress} value={`${progress}%`} />
        <SmallStat label={p.remaining} value={formatMoney(remaining, currency)} />
        <SmallStat
          label={p.monthlyContribution}
          value={
            Number(goal.monthlyContribution || 0) > 0
              ? formatMoney(goal.monthlyContribution, currency)
              : "—"
          }
        />
      </div>

      <div style={miniBarBg}>
        <div
          style={{
            ...miniBarFill,
            width: `${progress}%`,
            background: progress >= 80 ? "var(--green)" : "var(--gold)",
          }}
        />
      </div>

      <p style={muted}>
        {p.nextMilestone} :{" "}
        <strong>{progress >= 100 ? p.firstVictory : `${nextMilestone}%`}</strong>
        {goal.targetDate ? ` • ${p.targetDate} : ${goal.targetDate}` : ""}
      </p>
    </section>
  );
}

function OnJaramaBadges({ badges, p }) {
  return (
    <section style={badgesCard}>
      <div style={header}>
        <Award color="var(--gold)" />
        <div>
          <p style={eyebrow}>Premium Polish</p>
          <h2>{p.badges}</h2>
          <p style={muted}>{p.badgesSubtitle}</p>
        </div>
      </div>

      <div style={badgeGrid}>
        {badges.map((badge) => (
          <div
            key={badge.id}
            style={{
              ...badgeTile,
              opacity: badge.unlocked ? 1 : 0.52,
              borderColor: badge.unlocked ? badge.color : "var(--border)",
            }}
          >
            <span style={{ color: badge.unlocked ? badge.color : "var(--text-muted)" }}>
              {badge.icon}
            </span>
            <strong>{badge.title}</strong>
            <small style={mutedSmall}>
              {badge.unlocked ? "Débloqué" : "À venir"}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}

function PremiumVerticalTimeline({ steps, p }) {
  return (
    <section style={premiumTimelineCard}>
      <div style={header}>
        <Route color="var(--green)" />
        <div>
          <p style={eyebrow}>{p.premiumTimeline}</p>
          <h2>{p.story}</h2>
        </div>
      </div>

      <div style={verticalTimeline}>
        {steps.map((step, index) => (
          <div key={step.id} style={verticalTimelineRow}>
            <div style={verticalRailWrap}>
              <span
                style={{
                  ...verticalDot,
                  borderColor: step.current
                    ? "var(--gold)"
                    : step.done
                      ? step.color
                      : "var(--border)",
                  color: step.current
                    ? "var(--gold)"
                    : step.done
                      ? step.color
                      : "var(--text-muted)",
                  boxShadow: step.current
                    ? "0 0 20px rgba(212,175,55,.35)"
                    : "none",
                }}
              >
                {step.current ? "📍" : step.done ? "●" : step.final ? "🏆" : "○"}
              </span>
              {index < steps.length - 1 && <span style={verticalLine} />}
            </div>

            <div
              style={{
                ...verticalContent,
                borderColor: step.current
                  ? "var(--gold)"
                  : step.done
                    ? step.color
                    : "var(--border)",
              }}
            >
              <strong>{step.title}</strong>
              <p style={mutedSmall}>{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InsightStat({ icon, label, start, current, change, color, p }) {
  return (
    <div style={{ ...insightStat, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <strong>{label}</strong>

      <div style={insightRows}>
        <SmallStat label={p.startedWith} value={start} />
        <SmallStat label={p.now} value={current} />
        <SmallStat label={p.changed} value={change} />
      </div>
    </div>
  );
}

function JourneyMilestones({ progress, p }) {
  const safeProgress = Math.min(100, Math.max(0, Number(progress || 0)));

  const steps = [
    { value: 0, label: "🚩 0%" },
    { value: 25, label: "🚩 25%" },
    { value: 50, label: "🚩 50%" },
    { value: 75, label: "🚩 75%" },
    { value: 100, label: "🏆 100%" },
  ];

  return (
    <section style={milestoneProgressCard}>
      <div style={header}>
        <Flag color="var(--gold)" />
        <div>
          <p style={eyebrow}>Smart Journey</p>
          <h2>Jalons du parcours</h2>
          <p style={muted}>{p.progressSinceStart}</p>
        </div>
      </div>

      <div style={milestoneTrack}>
        <div
          style={{
            ...milestoneTrackFill,
            width: `${safeProgress}%`,
          }}
        />

        {steps.map((step) => (
          <span
            key={step.value}
            style={{
              ...milestoneDot,
              left: `${step.value}%`,
              borderColor:
                safeProgress >= step.value ? "var(--gold)" : "var(--border)",
              background:
                safeProgress >= step.value ? "var(--gold)" : "var(--bg-card)",
            }}
          />
        ))}
      </div>

      <div style={milestoneLabelRow}>
        {steps.map((step) => (
          <span
            key={step.label}
            style={{
              color:
                safeProgress >= step.value ? "var(--gold)" : "var(--text-muted)",
              fontWeight: safeProgress >= step.value ? 900 : 700,
            }}
          >
            {step.label}
          </span>
        ))}
      </div>

      <p style={muted}>
        {p.globalProgress} : <strong>{safeProgress}%</strong>
      </p>
    </section>
  );
}

function Milestone({ icon, title, subtitle, active, color }) {
  return (
    <div
      style={{
        ...milestone,
        borderColor: active ? color : "var(--border)",
        opacity: active ? 1 : 0.62,
      }}
    >
      <div
        style={{
          ...milestoneIcon,
          color: active ? color : "var(--text-muted)",
          borderColor: active ? color : "var(--border)",
        }}
      >
        {icon}
      </div>

      <div>
        <strong>
          {active ? "✓ " : "○ "}
          {title}
        </strong>
        <p style={mutedSmall}>{subtitle}</p>
      </div>
    </div>
  );
}

function getTodayActions({ priorityDebt, highlightedGoal, simulatorGoal, goals, p }) {
  if (priorityDebt) {
    return [`Continuer ${priorityDebt.name}`, p.updateSituation, p.manageGoals];
  }

  if (highlightedGoal) {
    return [`Ajouter un dépôt à ${highlightedGoal.title}`, p.manageGoals, p.openSimulator];
  }

  if (simulatorGoal) {
    return ["Revoir la simulation créée", p.openSimulator, p.manageGoals];
  }

  if (goals.length === 0) {
    return [p.addDebtGoal, p.manageGoals, p.openSimulator];
  }

  return [p.openPlan, p.manageGoals, p.updateSituation];
}

function getDaysSinceStart(createdAt) {
  if (!createdAt) return 0;

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return 0;

  return Math.max(
    0,
    Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
}

function formatDate(dateValue, language) {
  if (!dateValue) return "—";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";

  const locale =
    language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA";

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDisciplineColor(score) {
  if (score <= 20) return "var(--red)";
  if (score <= 40) return "var(--gold)";
  if (score <= 60) return "var(--blue)";
  if (score <= 80) return "var(--purple)";
  return "var(--green)";
}

function getDisciplineLevelV2(score, language) {
  const value = Number(score || 0);
  const labels = {
    FR: ["Départ", "Régulier", "Constant", "Déterminé", "Exemplaire"],
    EN: ["Starting", "Regular", "Consistent", "Determined", "Exemplary"],
    ES: ["Inicio", "Regular", "Constante", "Determinado", "Ejemplar"],
  };
  const messages = {
    FR: [
      "Le parcours commence tranquillement.",
      "Le rythme se construit.",
      "La constance devient visible.",
      "Vous avancez avec intention.",
      "Discipline forte, sans pression.",
    ],
    EN: [
      "The journey is starting gently.",
      "The rhythm is building.",
      "Consistency is becoming visible.",
      "You are moving with intention.",
      "Strong discipline, without pressure.",
    ],
    ES: [
      "El camino empieza con calma.",
      "El ritmo se está construyendo.",
      "La constancia se vuelve visible.",
      "Avanzas con intención.",
      "Disciplina fuerte, sin presión.",
    ],
  };

  const key = labels[language] ? language : "FR";
  let index = 0;

  if (value > 80) index = 4;
  else if (value > 60) index = 3;
  else if (value > 40) index = 2;
  else if (value > 20) index = 1;

  return {
    label: labels[key][index],
    message: messages[key][index],
    color: getDisciplineColor(value),
  };
}

function getNextStep({ priorityDebt, highlightedGoal, simulatorGoal, goals, p }) {
  if (priorityDebt) {
    return {
      text: `Réduire ${priorityDebt.name} reste la priorité actuelle.`,
      button: p.updateSituation,
      page: "situation",
    };
  }

  if (highlightedGoal) {
    return {
      text: `Continuer ${highlightedGoal.title} pour créer la prochaine victoire.`,
      button: p.manageGoals,
      page: "objectifs",
    };
  }

  if (simulatorGoal) {
    return {
      text: "Transformer votre simulation en objectif suivi.",
      button: p.openSimulator,
      page: "simulateur",
    };
  }

  if (goals.length === 0) {
    return {
      text: p.addDebtGoal,
      button: p.manageGoals,
      page: "objectifs",
    };
  }

  return {
    text: "Ouvrir Mon Plan pour garder une action claire.",
    button: p.openPlan,
    page: "monplan",
  };
}

function getNextVictoryInsight({ priorityDebt, highlightedGoal, currency, p }) {
  if (priorityDebt) {
    const balance = Number(priorityDebt.balance || 0);
    const nextThreshold = Math.max(0, Math.floor((balance - 1) / 1000) * 1000);
    const amountToThreshold = Math.max(0, balance - nextThreshold);
    const progress =
      balance > 0
        ? Math.min(
            100,
            Math.max(5, Math.round(((1000 - amountToThreshold) / 1000) * 100))
          )
        : 100;

    return {
      title: `${priorityDebt.name} ${p.underThreshold}`,
      text: `${formatMoney(amountToThreshold, currency)} avant le prochain palier.`,
      button: p.updateSituation,
      page: "situation",
      progress,
      color: "var(--gold)",
    };
  }

  if (highlightedGoal) {
    const current = Number(highlightedGoal.currentAmount || 0);
    const target = Number(highlightedGoal.targetAmount || 0);
    const remaining = getRemaining(current, target);
    const progress = getGoalProgress(current, target);

    return {
      title: highlightedGoal.title,
      text: `${formatMoney(remaining, currency)} ${p.remaining.toLowerCase()}.`,
      button: p.manageGoals,
      page: "objectifs",
      progress,
      color: progress >= 80 ? "var(--green)" : "var(--blue)",
    };
  }

  return {
    title: p.recommendedAction,
    text: p.addDebtGoal,
    button: p.manageGoals,
    page: "objectifs",
    progress: 0,
    color: "var(--gold)",
  };
}

function buildVictoryHistory({ debts, firstGoal, lastDepositGoal, achievedGoals, p, currency }) {
  const firstDebt = debts.find((debt) => Number(debt.balance || 0) > 0);

  return [
    {
      id: "first-debt",
      icon: <CreditCard />,
      title: p.firstDebtAdded,
      subtitle: firstDebt ? firstDebt.name : p.noDebt,
      active: Boolean(firstDebt),
      color: "var(--red)",
    },
    {
      id: "first-goal",
      icon: <Target />,
      title: p.createdGoal,
      subtitle: firstGoal?.title || p.addDebtGoal,
      active: Boolean(firstGoal),
      color: "var(--gold)",
    },
    {
      id: "first-deposit",
      icon: <PiggyBank />,
      title: p.firstDeposit,
      subtitle: lastDepositGoal
        ? `${lastDepositGoal.title} • +${formatMoney(lastDepositGoal.lastDeposit.amount, currency)}`
        : p.emergencySubtitle,
      active: Boolean(lastDepositGoal),
      color: "var(--green)",
    },
    {
      id: "first-victory",
      icon: <Trophy />,
      title: p.firstVictory,
      subtitle: achievedGoals[0]?.title || p.noVictory,
      active: achievedGoals.length > 0,
      color: "var(--gold)",
    },
  ];
}

function getStartingDebt(debts) {
  const totalCurrent = debts.reduce((sum, debt) => sum + Number(debt.balance || 0), 0);
  const explicitStart = debts.reduce(
    (sum, debt) =>
      sum +
      Number(
        debt.startingBalance ||
          debt.initialBalance ||
          debt.originalBalance ||
          debt.startBalance ||
          debt.balance ||
          0
      ),
    0
  );

  return Math.max(totalCurrent, explicitStart);
}

function getCurrentPosition({
  firstGoal,
  lastDepositGoal,
  achievedGoals,
  highlightedGoal,
  priorityDebt,
  globalGoalProgress,
  nextStep,
  p,
}) {
  if (!firstGoal) {
    return {
      text: p.notStarted,
      nextLabel: p.manageGoals,
      stage: "start",
    };
  }

  if (achievedGoals.length > 0) {
    return {
      text: `${p.firstVictory} : ${achievedGoals[0].title}`,
      nextLabel: p.nextVictory,
      stage: "victory",
    };
  }

  if (globalGoalProgress >= 75) {
    return {
      text: `${p.globalProgress} : ${globalGoalProgress}%. ${p.nextVictory} approche.`,
      nextLabel: "100%",
      stage: "75",
    };
  }

  if (globalGoalProgress >= 50) {
    return {
      text: `${p.globalProgress} : ${globalGoalProgress}%. Garder le rythme.`,
      nextLabel: "75%",
      stage: "50",
    };
  }

  if (globalGoalProgress >= 25) {
    return {
      text: `${p.globalProgress} : ${globalGoalProgress}%. La base est lancée.`,
      nextLabel: "50%",
      stage: "25",
    };
  }

  if (lastDepositGoal) {
    return {
      text: `${p.firstDeposit} : ${lastDepositGoal.title}`,
      nextLabel: "25%",
      stage: "deposit",
    };
  }

  if (priorityDebt) {
    return {
      text: `${p.priorityDebt} : ${priorityDebt.name}`,
      nextLabel: p.updateSituation,
      stage: "debt",
    };
  }

  if (highlightedGoal) {
    return {
      text: `${p.featuredGoal} : ${highlightedGoal.title}`,
      nextLabel: p.firstDeposit,
      stage: "goal",
    };
  }

  return {
    text: nextStep.text,
    nextLabel: p.nextStep,
    stage: "next",
  };
}

function buildBadges({ firstGoal, lastDepositGoal, achievedGoals, globalGoalProgress, p }) {
  return [
    {
      id: "first-goal",
      icon: "🏅",
      title: p.createdGoal,
      unlocked: Boolean(firstGoal),
      color: "var(--gold)",
    },
    {
      id: "first-deposit",
      icon: "🏅",
      title: p.firstDeposit,
      unlocked: Boolean(lastDepositGoal),
      color: "var(--green)",
    },
    {
      id: "25",
      icon: "🏅",
      title: "25 %",
      unlocked: globalGoalProgress >= 25,
      color: "var(--blue)",
    },
    {
      id: "50",
      icon: "🏅",
      title: "50 %",
      unlocked: globalGoalProgress >= 50,
      color: "var(--purple)",
    },
    {
      id: "75",
      icon: "🏅",
      title: "75 %",
      unlocked: globalGoalProgress >= 75,
      color: "var(--gold)",
    },
    {
      id: "victory",
      icon: "🏆",
      title: p.firstVictory,
      unlocked: achievedGoals.length > 0,
      color: "var(--green)",
    },
  ];
}

function buildPremiumTimeline({
  firstGoal,
  lastDepositGoal,
  achievedGoals,
  youAreHere,
  nextVictoryInsight,
  p,
}) {
  return [
    {
      id: "start",
      title: p.startingPoint,
      subtitle: firstGoal ? p.started : p.notStarted,
      done: Boolean(firstGoal),
      current: !firstGoal,
      color: "var(--blue)",
    },
    {
      id: "goal",
      title: p.createdGoal,
      subtitle: firstGoal?.title || p.addDebtGoal,
      done: Boolean(firstGoal),
      current: youAreHere.stage === "goal",
      color: "var(--gold)",
    },
    {
      id: "deposit",
      title: p.firstDeposit,
      subtitle: lastDepositGoal?.title || p.emergencySubtitle,
      done: Boolean(lastDepositGoal),
      current: youAreHere.stage === "deposit",
      color: "var(--green)",
    },
    {
      id: "current",
      title: `📍 ${p.youAreHere}`,
      subtitle: youAreHere.text,
      done: false,
      current: true,
      color: "var(--gold)",
    },
    {
      id: "next",
      title: p.nextStep,
      subtitle: nextVictoryInsight.text,
      done: false,
      current: false,
      color: "var(--blue)",
    },
    {
      id: "victory",
      title: p.firstVictory,
      subtitle: achievedGoals[0]?.title || p.noVictory,
      done: achievedGoals.length > 0,
      current: false,
      final: true,
      color: "var(--green)",
    },
  ];
}

function getNextMilestone(progress) {
  if (progress < 25) return 25;
  if (progress < 50) return 50;
  if (progress < 75) return 75;
  if (progress < 100) return 100;
  return 100;
}

function GoalStep({
  goals,
  category,
  stepLabel,
  fallbackTitle,
  fallbackSubtitle,
  icon,
  color,
  currency,
  p,
}) {
  const goal =
    goals.find((item) => item.category === category && item.highlighted) ||
    goals.find((item) => item.category === category);

  const current = Number(goal?.currentAmount || 0);
  const target = Number(goal?.targetAmount || 0);
  const remaining = getRemaining(current, target);
  const progress = getGoalProgress(current, target);

  return (
    <TimelineStep
      icon={icon}
      stepLabel={stepLabel}
      title={goal?.title || fallbackTitle}
      subtitle={goal?.option || fallbackSubtitle}
      current={formatMoney(current, currency)}
      target={target > 0 ? formatMoney(target, currency) : "À définir"}
      remaining={formatMoney(remaining, currency)}
      progress={progress}
      action={
        goal?.targetDate
          ? `${p.targetDate} : ${goal.targetDate}`
          : goal?.source === "simulateur"
            ? p.simulatorAdvice
            : fallbackSubtitle
      }
      color={color}
      p={p}
    />
  );
}

function TimelineStep({
  icon,
  stepLabel,
  title,
  subtitle,
  current,
  target,
  remaining,
  progress,
  action,
  color,
  p,
}) {
  const safeProgress = Math.min(100, Math.max(0, Number(progress || 0)));

  return (
    <div style={step}>
      <div style={{ ...stepIcon, color }}>{icon}</div>

      <div style={{ flex: 1 }}>
        <p style={{ ...stepLabelStyle, color }}>{stepLabel}</p>

        <div style={stepTop}>
          <strong>{title}</strong>
          <strong style={{ color }}>{safeProgress}%</strong>
        </div>

        <p style={mutedSmall}>{subtitle}</p>

        <div style={amountGrid}>
          <SmallStat label={p.current} value={current} />
          <SmallStat label={p.target} value={target} />
          <SmallStat label={p.remaining} value={remaining} />
        </div>

        <div style={barBg}>
          <div
            style={{
              ...barFill,
              width: `${safeProgress}%`,
              background: color,
            }}
          />
        </div>

        <p style={actionText}>{action}</p>

        {safeProgress >= 100 && <p style={victoryText}>🏆 Objectif atteint</p>}
      </div>
    </div>
  );
}

function SmallStat({ label, value }) {
  return (
    <div style={smallStat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InfoCard({ icon, title, value, color }) {
  return (
    <div style={{ ...infoCard, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <p style={mutedSmall}>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

function getRemaining(current, target) {
  return Math.max(0, Number(target || 0) - Number(current || 0));
}

function getGoalProgress(current, target) {
  if (!target || Number(target) <= 0) return 0;

  return Math.min(
    100,
    Math.round((Number(current || 0) / Number(target || 0)) * 100)
  );
}

function getDebtProgress(balance) {
  const amount = Number(balance || 0);

  if (amount <= 0) return 100;
  if (amount >= 20000) return 10;
  if (amount >= 15000) return 25;
  if (amount >= 10000) return 40;
  if (amount >= 5000) return 60;
  if (amount >= 1000) return 80;

  return 90;
}

const pageWrap = {
  paddingBottom: "10px",
};

const youAreHereCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.28), transparent 34%), linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
  boxShadow: "0 0 24px rgba(212,175,55,.12)",
};

const featuredGoalCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(59,130,246,.07), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const badgesCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.12), rgba(34,197,94,.08), var(--bg-card))",
  border: "1px solid rgba(212,175,55,.65)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const premiumTimelineCard = {
  background:
    "linear-gradient(135deg, rgba(34,197,94,.12), rgba(212,175,55,.08), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const youAreHereGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const badgeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(118px, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const badgeTile = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "5px",
};

const verticalTimeline = {
  display: "grid",
  gap: "0",
};

const verticalTimelineRow = {
  display: "grid",
  gridTemplateColumns: "36px 1fr",
  gap: "12px",
};

const verticalRailWrap = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
};

const verticalDot = {
  width: "30px",
  height: "30px",
  borderRadius: "999px",
  border: "2px solid var(--border)",
  background: "var(--bg-card)",
  display: "grid",
  placeItems: "center",
  fontSize: "13px",
  zIndex: 1,
};

const verticalLine = {
  position: "absolute",
  top: "30px",
  bottom: "-8px",
  width: "2px",
  background: "linear-gradient(var(--gold), rgba(212,175,55,.12))",
};

const verticalContent = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  marginBottom: "12px",
};

const milestoneProgressCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.24), transparent 34%), linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const milestoneTrack = {
  position: "relative",
  height: "14px",
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "999px",
  marginTop: "18px",
  marginLeft: "3px",
  marginRight: "3px",
};

const milestoneTrackFill = {
  height: "100%",
  borderRadius: "999px",
  background: "linear-gradient(90deg, var(--gold), var(--green))",
};

const milestoneDot = {
  position: "absolute",
  top: "50%",
  width: "18px",
  height: "18px",
  borderRadius: "999px",
  border: "2px solid var(--border)",
  transform: "translate(-50%, -50%)",
  boxShadow: "0 0 12px rgba(212,175,55,.18)",
};

const milestoneLabelRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "6px",
  marginTop: "12px",
  fontSize: "11px",
};

const smartHeaderCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), linear-gradient(135deg, rgba(15,23,42,.98), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const insightsCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(34,197,94,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const nextVictorySmartCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const fundingOriginCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.12), rgba(34,197,94,.06), var(--bg-card))",
  border: "1px solid rgba(212,175,55,.55)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const historyCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.12), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const insightsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
  marginTop: "14px",
};

const insightStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "10px",
};

const insightRows = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
};

const journeyGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const journeyStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "6px",
  minHeight: "94px",
};

const todayCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.16), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const todayList = {
  display: "grid",
  gap: "9px",
  marginTop: "14px",
};

const todayLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "11px",
  display: "flex",
  alignItems: "center",
  gap: "9px",
};

const disciplineCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const nextStepCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.14), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const victoryCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.16), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const milestone = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  marginTop: "10px",
  display: "grid",
  gridTemplateColumns: "42px 1fr",
  gap: "10px",
  alignItems: "center",
};

const milestoneIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  border: "1px solid var(--border)",
  background: "var(--bg-card)",
  display: "grid",
  placeItems: "center",
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

const heroCard = {
  background: "linear-gradient(135deg,#2a210b,var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "22px",
  marginTop: "20px",
};

const grid = {
  gap: "12px",
  marginTop: "18px",
};

const infoCard = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
};

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const adviceCard = {
  background: "linear-gradient(135deg, rgba(139,92,246,.18), var(--bg-card))",
  border: "1px solid var(--purple)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const cloudCard = {
  background: "linear-gradient(135deg, rgba(59,130,246,.14), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px",
};

const eyebrow = {
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
  margin: 0,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

const eyebrowGreen = {
  ...eyebrow,
  color: "var(--green)",
};

const step = {
  display: "flex",
  gap: "12px",
  padding: "16px 0",
  borderBottom: "1px solid var(--border)",
};

const stepIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  background: "var(--bg-panel)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0 0 auto",
};

const stepTop = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const stepLabelStyle = {
  margin: "0 0 6px",
  fontSize: "12px",
  fontWeight: "900",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const amountGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  marginTop: "10px",
};

const smallStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: "12px",
};

const barBg = {
  height: "10px",
  background: "var(--bg-panel)",
  borderRadius: "999px",
  marginTop: "10px",
};

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

const actionText = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "8px",
};

const victoryText = {
  color: "var(--green)",
  fontWeight: "bold",
  fontSize: "13px",
  marginTop: "8px",
};

const blueBtn = {
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(90deg,var(--purple),var(--blue))",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "5px",
};

export default Parcours;