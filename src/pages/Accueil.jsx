import {
  AlertTriangle,
  Bot,
  CalendarDays,
  CheckCircle,
  Lightbulb,
  Map,
  PiggyBank,
  Plus,
  ShieldCheck,
  Target,
  Wallet,
  Trophy,
} from "lucide-react";
import { getText } from "../data/translations";

function Accueil({ financeData, selectedGoals, setCurrentPage, settings }) {
  const t = getText(settings);

  const totalDebt = financeData.debts.reduce(
    (sum, debt) => sum + Number(debt.balance || 0),
    0
  );

  const available =
    Number(financeData.overview.monthlyIncome || 0) -
    Number(financeData.overview.monthlyExpenses || 0) -
    Number(financeData.overview.monthlySavings || 0);

  const priorityDebt = [...financeData.debts].sort(
    (a, b) => Number(b.interestRate || 0) - Number(a.interestRate || 0)
  )[0];

  const mainGoal =
    selectedGoals.find((goal) => goal.highlighted && !goal.archived) ||
    selectedGoals.find((goal) => !goal.archived);

  const monthsToVictory = priorityDebt
    ? Math.ceil(Number(priorityDebt.balance || 0) / 600)
    : 0;

  function money(value) {
    return Number(value || 0).toLocaleString("fr-CA", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <div>
      <section style={hero}>
        <div style={heroText}>
          <h1 style={heroTitle}>
            {t.heroTitle}
            <br />
            <span style={heroAccent}>{t.heroAccent}</span>
          </h1>

          <p style={heroSubtitle}>Transformez vos objectifs en plan concret.</p>

          <div style={heroTags}>
            <span>🏠 Maison</span>
            <span>🚗 Auto</span>
            <span>✈️ Voyage</span>
            <span>💰 Épargne</span>
          </div>
        </div>

        <div style={sideRail}>
          <RailItem icon={<CalendarDays />} label="Paiement" color="var(--gold)" />
          <RailLine />
          <RailItem icon={<PiggyBank />} label="Dette" color="var(--green)" />
          <RailLine />
          <RailItem icon={<Target />} label="Objectif" color="var(--purple)" />
          <RailLine />
          <RailItem icon={<ShieldCheck />} label="Protection" color="var(--blue)" />
          <RailLine />
          <RailItem icon={<Lightbulb />} label="Conseil" color="var(--gold)" />
        </div>
      </section>

      <div style={heroButtons}>
        <button onClick={() => setCurrentPage("situation")} style={primaryBtn}>
          {t.start}
        </button>

        <button onClick={() => setCurrentPage("assistant")} style={aiBtn}>
          <Bot size={18} /> {t.assistant}
        </button>
      </div>

      <section style={missionCard}>
        <h2>{t.guideTitle}</h2>

        <div style={missionGrid}>
          <MissionItem icon={<Lightbulb />} title={t.understand} onClick={() => setCurrentPage("situation")} />
          <MissionItem icon={<Wallet />} title={t.organize} onClick={() => setCurrentPage("budget")} />
          <MissionItem icon={<Target />} title={t.simulate} onClick={() => setCurrentPage("simulateur")} />
          <MissionItem icon={<CheckCircle />} title={t.advance} onClick={() => setCurrentPage("parcours")} />
        </div>
      </section>

      <h2 style={sectionTitle}>{t.currentProfile}</h2>

      <div style={portraitScroll}>
        <MiniCard icon={<Wallet />} color="var(--green)" title={t.available} value={`${money(available)} $`} />
        <MiniCard icon={<AlertTriangle />} color="var(--red)" title={t.debt} value={`${money(totalDebt)} $`} />
        <MiniCard icon={<Target />} color="var(--gold)" title={t.goals} value={selectedGoals.length} />
        <MiniCard icon={<Trophy />} color="var(--purple)" title={t.victory} value={priorityDebt?.name || mainGoal?.title || t.toDefine} />
      </div>

      <section style={victoryCard}>
        <p style={muted}>{t.nextVictory}</p>
        <h2>{priorityDebt?.name || mainGoal?.title || t.takeControl}</h2>

        <div style={victoryRow}>
          <div>
            <h1 style={{ color: "var(--gold)" }}>
              {priorityDebt
                ? `${money(priorityDebt.balance)} $`
                : mainGoal
                ? `${money(
                    Number(mainGoal.targetAmount || 0) -
                      Number(mainGoal.currentAmount || 0)
                  )} $`
                : "0 $"}
            </h1>
            <p style={muted}>{t.remainingAmount}</p>
          </div>

          <div>
            <h1 style={{ color: "var(--green)" }}>
              {priorityDebt ? monthsToVictory : selectedGoals.length} {t.months}
            </h1>
            <p style={muted}>{priorityDebt ? `600 $ / ${t.month}` : t.goals}</p>
          </div>
        </div>
      </section>

      <h2 style={sectionTitle}>{t.quickActions}</h2>

      <div style={actionsGrid}>
        <ActionCard icon={<Plus />} title={t.addDebt} onClick={() => setCurrentPage("situation")} color="var(--red)" />
        <ActionCard icon={<CalendarDays />} title="Paiements" onClick={() => setCurrentPage("paiements")} color="var(--gold)" />
        <ActionCard icon={<Target />} title={t.createGoal} onClick={() => setCurrentPage("objectifs")} color="var(--green)" />
        <ActionCard icon={<Bot />} title={t.askAI} onClick={() => setCurrentPage("assistant")} color="var(--purple)" />
      </div>

      <section style={timeline}>
        <div style={timelineHeader}>
          <div>
            <h2>{t.seePath}</h2>
            <p style={muted}>{t.stepByStep}</p>
          </div>
          <Map color="var(--gold)" />
        </div>

        <Step title={t.today} subtitle={t.startingPoint} color="var(--blue)" />
        <Step title={priorityDebt?.name || t.takeControl} subtitle={t.nextVictory} color="var(--gold)" />
        <Step title={t.emergencyFund} subtitle={t.emergencySubtitle} color="var(--green)" />
        <Step title={mainGoal?.title || t.houseGuinea} subtitle={mainGoal?.option || t.houseSubtitle} color="var(--gold)" />
      </section>
    </div>
  );
}

function RailItem({ icon, label, color }) {
  return (
    <button style={railItem}>
      <span style={{ ...railIcon, color }}>{icon}</span>
      <small>{label}</small>
    </button>
  );
}

function RailLine() {
  return <span style={railLine} />;
}

function MissionItem({ icon, title, onClick }) {
  return (
    <button onClick={onClick} style={missionItem}>
      <span style={{ color: "var(--green)" }}>{icon}</span>
      <strong>{title}</strong>
    </button>
  );
}

function MiniCard({ icon, color, title, value }) {
  return (
    <div style={{ ...miniCard, borderColor: color }}>
      <div style={{ color }}>{icon}</div>
      <p style={mutedSmall}>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}

function ActionCard({ icon, title, onClick, color }) {
  return (
    <button onClick={onClick} style={{ ...action, borderColor: color }}>
      <span style={{ color }}>{icon}</span>
      <strong>{title}</strong>
    </button>
  );
}

function Step({ title, subtitle, color }) {
  return (
    <div style={step}>
      <span style={{ ...dot, background: color }} />
      <div>
        <strong>{title}</strong>
        <p style={mutedSmall}>{subtitle}</p>
      </div>
    </div>
  );
}

const hero = {
  minHeight: "clamp(520px, 64vw, 600px)",
  marginLeft: "-16px",
  marginRight: "-16px",
  borderRadius: "0 0 32px 32px",
  backgroundImage:
    "linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.04), rgba(0,0,0,.38)), url('/onjarama-hero.png')",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  position: "relative",
  overflow: "hidden",
};

const heroText = {
  position: "absolute",
  left: "clamp(22px, 5vw, 32px)",
  right: "clamp(78px, 14vw, 110px)",
  top: "clamp(34px, 6vw, 58px)",
  zIndex: 5,
};

const heroTitle = {
  margin: 0,
  color: "white",
  fontSize: "clamp(32px, 6.2vw, 44px)",
  lineHeight: "1",
  fontWeight: "900",
  textShadow: "0 8px 24px rgba(0,0,0,.45)",
};

const heroAccent = {
  background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const heroSubtitle = {
  marginTop: "clamp(12px, 3vw, 18px)",
  color: "rgba(255,255,255,.95)",
  fontSize: "clamp(15px, 3.5vw, 18px)",
  lineHeight: "1.28",
  maxWidth: "360px",
  textShadow: "0 6px 18px rgba(0,0,0,.45)",
};

const heroTags = {
  display: "flex",
  flexWrap: "wrap",
  gap: "7px",
  marginTop: "10px",
  color: "rgba(255,255,255,.92)",
  fontSize: "clamp(11px, 2.6vw, 13px)",
};

const sideRail = {
  position: "absolute",
  right: "10px",
  top: "clamp(76px, 12vw, 88px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 6,
};

const railItem = {
  width: "clamp(44px, 11vw, 58px)",
  minHeight: "clamp(44px, 11vw, 58px)",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,.18)",
  background: "rgba(7,17,31,.42)",
  backdropFilter: "blur(8px)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  fontSize: "clamp(7px, 1.9vw, 9px)",
};

const railIcon = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const railLine = {
  width: "2px",
  height: "12px",
  background: "var(--gold)",
  opacity: 0.7,
};

const heroButtons = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginTop: "12px",
};

const primaryBtn = {
  padding: "14px",
  borderRadius: "16px",
  border: "none",
  background: "var(--green)",
  color: "white",
  fontWeight: "bold",
};

const aiBtn = {
  padding: "14px",
  borderRadius: "16px",
  border: "none",
  background: "linear-gradient(90deg, var(--purple), #9b7cff)",
  color: "white",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
};

const missionCard = {
  marginTop: "12px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "20px",
  padding: "14px",
};

const missionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
  marginTop: "12px",
};

const missionItem = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "13px",
  padding: "10px 6px",
  color: "var(--text-main)",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  alignItems: "center",
  textAlign: "center",
  fontSize: "12px",
};

const sectionTitle = { marginTop: "20px" };

const portraitScroll = {
  display: "flex",
  gap: "10px",
  overflowX: "auto",
  padding: "12px 0 4px",
};

const miniCard = {
  minWidth: "140px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "17px",
  padding: "14px",
};

const victoryCard = {
  marginTop: "18px",
  background: "linear-gradient(135deg, #2a210b, var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "22px",
  padding: "18px",
};

const victoryRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const actionsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  marginTop: "12px",
};

const action = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "17px",
  padding: "15px",
  color: "var(--text-main)",
  minHeight: "96px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "flex-start",
};

const timeline = {
  marginTop: "20px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "22px",
  padding: "18px",
};

const timelineHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const step = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "11px 0",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};

const dot = {
  width: "11px",
  height: "11px",
  borderRadius: "50%",
};

const muted = { color: "var(--text-muted)", marginTop: "6px" };

const mutedSmall = {
  color: "var(--text-muted)",
  fontSize: "13px",
  marginTop: "4px",
};

export default Accueil;