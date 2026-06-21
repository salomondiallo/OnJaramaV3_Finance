import {
  BarChart3,
  Brain,
  Calculator,
  ChevronDown,
  ChevronUp,
  Home,
  Route,
  UserCircle,
} from "lucide-react";

function BottomNav({ currentPage, setCurrentPage, navHidden, setNavHidden, settings }) {
  const language = settings?.language || "FR";

  const labels = {
    FR: {
      accueil: "Accueil",
      situation: "Situation",
      monplan: "Mon Plan",
      parcours: "Parcours",
      simulateur: "Simulateur",
      profil: "Profil",
      showNav: "Afficher la navigation",
      hideNav: "Masquer la navigation",
      mainNav: "Navigation principale OnJarama Path",
    },
    EN: {
      accueil: "Home",
      situation: "Situation",
      monplan: "My Plan",
      parcours: "Path",
      simulateur: "Simulator",
      profil: "Profile",
      showNav: "Show navigation",
      hideNav: "Hide navigation",
      mainNav: "OnJarama Path main navigation",
    },
  };

  const t = labels[language] || labels.FR;

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
        className={`bottom-nav bottom-nav-v113 ${
          navHidden ? "bottom-nav-hidden" : ""
        }`}
        aria-label={t.mainNav}
      >
        <NavButton
          active={currentPage === "accueil"}
          icon={<Home size={21} />}
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
          onClick={() => go("monplan")}
          className={`bottom-center-plan ${
            currentPage === "monplan" ? "active" : ""
          }`}
          aria-label={t.monplan}
          title={t.monplan}
        >
          <span className="bottom-center-icon">
            <Brain size={21} />
          </span>
          <strong>{t.monplan}</strong>
        </button>

        <NavButton
          active={currentPage === "parcours"}
          icon={<Route size={21} />}
          label={t.parcours}
          onClick={() => go("parcours")}
        />

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

export default BottomNav;