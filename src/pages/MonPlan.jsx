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
import { useState } from "react";
import { formatMoney } from "../utils/formatters";

function MonPlan({
  financeData,
  selectedGoals,
  settings,
  setCurrentPage,
  activityHistory,
  disciplineScore,
}) {
  const currency = settings?.currency || "CAD";
  const [nextAmount, setNextAmount] = useState("500");

  const debts = Array.isArray(financeData?.debts) ? financeData.debts : [];
  const goals = Array.isArray(selectedGoals)
    ? selectedGoals.filter((goal) => !goal.archived)
    : [];
  const history = Array.isArray(activityHistory) ? activityHistory : [];

  const lastActivity = history[0];
  const lastVictory = history.find((item) => item.type === "victoire");

  const firstGoal = [...goals].sort(
    (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
  )[0];

  const monthlyIncome = Number(financeData?.overview?.monthlyIncome || 0);
  const monthlyExpenses = Number(financeData?.overview?.monthlyExpenses || 0);
  const monthlySavings = Number(financeData?.overview?.monthlySavings || 0);
  const monthlyAvailable = monthlyIncome - monthlyExpenses - monthlySavings;
  const monthlyCapacity = Math.max(0, monthlyAvailable + monthlySavings);

  const debtTotal = debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const priorityDebt = [...debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  const totalGoalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount || 0),
    0
  );

  const totalGoalCurrent = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const goalProgress =
    totalGoalTarget > 0
      ? Math.min(100, Math.round((totalGoalCurrent / totalGoalTarget) * 100))
      : 0;

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

  const disciplineValue =
    Number(disciplineScore?.score || 0) ||
    calculateDisciplineFromHistory(history, goals);

  const onjaramaScore = calculateOnJaramaScore({
    monthlyIncome,
    monthlyAvailable,
    monthlySavings,
    debtTotal,
    goalProgress,
    achievedGoals,
    disciplineValue,
  });

  const commandLevel = getCommandLevel(onjaramaScore.value, disciplineValue);

  const nextAction = getNextAction({
    priorityDebt,
    debtTotal,
    mainGoal,
    closestGoal,
    achievedGoals,
    currency,
  });

  const todayActions = buildTodayActions({
    priorityDebt,
    mainGoal,
    closestGoal,
    monthlyAvailable,
    goals,
  });

  const autoProjection = buildAutoProjection({
    priorityDebt,
    goals: enrichedGoals,
    monthlyCapacity,
    currency,
  });

  const forecast = buildForecast({
    priorityDebt,
    mainGoal,
    monthlyAvailable,
    monthlySavings,
  });

  const smartAllocation = buildSmartAllocation({
    monthlyAvailable,
    monthlySavings,
    priorityDebt,
    goals: enrichedGoals,
    mainGoal,
  });

  const allocationImpact = buildAllocationImpact({
    priorityDebt,
    allocation: smartAllocation,
    currency,
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
  });

  const weekStats = getPeriodStats(history, 7);
  const yearStats = getPeriodStats(history, 365);

  return (
    <div className="native-page">
      <div style={pageHead}>
        <div>
          <p style={eyebrow}>OnJarama Path V12.0</p>
          <h1>Smart Plan Engine</h1>
          <p style={muted}>
            Mon Plan devient le cerveau financier : priorité automatique, répartition intelligente,
            prochain montant à placer et horizon dynamique.
          </p>
        </div>

        <Sparkles color="var(--gold)" />
      </div>

      <section style={todayCommandCard}>
        <div style={header}>
          <Lightbulb color="var(--gold)" />
          <div>
            <p style={eyebrow}>Aujourd’hui</p>
            <h2>Une action suffit</h2>
          </div>
        </div>

        <div style={todayActionList}>
          {todayActions.map((action) => (
            <div key={action} style={todayActionLine}>
              <CheckCircle size={17} color="var(--green)" />
              <span>{action}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setCurrentPage(nextAction.page)} style={goldButton}>
          {nextAction.button}
        </button>
      </section>

      <section style={featuredGoalCard}>
        <div style={header}>
          <Target color="var(--gold)" />
          <div>
            <p style={eyebrow}>Objectif vedette</p>
            <h2>{mainGoal?.title || "À définir"}</h2>
            <p style={muted}>
              {mainGoal
                ? mainGoal.option || mainGoal.categoryLabel || "Objectif actif"
                : "Créez un objectif pour activer le GPS financier."}
            </p>
          </div>
        </div>

        {mainGoal ? (
          <>
            <div style={smartGrid}>
              <SmallStat label="Progression" value={`${mainGoal.progress}%`} />
              <SmallStat label="Reste" value={formatMoney(mainGoal.remaining, currency)} />
              <SmallStat
                label="Contribution"
                value={
                  Number(mainGoal.monthlyContribution || 0) > 0
                    ? formatMoney(mainGoal.monthlyContribution, currency)
                    : "—"
                }
              />
            </div>
            <MiniBar progress={mainGoal.progress} color="var(--gold)" />
            <p style={mutedSmall}>
              Prochain palier : {mainGoal.progress >= 100 ? "Victoire" : `${getNextMilestone(mainGoal.progress)} %`}
              {mainGoal.targetDate ? ` • Date cible : ${mainGoal.targetDate}` : ""}
            </p>
          </>
        ) : (
          <button onClick={() => setCurrentPage("objectifs")} style={goldButton}>
            Créer un objectif
          </button>
        )}
      </section>

      <section style={projectionCard}>
        <div style={header}>
          <CalendarDays color="var(--blue)" />
          <div>
            <p style={eyebrowBlue}>Si je continue ainsi</p>
            <h2>Projection automatique</h2>
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
          Ajuster dans le simulateur
        </button>
      </section>

      <section style={levelCard(commandLevel.color)}>
        <div style={header}>
          <Award color={commandLevel.color} />
          <div>
            <p style={eyebrow}>Niveau OnJarama</p>
            <h2>{commandLevel.title}</h2>
            <p style={muted}>{commandLevel.message}</p>
          </div>
        </div>

        <MiniBar progress={commandLevel.progress} color={commandLevel.color} />
      </section>

      <section style={nextMoveCard}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>Mon prochain mouvement</h2>
        </div>

        <p>
          <strong>{nextAction.title}</strong>
        </p>

        <p style={muted}>{nextAction.description}</p>

        {mainGoal && (
          <div style={missionStrip}>
            <span>🎯 Mission active</span>
            <strong>{mainGoal.title}</strong>
          </div>
        )}

        <button onClick={() => setCurrentPage(nextAction.page)} style={goldButton}>
          {nextAction.button}
        </button>
      </section>

      <section style={brainCard}>
        <div style={header}>
          <Compass color="var(--gold)" />
          <h2>Résumé du plan de match</h2>
        </div>

        <p>
          <strong>{nextAction.title}</strong>
        </p>

        <p style={muted}>{nextAction.description}</p>

        <div style={decisionGrid}>
          <DecisionLine text="Garder une action principale" ok />
          <DecisionLine text="Éviter une nouvelle dette inutile" ok />
          <DecisionLine
            text={
              monthlyAvailable >= 0
                ? "Marge mensuelle positive"
                : "Marge mensuelle à reprendre"
            }
            ok={monthlyAvailable >= 0}
          />
        </div>

        <button onClick={() => setCurrentPage(nextAction.page)} style={goldButton}>
          {nextAction.button}
        </button>
      </section>

      <section style={allocationCard}>
        <div style={header}>
          <Gauge color="var(--gold)" />
          <h2>Répartition intelligente</h2>
        </div>

        <p style={muted}>
          OnJarama propose une répartition simple selon vos dettes, votre marge et vos objectifs actifs.
        </p>

        <div style={allocationCapacityBox}>
          <small>Disponible ce mois</small>
          <strong>{formatMoney(smartAllocation.capacity, currency)}</strong>
        </div>

        <div style={allocationList}>
          {smartAllocation.lines.map((line) => (
            <AllocationLine key={line.id} line={line} currency={currency} />
          ))}
        </div>

        <div style={impactGrid}>
          <ImpactTile label="Temps estimé gagné" value={allocationImpact.timeSaved} color="var(--blue)" />
          <ImpactTile label="Intérêts évités" value={allocationImpact.interestSaved} color="var(--green)" />
        </div>

        <p style={mutedSmall}>
          Estimation simple pour guider la décision. Les montants peuvent être ajustés selon votre réalité.
        </p>

        <button onClick={() => setCurrentPage("simulateur")} style={goldButton}>
          Tester l’impact dans le simulateur
        </button>
      </section>



      <section style={nextAmountCard}>
        <div style={header}>
          <Compass color="var(--gold)" />
          <div>
            <p style={eyebrow}>Smart Plan Engine V12</p>
            <h2>Que faire avec mon prochain montant ?</h2>
          </div>
        </div>

        <p style={muted}>
          Entrez un montant disponible et OnJarama propose une répartition simple selon la priorité actuelle.
        </p>

        <div style={amountInputWrap}>
          <input
            value={nextAmount}
            onChange={(event) => setNextAmount(event.target.value.replace(/[^\d]/g, ""))}
            inputMode="numeric"
            style={amountInput}
            aria-label="Montant disponible à répartir"
          />
          <span style={amountSuffix}>{currency}</span>
        </div>

        <div style={allocationList}>
          {nextAmountPlan.lines.map((line) => (
            <AllocationLine key={`next-${line.id}`} line={line} currency={currency} />
          ))}
        </div>

        <p style={mutedSmall}>
          Lecture V12 : priorité à la dette coûteuse, protection minimale, puis objectif actif.
        </p>
      </section>

      <section style={horizonCard}>
        <div style={header}>
          <Route color="var(--blue)" />
          <h2>Horizon dynamique</h2>
        </div>

        <p style={muted}>
          L’ordre conseillé évolue selon vos priorités : réduire, protéger, puis accélérer les projets.
        </p>

        <div style={horizonList}>
          {horizonSteps.map((step, index) => (
            <HorizonLine key={`${step.title}-${index}`} step={step} index={index} />
          ))}
        </div>
      </section>

      <section style={scoreCard(onjaramaScore.color)}>
        <div style={header}>
          <Gauge color={onjaramaScore.color} />
          <h2>Score financier OnJarama</h2>
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

      <section style={calendarCard}>
        <div style={header}>
          <CalendarDays color="var(--blue)" />
          <h2>Prévisions</h2>
        </div>

        <ForecastLine
          label="Dette prioritaire"
          value={forecast.debt}
          color={priorityDebt ? "var(--red)" : "var(--green)"}
        />
        <ForecastLine label="Objectif vedette" value={forecast.goal} color="var(--gold)" />
        <ForecastLine
          label="Souffle mensuel"
          value={formatMoney(monthlyAvailable, currency)}
          color={monthlyAvailable >= 0 ? "var(--green)" : "var(--red)"}
        />

        <button onClick={() => setCurrentPage("simulateur")} style={blueButton}>
          Tester une simulation
        </button>
      </section>

      <section style={disciplineCard}>
        <Flag color="var(--gold)" />

        <div style={{ flex: 1 }}>
          <h2>Discipline OnJarama</h2>
          <p style={muted}>
            {firstGoal
              ? `Vous avez commencé votre parcours ${getStartedLabel(firstGoal.createdAt)}.`
              : "Votre parcours commence dès votre premier objectif."}
          </p>

          <strong style={{ color: getDisciplineColor(disciplineValue) }}>
            {disciplineValue}% • {getDisciplineLabel(disciplineValue)}
          </strong>

          <MiniBar progress={disciplineValue} color={getDisciplineColor(disciplineValue)} />
        </div>
      </section>

      <section style={card}>
        <div style={header}>
          <TrendingUp color="var(--gold)" />
          <h2>Priorité automatique</h2>
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
          <h2>Vue activité</h2>
        </div>

        <div style={periodGrid}>
          <PeriodCard title="Cette semaine" stats={weekStats} />
          <PeriodCard title="Cette année" stats={yearStats} />
        </div>
      </section>

      {lastActivity && (
        <section style={card}>
          <div style={header}>
            <Clock3 color="var(--blue)" />
            <h2>Dernière activité</h2>
          </div>

          <span style={typeBadge}>{labelType(lastActivity.type)}</span>
          <p><strong>{lastActivity.title}</strong></p>
          <p style={muted}>{lastActivity.message}</p>
          <small style={mutedSmall}>{formatDate(lastActivity.createdAt)}</small>

          <button onClick={() => setCurrentPage("historique")} style={blueButton}>
            Voir l’historique
          </button>
        </section>
      )}

      {lastVictory && (
        <section style={victoryCard}>
          <Trophy color="var(--gold)" />

          <div>
            <h2>Dernière victoire</h2>
            <p><strong>{lastVictory.title}</strong></p>
            <p style={muted}>{lastVictory.message}</p>
          </div>
        </section>
      )}

      {mainGoal && (
        <section style={card}>
          <div style={header}>
            <Flag color="var(--gold)" />
            <h2>Objectif vedette</h2>
          </div>

          <p><strong>{mainGoal.title}</strong></p>
          <p style={muted}>
            {mainGoal.categoryLabel || "Objectif"} {mainGoal.option ? `• ${mainGoal.option}` : ""}
          </p>

          <ProgressLine goal={mainGoal} currency={currency} />

          {mainGoal.simulation && (
            <div style={simulationPlanBox}>
              <strong>Simulation retenue</strong>
              <p style={mutedSmall}>
                {formatMoney(mainGoal.simulation.monthlyAmount, currency)} / mois • Fin estimée : {mainGoal.simulation.estimatedEnd}
              </p>
            </div>
          )}

          <button onClick={() => setCurrentPage("objectifs")} style={greenButton}>
            Gérer cet objectif
          </button>
        </section>
      )}

      {closestGoal && (
        <section style={successCard}>
          <Trophy color="var(--green)" />

          <div style={{ flex: 1 }}>
            <h2>Le plus proche d’être atteint</h2>
            <p><strong>{closestGoal.title}</strong></p>
            <p style={muted}>Progression : {closestGoal.progress}%</p>

            {closestGoal.progress >= 100 ? (
              <p style={victoryText}>🏆 Objectif atteint</p>
            ) : closestGoal.progress >= 80 ? (
              <p style={almostText}>🔥 Presque atteint</p>
            ) : (
              <p style={muted}>Continue doucement, le chemin est déjà tracé.</p>
            )}
          </div>
        </section>
      )}

      <section style={card}>
        <div style={header}>
          <CreditCard color={debtTotal > 0 ? "var(--red)" : "var(--green)"} />
          <h2>Étape 1 — Réduire les dettes</h2>
        </div>

        {priorityDebt ? (
          <>
            <p>Dette prioritaire : <strong>{priorityDebt.name}</strong></p>
            <p style={muted}>
              Taux : {priorityDebt.interestRate}% • Solde : {formatMoney(priorityDebt.balance, currency)}
            </p>
          </>
        ) : (
          <p style={muted}>Aucune dette prioritaire détectée.</p>
        )}

        <strong>{formatMoney(debtTotal, currency)}</strong>
        <button onClick={() => setCurrentPage("dettes")} style={redButton}>
          Voir mes dettes
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <PiggyBank color="var(--green)" />
          <h2>Étape 2 — Protéger votre base</h2>
        </div>

        <p style={muted}>
          Garder une petite épargne aide à éviter de retourner au crédit en cas d’imprévu.
        </p>
      </section>

      <section style={card}>
        <div style={header}>
          <Target color="var(--gold)" />
          <h2>Étape 3 — Avancer les objectifs</h2>
        </div>

        <p><strong>{goals.length}</strong> objectifs actifs</p>
        <p style={muted}>Progression globale : <strong>{goalProgress}%</strong></p>

        <MiniBar progress={goalProgress} color="var(--green)" />

        <button onClick={() => setCurrentPage("objectifs")} style={greenButton}>
          Gérer mes objectifs
        </button>
      </section>

      <section style={card}>
        <div style={header}>
          <Route color="var(--blue)" />
          <h2>Étape 4 — Suivre le parcours</h2>
        </div>

        <p style={muted}>
          Le parcours vous aide à garder la discipline : une action claire à la fois.
        </p>

        <button onClick={() => setCurrentPage("parcours")} style={blueButton}>
          Voir mon parcours
        </button>
      </section>

      {debtTotal > 0 && (
        <section style={warningCard}>
          <AlertTriangle color="var(--red)" />
          <div>
            <h2>Rappel discipline</h2>
            <p style={muted}>
              Évitez d’ajouter un nouveau financement tant que la dette prioritaire reste élevée.
            </p>
          </div>
        </section>
      )}

      {achievedGoals.length > 0 && (
        <section style={successCard}>
          <Sparkles color="var(--gold)" />
          <div>
            <h2>Victoire enregistrée</h2>
            <p style={muted}>
              {achievedGoals.length} objectif{achievedGoals.length > 1 ? "s" : ""} atteint{achievedGoals.length > 1 ? "s" : ""}. OnJarama garde le cap.
            </p>
          </div>
        </section>
      )}

      <section style={successCard}>
        <CheckCircle color="var(--green)" />
        <div>
          <h2>Objectif final</h2>
          <p style={muted}>
            Moins de pression, plus de contrôle, et des projets personnels qui avancent réellement.
          </p>
        </div>
      </section>
    </div>
  );
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

function buildTodayActions({ priorityDebt, mainGoal, closestGoal, monthlyAvailable, goals }) {
  if (priorityDebt) {
    return [
      `Payer ou planifier un montant vers ${priorityDebt.name}`,
      "Ne pas ajouter de nouveau crédit aujourd’hui",
      "Vérifier que la prochaine action reste réaliste",
    ];
  }

  if (closestGoal?.progress >= 80 && closestGoal.progress < 100) {
    return [
      `Faire avancer ${closestGoal.title}`,
      "Garder le cap jusqu’à la victoire",
      "Tester un scénario si le montant semble lourd",
    ];
  }

  if (mainGoal) {
    return [
      `Avancer ${mainGoal.title}`,
      "Protéger une petite marge de sécurité",
      "Ouvrir le parcours pour voir la prochaine étape",
    ];
  }

  if (monthlyAvailable < 0) {
    return [
      "Reprendre du souffle mensuel",
      "Identifier une dépense à réduire",
      "Mettre la situation à jour",
    ];
  }

  if (goals.length === 0) {
    return [
      "Créer un premier objectif simple",
      "Choisir une date cible réaliste",
      "Laisser OnJarama construire le plan",
    ];
  }

  return [
    "Garder une action principale",
    "Vérifier l’objectif vedette",
    "Continuer sans pression inutile",
  ];
}

function buildAutoProjection({ priorityDebt, goals, monthlyCapacity, currency }) {
  const lines = [];

  if (priorityDebt) {
    lines.push({
      id: "debt",
      label: priorityDebt.name || "Dette prioritaire",
      value: estimateCompletion(priorityDebt.balance, monthlyCapacity),
      color: "var(--red)",
    });
  } else {
    lines.push({
      id: "debt",
      label: "Dette prioritaire",
      value: "Aucune dette prioritaire",
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
      value: estimateCompletion(goal.remaining, monthlyCapacity || Number(goal.monthlyContribution || 0)),
      color: goal.highlighted ? "var(--gold)" : "var(--blue)",
    });
  });

  if (lines.length === 1) {
    lines.push({
      id: "capacity",
      label: "Capacité mensuelle",
      value: formatMoney(monthlyCapacity, currency),
      color: monthlyCapacity > 0 ? "var(--green)" : "var(--gold)",
    });
  }

  return lines;
}

function getCommandLevel(score, disciplineValue) {
  const average = Math.round((Number(score || 0) + Number(disciplineValue || 0)) / 2);

  if (average >= 85) {
    return {
      title: "Niveau 5 — Liberté",
      message: "La base est forte. OnJarama peut maintenant aider à accélérer les projets long terme.",
      color: "var(--green)",
      progress: average,
    };
  }

  if (average >= 70) {
    return {
      title: "Niveau 4 — Accélération",
      message: "Le rythme est solide. La priorité est de transformer la constance en résultats visibles.",
      color: "var(--blue)",
      progress: average,
    };
  }

  if (average >= 55) {
    return {
      title: "Niveau 3 — Stabilisation",
      message: "Le plan se stabilise. Gardez une action principale et protégez la marge.",
      color: "var(--gold)",
      progress: average,
    };
  }

  if (average >= 35) {
    return {
      title: "Niveau 2 — Discipline",
      message: "La discipline se construit. Une petite action régulière vaut mieux qu’un grand effort isolé.",
      color: "var(--purple)",
      progress: average,
    };
  }

  return {
    title: "Niveau 1 — Départ",
    message: "Le parcours commence. L’objectif est simple : clarifier, choisir, agir.",
    color: "var(--red)",
    progress: average,
  };
}

function buildSmartAllocation({ monthlyAvailable, monthlySavings, priorityDebt, goals, mainGoal }) {
  const capacity = Math.max(
    0,
    Math.round(Number(monthlyAvailable || 0) + Number(monthlySavings || 0))
  );
  const activeGoals = Array.isArray(goals)
    ? goals.filter((goal) => goal.remaining > 0)
    : [];
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
    const debtAmount = Math.min(
      Number(priorityDebt.balance || 0),
      roundToNearest5(capacity * 0.6)
    );
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
  const freedomAmount = Math.max(0, capacity - safetyAmount - goalAmount);

  return {
    capacity,
    lines: [
      {
        id: "goal",
        icon: "🎯",
        label: selectedGoal?.title || "Objectif vedette",
        amount: goalAmount,
        color: "var(--gold)",
        reason: selectedGoal
          ? "Accélérer la prochaine destination active."
          : "Créer un objectif pour activer la répartition.",
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
        amount: freedomAmount,
        color: "var(--blue)",
        reason: "Préparer voyage, maison ou liberté financière.",
      },
    ],
  };
}

function buildAllocationImpact({ priorityDebt, allocation, currency }) {
  const debtLine = allocation.lines.find((line) => line.id === "debt");
  const debtAmount = Number(debtLine?.amount || 0);

  if (!priorityDebt || debtAmount <= 0) {
    return {
      timeSaved: allocation.capacity > 0 ? "Cap stabilisé" : "À définir",
      interestSaved: formatMoney(0, currency),
    };
  }

  const balance = Number(priorityDebt.balance || 0);
  const rate = Number(priorityDebt.interestRate || 0);
  const basePayment = Math.max(
    50,
    Number(priorityDebt.minimumPayment || priorityDebt.monthlyPayment || 0)
  );
  const monthsBase = balance > 0 ? Math.ceil(balance / basePayment) : 0;
  const monthsBoosted = balance > 0 ? Math.ceil(balance / (basePayment + debtAmount)) : 0;
  const monthsSaved = Math.max(0, monthsBase - monthsBoosted);
  const interestSaved = Math.max(
    0,
    Math.round((debtAmount * (rate / 100) * Math.max(1, monthsSaved)) / 12)
  );

  return {
    timeSaved: monthsSaved > 0 ? `${monthsSaved} mois` : "Impact progressif",
    interestSaved: formatMoney(interestSaved, currency),
  };
}

function buildDynamicHorizon({ priorityDebt, goals, mainGoal }) {
  const activeGoals = Array.isArray(goals)
    ? goals.filter((goal) => goal.remaining > 0)
    : [];
  const highlighted = mainGoal?.remaining > 0 ? mainGoal : activeGoals[0];
  const nextGoal = activeGoals.find((goal) => goal.id !== highlighted?.id);

  const steps = [];

  if (priorityDebt) {
    steps.push({
      title: `Aujourd’hui → ${priorityDebt.name}`,
      text: "Réduire la dette prioritaire avant d’accélérer les autres projets.",
      color: "var(--red)",
    });
  }

  steps.push({
    title: priorityDebt
      ? "Ensuite → Fonds de sécurité"
      : "Aujourd’hui → Fonds de sécurité",
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

function roundToNearest5(value) {
  return Math.max(0, Math.round(Number(value || 0) / 5) * 5);
}

function getNextAction({ priorityDebt, debtTotal, mainGoal, closestGoal, achievedGoals, currency }) {
  if (closestGoal && closestGoal.progress >= 95 && closestGoal.progress < 100) {
    return {
      title: `Finaliser ${closestGoal.title}`,
      description: "Cet objectif est presque terminé. OnJarama recommande de le finaliser avant de revenir à la prochaine priorité.",
      button: "Voir mes objectifs",
      page: "objectifs",
    };
  }

  if (priorityDebt) {
    return {
      title: `Réduire ${priorityDebt.name}`,
      description: `Cette dette a le taux le plus élevé (${priorityDebt.interestRate}%). Solde : ${formatMoney(priorityDebt.balance, currency)}.`,
      button: "Voir mes dettes",
      page: "dettes",
    };
  }

  if (closestGoal && closestGoal.progress >= 80 && closestGoal.progress < 100) {
    return {
      title: `Finaliser ${closestGoal.title}`,
      description: "Cet objectif est presque atteint. Un petit effort ciblé peut créer une vraie victoire.",
      button: "Voir mes objectifs",
      page: "objectifs",
    };
  }

  if (mainGoal) {
    return {
      title: `Avancer ${mainGoal.title}`,
      description: "Votre objectif vedette est identifié. Gardez le rythme sans vous disperser.",
      button: "Continuer l’objectif",
      page: "objectifs",
    };
  }

  if (achievedGoals.length > 0 && debtTotal <= 0) {
    return {
      title: "Consolider vos victoires",
      description: "Vous avez déjà atteint un objectif. La prochaine étape est de choisir un nouveau cap.",
      button: "Choisir un nouveau cap",
      page: "objectifs",
    };
  }

  return {
    title: "Créer votre premier objectif",
    description: "Ajoutez un objectif pour que Mon Plan puisse construire une priorité automatique.",
    button: "Créer un objectif",
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

function buildForecast({ priorityDebt, mainGoal, monthlyAvailable, monthlySavings }) {
  const monthlyCapacity = Math.max(0, monthlyAvailable + monthlySavings);

  return {
    debt: priorityDebt
      ? estimateCompletion(priorityDebt.balance, monthlyCapacity)
      : "Aucune dette prioritaire",
    goal: mainGoal
      ? estimateCompletion(getGoalRemaining(mainGoal), monthlyCapacity || Number(mainGoal.monthlyContribution || 0))
      : "Aucun objectif vedette",
  };
}

function estimateCompletion(amount, monthlyCapacity) {
  const remaining = Number(amount || 0);

  if (remaining <= 0) return "Atteint";
  if (monthlyCapacity <= 0) return "À définir";

  const months = Math.max(1, Math.ceil(remaining / monthlyCapacity));
  const date = new Date();
  date.setMonth(date.getMonth() + months);

  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "short",
  });
}

function getPeriodStats(history, daysBack) {
  const now = Date.now();
  const since = now - daysBack * 24 * 60 * 60 * 1000;

  const items = history.filter((item) => {
    const time = new Date(item.createdAt || 0).getTime();
    return time >= since;
  });

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

function DecisionLine({ text, ok }) {
  return (
    <div style={{ ...decisionLine, borderColor: ok ? "var(--green)" : "var(--red)" }}>
      <span>{ok ? "✅" : "⚠️"}</span>
      <small>{text}</small>
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

function ProgressLine({ goal, currency }) {
  const progress = getGoalProgress(goal);

  return (
    <>
      <p style={muted}>
        {formatMoney(goal.currentAmount, currency)} / {formatMoney(goal.targetAmount, currency)}
      </p>
      <MiniBar progress={progress} color="var(--green)" />
      <p style={muted}>Progression : {progress}%</p>
    </>
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
  const target = Number(goal?.targetAmount || 0);
  const current = Number(goal?.currentAmount || 0);

  if (target <= 0) return 0;

  return Math.min(100, Math.round((current / target) * 100));
}

function getGoalRemaining(goal) {
  return Math.max(
    0,
    Number(goal?.targetAmount || 0) - Number(goal?.currentAmount || 0)
  );
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

function getDisciplineLabel(score) {
  if (score <= 25) return "Départ";
  if (score <= 50) return "En mouvement";
  if (score <= 75) return "Régulier";
  return "Solide";
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

function formatDate(value) {
  if (!value) return "Date inconnue";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date inconnue";

  return date.toLocaleString("fr-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStartedLabel(createdAt) {
  if (!createdAt) return "aujourd’hui";

  const start = new Date(createdAt);
  const now = new Date();

  if (Number.isNaN(start.getTime())) return "aujourd’hui";

  const diffMs = now.getTime() - start.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  if (days === 0) return "aujourd’hui";
  if (days === 1) return "il y a 1 jour";

  return `il y a ${days} jours`;
}

function getNextMilestone(progress) {
  if (progress < 25) return 25;
  if (progress < 50) return 50;
  if (progress < 75) return 75;
  if (progress < 100) return 100;
  return 100;
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

const eyebrowBlue = {
  ...eyebrow,
  color: "var(--blue)",
};

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

const todayActionList = {
  display: "grid",
  gap: "9px",
  marginTop: "14px",
};

const todayActionLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "11px",
  display: "flex",
  alignItems: "center",
  gap: "9px",
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

const projectionList = {
  display: "grid",
  gap: "8px",
};

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

const nextMoveCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.20), transparent 34%), linear-gradient(135deg, rgba(212,175,55,.14), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
};

const missionStrip = {
  marginTop: "14px",
  background: "var(--bg-panel)",
  border: "1px solid rgba(212,175,55,.45)",
  borderRadius: "16px",
  padding: "12px",
  display: "grid",
  gap: "4px",
};

const brainCard = {
  background:
    "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 34%), linear-gradient(135deg, rgba(56,189,248,.10), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "24px",
  padding: "20px",
  marginTop: "20px",
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

const allocationList = {
  display: "grid",
  gap: "10px",
  marginTop: "12px",
};

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

const amountSuffix = {
  color: "var(--gold)",
  fontWeight: "900",
};

const horizonCard = {
  background: "linear-gradient(135deg, rgba(56,189,248,.13), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
};

const horizonList = {
  display: "grid",
  gap: "10px",
  marginTop: "14px",
};

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

const calendarCard = {
  background: "linear-gradient(135deg, rgba(56,189,248,.12), var(--bg-card))",
  border: "1px solid var(--blue)",
  borderRadius: "22px",
  padding: "20px",
  marginTop: "20px",
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

const simulationPlanBox = {
  marginTop: "12px",
  background: "rgba(56,189,248,.10)",
  border: "1px solid rgba(56,189,248,.40)",
  borderRadius: "14px",
  padding: "12px",
};

const scoreRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const scoreValue = {
  fontSize: "42px",
  lineHeight: 1,
};

const scoreBadge = {
  border: "1px solid var(--gold)",
  borderRadius: "999px",
  padding: "7px 10px",
  fontSize: "12px",
  fontWeight: "900",
};

const decisionGrid = {
  display: "grid",
  gap: "8px",
  marginTop: "14px",
};

const decisionLine = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "13px",
  padding: "10px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
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

const barFill = {
  height: "100%",
  borderRadius: "999px",
};

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

const almostText = {
  color: "var(--gold)",
  fontWeight: "bold",
  marginTop: "8px",
};

const victoryText = {
  color: "var(--green)",
  fontWeight: "bold",
  marginTop: "8px",
};

const muted = {
  color: "var(--text-muted)",
  marginTop: "8px",
};

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "12px",
  marginTop: "8px",
  display: "block",
};

export default MonPlan;
