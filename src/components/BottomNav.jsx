import {
  BarChart3,
  Calculator,
  ChevronDown,
  ChevronUp,
  Target,
  UserCircle,
} from "lucide-react";

function BottomNav({
  currentPage,
  setCurrentPage,
  navHidden,
  setNavHidden,
  settings,
}) {
  const language = settings?.language || "FR";

  const labels = {
    FR: {
      accueil: "OJ",
      situation: "Situation",
      objectifs: "Objectifs",
      simulateur: "Simulateur",
      profil: "Profil",
      showNav: "Afficher la navigation",
      hideNav: "Masquer la navigation",
      mainNav: "Navigation principale OnJarama Path",
    },
    EN: {
      accueil: "OJ",
      situation: "Situation",
      objectifs: "Goals",
      simulateur: "Simulator",
      profil: "Profile",
      showNav: "Show navigation",
      hideNav: "Hide navigation",
      mainNav: "OnJarama Path main navigation",
    },
  };

  const t = labels[language] || labels.FR;
  const objectivesActive = currentPage === "objectifs";

  function go(page) {
    setCurrentPage(page);
  }

  return (
    <>
      <button
        onClick={() => setNavHidden(!navHidden)}
        className="bottom-nav-handle"
        aria-label={navHidden ? t.showNav : t.hideNav}
        title={navHidden ? t.showNav : t.hideNav}
      >
        {navHidden ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <nav
        className={`bottom-nav bottom-nav-v115 ${
          navHidden ? "bottom-nav-hidden" : ""
        }`}
        aria-label={t.mainNav}
      >
        <NavButton
          active={currentPage === "accueil"}
          icon={<OJLogo active={currentPage === "accueil"} />}
          label={t.accueil}
          onClick={() => go("accueil")}
        />

        <NavButton
          active={currentPage === "situation"}
          icon={<BarChart3 size={21} />}
          label={t.situation}
          onClick={() => go("situation")}
        />

        <button
          onClick={() => go("objectifs")}
          className={`bottom-center-plan ${objectivesActive ? "active" : ""}`}
          style={{
            borderColor: objectivesActive
              ? "var(--gold)"
              : "rgba(212,175,55,.36)",
            color: objectivesActive ? "var(--gold)" : "var(--text-main)",
            background: objectivesActive
              ? "rgba(212,175,55,.16)"
              : "rgba(255,255,255,.035)",
            boxShadow: objectivesActive
              ? "0 0 22px rgba(212,175,55,.34)"
              : "0 0 18px rgba(212,175,55,.12)",
          }}
          aria-label={t.objectifs}
          title={t.objectifs}
        >
          <span
            className="bottom-center-icon"
            style={{
              color: objectivesActive ? "var(--gold)" : "var(--text-main)",
            }}
          >
            <Target size={21} />
          </span>
          <strong>{t.objectifs}</strong>
        </button>

        <NavButton
          active={currentPage === "simulateur"}
          icon={<Calculator size={21} />}
          label={t.simulateur}
          onClick={() => go("simulateur")}
        />

        <NavButton
          active={currentPage === "profil"}
          icon={<UserCircle size={21} />}
          label={t.profil}
          onClick={() => go("profil")}
        />
      </nav>
    </>
  );
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bottom-nav-btn ${active ? "active" : ""}`}
      aria-label={label}
      title={label}
    >
      <span className="bottom-nav-icon">{icon}</span>
      <span className="bottom-nav-label">{label}</span>
    </button>
  );
}

function OJLogo({ active }) {
  return (
    <span
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "10px",
        display: "grid",
        placeItems: "center",
        border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
        color: active ? "var(--gold)" : "var(--text-main)",
        background: active ? "rgba(212,175,55,.14)" : "rgba(255,255,255,.04)",
        fontSize: "11px",
        fontWeight: 950,
        letterSpacing: "-.5px",
      }}
    >
      OJ
    </span>
  );
}

export default BottomNav;