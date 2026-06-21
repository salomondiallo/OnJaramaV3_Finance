import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Flame,
  Gauge,
  Home,
  PiggyBank,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cleanMoneyInput, formatMoney } from "../utils/formatters";
import { getText } from "../data/translations";

const pageText = {
  FR: {
    subtitle: "Votre situation d’abord : origines, destinations, dettes et marge réelle.",
    premium: "Situation Premium",
    scoreLabel: "Score OnJarama",
    scoreWaiting: "À compléter",
    scoreWaitingText: "Ajoutez vos sources et vos sorties pour générer un score fiable.",
    started: "Vous avez commencé il y a",
    today: "aujourd’hui",
    day: "jour",
    days: "jours",
    incomeOrigin: "Origine des fonds",
    moneyDestination: "Destination des fonds",
    savingsProjects: "Épargne et projets",
    editableDebts: "Dettes modifiables",
    noDebt: "Aucune dette enregistrée.",
    addDebt: "Ajouter une dette",
    debtName: "Nom de la dette",
    balance: "Solde",
    rate: "Taux %",
    minimumPayment: "Paiement minimum",
    nextAction: "Prochaine action recommandée",
    viewPath: "Voir mon parcours",
    openSimulator: "Ouvrir le simulateur",
    priority: "Priorité actuelle",
    becauseRate: "car son taux est de",
    addPriority: "Ajoutez une dette ou un objectif pour générer une priorité.",
    income: "Revenus",
    totalOut: "Sorties totales",
    totalDebts: "Dettes totales",
    available: "Disponible",
    good: "Bonne stabilité financière",
    stable: "Situation stable mais à surveiller",
    fragile: "Situation fragile",
    control: "Priorité : reprendre le contrôle",
    snapshot: "Situation actuelle",
    positive: "Positive",
    warning: "À surveiller",
    critical: "Prioritaire",
    distribution: "Répartition mensuelle",
    incomeShare: "Revenus utilisés",
    expenseShare: "Dépenses",
    savingShare: "Épargne",
    debtShare: "Paiements dettes",
    strengths: "Points forts",
    risks: "Points à surveiller",
    aiSummary: "Résumé IA OnJarama",
    strongIncome: "Des revenus sont enregistrés.",
    strongAvailable: "Il reste un montant disponible après les sorties.",
    strongSavings: "Une épargne est déjà prévue.",
    strongDebt: "Aucune dette active enregistrée.",
    riskNoIncome: "Aucun revenu n’est encore indiqué.",
    riskNegative: "Les sorties dépassent les revenus.",
    riskDebt: "Le poids des dettes reste important.",
    riskNoSavings: "Aucune épargne n’est encore prévue.",
    aiGood: "Votre situation montre une base solide. Continuez à protéger votre épargne et à avancer étape par étape.",
    aiStable: "Votre situation tient debout, mais quelques ajustements peuvent libérer plus de marge chaque mois.",
    aiFragile: "Votre priorité est de réduire la pression mensuelle et de concentrer l’effort sur la dette la plus coûteuse.",
    aiWaiting: "Le diagnostic sera généré quand l’origine et la destination des fonds seront renseignées.",
    debtPressure: "Pression dettes",
    monthlyBreath: "Souffle mensuel",
    speTitle: "SPE — Smart Plan Engine",
    speSubtitle: "Le moteur intelligent qui transforme votre situation en plan clair.",
    spePointPriority: "Analyse votre situation actuelle",
    spePointDebt: "Identifie la dette ou l’objectif prioritaire",
    spePointAction: "Prépare la prochaine action recommandée",
    spePointStrategy: "Construit votre stratégie personnalisée",
    openSpe: "Ouvrir Smart Plan Engine",
  },
  EN: {
    subtitle: "Your situation first: sources, destinations, debts and real margin.",
    premium: "Premium Situation",
    scoreLabel: "OnJarama Score",
    scoreWaiting: "To complete",
    scoreWaitingText: "Add your sources and outgoing payments to generate a reliable score.",
    started: "You started",
    today: "today",
    day: "day ago",
    days: "days ago",
    incomeOrigin: "Source of funds",
    moneyDestination: "Money destination",
    savingsProjects: "Savings and projects",
    editableDebts: "Editable debts",
    noDebt: "No debt registered.",
    addDebt: "Add debt",
    debtName: "Debt name",
    balance: "Balance",
    rate: "Rate %",
    minimumPayment: "Minimum payment",
    nextAction: "Recommended next action",
    viewPath: "View my path",
    openSimulator: "Open simulator",
    priority: "Current priority",
    becauseRate: "because its rate is",
    addPriority: "Add a debt or goal to generate a priority.",
    income: "Income",
    totalOut: "Total outgoing",
    totalDebts: "Total debts",
    available: "Available",
    good: "Good financial stability",
    stable: "Stable situation but needs monitoring",
    fragile: "Fragile situation",
    control: "Priority: regain control",
    snapshot: "Current situation",
    positive: "Positive",
    warning: "Watch",
    critical: "Priority",
    distribution: "Monthly distribution",
    incomeShare: "Income used",
    expenseShare: "Expenses",
    savingShare: "Savings",
    debtShare: "Debt payments",
    strengths: "Strengths",
    risks: "Watch points",
    aiSummary: "OnJarama AI Summary",
    strongIncome: "Income is registered.",
    strongAvailable: "Money remains available after outgoing payments.",
    strongSavings: "Savings are already planned.",
    strongDebt: "No active debt registered.",
    riskNoIncome: "No income has been entered yet.",
    riskNegative: "Outgoing payments are higher than income.",
    riskDebt: "Debt weight remains important.",
    riskNoSavings: "No savings are planned yet.",
    aiGood: "Your situation shows a solid base. Keep protecting your savings and move step by step.",
    aiStable: "Your situation is standing, but a few adjustments can free more room every month.",
    aiFragile: "Your priority is to reduce monthly pressure and focus effort on the most expensive debt.",
    aiWaiting: "The diagnosis will be generated when fund sources and destinations are entered.",
    debtPressure: "Debt pressure",
    monthlyBreath: "Monthly breath",
    speTitle: "SPE — Smart Plan Engine",
    speSubtitle: "The smart engine that turns your situation into a clear plan.",
    spePointPriority: "Analyzes your current situation",
    spePointDebt: "Identifies the priority debt or goal",
    spePointAction: "Prepares the recommended next action",
    spePointStrategy: "Builds your personalized strategy",
    openSpe: "Open Smart Plan Engine",
  },
  ES: {
    subtitle: "Tu situación primero: orígenes, destinos, deudas y margen real.",
    premium: "Situación Premium",
    scoreLabel: "Puntaje OnJarama",
    scoreWaiting: "A completar",
    scoreWaitingText: "Agrega tus fuentes y salidas para generar un puntaje fiable.",
    started: "Comenzaste hace",
    today: "hoy",
    day: "día",
    days: "días",
    incomeOrigin: "Origen de los fondos",
    moneyDestination: "Destino del dinero",
    savingsProjects: "Ahorro y proyectos",
    editableDebts: "Deudas modificables",
    noDebt: "No hay deuda registrada.",
    addDebt: "Agregar deuda",
    debtName: "Nombre de la deuda",
    balance: "Saldo",
    rate: "Tasa %",
    minimumPayment: "Pago mínimo",
    nextAction: "Próxima acción recomendada",
    viewPath: "Ver mi camino",
    openSimulator: "Abrir simulador",
    priority: "Prioridad actual",
    becauseRate: "porque su tasa es de",
    addPriority: "Agrega una deuda u objetivo para generar una prioridad.",
    income: "Ingresos",
    totalOut: "Salidas totales",
    totalDebts: "Deudas totales",
    available: "Disponible",
    good: "Buena estabilidad financiera",
    stable: "Situación estable pero a vigilar",
    fragile: "Situación frágil",
    control: "Prioridad: recuperar el control",
    snapshot: "Situación actual",
    positive: "Positiva",
    warning: "A vigilar",
    critical: "Prioritaria",
    distribution: "Distribución mensual",
    incomeShare: "Ingresos usados",
    expenseShare: "Gastos",
    savingShare: "Ahorro",
    debtShare: "Pagos de deuda",
    strengths: "Puntos fuertes",
    risks: "Puntos a vigilar",
    aiSummary: "Resumen IA OnJarama",
    strongIncome: "Hay ingresos registrados.",
    strongAvailable: "Queda dinero disponible después de las salidas.",
    strongSavings: "Ya hay ahorro previsto.",
    strongDebt: "No hay deuda activa registrada.",
    riskNoIncome: "Aún no se indicó ningún ingreso.",
    riskNegative: "Las salidas superan los ingresos.",
    riskDebt: "El peso de las deudas sigue siendo importante.",
    riskNoSavings: "Aún no hay ahorro previsto.",
    aiGood: "Tu situación muestra una base sólida. Sigue protegiendo tu ahorro y avanzando paso a paso.",
    aiStable: "Tu situación se mantiene, pero algunos ajustes pueden liberar más margen cada mes.",
    aiFragile: "Tu prioridad es reducir la presión mensual y concentrar el esfuerzo en la deuda más costosa.",
    aiWaiting: "El diagnóstico se generará cuando se indiquen los orígenes y destinos de los fondos.",
    debtPressure: "Presión de deuda",
    monthlyBreath: "Respiro mensual",
    speTitle: "SPE — Smart Plan Engine",
    speSubtitle: "El motor inteligente que transforma tu situación en un plan claro.",
    spePointPriority: "Analiza tu situación actual",
    spePointDebt: "Identifica la deuda u objetivo prioritario",
    spePointAction: "Prepara la próxima acción recomendada",
    spePointStrategy: "Construye tu estrategia personalizada",
    openSpe: "Abrir Smart Plan Engine",
  },
};

