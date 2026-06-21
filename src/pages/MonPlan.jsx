import {
  AlertTriangle,
  Award,
  CalendarDays,
  CheckCircle,
  Clock3,
  Compass,
  CreditCard,
  Flag,
  Gauge,
  Lightbulb,
  PiggyBank,
  Route,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { formatMoney } from "../utils/formatters";

function MonPlan({
  financeData,
  selectedGoals,
  settings,
  setCurrentPage,
  activityHistory,
  disciplineScore,
  smartAllocationEngine,
}) {
  const currency = settings?.currency || "CAD";
  const language = settings?.language || "FR";
  const [nextAmount, setNextAmount] = useState("500");

  const text = getPageText(language);
  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];
  const history = Array.isArray(activityHistory) ? activityHistory : [];

  const overview = financeData?.overview || {};
  const monthlyIncome = Number(overview.monthlyIncome || 0);
  const monthlyExpenses = Number(overview.monthlyExpenses || 0);
  const monthlySavings = Number(overview.monthlySavings || 0);
  const monthlyAvailable = monthlyIncome - monthlyExpenses - monthlySavings;
  const monthlyCapacity = Math.max(0, monthlyAvailable + monthlySavings);

  const debtTotal = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = getPriorityDebt(debts);

  const enrichedGoals = goals.map((goal) => ({
    ...goal,
    progress: getGoalProgress(goal),
    remaining: getGoalRemaining(goal),
  }));

  const mainGoal =
    enrichedGoals.find((goal) => goal.highlighted) || enrichedGoals[0];

  const closestGoal = [...enrichedGoals]
    .filter((goal) => Number(goal.targetAmount || 0) > 0)
    .sort((a, b) => b.progress - a.progress)[0];

  const achievedGoals = enrichedGoals.filter((goal) => goal.progress >= 100);

  const firstGoal = [...enrichedGoals].sort(
    (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  )[0];

  const totalGoalTarget = enrichedGoals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );
  const totalGoalCurrent = enrichedGoals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );
  const goalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 0;

  const disciplineValue =
    Number(disciplineScore?.score || 0) ||
    calculateDisciplineFromHistory(history, enrichedGoals);

  const onjaramaScore = calculateOnJaramaScore({
    monthlyIncome,
    monthlyAvailable,
    monthlySavings,
    debtTotal,
    goalProgress,
    achievedGoals,
    disciplineValue,
  });

  const commandLevel = getCommandLevel(onjaramaScore.value, disciplineValue, text);

  const allocation = smartAllocationEngine?.allocations?.length
    ? normalizeExternalAllocation(smartAllocationEngine, currency)
    : buildSmartAllocation({
        monthlyAvailable,
        monthlySavings,
        priorityDebt,
        goals: enrichedGoals,
        mainGoal,
      });

  const dailyAction = buildDailyAction({
    priorityDebt,
    mainGoal,
    closestGoal,
    allocation,
    monthlyCapacity,
    currency,
    text,
  });

  const nextAction = getNextAction({
    priorityDebt,
    debtTotal,
    mainGoal,
    closestGoal,
    achievedGoals,
    currency,
    text,
  });

  const ninetyDayPlan = useMemo(
    () =>
      buildNinetyDayPlan({
        priorityDebt,
        goals: enrichedGoals,
        mainGoal,
        monthlyCapacity,
        language,
        text,
      }),
    [priorityDebt, enrichedGoals, mainGoal, monthlyCapacity, language, text]
  );

  const cap = buildCurrentCap({
    priorityDebt,
    mainGoal,
    closestGoal,
    monthlyCapacity,
    currency,
    language,
    text,
  });

  const autoProjection = buildAutoProjection({
    priorityDebt,
    goals: enrichedGoals,
    monthlyCapacity,
    currency,
    text,
  });

  const nextAmountValue = Number(nextAmount || 0);
  const nextAmountPlan = buildSmartAllocation({
    monthlyAvailable: nextAmountValue,
    monthlySavings: 0,
    priorityDebt,
    goals: enrichedGoals,
    mainGoal,
  });

  const horizonSteps = buildDynamicHorizon({
    priorityDebt,
    goals: enrichedGoals,
    mainGoal,
    text,
  });

  const weekStats = getPeriodStats(history, 7);
  const yearStats = getPeriodStats(history, 365);
  const lastActivity = history[0];
  const lastVictory = history.find((item) => item.type === "victoire");

  return (
    <div className="native-page">
      <div style={pageHead}>
        <div>
          <p style={eyebrow}>OnJarama Path V14.1</p>
          <h1>Smart Plan Engine</h1>
          <p style={muted}>{text.intro}</p>
        </div>

        <Sparkles color="var(--gold)" />
      </div>

      <section style={todayCommandCard}>
        <div style={header}>
          <Lightbulb color="var(--gold)" />
          <div>
            <p style={eyebrow}>{text.today}</p>
            <h2>{text.dailyAction}</h2>
          </div>
        </div>

        <div style={dailyActionBox}>
          <span style={{ ...dailyIcon, color: dailyAction.color }}>
            {dailyAction.icon}
          </span>
          <div style={{ flex: 1 }}>
            <strong>{dailyAction.title}</strong>
            <p style={mutedSmall}>{dailyAction.reason}</p>
          </div>
          <strong style={{ color: dailyAction.color }}>
            {formatMoney(dailyAction.amount, currency)}
          </strong>
        </div>

        <div style={impactGrid}>
          <ImpactTile
            label={text.timeImpact}
            value={dailyAction.timeImpact}
            color="var(--blue)"
          />
          <ImpactTile
            label={text.moneyImpact}
            value={dailyAction.moneyImpact}
            color="var(--green)"
          />
        </div>

        <button onClick={() => setCurrentPage(dailyAction.page)} style={goldButton}>
          {dailyAction.button}
        </button>
      </section>

      <section style={closestGoalCard}>
        <div style={header}>
          <Trophy color="var(--green)" />
          <div>
            <p style={eyebrowGreen}>{text.closestGoal}</p>
            <h2>{closestGoal?.title || text.noGoal}</h2>
          </div>
        </div>

        {closestGoal ? (
          <>
            <div style={smartGrid}>
              <SmallStat label={text.progress} value={`${closestGoal.progress}%`} />
              <SmallStat
                label={text.remaining}
                value={formatMoney(closestGoal.remaining, currency)}
              />
              <SmallStat
                label={text.estimatedDate}
                value={estimateCompletion(
                  closestGoal.remaining,
                  Number(closestGoal.monthlyContribution || 0) || monthlyCapacity,
                  language
                )}
              />
            </div>
            <MiniBar progress={closestGoal.progress} color="var(--green)" />
            <button onClick={() => setCurrentPage("objectifs")} style={greenButton}>
              {text.continueGoal}
            </button>
          </>
        ) : (
          <button onClick={() => setCurrentPage("objectifs")} style={goldButton}>
            {text.createGoal}
          </button>
        )}
      </section>

      <section style={ninetyCard}>
        <div style={header}>
          <CalendarDays color="var(--blue)" />
          <div>
            <p style={eyebrowBlue}>{text.gps}</p>
            <h2>{text.ninetyDays}</h2>
          </div>
        </div>

        <div style={monthPlanList}>
          {ninetyDayPlan.map((month) => (
            <div key={month.label} style={monthPlanCard}>
              <strong style={{ color: month.color }}>{month.label}</strong>
              <div style={monthActionList}>
                {month.actions.map((action) => (
                  <div key={action} style={monthActionLine}>
                    <CheckCircle size={15} color="var(--green)" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={capCard}>
        <div style={header}>
          <Compass color="var(--gold)" />
          <div>
            <p style={eyebrow}>{text.currentCap}</p>
            <h2>{cap.title}</h2>
          </div>
        </div>

        <div style={smartGrid}>
          <SmallStat label={text.currentRhythm} value={cap.currentDate} />
          <SmallStat label={text.acceleratedRhythm} value={cap.acceleratedDate} />
          <SmallStat label={text.gain} value={cap.gainLabel} />
        </div>

        <p style={mutedSmall}>{cap.message}</p>
      </section>

      <section style={levelCard(commandLevel.color)}>
        <div style={header}>
          <Award color={commandLevel.color} />
          <div>
            <p style={eyebrow}>{text.onjaramaLevel}</p>
            <h2>{commandLevel.title}</h2>
            <p style={muted}>{commandLevel.message}</p>
          </div>
        </div>

        <MiniBar progress={commandLevel.progress} color={commandLevel.color} />
      </section>

      <section style={featuredGoalCard}>
        <div style={header}>
          <Target color="var(--gold)" />
          <div>
            <p style={eyebrow}>{text.featuredGoal}</p>
            <h2>{mainGoal?.title || text.toDefine}</h2>
            <p style={muted}>
              {mainGoal
                ? mainGoal.option || mainGoal.categoryLabel || text.activeGoal
                : text.createGoalHint}
            </p>
          </div>
        </div>

        {mainGoal ? (
          <>
            <div style={smartGrid}>
              <SmallStat label={text.progress} value={`${mainGoal.progress}%`} />
              <SmallStat label={text.remaining} value={formatMoney(mainGoal.remaining, currency)} />
              <SmallStat
                label={text.contribution}
                value={
                  Number(mainGoal.monthlyContribution || 0) > 0
                    ? formatMoney(mainGoal.monthlyContribution, currency)
                    : "—"
                }
              />
            </div>
            <MiniBar progress={mainGoal.progress} color="var(--gold)" />
          </>
        ) : (
          <button onClick={() => setCurrentPage("objectifs")} style={goldButton}>
            {text.createGoal}
          </button>
        )}
      </section>

      <section style={allocationCard}>
        <div style={header}>
          <Gauge color="var(--gold)" />
          <h2>{text.smartAllocation}</h2>
        </div>

        <p style={muted}>{text.smartAllocationText}</p>

        <div style={allocationCapacityBox}>
          <small>{text.availableThisMonth}</small>
          <strong>{formatMoney(allocation.capacity, currency)}</strong>
        </div>

        <div style={allocationList}>
          {allocation.lines.map((line) => (
            <AllocationLine key={line.id} line={line} currency={currency} />
          ))}
        </div>
      </section>

      <section style={projectionCard}>
        <div style={header}>
          <CalendarDays color="var(--blue)" />
          <div>
            <p style={eyebrowBlue}>{text.ifContinue}</p>
            <h2>{text.autoProjection}</h2>
          </div>
        </div>

        <div style={projectionList}>
          {autoProjection.map((item) => (
            <ForecastLine
              key={item.id}
              label={item.label}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        <button onClick={() => setCurrentPage("simulateur")} style={blueButton}>
          {text.adjustSimulator}
        </button>
      </section>

      <section style={nextAmountCard}>
        <div style={header}>
          <Compass color="var(--gold)" />
          <div>
            <p style={eyebrow}>Smart Plan Engine V14.1</p>
            <h2>{text.nextAmountQuestion}</h2>
          </div>
        </div>

        <p style={muted}>{text.nextAmountText}</p>

        <div style={amountInputWrap}>
          <input
            value={nextAmount}
            onChange={(event) =>
              setNextAmount(event.target.value.replace(/[^\d]/g, ""))
            }
            inputMode="numeric"
            style={amountInput}
            aria-label={text.amountInputLabel}
          />
          <span style={amountSuffix}>{currency}</span>
        </div>

        <div style={allocationList}>
          {nextAmountPlan.lines.map((line) => (
            <AllocationLine key={`next-${line.id}`} line={line} currency={currency} />
          ))}
        </div>
      </section>

      <section style={horizonCard}>
        <div style={header}>
          <Route color="var(--blue)" />
          <h2>{text.dynamicHorizon}</h2>
        </div>

        <p style={muted}>{text.dynamicHorizonText}</p>

        <div style={horizonList}>
          {horizonSteps.map((step, index) => (
            <HorizonLine key={`${step.title}-${index}`} step={step} index={index} />
          ))}
        </div>
      </section>

      <section style={scoreCard(onjaramaScore.color)}>
        <div style={header}>
          <Gauge color={onjaramaScore.color} />
          <h2>{text.onjaramaScore}</h2>
        </div>

        <div style={scoreRow}>
          <strong style={{ ...scoreValue, color: onjaramaScore.color }}>
            {onjaramaScore.value}/100
          </strong>
          <span style={{ ...scoreBadge, borderColor: onjaramaScore.color }}>
            {onjaramaScore.label}
          </span>
        </div>

        <MiniBar progress={onjaramaScore.value} color={onjaramaScore.color} />
        <p style={muted}>{onjaramaScore.message}</p>
      </section>

      <section style={disciplineCard}>
        <Flag color="var(--gold)" />

        <div style={{ flex: 1 }}>
          <h2>{text.discipline}</h2>
          <p style={muted}>
            {firstGoal
              ? `${text.started} ${getStartedLabel(firstGoal.createdAt, language)}.`
              : text.noStart}
          </p>

          <strong style={{ color: getDisciplineColor(disciplineValue) }}>
            {disciplineValue}% • {getDisciplineLabel(disciplineValue, text)}
          </strong>

          <MiniBar progress={disciplineValue} color={getDisciplineColor(disciplineValue)} />
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--gold)" />
          <h2>{text.automaticPriority}</h2>
        </div>

        <p><strong>{nextAction.title}</strong></p>
        <p style={muted}>{nextAction.description}</p>

        <button onClick={() => setCurrentPage(nextAction.page)} style={goldButton}>
          {nextAction.button}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Clock3 color="var(--blue)" />
          <h2>{text.activityView}</h2>
        </div>

        <div style={periodGrid}>
          <PeriodCard title={text.thisWeek} stats={weekStats} />
          <PeriodCard title={text.thisYear} stats={yearStats} />
        </div>
      </section>

      {lastActivity && (
        <section style={card}>
          <div style={header}>
            <Clock3 color="var(--blue)" />
            <h2>{text.lastActivity}</h2>
          </div>

          <span style={typeBadge}>{labelType(lastActivity.type)}</span>
          <p><strong>{lastActivity.title}</strong></p>
          <p style={muted}>{lastActivity.message}</p>
          <small style={mutedSmall}>{formatDate(lastActivity.createdAt, language)}</small>

          <button onClick={() => setCurrentPage("historique")} style={blueButton}>
            {text.seeHistory}
          </button>
        </section>
      )}

      {lastVictory && (
        <section style={victoryCard}>
          <Trophy color="var(--gold)" />

          <div>
            <h2>{text.lastVictory}</h2>
            <p><strong>{lastVictory.title}</strong></p>
            <p style={muted}>{lastVictory.message}</p>
          </div>
        </section>
      )}

      <section style={card}>
        <div style={header}>
          <CreditCard color={debtTotal > 0 ? "var(--red)" : "var(--green)"} />
          <h2>{text.stepDebt}</h2>
        </div>

        {priorityDebt ? (
          <>
            <p>{text.priorityDebt}: <strong>{priorityDebt.name}</strong></p>
            <p style={muted}>
              {text.rate}: {priorityDebt.interestRate}% • {text.balance}: {formatMoney(priorityDebt.balance, currency)}
            </p>
          </>
        ) : (
          <p style={muted}>{text.noPriorityDebt}</p>
        )}

        <strong>{formatMoney(debtTotal, currency)}</strong>
        <button onClick={() => setCurrentPage("dettes")} style={redButton}>
          {text.seeDebts}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <PiggyBank color="var(--green)" />
          <h2>{text.stepBase}</h2>
        </div>

        <p style={muted}>{text.stepBaseText}</p>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>{text.stepGoals}</h2>
        </div>

        <p><strong>{goals.length}</strong> {text.activeGoals}</p>
        <p style={muted}>{text.globalProgress}: <strong>{goalProgress}%</strong></p>

        <MiniBar progress={goalProgress} color="var(--green)" />

        <button onClick={() => setCurrentPage("objectifs")} style={greenButton}>
          {text.manageGoals}
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Route color="var(--blue)" />
          <h2>{text.stepPath}</h2>
        </div>

        <p style={muted}>{text.stepPathText}</p>

        <button onClick={() => setCurrentPage("parcours")} style={blueButton}>
          {text.seePath}
        </button>
      </section>

      {debtTotal > 0 && (
        <section style={warningCard}>
          <AlertTriangle color="var(--red)" />
          <div>
            <h2>{text.disciplineReminder}</h2>
            <p style={muted}>{text.disciplineReminderText}</p>
          </div>
        </section>
      )}

      {achievedGoals.length > 0 && (
        <section style={successCard}>
          <Sparkles color="var(--gold)" />
          <div>
            <h2>{text.victorySaved}</h2>
            <p style={muted}>
              {achievedGoals.length} {text.goalReached}
            </p>
          </div>
        </section>
      )}

      <section style={successCard}>
        <CheckCircle color="var(--green)" />
        <div>
          <h2>{text.finalGoal}</h2>
          <p style={muted}>{text.finalGoalText}</p>
        </div>
      </section>
    </div>
  );
}

function getPageText(language) {
  const texts = {
    FR: {
      intro:
        "Mon Plan devient le cerveau financier : action du jour, cap actuel, plan 90 jours et priorité automatique.",
      today: "Aujourd’hui",
      dailyAction: "Action du jour",
      timeImpact: "Temps estimé gagné",
      moneyImpact: "Intérêts / effort évité",
      closestGoal: "Objectif le plus proche",
      noGoal: "À définir",
      progress: "Progression",
      remaining: "Reste",
      estimatedDate: "Date estimée",
      continueGoal: "Continuer",
      createGoal: "Créer un objectif",
      gps: "GPS financier",
      ninetyDays: "Mon plan des 90 prochains jours",
      currentCap: "Cap actuel",
      currentRhythm: "Rythme actuel",
      acceleratedRhythm: "Rythme accéléré",
      gain: "Gain",
      onjaramaLevel: "Niveau OnJarama",
      featuredGoal: "Objectif vedette",
      toDefine: "À définir",
      activeGoal: "Objectif actif",
      createGoalHint: "Créez un objectif pour activer le GPS financier.",
      contribution: "Contribution",
      smartAllocation: "Répartition intelligente",
      smartAllocationText:
        "OnJarama propose une répartition simple selon vos dettes, votre marge et vos objectifs actifs.",
      availableThisMonth: "Disponible ce mois",
      ifContinue: "Si je continue ainsi",
      autoProjection: "Projection automatique",
      adjustSimulator: "Ajuster dans le simulateur",
      nextAmountQuestion: "Que faire avec mon prochain montant ?",
      nextAmountText:
        "Entrez un montant disponible et OnJarama propose une répartition simple selon la priorité actuelle.",
      amountInputLabel: "Montant disponible à répartir",
      dynamicHorizon: "Horizon dynamique",
      dynamicHorizonText:
        "L’ordre conseillé évolue selon vos priorités : réduire, protéger, puis accélérer les projets.",
      onjaramaScore: "Score financier OnJarama",
      discipline: "Discipline OnJarama",
      started: "Vous avez commencé votre parcours",
      noStart: "Votre parcours commence dès votre premier objectif.",
      automaticPriority: "Priorité automatique",
      activityView: "Vue activité",
      thisWeek: "Cette semaine",
      thisYear: "Cette année",
      lastActivity: "Dernière activité",
      seeHistory: "Voir l’historique",
      lastVictory: "Dernière victoire",
      stepDebt: "Étape 1 — Réduire les dettes",
      priorityDebt: "Dette prioritaire",
      rate: "Taux",
      balance: "Solde",
      noPriorityDebt: "Aucune dette prioritaire détectée.",
      seeDebts: "Voir mes dettes",
      stepBase: "Étape 2 — Protéger votre base",
      stepBaseText:
        "Garder une petite épargne aide à éviter de retourner au crédit en cas d’imprévu.",
      stepGoals: "Étape 3 — Avancer les objectifs",
      activeGoals: "objectifs actifs",
      globalProgress: "Progression globale",
      manageGoals: "Gérer mes objectifs",
      stepPath: "Étape 4 — Suivre le parcours",
      stepPathText:
        "Le parcours vous aide à garder la discipline : une action claire à la fois.",
      seePath: "Voir mon parcours",
      disciplineReminder: "Rappel discipline",
      disciplineReminderText:
        "Évitez d’ajouter un nouveau financement tant que la dette prioritaire reste élevée.",
      victorySaved: "Victoire enregistrée",
      goalReached: "objectif(s) atteint(s). OnJarama garde le cap.",
      finalGoal: "Objectif final",
      finalGoalText:
        "Moins de pression, plus de contrôle, et des projets personnels qui avancent réellement.",
      levels: ["🌱 Départ", "🚶 En progression", "🏃 Discipline", "🔥 Momentum", "👑 Maîtrise"],
      levelMessages: [
        "Le parcours commence. L’objectif est simple : clarifier, choisir, agir.",
        "La discipline se construit. Une petite action régulière vaut mieux qu’un grand effort isolé.",
        "Le plan se stabilise. Gardez une action principale et protégez la marge.",
        "Le rythme est solide. La priorité est de transformer la constance en résultats visibles.",
        "La base est forte. OnJarama peut maintenant aider à accélérer les projets long terme.",
      ],
      actionDebt: "Réduire",
      actionGoal: "Avancer",
      actionCreate: "Créer votre premier objectif",
      actionBase: "Reprendre du souffle",
      seeGoal: "Voir mes objectifs",
      seePlan: "Voir Mon Plan",
      months: "mois",
      days: "jours",
      noGain: "À confirmer",
    },
    EN: {
      intro:
        "My Plan becomes the financial brain: daily action, current direction, 90-day plan and automatic priority.",
      today: "Today",
      dailyAction: "Daily action",
      timeImpact: "Estimated time saved",
      moneyImpact: "Interest / effort avoided",
      closestGoal: "Closest goal",
      noGoal: "To define",
      progress: "Progress",
      remaining: "Remaining",
      estimatedDate: "Estimated date",
      continueGoal: "Continue",
      createGoal: "Create a goal",
      gps: "Financial GPS",
      ninetyDays: "My 90-day plan",
      currentCap: "Current direction",
      currentRhythm: "Current rhythm",
      acceleratedRhythm: "Accelerated rhythm",
      gain: "Gain",
      onjaramaLevel: "OnJarama level",
      featuredGoal: "Featured goal",
      toDefine: "To define",
      activeGoal: "Active goal",
      createGoalHint: "Create a goal to activate the financial GPS.",
      contribution: "Contribution",
      smartAllocation: "Smart allocation",
      smartAllocationText:
        "OnJarama suggests a simple split based on debts, margin and active goals.",
      availableThisMonth: "Available this month",
      ifContinue: "If I keep going",
      autoProjection: "Automatic projection",
      adjustSimulator: "Adjust in simulator",
      nextAmountQuestion: "What should I do with my next amount?",
      nextAmountText:
        "Enter an available amount and OnJarama suggests a simple split based on the current priority.",
      amountInputLabel: "Available amount to allocate",
      dynamicHorizon: "Dynamic horizon",
      dynamicHorizonText:
        "The recommended order evolves with your priorities: reduce, protect, then accelerate projects.",
      onjaramaScore: "OnJarama financial score",
      discipline: "OnJarama discipline",
      started: "You started your path",
      noStart: "Your path starts with your first goal.",
      automaticPriority: "Automatic priority",
      activityView: "Activity view",
      thisWeek: "This week",
      thisYear: "This year",
      lastActivity: "Last activity",
      seeHistory: "View history",
      lastVictory: "Last victory",
      stepDebt: "Step 1 — Reduce debts",
      priorityDebt: "Priority debt",
      rate: "Rate",
      balance: "Balance",
      noPriorityDebt: "No priority debt detected.",
      seeDebts: "View my debts",
      stepBase: "Step 2 — Protect your base",
      stepBaseText:
        "Keeping a small emergency base helps avoid going back to credit.",
      stepGoals: "Step 3 — Move goals forward",
      activeGoals: "active goals",
      globalProgress: "Global progress",
      manageGoals: "Manage my goals",
      stepPath: "Step 4 — Follow the path",
      stepPathText:
        "The path helps keep discipline: one clear action at a time.",
      seePath: "View my path",
      disciplineReminder: "Discipline reminder",
      disciplineReminderText:
        "Avoid adding new financing while the priority debt remains high.",
      victorySaved: "Victory saved",
      goalReached: "goal(s) reached. OnJarama keeps the direction.",
      finalGoal: "Final goal",
      finalGoalText:
        "Less pressure, more control, and personal projects that truly move forward.",
      levels: ["🌱 Start", "🚶 Progress", "🏃 Discipline", "🔥 Momentum", "👑 Mastery"],
      levelMessages: [
        "The path begins. The goal is simple: clarify, choose, act.",
        "Discipline is building. A small regular action beats one isolated big effort.",
        "The plan is stabilizing. Keep one main action and protect margin.",
        "The rhythm is strong. Turn consistency into visible results.",
        "The base is strong. OnJarama can now help accelerate long-term projects.",
      ],
      actionDebt: "Reduce",
      actionGoal: "Advance",
      actionCreate: "Create your first goal",
      actionBase: "Rebuild breathing room",
      seeGoal: "View my goals",
      seePlan: "View My Plan",
      months: "months",
      days: "days",
      noGain: "To confirm",
    },
    ES: {
      intro:
        "Mi Plan se vuelve el cerebro financiero: acción diaria, rumbo actual, plan de 90 días y prioridad automática.",
      today: "Hoy",
      dailyAction: "Acción del día",
      timeImpact: "Tiempo estimado ganado",
      moneyImpact: "Intereses / esfuerzo evitado",
      closestGoal: "Objetivo más cercano",
      noGoal: "Por definir",
      progress: "Progreso",
      remaining: "Resta",
      estimatedDate: "Fecha estimada",
      continueGoal: "Continuar",
      createGoal: "Crear un objetivo",
      gps: "GPS financiero",
      ninetyDays: "Mi plan de los próximos 90 días",
      currentCap: "Rumbo actual",
      currentRhythm: "Ritmo actual",
      acceleratedRhythm: "Ritmo acelerado",
      gain: "Ganancia",
      onjaramaLevel: "Nivel OnJarama",
      featuredGoal: "Objetivo destacado",
      toDefine: "Por definir",
      activeGoal: "Objetivo activo",
      createGoalHint: "Crea un objetivo para activar el GPS financiero.",
      contribution: "Contribución",
      smartAllocation: "Repartición inteligente",
      smartAllocationText:
        "OnJarama propone una repartición simple según tus deudas, margen y objetivos activos.",
      availableThisMonth: "Disponible este mes",
      ifContinue: "Si sigo así",
      autoProjection: "Proyección automática",
      adjustSimulator: "Ajustar en el simulador",
      nextAmountQuestion: "¿Qué hacer con mi próximo monto?",
      nextAmountText:
        "Ingresa un monto disponible y OnJarama propone una repartición simple según la prioridad actual.",
      amountInputLabel: "Monto disponible a repartir",
      dynamicHorizon: "Horizonte dinámico",
      dynamicHorizonText:
        "El orden recomendado evoluciona según tus prioridades: reducir, proteger y luego acelerar proyectos.",
      onjaramaScore: "Puntaje financiero OnJarama",
      discipline: "Disciplina OnJarama",
      started: "Comenzaste tu recorrido",
      noStart: "Tu recorrido comienza con tu primer objetivo.",
      automaticPriority: "Prioridad automática",
      activityView: "Vista actividad",
      thisWeek: "Esta semana",
      thisYear: "Este año",
      lastActivity: "Última actividad",
      seeHistory: "Ver historial",
      lastVictory: "Última victoria",
      stepDebt: "Etapa 1 — Reducir deudas",
      priorityDebt: "Deuda prioritaria",
      rate: "Tasa",
      balance: "Saldo",
      noPriorityDebt: "Ninguna deuda prioritaria detectada.",
      seeDebts: "Ver mis deudas",
      stepBase: "Etapa 2 — Proteger tu base",
      stepBaseText:
        "Mantener una pequeña base de ahorro ayuda a evitar volver al crédito.",
      stepGoals: "Etapa 3 — Avanzar objetivos",
      activeGoals: "objetivos activos",
      globalProgress: "Progreso global",
      manageGoals: "Gestionar mis objetivos",
      stepPath: "Etapa 4 — Seguir el recorrido",
      stepPathText:
        "El recorrido ayuda a mantener disciplina: una acción clara a la vez.",
      seePath: "Ver mi recorrido",
      disciplineReminder: "Recordatorio disciplina",
      disciplineReminderText:
        "Evita agregar nuevo financiamiento mientras la deuda prioritaria siga alta.",
      victorySaved: "Victoria registrada",
      goalReached: "objetivo(s) alcanzado(s). OnJarama mantiene el rumbo.",
      finalGoal: "Objetivo final",
      finalGoalText:
        "Menos presión, más control y proyectos personales que realmente avanzan.",
      levels: ["🌱 Inicio", "🚶 En progreso", "🏃 Disciplina", "🔥 Momentum", "👑 Maestría"],
      levelMessages: [
        "El recorrido comienza. El objetivo es simple: aclarar, elegir, actuar.",
        "La disciplina se construye. Una acción pequeña regular vale más que un gran esfuerzo aislado.",
        "El plan se estabiliza. Mantén una acción principal y protege el margen.",
        "El ritmo es sólido. Transforma la constancia en resultados visibles.",
        "La base es fuerte. OnJarama puede ayudar a acelerar proyectos de largo plazo.",
      ],
      actionDebt: "Reducir",
      actionGoal: "Avanzar",
      actionCreate: "Crear tu primer objetivo",
      actionBase: "Recuperar margen",
      seeGoal: "Ver objetivos",
      seePlan: "Ver Mi Plan",
      months: "meses",
      days: "días",
      noGain: "Por confirmar",
    },
  };

  return texts[language] || texts.FR;
}

function normalizeExternalAllocation(engine, currency) {
  return {
    capacity: Number(engine.availableAmount || 0),
    lines: engine.allocations.map((line) => ({
      id: line.id,
      icon: line.type === "debt" ? "💳" : line.type === "goal" ? "🎯" : "🧭",
      label: line.label,
      amount: Number(line.amount || 0),
      color: line.color || "var(--gold)",
      reason: line.reason || "Répartition suggérée par OnJarama.",
    })),
    impact: engine.impact || {
      monthsSavedLabel: "À confirmer",
      interestAvoidedLabel: formatMoney(0, currency),
    },
  };
}

function AllocationLine({ line, currency }) {
  return (
    <div style={{ ...allocationLine, borderColor: line.color }}>
      <span style={{ color: line.color }}>{line.icon}</span>
      <div style={{ flex: 1 }}>
        <strong>{line.label}</strong>
        <p style={mutedSmall}>{line.reason}</p>
      </div>
      <strong style={{ color: line.color }}>{formatMoney(line.amount, currency)}</strong>
    </div>
  );
}

function ImpactTile({ label, value, color }) {
  return (
    <div style={{ ...impactTile, borderColor: color }}>
      <small>{label}</small>
      <strong style={{ color }}>{value}</strong>
    </div>
  );
}

function HorizonLine({ step, index }) {
  return (
    <div style={{ ...horizonLine, borderColor: step.color }}>
      <span style={{ ...horizonIndex, color: step.color, borderColor: step.color }}>
        {index + 1}
      </span>
      <div>
        <strong>{step.title}</strong>
        <p style={mutedSmall}>{step.text}</p>
      </div>
    </div>
  );
}

function buildDailyAction({ priorityDebt, mainGoal, closestGoal, allocation, monthlyCapacity, currency, text }) {
  const firstLine = allocation.lines[0];
  const amount = Number(firstLine?.amount || 0) || Math.max(25, Math.round(monthlyCapacity * 0.25));

  if (priorityDebt) {
    const balance = Number(priorityDebt.balance || 0);
    const basePayment = Math.max(50, Number(priorityDebt.minimumPayment || priorityDebt.monthlyPayment || 0));
    const monthsBase = balance > 0 ? Math.ceil(balance / basePayment) : 0;
    const monthsBoosted = balance > 0 ? Math.ceil(balance / Math.max(1, basePayment + amount)) : 0;
    const monthsSaved = Math.max(0, monthsBase - monthsBoosted);
    const interestSaved = estimateInterestSaved(priorityDebt, amount, monthsSaved);

    return {
      icon: "💳",
      title: `${text.actionDebt} ${priorityDebt.name}`,
      reason: `Priorité au taux le plus élevé (${priorityDebt.interestRate || 0}%).`,
      amount,
      color: "var(--red)",
      timeImpact: monthsSaved > 0 ? `${monthsSaved} ${text.months}` : text.noGain,
      moneyImpact: interestSaved > 0 ? formatMoney(interestSaved, currency) : text.noGain,
      button: text.seeDebts,
      page: "dettes",
    };
  }

  const goal = closestGoal?.progress >= 80 ? closestGoal : mainGoal;

  if (goal) {
    const progressGain = Number(goal.targetAmount || 0) > 0
      ? Math.max(1, Math.round((amount / Number(goal.targetAmount || 1)) * 100))
      : 1;
    const currentMonths = estimateMonths(goal.remaining, Number(goal.monthlyContribution || 0) || monthlyCapacity);
    const acceleratedMonths = estimateMonths(goal.remaining, (Number(goal.monthlyContribution || 0) || monthlyCapacity) + amount);
    const monthsSaved = currentMonths !== null && acceleratedMonths !== null
      ? Math.max(0, currentMonths - acceleratedMonths)
      : 0;

    return {
      icon: "🎯",
      title: `${text.actionGoal} ${goal.title}`,
      reason: "Objectif actif à rapprocher de la victoire.",
      amount,
      color: "var(--gold)",
      timeImpact: monthsSaved > 0 ? `${monthsSaved} ${text.months}` : `+${progressGain}%`,
      moneyImpact: `+${progressGain}%`,
      button: text.seeGoal,
      page: "objectifs",
    };
  }

  return {
    icon: "🧭",
    title: text.actionCreate,
    reason: "Ajoutez une destination pour activer le moteur de plan.",
    amount: 0,
    color: "var(--gold)",
    timeImpact: text.noGain,
    moneyImpact: text.noGain,
    button: text.createGoal,
    page: "objectifs",
  };
}

function buildNinetyDayPlan({ priorityDebt, goals, mainGoal, monthlyCapacity, language, text }) {
  const months = getNextMonths(3, language);
  const activeGoals = Array.isArray(goals) ? goals.filter((goal) => goal.remaining > 0) : [];
  const focusGoal = mainGoal?.remaining > 0 ? mainGoal : activeGoals[0];
  const secondGoal = activeGoals.find((goal) => goal.id !== focusGoal?.id);

  return months.map((label, index) => {
    const actions = [];

    if (priorityDebt && index <= 1) {
      actions.push(`${text.actionDebt} ${priorityDebt.name}`);
    }

    if (priorityDebt && index === 2) {
      actions.push(priorityDebt.balance <= monthlyCapacity * 3 ? `Finaliser ${priorityDebt.name}` : `${text.actionDebt} ${priorityDebt.name}`);
    }

    actions.push(index === 0 ? text.stepBase.replace("Étape 2 — ", "") : "Fonds de sécurité");

    if (focusGoal && index >= 1) {
      actions.push(`${text.actionGoal} ${focusGoal.title}`);
    }

    if (secondGoal && index === 2) {
      actions.push(`${text.actionGoal} ${secondGoal.title}`);
    }

    if (actions.length === 0) actions.push(text.actionCreate);

    return {
      label,
      actions: [...new Set(actions)].slice(0, 3),
      color: index === 0 ? "var(--gold)" : index === 1 ? "var(--blue)" : "var(--green)",
    };
  });
}

function buildCurrentCap({ priorityDebt, mainGoal, closestGoal, monthlyCapacity, currency, language, text }) {
  const target = priorityDebt || closestGoal || mainGoal;

  if (!target) {
    return {
      title: text.noGoal,
      currentDate: text.noGain,
      acceleratedDate: text.noGain,
      gainLabel: text.noGain,
      message: "Ajoutez un objectif ou une dette pour calculer le cap actuel.",
    };
  }

  const amount = priorityDebt ? Number(priorityDebt.balance || 0) : Number(target.remaining || 0);
  const currentMonthly = Math.max(1, monthlyCapacity || Number(target.monthlyContribution || 0));
  const acceleratedMonthly = Math.max(currentMonthly + 1, Math.round(currentMonthly * 1.35));
  const currentMonths = estimateMonths(amount, currentMonthly);
  const acceleratedMonths = estimateMonths(amount, acceleratedMonthly);
  const gain = currentMonths !== null && acceleratedMonths !== null
    ? Math.max(0, currentMonths - acceleratedMonths)
    : 0;

  return {
    title: priorityDebt ? priorityDebt.name : target.title,
    currentDate: estimateCompletion(amount, currentMonthly, language),
    acceleratedDate: estimateCompletion(amount, acceleratedMonthly, language),
    gainLabel: gain > 0 ? `${gain} ${text.months}` : text.noGain,
    message: `Hypothèse simple : rythme accéléré à +35 %. Montant suivi : ${formatMoney(amount, currency)}.`,
  };
}

function getPriorityDebt(debts) {
  return [...(Array.isArray(debts) ? debts : [])]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];
}

function buildAutoProjection({ priorityDebt, goals, monthlyCapacity, currency, text }) {
  const lines = [];

  if (priorityDebt) {
    lines.push({
      id: "debt",
      label: priorityDebt.name || text.priorityDebt,
      value: estimateCompletion(priorityDebt.balance, monthlyCapacity),
      color: "var(--red)",
    });
  } else {
    lines.push({
      id: "debt",
      label: text.priorityDebt,
      value: text.noPriorityDebt,
      color: "var(--green)",
    });
  }

  const visibleGoals = [...goals]
    .filter((goal) => Number(goal.targetAmount || 0) > 0 && goal.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  visibleGoals.forEach((goal) => {
    lines.push({
      id: goal.id,
      label: goal.title,
      value: estimateCompletion(
        goal.remaining,
        monthlyCapacity || Number(goal.monthlyContribution || 0)
      ),
      color: goal.highlighted ? "var(--gold)" : "var(--blue)",
    });
  });

  if (lines.length === 1) {
    lines.push({
      id: "capacity",
      label: text.availableThisMonth,
      value: formatMoney(monthlyCapacity, currency),
      color: monthlyCapacity > 0 ? "var(--green)" : "var(--gold)",
    });
  }

  return lines;
}

function getCommandLevel(score, disciplineValue, text) {
  const average = Math.round((Number(score || 0) + Number(disciplineValue || 0)) / 2);
  const index = average >= 85 ? 4 : average >= 70 ? 3 : average >= 55 ? 2 : average >= 35 ? 1 : 0;
  const colors = ["var(--red)", "var(--purple)", "var(--gold)", "var(--blue)", "var(--green)"];

  return {
    title: text.levels[index],
    message: text.levelMessages[index],
    color: colors[index],
    progress: average,
  };
}

function buildSmartAllocation({ monthlyAvailable, monthlySavings, priorityDebt, goals, mainGoal }) {
  const capacity = Math.max(0, Math.round(Number(monthlyAvailable || 0) + Number(monthlySavings || 0)));
  const activeGoals = Array.isArray(goals) ? goals.filter((goal) => goal.remaining > 0) : [];
  const selectedGoal = mainGoal?.remaining > 0 ? mainGoal : activeGoals[0];

  if (capacity <= 0) {
    return {
      capacity: 0,
      lines: [
        {
          id: "base",
          icon: "🛡️",
          label: "Reprendre du souffle",
          amount: 0,
          color: "var(--gold)",
          reason: "Votre marge disponible doit être clarifiée avant de répartir.",
        },
      ],
    };
  }

  if (priorityDebt) {
    const debtAmount = Math.min(Number(priorityDebt.balance || 0), roundToNearest5(capacity * 0.6));
    const safetyAmount = roundToNearest5(capacity * 0.2);
    const goalAmount = Math.max(0, capacity - debtAmount - safetyAmount);

    return {
      capacity,
      lines: [
        {
          id: "debt",
          icon: "💳",
          label: priorityDebt.name || "Dette prioritaire",
          amount: debtAmount,
          color: "var(--red)",
          reason: `Priorité au taux le plus élevé (${priorityDebt.interestRate || 0}%).`,
        },
        {
          id: "safety",
          icon: "🛡️",
          label: "Fonds de sécurité",
          amount: safetyAmount,
          color: "var(--green)",
          reason: "Garder une petite protection pour éviter de retourner au crédit.",
        },
        {
          id: "goal",
          icon: "🎯",
          label: selectedGoal?.title || "Objectif vedette",
          amount: goalAmount,
          color: "var(--gold)",
          reason: selectedGoal
            ? "Maintenir le projet actif pendant la réduction de dette."
            : "Préparer le prochain objectif après la dette.",
        },
      ],
    };
  }

  const safetyAmount = roundToNearest5(capacity * 0.25);
  const goalAmount = selectedGoal ? roundToNearest5(capacity * 0.55) : 0;
  const futureAmount = Math.max(0, capacity - safetyAmount - goalAmount);

  return {
    capacity,
    lines: [
      {
        id: "goal",
        icon: "🎯",
        label: selectedGoal?.title || "Objectif vedette",
        amount: goalAmount,
        color: "var(--gold)",
        reason: selectedGoal ? "Accélérer la destination active." : "Créer un objectif pour activer la répartition.",
      },
      {
        id: "safety",
        icon: "🛡️",
        label: "Fonds de sécurité",
        amount: safetyAmount,
        color: "var(--green)",
        reason: "Protéger la base avant les grosses décisions.",
      },
      {
        id: "future",
        icon: "🚀",
        label: "Projets futurs",
        amount: futureAmount,
        color: "var(--blue)",
        reason: "Préparer voyage, maison ou liberté financière.",
      },
    ],
  };
}

function buildDynamicHorizon({ priorityDebt, goals, mainGoal, text }) {
  const activeGoals = Array.isArray(goals) ? goals.filter((goal) => goal.remaining > 0) : [];
  const highlighted = mainGoal?.remaining > 0 ? mainGoal : activeGoals[0];
  const nextGoal = activeGoals.find((goal) => goal.id !== highlighted?.id);
  const steps = [];

  if (priorityDebt) {
    steps.push({
      title: `${text.today} → ${priorityDebt.name}`,
      text: "Réduire la dette prioritaire avant d’accélérer les autres projets.",
      color: "var(--red)",
    });
  }

  steps.push({
    title: priorityDebt ? "Ensuite → Fonds de sécurité" : `${text.today} → Fonds de sécurité`,
    text: "Protéger une petite marge pour éviter de revenir au crédit.",
    color: "var(--green)",
  });

  if (highlighted) {
    steps.push({
      title: `${priorityDebt ? "Puis" : "Ensuite"} → ${highlighted.title}`,
      text: "Faire avancer l’objectif vedette avec une action régulière.",
      color: "var(--gold)",
    });
  }

  if (nextGoal) {
    steps.push({
      title: `Après → ${nextGoal.title}`,
      text: "Préparer le prochain objectif sans perdre le rythme.",
      color: "var(--blue)",
    });
  }

  if (steps.length < 4) {
    steps.push({
      title: "Enfin → Liberté financière",
      text: "Construire une vision long terme quand la base est stable.",
      color: "var(--purple)",
    });
  }

  return steps.slice(0, 4);
}

function getNextAction({ priorityDebt, debtTotal, mainGoal, closestGoal, achievedGoals, currency, text }) {
  if (closestGoal && closestGoal.progress >= 95 && closestGoal.progress < 100) {
    return {
      title: `Finaliser ${closestGoal.title}`,
      description: "Cet objectif est presque terminé. OnJarama recommande de le finaliser avant de revenir à la prochaine priorité.",
      button: text.seeGoal,
      page: "objectifs",
    };
  }

  if (priorityDebt) {
    return {
      title: `${text.actionDebt} ${priorityDebt.name}`,
      description: `Cette dette a le taux le plus élevé (${priorityDebt.interestRate || 0}%). Solde : ${formatMoney(priorityDebt.balance, currency)}.`,
      button: text.seeDebts,
      page: "dettes",
    };
  }

  if (closestGoal && closestGoal.progress >= 80 && closestGoal.progress < 100) {
    return {
      title: `Finaliser ${closestGoal.title}`,
      description: "Cet objectif est presque atteint. Un petit effort ciblé peut créer une vraie victoire.",
      button: text.seeGoal,
      page: "objectifs",
    };
  }

  if (mainGoal) {
    return {
      title: `${text.actionGoal} ${mainGoal.title}`,
      description: "Votre objectif vedette est identifié. Gardez le rythme sans vous disperser.",
      button: text.seeGoal,
      page: "objectifs",
    };
  }

  if (achievedGoals.length > 0 && debtTotal <= 0) {
    return {
      title: "Consolider vos victoires",
      description: "Vous avez déjà atteint un objectif. La prochaine étape est de choisir un nouveau cap.",
      button: text.createGoal,
      page: "objectifs",
    };
  }

  return {
    title: text.actionCreate,
    description: "Ajoutez un objectif pour que Mon Plan puisse construire une priorité automatique.",
    button: text.createGoal,
    page: "objectifs",
  };
}

function calculateOnJaramaScore({ monthlyIncome, monthlyAvailable, monthlySavings, debtTotal, goalProgress, achievedGoals, disciplineValue }) {
  let score = 42;

  if (monthlyIncome > 0) score += 10;
  if (monthlyAvailable > 0) score += 16;
  if (monthlySavings > 0) score += 10;
  if (debtTotal === 0) score += 12;
  if (goalProgress > 0) score += Math.min(12, Math.round(goalProgress / 8));
  if (achievedGoals.length > 0) score += 8;
  if (disciplineValue > 0) score += Math.min(16, Math.round(disciplineValue / 6));

  if (monthlyAvailable < 0) score -= 18;
  if (monthlyIncome > 0 && debtTotal > monthlyIncome * 6) score -= 12;

  const value = Math.max(0, Math.min(100, score));

  if (value >= 80) {
    return {
      value,
      color: "var(--green)",
      label: "Solide",
      message: "Votre base est forte. Continuez à protéger votre marge.",
    };
  }

  if (value >= 55) {
    return {
      value,
      color: "var(--gold)",
      label: "En progression",
      message: "Votre plan avance. La priorité est de garder une action claire chaque semaine.",
    };
  }

  return {
    value,
    color: "var(--red)",
    label: "À renforcer",
    message: "Votre priorité est de reprendre du souffle mensuel et de réduire la pression.",
  };
}

function estimateCompletion(amount, monthlyCapacity, language = "FR") {
  const remaining = Number(amount || 0);
  const monthly = Number(monthlyCapacity || 0);

  if (remaining <= 0) return language === "EN" ? "Reached" : language === "ES" ? "Alcanzado" : "Atteint";
  if (monthly <= 0) return language === "EN" ? "To define" : language === "ES" ? "Por definir" : "À définir";

  const months = Math.max(1, Math.ceil(remaining / monthly));
  const date = new Date();
  date.setMonth(date.getMonth() + months);

  return date.toLocaleDateString(language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA", {
    year: "numeric",
    month: "short",
  });
}

function estimateMonths(amount, monthlyAmount) {
  const total = Number(amount || 0);
  const monthly = Number(monthlyAmount || 0);

  if (total <= 0) return 0;
  if (monthly <= 0) return null;

  return Math.max(1, Math.ceil(total / monthly));
}

function estimateInterestSaved(debt, amount, monthsSaved) {
  const rate = Number(debt?.interestRate || 0) / 100;
  const boost = Number(amount || 0);

  if (rate <= 0 || boost <= 0 || monthsSaved <= 0) return 0;

  return Math.max(0, Math.round((boost * rate * monthsSaved) / 12));
}

function getNextMonths(count, language = "FR") {
  const locale = language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA";
  const now = new Date();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() + index, 1);
    return date.toLocaleDateString(locale, { month: "long" });
  });
}

function getPeriodStats(history, daysBack) {
  const now = Date.now();
  const since = now - daysBack * 24 * 60 * 60 * 1000;
  const items = history.filter((item) => new Date(item.createdAt || 0).getTime() >= since);

  return {
    total: items.length,
    deposits: items.filter((item) => item.type === "depot").length,
    victories: items.filter((item) => item.type === "victoire").length,
  };
}

function PeriodCard({ title, stats }) {
  return (
    <div style={periodCard}>
      <strong>{title}</strong>
      <p style={mutedSmall}>{stats.total} activités</p>
      <p style={mutedSmall}>{stats.deposits} dépôts</p>
      <p style={mutedSmall}>{stats.victories} victoires</p>
    </div>
  );
}

function ForecastLine({ label, value, color }) {
  return (
    <div style={forecastLine}>
      <span>{label}</span>
      <strong style={{ color }}>{value}</strong>
    </div>
  );
}

function MiniBar({ progress, color = "var(--green)" }) {
  const safeProgress = Math.min(100, Math.max(0, Number(progress || 0)));

  return (
    <div style={barBg}>
      <div style={{ ...barFill, width: `${safeProgress}%`, background: color }} />
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

function getGoalProgress(goal) {
  if (Array.isArray(goal?.pathSteps) && goal.pathSteps.length > 0) {
    const done = goal.pathSteps.filter((step) => step.done).length;
    return Math.round((done / goal.pathSteps.length) * 100);
  }

  const target = Number(goal?.targetAmount || 0);
  const current = Number(goal?.currentAmount || 0);

  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

function getGoalRemaining(goal) {
  return Math.max(0, Number(goal?.targetAmount || 0) - Number(goal?.currentAmount || 0));
}

function calculateDisciplineFromHistory(history, goals) {
  let score = 0;

  if (goals.length > 0) score += 30;
  if (history.length > 0) score += 20;
  if (history.some((item) => item.type === "depot")) score += 25;
  if (history.some((item) => item.type === "victoire")) score += 25;

  return Math.min(100, score);
}

function getDisciplineColor(score) {
  if (score <= 25) return "var(--red)";
  if (score <= 50) return "var(--gold)";
  if (score <= 75) return "var(--blue)";
  return "var(--green)";
}

function getDisciplineLabel(score, text) {
  if (score <= 25) return text.levels[0].replace(/^\S+\s/, "");
  if (score <= 50) return text.levels[1].replace(/^\S+\s/, "");
  if (score <= 75) return text.levels[2].replace(/^\S+\s/, "");
  return text.levels[4].replace(/^\S+\s/, "");
}

function labelType(type) {
  const labels = {
    objectif: "🎯 Objectif",
    depot: "💰 Dépôt",
    victoire: "🏆 Victoire",
    finance: "📊 Finance",
    reglages: "⚙️ Réglages",
  };

  return labels[type] || "Action";
}

function formatDate(value, language = "FR") {
  if (!value) return "Date inconnue";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date inconnue";

  return date.toLocaleString(language === "EN" ? "en-CA" : language === "ES" ? "es-CA" : "fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStartedLabel(createdAt, language = "FR") {
  if (!createdAt) return language === "EN" ? "today" : language === "ES" ? "hoy" : "aujourd’hui";

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return language === "EN" ? "today" : language === "ES" ? "hoy" : "aujourd’hui";

  const days = Math.max(0, Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  if (days === 0) return language === "EN" ? "today" : language === "ES" ? "hoy" : "aujourd’hui";
  if (days === 1) return language === "EN" ? "1 day ago" : language === "ES" ? "hace 1 día" : "il y a 1 jour";

  return language === "EN" ? `${days} days ago` : language === "ES" ? `hace ${days} días` : `il y a ${days} jours`;
}

function roundToNearest5(value) {
  return Math.max(0, Math.round(Number(value || 0) / 5) * 5);
}

const pageHead = {
  display: "flex",
  justifyContent: "space-between",
  gap: "14px",
  alignItems: "flex-start",
};

const eyebrow = {
  margin: 0,
  color: "var(--gold)",
  fontSize: "12px",
  fontWeight: "900",
  letterSpacing: ".04em",
  textTransform: "uppercase",
};

const eyebrowBlue = { ...eyebrow, color: "var(--blue)" };
const eyebrowGreen = { ...eyebrow, color: "var(--green)" };

const card = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const todayCommandCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.26), transparent 34%), linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
  boxShadow: "0 0 24px rgba(212,175,55,.12)",
};

const dailyActionBox = {
  background: "var(--bg-panel)",
  border: "1px solid rgba(212,175,55,.45)",
  borderRadius: "18px",
  padding: "14px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const dailyIcon = {
  width: "36px",
  height: "36px",
  borderRadius: "999px",
  background: "var(--bg-main)",
  display: "grid",
  placeItems: "center",
  fontSize: "20px",
};

const closestGoalCard = {
  background:
    "radial-gradient(circle at top right, rgba(34,197,94,.22), transparent 34%), linear-gradient(135deg, rgba(34,197,94,.14), rgba(212,175,55,.08), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const ninetyCard = {
  background: "linear-gradient(135deg, rgba(56,189,248,.13), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const monthPlanList = {
  display: "grid",
  gap: "10px",
  marginTop: "14px",
};

const monthPlanCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "13px",
};

const monthActionList = {
  display: "grid",
  gap: "7px",
  marginTop: "10px",
};

const monthActionLine = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
  color: "var(--text-main)",
};

const capCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), linear-gradient(135deg, rgba(139,92,246,.12), rgba(212,175,55,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const featuredGoalCard = {
  background:
    "linear-gradient(135deg, rgba(212,175,55,.16), rgba(56,189,248,.08), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const projectionCard = {
  background: "linear-gradient(135deg, rgba(56,189,248,.13), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const projectionList = { display: "grid", gap: "8px" };

const levelCard = (color) => ({
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.15), transparent 34%), var(--bg-card)",
  border: `1px solid ${color}`,
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
});

const smartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "10px",
  marginTop: "14px",
};

const allocationCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.24), transparent 34%), linear-gradient(135deg, rgba(34,197,94,.10), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const allocationCapacityBox = {
  background: "var(--bg-panel)",
  border: "1px solid rgba(212,175,55,.45)",
  borderRadius: "16px",
  padding: "14px",
  marginTop: "14px",
  display: "grid",
  gap: "4px",
};

const allocationList = { display: "grid", gap: "10px", marginTop: "12px" };

const allocationLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const impactGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const impactTile = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "6px",
};

const nextAmountCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.26), transparent 34%), linear-gradient(135deg, rgba(139,92,246,.12), rgba(212,175,55,.10), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
  boxShadow: "0 0 24px rgba(212,175,55,.10)",
};

const amountInputWrap = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  background: "var(--bg-panel)",
  border: "1px solid rgba(212,175,55,.48)",
  borderRadius: "16px",
  marginTop: "14px",
  paddingRight: "14px",
};

const amountInput = {
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "var(--text-main)",
  padding: "15px",
  fontSize: "22px",
  fontWeight: "900",
};

const amountSuffix = { color: "var(--gold)", fontWeight: "900" };

const horizonCard = {
  background: "linear-gradient(135deg, rgba(56,189,248,.13), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const horizonList = { display: "grid", gap: "10px", marginTop: "14px" };

const horizonLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gridTemplateColumns: "34px 1fr",
  gap: "10px",
  alignItems: "center",
};

const horizonIndex = {
  width: "30px",
  height: "30px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  display: "grid",
  placeItems: "center",
  fontWeight: "900",
};

const scoreCard = (color) => ({
  background: "var(--bg-card)",
  border: `1px solid ${color}`,
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
});

const disciplineCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const warningCard = {
  background: "linear-gradient(135deg, rgba(239,68,68,.14), var(--bg-card))",
  border: "1px solid var(--red)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const successCard = {
  background: "linear-gradient(135deg, rgba(34,197,94,.18), var(--bg-card))",
  border: "1px solid var(--green)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const victoryCard = {
  background: "linear-gradient(135deg, rgba(212,175,55,.18), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
  display: "flex",
  gap: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
};

const scoreRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const scoreValue = { fontSize: "42px", lineHeight: 1 };

const scoreBadge = {
  border: "1px solid var(--gold)",
  borderRadius: "999px",
  padding: "7px 10px",
  fontSize: "12px",
  fontWeight: "900",
};

const forecastLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "12px",
  marginTop: "10px",
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const periodGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
};

const periodCard = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "16px",
  padding: "12px",
};

const smallStat = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "9px",
  display: "grid",
  gap: "5px",
  fontSize: "12px",
};

const barBg = {
  height: "10px",
  background: "var(--bg-main)",
  borderRadius: "999px",
  marginTop: "12px",
  overflow: "hidden",
};

const barFill = { height: "100%", borderRadius: "999px" };

const typeBadge = {
  display: "inline-block",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.12)",
  color: "var(--gold)",
  borderRadius: "999px",
  padding: "5px 9px",
  fontSize: "12px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const goldButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--gold)",
  background: "rgba(212,175,55,.14)",
  color: "var(--gold)",
  fontWeight: "bold",
};

const greenButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const blueButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--blue)",
  background: "rgba(56,189,248,.14)",
  color: "var(--blue)",
  fontWeight: "bold",
};

const redButton = {
  width: "100%",
  marginTop: "14px",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid var(--red)",
  background: "rgba(239,68,68,.12)",
  color: "var(--red)",
  fontWeight: "bold",
};

const muted = { color: "var(--text-muted)", marginTop: "8px" };

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "8px",
  display: "block",
};

export default MonPlan;
