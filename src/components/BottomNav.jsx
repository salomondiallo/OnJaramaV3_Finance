import {
  Brain,
  Calculator,
  ChevronDown,
  ChevronUp,
  Home,
  Route,
  Target,
} from "lucide-react";

function BottomNav({ currentPage, setCurrentPage, navHidden, setNavHidden }) {
  function go(page) {
    setCurrentPage(page);
  }

  return (
    <>
      <button
        onClick={() => setNavHidden(!navHidden)}
        className="bottom-nav-handle"
        aria-label={navHidden ? "Afficher la navigation" : "Masquer la navigation"}
        title={navHidden ? "Afficher la navigation" : "Masquer la navigation"}
      >
        {navHidden ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <nav
        className={`bottom-nav ${navHidden ? "bottom-nav-hidden" : ""}`}
        aria-label="Navigation principale OnJarama Path"
      >
        <button
          onClick={() => go("accueil")}
          className={`bottom-logo-btn ${
            currentPage === "accueil" ? "active-logo" : ""
          }`}
          aria-label="Accueil"
          title="Accueil"
        >
          <img
            src="/onjarama-path-logo.png"
            alt="Accueil"
            className="bottom-logo"
          />
          <span className="bottom-logo-fallback">
            <Home size={18} />
          </span>
        </button>

        <NavButton
          active={currentPage === "parcours"}
          icon={<Route size={20} />}
          label="Parcours"
          onClick={() => go("parcours")}
        />

        <button
          onClick={() => go("monplan")}
          className={`bottom-center-plan ${
            currentPage === "monplan" ? "active" : ""
          }`}
          aria-label="Mon Plan"
          title="Mon Plan"
        >
          <span className="bottom-center-icon">
            <Brain size={24} />
          </span>
          <strong>Mon Plan</strong>
        </button>

        <NavButton
          active={currentPage === "objectifs"}
          icon={<Target size={20} />}
          label="Objectifs"
          onClick={() => go("objectifs")}
        />

        <NavButton
          active={currentPage === "simulateur"}
          icon={<Calculator size={20} />}
          label="Simuler"
          onClick={() => go("simulateur")}
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