function Situation({ financeData, setFinanceData, settings, setCurrentPage }) {
  const t = getText(settings);
  const p = pageText[settings?.language || "FR"] || pageText.FR;
  const currency = settings?.currency || "CAD";
  const safeFinanceData = {
    overview: financeData?.overview || {},
    debts: Array.isArray(financeData?.debts) ? financeData.debts : [],
    goals: Array.isArray(financeData?.goals) ? financeData.goals : [],
  };

  const [details, setDetails] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onjaramaSituationDetails")) || getDefaultDetails(settings?.language || "FR");
    } catch {
      return getDefaultDetails(settings?.language || "FR");
    }
  });

  const [startedAt] = useState(() => {
    const existing = localStorage.getItem("onjaramaPathStartedAt");
    if (existing) return existing;
    const now = new Date().toISOString();
    localStorage.setItem("onjaramaPathStartedAt", now);
    return now;
  });

  const [confirmAction, setConfirmAction] = useState("");
  const [newDebt, setNewDebt] = useState({
    name: "",
    type: "Carte de crédit",
    balance: "",
    interestRate: "",
    minimumPayment: "",
  });

  const incomeTotal = sum(details.incomes);
  const expensesTotal = sum(details.expenses);
  const savingsTotal = sum(details.savings);
  const hasFinancialBase = incomeTotal > 0;

  const totalDebt = safeFinanceData.debts.reduce((sumValue, debt) => sumValue + Number(debt.balance || 0), 0);
  const minimumDebtPayments = safeFinanceData.debts.reduce((sumValue, debt) => sumValue + Number(debt.minimumPayment || 0), 0);
  const totalOutgoing = expensesTotal + savingsTotal + minimumDebtPayments;
  const available = incomeTotal - totalOutgoing;
  const usedIncomePercent = percentage(totalOutgoing, incomeTotal);
  const expensePercent = percentage(expensesTotal, totalOutgoing);
  const savingPercent = percentage(savingsTotal, totalOutgoing);
  const debtPaymentPercent = percentage(minimumDebtPayments, totalOutgoing);
  const debtPressure = percentage(totalDebt, incomeTotal * 12 || totalDebt);

  const priorityDebt = [...safeFinanceData.debts]
    .filter((debt) => Number(debt.balance || 0) > 0)
    .sort((a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0))[0];

  const score = useMemo(
    () => calculateScore({ income: incomeTotal, expenses: expensesTotal, savings: savingsTotal, totalDebt, available, p }),
    [incomeTotal, expensesTotal, savingsTotal, totalDebt, available, p]
  );

  const premiumStatus = getPremiumStatus(score, available, p);
  const journeyDays = getDaysSince(startedAt);
  const strengths = getStrengths({ incomeTotal, available, savingsTotal, totalDebt, p });
  const risks = getRisks({ incomeTotal, available, savingsTotal, totalDebt, p });
  const aiText = score.isReady ? getAiSummary(score.value, p) : p.aiWaiting;

  useEffect(() => {
    localStorage.setItem("onjaramaSituationDetails", JSON.stringify(details));
    setFinanceData((previous) => ({
      ...previous,
      overview: {
        ...previous.overview,
        monthlyIncome: incomeTotal,
        monthlyExpenses: expensesTotal + minimumDebtPayments,
        monthlySavings: savingsTotal,
      },
    }));
  }, [details, incomeTotal, expensesTotal, savingsTotal, minimumDebtPayments, setFinanceData]);

  useEffect(() => {
    if (!confirmAction) return;
    const timer = window.setTimeout(() => setConfirmAction(""), 500);
    return () => window.clearTimeout(timer);
  }, [confirmAction]);

  function updateCategory(group, id, value) {
    setDetails({
      ...details,
      [group]: details[group].map((item) =>
        item.id === id ? { ...item, amount: Number(cleanMoneyInput(value) || 0) } : item
      ),
    });
  }

  function updateDebt(index, field, value) {
    const updatedDebts = safeFinanceData.debts.map((debt, debtIndex) => {
      if (debtIndex !== index) return debt;
      return {
        ...debt,
        [field]: field === "name" || field === "type" ? value : Number(cleanMoneyInput(value) || 0),
      };
    });
    setFinanceData({ ...financeData, debts: updatedDebts });
    setConfirmAction("debt");
  }

  function addDebt() {
    if (!newDebt.name || !newDebt.balance) return;
    setFinanceData({
      ...financeData,
      debts: [
        ...safeFinanceData.debts,
        {
          name: newDebt.name,
          type: newDebt.type,
          balance: Number(newDebt.balance || 0),
          interestRate: Number(newDebt.interestRate || 0),
          minimumPayment: Number(newDebt.minimumPayment || 0),
        },
      ],
    });
    setNewDebt({ name: "", type: "Carte de crédit", balance: "", interestRate: "", minimumPayment: "" });
    setConfirmAction("addDebt");
  }

  function removeDebt(indexToRemove) {
    setFinanceData({ ...financeData, debts: safeFinanceData.debts.filter((_, index) => index !== indexToRemove) });
    setConfirmAction("removeDebt");
  }

  return (
    <div className="native-page">
      <div style={pageHead}>
        <div>
          <p style={eyebrow}>{p.premium}</p>
          <h1>{t.situation}</h1>
          <p style={muted}>{p.subtitle}</p>
        </div>
      </div>

      <CategorySection
        id="origine-fonds"
        title={p.incomeOrigin}
        icon={<Wallet color="var(--green)" />}
        items={details.incomes}
        currency={currency}
        onChange={(id, value) => updateCategory("incomes", id, value)}
      />

      <CategorySection
        id="destination-fonds"
        title={p.moneyDestination}
        icon={<Home color="var(--gold)" />}
        items={details.expenses}
        currency={currency}
        onChange={(id, value) => updateCategory("expenses", id, value)}
      />

      <CategorySection
        id="epargne-projets"
        title={p.savingsProjects}
        icon={<PiggyBank color="var(--green)" />}
        items={details.savings}
        currency={currency}
        onChange={(id, value) => updateCategory("savings", id, value)}
      />

      <section id="dettes" style={card} className={confirmAction === "debt" ? "action-confirm" : ""}>
        <div style={header}>
          <CreditCard color="var(--red)" />
          <h2>{p.editableDebts}</h2>
        </div>
        {safeFinanceData.debts.length === 0 && <p style={muted}>{p.noDebt}</p>}
        {safeFinanceData.debts.map((debt, index) => (
          <div key={`${debt.name}-${index}`} style={debtCard}>
            <input value={debt.name} onChange={(event) => updateDebt(index, "name", event.target.value)} style={input} placeholder={p.debtName} />
            <select value={debt.type || "Autre"} onChange={(event) => updateDebt(index, "type", event.target.value)} style={input}>
              <option>Carte de crédit</option>
              <option>Marge de crédit</option>
              <option>Prêt personnel</option>
              <option>Financement</option>
              <option>Hypothèque</option>
              <option>Auto</option>
              <option>Autre</option>
            </select>
            <input value={debt.balance || ""} onChange={(event) => updateDebt(index, "balance", event.target.value)} style={input} inputMode="decimal" placeholder={p.balance} />
            <input value={debt.interestRate || ""} onChange={(event) => updateDebt(index, "interestRate", event.target.value)} style={input} inputMode="decimal" placeholder={p.rate} />
            <input value={debt.minimumPayment || ""} onChange={(event) => updateDebt(index, "minimumPayment", event.target.value)} style={input} inputMode="decimal" placeholder={p.minimumPayment} />
            <div style={debtBottom}>
              <div>
                <strong>{formatMoney(debt.balance, currency)}</strong>
                <p style={mutedTiny}>{Number(debt.interestRate || 0)}%</p>
              </div>
              <button onClick={() => removeDebt(index)} style={trashButton} aria-label="Supprimer">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </section>

      <section style={card} className={confirmAction === "addDebt" ? "action-confirm" : ""}>
        <div style={header}>
          <Plus color="var(--green)" />
          <h2>{p.addDebt}</h2>
        </div>
        <input value={newDebt.name} onChange={(event) => setNewDebt({ ...newDebt, name: event.target.value })} style={input} placeholder="Visa, Modulo, Prêt personnel" />
        <select value={newDebt.type} onChange={(event) => setNewDebt({ ...newDebt, type: event.target.value })} style={input}>
          <option>Carte de crédit</option>
          <option>Marge de crédit</option>
          <option>Prêt personnel</option>
          <option>Financement</option>
          <option>Hypothèque</option>
          <option>Auto</option>
          <option>Autre</option>
        </select>
        <input value={newDebt.balance} onChange={(event) => setNewDebt({ ...newDebt, balance: cleanMoneyInput(event.target.value) })} style={input} inputMode="decimal" placeholder={p.balance} />
        <input value={newDebt.interestRate} onChange={(event) => setNewDebt({ ...newDebt, interestRate: cleanMoneyInput(event.target.value) })} style={input} inputMode="decimal" placeholder={p.rate} />
        <input value={newDebt.minimumPayment} onChange={(event) => setNewDebt({ ...newDebt, minimumPayment: cleanMoneyInput(event.target.value) })} style={input} inputMode="decimal" placeholder={p.minimumPayment} />
        <button onClick={addDebt} style={addButton}>{p.addDebt}</button>
      </section>

      <section style={heroCard}>
        <div style={heroTop}>
          <div>
            <p style={mutedSmall}>{p.scoreLabel}</p>
            <h2 style={scoreTitle}>{score.isReady ? `${score.value}/100` : p.scoreWaiting}</h2>
            <p style={{ ...muted, color: score.color }}>{score.label}</p>
          </div>
          <ScoreRing value={score.isReady ? score.value : 0} color={score.color} />
        </div>
        <div style={barBg}>
          <div style={{ ...barFill, width: `${score.isReady ? score.value : 0}%`, background: score.color }} />
        </div>
        <div style={disciplineStrip}>
          <Flame size={18} color="var(--gold)" />
          <span>{journeyDays === 0 ? p.today : `${p.started} ${journeyDays} ${journeyDays > 1 ? p.days : p.day}`}</span>
        </div>
      </section>

      <section style={speCard}>
        <div style={header}>
          <Sparkles color="var(--gold)" />
          <div>
            <h2>{p.speTitle}</h2>
            <p style={muted}>{p.speSubtitle}</p>
          </div>
        </div>

        <div style={speGrid}>
          <SpePoint text={p.spePointPriority} />
          <SpePoint text={p.spePointDebt} />
          <SpePoint text={p.spePointAction} />
          <SpePoint text={p.spePointStrategy} />
        </div>

        <button onClick={() => setCurrentPage("monplan")} style={speButton}>
          {p.openSpe}
          <ArrowRight size={17} />
        </button>
      </section>

      <section style={statusCard(premiumStatus.color)}>
        <div style={header}>{premiumStatus.icon}<div><p style={mutedSmall}>{p.snapshot}</p><h2>{premiumStatus.label}</h2></div></div>
        <p style={muted}>{aiText}</p>
      </section>

      <div className="grid-2" style={grid}>
        <InfoCard title={p.income} value={formatMoney(incomeTotal, currency)} icon={<Wallet />} color="var(--green)" />
        <InfoCard title={p.totalOut} value={formatMoney(totalOutgoing, currency)} icon={<Home />} color="var(--red)" />
        <InfoCard title={p.totalDebts} value={formatMoney(totalDebt, currency)} icon={<CreditCard />} color="var(--red)" />
        <InfoCard title={p.available} value={formatMoney(available, currency)} icon={<PiggyBank />} color={available >= 0 ? "var(--green)" : "var(--red)"} />
      </div>

      <section style={card}>
        <div style={header}><Gauge color="var(--gold)" /><h2>{p.distribution}</h2></div>
        <MetricBar label={p.incomeShare} value={`${usedIncomePercent}%`} percent={usedIncomePercent} color={usedIncomePercent <= 85 ? "var(--green)" : "var(--red)"} />
        <MetricBar label={p.expenseShare} value={`${expensePercent}%`} percent={expensePercent} color="var(--gold)" />
        <MetricBar label={p.savingShare} value={`${savingPercent}%`} percent={savingPercent} color="var(--green)" />
        <MetricBar label={p.debtShare} value={`${debtPaymentPercent}%`} percent={debtPaymentPercent} color="var(--red)" />
      </section>

      <div className="grid-2" style={grid}>
        <MiniInsight icon={<TrendingUp size={18} />} title={p.monthlyBreath} value={formatMoney(available, currency)} color={available >= 0 ? "var(--green)" : "var(--red)"} />
        <MiniInsight icon={<TrendingDown size={18} />} title={p.debtPressure} value={`${debtPressure}%`} color={debtPressure < 50 ? "var(--green)" : "var(--red)"} />
      </div>

      <section style={card}><div style={header}><CheckCircle2 color="var(--green)" /><h2>{p.strengths}</h2></div><InsightList items={strengths} empty={p.addPriority} color="var(--green)" /></section>
      <section style={card}><div style={header}><AlertTriangle color="var(--gold)" /><h2>{p.risks}</h2></div><InsightList items={risks} empty={p.good} color="var(--gold)" /></section>
      <section style={aiCard}><div style={header}><Sparkles color="var(--blue)" /><h2>{p.aiSummary}</h2></div><p style={muted}>{aiText}</p></section>

      <section style={priorityCard}>
        <div style={header}><Flame color="var(--gold)" /><h2>{p.nextAction}</h2></div>
        <p style={muted}>{priorityDebt ? `${p.priority} : ${priorityDebt.name}, ${p.becauseRate} ${priorityDebt.interestRate} %.` : p.addPriority}</p>
        <div style={actions}>
          <button onClick={() => setCurrentPage("parcours")} style={aiButton}>{p.viewPath}<ArrowRight size={17} /></button>
          <button onClick={() => setCurrentPage("simulateur")} style={simulatorButton}>{p.openSimulator}</button>
        </div>
      </section>
    </div>
  );
}

function getDefaultDetails(language) {
  const labels = {
    FR: { salary: "Salaire / revenu principal", otherIncome: "Autres revenus", housing: "Logement / hypothèque / loyer", insuranceHome: "Assurance habitation", insuranceCar: "Assurance automobile", insuranceLife: "Assurance vie / hypothécaire", transport: "Transport", food: "Épicerie / nourriture", family: "Soutien familial", subscriptions: "Abonnements", utilities: "Électricité / téléphone / internet", otherExpenses: "Autres dépenses", emergency: "Fonds d’urgence", projects: "Épargne projets" },
    EN: { salary: "Salary / main income", otherIncome: "Other income", housing: "Housing / mortgage / rent", insuranceHome: "Home insurance", insuranceCar: "Car insurance", insuranceLife: "Life / mortgage insurance", transport: "Transportation", food: "Groceries / food", family: "Family support", subscriptions: "Subscriptions", utilities: "Electricity / phone / internet", otherExpenses: "Other expenses", emergency: "Emergency fund", projects: "Project savings" },
    ES: { salary: "Salario / ingreso principal", otherIncome: "Otros ingresos", housing: "Vivienda / hipoteca / alquiler", insuranceHome: "Seguro de vivienda", insuranceCar: "Seguro de auto", insuranceLife: "Seguro de vida / hipotecario", transport: "Transporte", food: "Comida / supermercado", family: "Apoyo familiar", subscriptions: "Suscripciones", utilities: "Electricidad / teléfono / internet", otherExpenses: "Otros gastos", emergency: "Fondo de emergencia", projects: "Ahorro para proyectos" },
  };
  const l = labels[language] || labels.FR;
  return {
    incomes: [{ id: "salary", label: l.salary, amount: 0 }, { id: "otherIncome", label: l.otherIncome, amount: 0 }],
    expenses: [
      { id: "housing", label: l.housing, amount: 0 }, { id: "insuranceHome", label: l.insuranceHome, amount: 0 }, { id: "insuranceCar", label: l.insuranceCar, amount: 0 }, { id: "insuranceLife", label: l.insuranceLife, amount: 0 }, { id: "transport", label: l.transport, amount: 0 }, { id: "food", label: l.food, amount: 0 }, { id: "family", label: l.family, amount: 0 }, { id: "subscriptions", label: l.subscriptions, amount: 0 }, { id: "utilities", label: l.utilities, amount: 0 }, { id: "otherExpenses", label: l.otherExpenses, amount: 0 },
    ],
    savings: [{ id: "emergency", label: l.emergency, amount: 0 }, { id: "projects", label: l.projects, amount: 0 }],
  };
}

function SpePoint({ text }) {
  return <div style={spePoint}><CheckCircle2 size={16} color="var(--green)" /><span>{text}</span></div>;
}

function CategorySection({ id, title, icon, items, currency, onChange }) {
  return <section id={id} style={card}><div style={header}>{icon}<h2>{title}</h2></div>{items.map((item) => <div key={item.id} style={categoryRow}><label>{item.label}</label><input value={item.amount || ""} onChange={(event) => onChange(item.id, event.target.value)} inputMode="decimal" placeholder={`0 ${currency}`} style={input} /></div>)}</section>;
}
function InfoCard({ icon, title, value, color }) { return <div style={{ ...infoCard, borderColor: color }}><span style={{ color }}>{icon}</span><p style={mutedSmall}>{title}</p><strong>{value}</strong></div>; }
function MiniInsight({ icon, title, value, color }) { return <div style={{ ...miniInsight, borderColor: color }}><span style={{ color }}>{icon}</span><div><p style={mutedSmall}>{title}</p><strong>{value}</strong></div></div>; }
function MetricBar({ label, value, percent, color }) { return <div style={metricWrap}><div style={metricHead}><span>{label}</span><strong style={{ color }}>{value}</strong></div><div style={miniBarBg}><div style={{ ...miniBarFill, width: `${Math.min(100, percent)}%`, background: color }} /></div></div>; }
function InsightList({ items, empty, color }) { if (!items.length) return <p style={muted}>{empty}</p>; return <div style={insightList}>{items.map((item) => <div key={item} style={insightItem}><span style={{ ...dot, background: color }} /><p>{item}</p></div>)}</div>; }
function ScoreRing({ value, color }) { const degree = Math.round((Number(value || 0) / 100) * 360); return <div style={{ ...scoreRing, background: `conic-gradient(${color} ${degree}deg, rgba(255,255,255,.12) 0deg)` }}><div style={scoreRingInner}><ShieldCheck size={22} color={color} /></div></div>; }
function sum(items) { return items.reduce((total, item) => total + Number(item.amount || 0), 0); }
function percentage(part, total) { if (!total || total <= 0) return 0; return Math.max(0, Math.min(100, Math.round((Number(part || 0) / total) * 100))); }
function getDaysSince(dateValue) { if (!dateValue) return 0; const diff = Date.now() - new Date(dateValue).getTime(); if (diff <= 0) return 0; return Math.floor(diff / 86400000); }
function getStrengths({ incomeTotal, available, savingsTotal, totalDebt, p }) { const strengths = []; if (incomeTotal > 0) strengths.push(p.strongIncome); if (available > 0) strengths.push(p.strongAvailable); if (savingsTotal > 0) strengths.push(p.strongSavings); if (totalDebt === 0) strengths.push(p.strongDebt); return strengths; }
function getRisks({ incomeTotal, available, savingsTotal, totalDebt, p }) { const risks = []; if (incomeTotal <= 0) risks.push(p.riskNoIncome); if (available < 0) risks.push(p.riskNegative); if (incomeTotal > 0 && totalDebt > incomeTotal * 6) risks.push(p.riskDebt); if (savingsTotal <= 0) risks.push(p.riskNoSavings); return risks; }
function getAiSummary(scoreValue, p) { if (scoreValue >= 80) return p.aiGood; if (scoreValue >= 55) return p.aiStable; return p.aiFragile; }
function getPremiumStatus(score, available, p) { if (!score.isReady) return { label: p.scoreWaiting, color: "var(--gold)", icon: <AlertTriangle color="var(--gold)" /> }; if (score.value >= 75 && available >= 0) return { label: p.positive, color: "var(--green)", icon: <CheckCircle2 color="var(--green)" /> }; if (score.value >= 45 || available >= 0) return { label: p.warning, color: "var(--gold)", icon: <AlertTriangle color="var(--gold)" /> }; return { label: p.critical, color: "var(--red)", icon: <Flame color="var(--red)" /> }; }
function calculateScore({ income, expenses, savings, totalDebt, available, p }) { if (!income || income <= 0) return { value: 0, isReady: false, label: p.scoreWaitingText, color: "var(--gold)" }; let score = 50; if (income > 0) score += 10; if (available > 0) score += 15; if (savings > 0) score += 10; if (totalDebt === 0) score += 10; if (totalDebt > income * 6 && income > 0) score -= 20; if (expenses > income && income > 0) score -= 15; if (available < 0) score -= 25; const value = Math.max(0, Math.min(100, score)); if (value >= 80) return { value, isReady: true, label: p.good, color: "var(--green)" }; if (value >= 60) return { value, isReady: true, label: p.stable, color: "var(--gold)" }; if (value >= 40) return { value, isReady: true, label: p.fragile, color: "var(--red)" }; return { value, isReady: true, label: p.control, color: "var(--red)" }; }

const pageHead = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" };
const eyebrow = { color: "var(--gold)", fontSize: "12px", fontWeight: "900", letterSpacing: ".04em", textTransform: "uppercase", margin: 0 };
const card = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "22px", padding: "20px", marginTop: "20px" };
const heroCard = { background: "radial-gradient(circle at top right, rgba(212,175,55,.20), transparent 34%), linear-gradient(135deg, rgba(34,197,94,.12), var(--bg-card))", border: "1px solid rgba(212,175,55,.45)", borderRadius: "26px", padding: "22px", marginTop: "20px", boxShadow: "0 18px 40px var(--shadow)" };
const speCard = { background: "radial-gradient(circle at top right, rgba(212,175,55,.22), transparent 36%), linear-gradient(135deg, rgba(212,175,55,.14), rgba(56,189,248,.08), var(--bg-card))", border: "1px solid rgba(212,175,55,.55)", borderRadius: "24px", padding: "20px", marginTop: "20px", boxShadow: "0 16px 34px var(--shadow)" };
const speGrid = { display: "grid", gap: "9px", marginTop: "14px" };
const spePoint = { background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "14px", padding: "11px", display: "flex", alignItems: "center", gap: "9px", color: "var(--text-main)", fontWeight: "800" };
const speButton = { width: "100%", marginTop: "16px", padding: "14px", borderRadius: "14px", border: "1px solid var(--gold)", background: "rgba(212,175,55,.14)", color: "var(--gold)", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" };
const heroTop = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px" };
const scoreTitle = { fontSize: "34px", lineHeight: 1, margin: "6px 0 0" };
const scoreRing = { width: "82px", height: "82px", borderRadius: "50%", padding: "8px", flex: "0 0 auto" };
const scoreRingInner = { width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-card)", display: "grid", placeItems: "center", border: "1px solid var(--border)" };
const disciplineStrip = { marginTop: "16px", border: "1px solid rgba(212,175,55,.35)", background: "rgba(212,175,55,.1)", color: "var(--gold)", borderRadius: "16px", padding: "11px 12px", display: "flex", alignItems: "center", gap: "8px", fontWeight: "900" };
const statusCard = (color) => ({ background: "var(--bg-card)", border: `1px solid ${color}`, borderRadius: "22px", padding: "20px", marginTop: "20px" });
const aiCard = { background: "linear-gradient(135deg, rgba(139,92,246,.18), rgba(56,189,248,.12), var(--bg-card))", border: "1px solid rgba(56,189,248,.45)", borderRadius: "22px", padding: "20px", marginTop: "20px" };
const priorityCard = { background: "linear-gradient(135deg,#2a210b,var(--bg-card))", border: "1px solid var(--gold)", borderRadius: "22px", padding: "20px", marginTop: "20px" };
const grid = { gap: "12px", marginTop: "18px" };
const infoCard = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "18px", padding: "16px" };
const miniInsight = { background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "18px", padding: "15px", display: "flex", alignItems: "center", gap: "10px" };
const header = { display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" };
const categoryRow = { marginTop: "12px" };
const input = { display: "block", width: "100%", marginTop: "8px", padding: "14px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--bg-panel)", color: "var(--text-main)" };
const debtCard = { background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "18px", padding: "14px", marginTop: "12px" };
const debtBottom = { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" };
const trashButton = { border: "1px solid var(--red)", background: "transparent", color: "var(--red)", borderRadius: "10px", padding: "7px" };
const addButton = { width: "100%", marginTop: "16px", padding: "14px", borderRadius: "14px", border: "none", background: "var(--green)", color: "white", fontWeight: "bold" };
const actions = { display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginTop: "14px" };
const aiButton = { width: "100%", padding: "14px", borderRadius: "14px", border: "none", background: "linear-gradient(90deg,var(--purple),var(--blue))", color: "white", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" };
const simulatorButton = { width: "100%", padding: "14px", borderRadius: "14px", border: "1px solid var(--gold)", background: "rgba(212,175,55,.12)", color: "var(--gold)", fontWeight: "bold" };
const barBg = { height: "10px", background: "var(--bg-panel)", borderRadius: "999px", marginTop: "14px" };
const barFill = { height: "100%", borderRadius: "999px" };
const miniBarBg = { height: "9px", background: "var(--bg-panel)", borderRadius: "999px", overflow: "hidden" };
const miniBarFill = { height: "100%", borderRadius: "999px" };
const metricWrap = { marginTop: "14px" };
const metricHead = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "7px" };
const insightList = { display: "grid", gap: "10px" };
const insightItem = { display: "flex", alignItems: "flex-start", gap: "9px" };
const dot = { width: "9px", height: "9px", borderRadius: "50%", marginTop: "6px", flex: "0 0 auto" };
const muted = { color: "var(--text-muted)", marginTop: "8px" };
const mutedSmall = { color: "var(--text-muted)", fontSize: "13px", marginTop: "5px" };
const mutedTiny = { color: "var(--text-muted)", fontSize: "12px", margin: "4px 0 0" };
export default Situation;
