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
    ES: {
      accueil: "OJ",
      situation: "Situación",
      objectifs: "Objetivos",
      simulateur: "Simulador",
      profil: "Perfil",
      showNav: "Mostrar navegación",
      hideNav: "Ocultar navegación",
      mainNav: "Navegación principal OnJarama Path",
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
        className={`bottom-nav bottom-nav-v123 ${
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
          aria-label={t.objectifs}
          title={t.objectifs}
        >
          <span className="bottom-center-icon">
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
      className={`bottom-oj-logo ${active ? "active" : ""}`}
      aria-hidden="true"
    >
      OJ
    </span>
  );
}

export default BottomNav;
