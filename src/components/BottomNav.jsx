import { useState } from "react";
import {
  Bot,
  Calendar,
  CreditCard,
  Home,
  ListChecks,
  Menu,
  PiggyBank,
  Route,
  Settings,
  Share2,
  ShieldCheck,
  Target,
  UserCircle,
  Wallet,
  X,
} from "lucide-react";
import { getText } from "../data/translations";

function BottomNav({ currentPage, setCurrentPage, settings }) {
  const t = getText(settings);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  function openSection(section) {
    if (drawerOpen && activeMenu === section) {
      setDrawerOpen(false);
      setActiveMenu(null);
      return;
    }

    setActiveMenu(section);
    setDrawerOpen(true);
  }

  function go(page) {
    setCurrentPage(page);
    setDrawerOpen(false);
    setActiveMenu(null);
  }

  return (
    <>
      {drawerOpen && (
        <div style={overlay}>
          <div style={drawer}>
            <div style={handle} />

            <div style={drawerHeader}>
              <strong>{getDrawerTitle(activeMenu, t)}</strong>
              <button onClick={() => openSection(activeMenu)} style={closeBtn}>
                <X size={20} />
              </button>
            </div>

            {activeMenu === "situation" && (
              <MenuGrid>
                <MenuItem icon={<Wallet />} label={t.income} onClick={() => go("situation")} />
                <MenuItem icon={<CreditCard />} label={t.debts} onClick={() => go("situation")} />
                <MenuItem icon={<PiggyBank />} label={t.savings} onClick={() => go("situation")} />
                <MenuItem icon={<ShieldCheck />} label={t.insurance} onClick={() => go("situation")} />
                <MenuItem icon={<Calendar />} label="Paiements" onClick={() => go("paiements")} />
                <MenuItem icon={<ListChecks />} label="Transactions" onClick={() => go("transactions")} />
                <MenuItem icon={<Route />} label={t.monthlyFlow} onClick={() => go("situation")} />
                <MenuItem icon={<Bot />} label={t.aiAnalysis} onClick={() => go("assistant")} />
              </MenuGrid>
            )}

            {activeMenu === "objectifs" && (
              <MenuGrid>
                <MenuItem icon={<Target />} label={t.createGoal} onClick={() => go("objectifs")} />
                <MenuItem icon={<Home />} label={t.house} onClick={() => go("objectifs")} />
                <MenuItem icon={<CreditCard />} label={t.car} onClick={() => go("objectifs")} />
                <MenuItem icon={<Route />} label={t.travel} onClick={() => go("objectifs")} />
                <MenuItem icon={<PiggyBank />} label={t.financialFreedom} onClick={() => go("objectifs")} />
                <MenuItem icon={<Bot />} label={t.aiAdvice} onClick={() => go("assistant")} />
              </MenuGrid>
            )}

            {activeMenu === "parcours" && (
              <MenuGrid>
                <MenuItem icon={<Route />} label={t.timeline} onClick={() => go("parcours")} />
                <MenuItem icon={<Target />} label={t.priorities} onClick={() => go("parcours")} />
                <MenuItem icon={<CreditCard />} label={t.nextVictory} onClick={() => go("parcours")} />
                <MenuItem icon={<Bot />} label={t.aiAdvice} onClick={() => go("assistant")} />
              </MenuGrid>
            )}

            {activeMenu === "menu" && (
              <MenuGrid>
                <MenuItem icon={<UserCircle />} label={t.profil} onClick={() => go("profil")} />
                <MenuItem icon={<Settings />} label={t.reglages} onClick={() => go("reglages")} />
                <MenuItem icon={<Share2 />} label={t.shareApp} onClick={() => go("profil")} />
                <MenuItem icon={<Bot />} label={t.assistant} onClick={() => go("assistant")} />
              </MenuGrid>
            )}
          </div>
        </div>
      )}

      <nav style={nav}>
        <button onClick={() => go("accueil")} style={logoButton}>
          <img src="/onjarama-path-logo.png" alt="Accueil" style={logo} />
        </button>

        <NavButton
          active={currentPage === "situation" || activeMenu === "situation"}
          icon={<Wallet />}
          label={t.situation}
          onClick={() => openSection("situation")}
        />

        <NavButton
          active={currentPage === "objectifs" || activeMenu === "objectifs"}
          icon={<Target />}
          label={t.objectifs}
          onClick={() => openSection("objectifs")}
        />

        <NavButton
          active={currentPage === "parcours" || activeMenu === "parcours"}
          icon={<Route />}
          label={t.parcours}
          onClick={() => openSection("parcours")}
        />

        <button onClick={() => openSection("menu")} style={menuButton}>
          <Menu size={25} />
        </button>
      </nav>
    </>
  );
}

function getDrawerTitle(activeMenu, t) {
  if (activeMenu === "situation") return t.situation;
  if (activeMenu === "objectifs") return t.objectifs;
  if (activeMenu === "parcours") return t.parcours;
  return t.menuOnJarama;
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...navButton,
        color: active ? "var(--gold)" : "var(--text-muted)",
        background: active ? "rgba(212,175,55,.12)" : "transparent",
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MenuGrid({ children }) {
  return <div style={menuGrid}>{children}</div>;
}

function MenuItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={menuItem}>
      <span style={{ color: "var(--gold)" }}>{icon}</span>
      <strong>{label}</strong>
    </button>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.68)",
  zIndex: 998,
  display: "flex",
  alignItems: "flex-end",
};

const drawer = {
  width: "100%",
  minHeight: "72vh",
  maxHeight: "82vh",
  overflowY: "auto",
  background: "var(--bg-main)",
  borderTop: "1px solid var(--border)",
  borderRadius: "30px 30px 0 0",
  padding: "16px 16px 96px",
  boxShadow: "0 -20px 60px var(--shadow)",
};

const handle = {
  width: "54px",
  height: "5px",
  borderRadius: "999px",
  background: "var(--border)",
  margin: "0 auto 14px",
};

const drawerHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const closeBtn = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
};

const menuGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
};

const menuItem = {
  minHeight: "96px",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  padding: "16px",
  color: "var(--text-main)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "flex-start",
  textAlign: "left",
};

const nav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  minHeight: "74px",
  background: "var(--bg-card)",
  borderTop: "1px solid var(--border)",
  display: "grid",
  gridTemplateColumns: "64px 1fr 1fr 1fr 64px",
  alignItems: "center",
  gap: "4px",
  zIndex: 999,
  boxShadow: "0 -10px 30px var(--shadow)",
  padding: "6px 8px",
};

const logoButton = {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  border: "1px solid var(--border)",
  background: "rgba(255,255,255,.95)",
  display: "grid",
  placeItems: "center",
};

const logo = {
  width: "42px",
  height: "42px",
  objectFit: "contain",
};

const menuButton = {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  border: "1px solid var(--gold)",
  background: "var(--bg-panel)",
  color: "var(--gold)",
  display: "grid",
  placeItems: "center",
};

const navButton = {
  border: "none",
  borderRadius: "15px",
  background: "transparent",
  color: "var(--text-muted)",
  padding: "7px 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  fontSize: "11px",
};

export default BottomNav;