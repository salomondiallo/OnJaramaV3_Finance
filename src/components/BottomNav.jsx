import {
  BarChart3,
  Brain,
  ChevronDown,
  ChevronUp,
  Home,
  Route,
  UserCircle,
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
        {navHidden ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <nav
        className={`bottom-nav ${navHidden ? "bottom-nav-hidden" : ""}`}
        aria-label="Navigation principale OnJarama Path"
      >
        <NavButton
          active={currentPage === "accueil"}
          icon={<Home size={21} />}
          label="Accueil"
          onClick={() => go("accueil")}
        />

        <NavButton
          active={currentPage === "situation"}
          icon={<BarChart3 size={21} />}
          label="Situation"
          onClick={() => go("situation")}
        />

        <button
          onClick={() => go("monplan")}
          className={`bottom-center-plan ${currentPage === "monplan" ? "active" : ""}`}
          aria-label="Mon Plan"
          title="Mon Plan"
        >
          <span className="bottom-center-icon">
            <Brain size={21} />
          </span>
          <strong>Mon Plan</strong>
        </button>

        <NavButton
          active={currentPage === "parcours"}
          icon={<Route size={21} />}
          label="Parcours"
          onClick={() => go("parcours")}
        />

        <NavButton
          active={currentPage === "profil"}
          icon={<UserCircle size={21} />}
          label="Profil"
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
