import {
  Route,
  Target,
  Brain,
  Calculator,
  ChevronDown,
  ChevronUp,
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
      >
        {navHidden ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <nav className={`bottom-nav ${navHidden ? "bottom-nav-hidden" : ""}`}>
        <button
          onClick={() => go("accueil")}
          className={`bottom-logo-btn ${
            currentPage === "accueil" ? "active-logo" : ""
          }`}
          aria-label="Accueil"
        >
          <img
            src="/onjarama-path-logo.png"
            alt="Accueil"
            className="bottom-logo"
          />
        </button>

        <NavButton
          active={currentPage === "parcours"}
          icon={<Route size={20} />}
          label="Parcours"
          onClick={() => go("parcours")}
        />

        <NavButton
          active={currentPage === "monplan"}
          icon={<Brain size={20} />}
          label="Mon Plan"
          onClick={() => go("monplan")}
        />

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
    >
      <span className="bottom-nav-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default BottomNav;