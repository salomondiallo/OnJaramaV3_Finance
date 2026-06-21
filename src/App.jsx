import "./App.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Trophy, X } from "lucide-react";

import useAppState from "./hooks/useAppState";
import useNavigation from "./hooks/useNavigation";
import useAuth from "./hooks/useAuth";

import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import OnJaramaLive from "./components/OnJaramaLive";

import Accueil from "./pages/Accueil";
import Situation from "./pages/Situation";
import Objectifs from "./pages/Objectifs";
import Parcours from "./pages/Parcours";
import Profil from "./pages/Profil";
import Reglages from "./pages/Reglages";
import AssistantIA from "./pages/AssistantIA";
import Budget from "./pages/Budget";
import Epargne from "./pages/Epargne";
import Dettes from "./pages/Dettes";
import Simulateur from "./pages/Simulateur";
import Explorer from "./pages/Explorer";
import Horizon from "./pages/Horizon";
import MonPlan from "./pages/MonPlan";
import Paiements from "./pages/Paiements";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Historique from "./pages/Historique";
import Guide from "./pages/Guide";
import PatchNotes from "./pages/PatchNotes";

function App() {
  const appState = useAppState();
  const auth = useAuth();

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const swipeAllowed = useRef(false);

  const [navHidden, setNavHidden] = useState(false);
  const [showVictoryOverlay, setShowVictoryOverlay] = useState(false);
  const [pendingAnchor, setPendingAnchor] = useState(null);
  const pageScrollRef = useRef(null);

  const {
    currentPage,
    setCurrentPage,
    goBack,
    goForwardBySwipe,
    goBackwardBySwipe,
    canGoBack,
  } = useNavigation();

  function navigateTo(page, targetId = null) {
    setPendingAnchor(targetId);
    setCurrentPage(page);
  }

  useEffect(() => {
    const shell = pageScrollRef.current;
    if (!shell) return;

    window.requestAnimationFrame(() => {
      shell.scrollTo({ top: 0, behavior: "auto" });

      if (!pendingAnchor) return;

      window.setTimeout(() => {
        const target = shell.querySelector(`#${pendingAnchor}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setPendingAnchor(null);
      }, 90);
    });
  }, [currentPage, pendingAnchor]);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");

    if (appState.settings.theme === "clair") {
      document.body.classList.add("theme-light");
    } else {
      document.body.classList.add("theme-dark");
    }
  }, [appState.settings.theme]);

  useEffect(() => {
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.touchAction = "manipulation";

    return () => {
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.body.style.touchAction = "";
    };
  }, []);

  useEffect(() => {
    if (!Array.isArray(appState.unseenVictories)) return;
    if (appState.unseenVictories.length === 0) return;

    setShowVictoryOverlay(true);

    const timer = setTimeout(() => {
      closeVictoryOverlay();
    }, 2400);

    return () => clearTimeout(timer);
  }, [appState.unseenVictories]);

  const pageProps = useMemo(
    () => ({
      ...appState,
      auth,
      setCurrentPage: navigateTo,
      goBack,
    }),
    [appState, auth, goBack]
  );

  const pages = {
    accueil: <Accueil {...pageProps} />,
    situation: <Situation {...pageProps} />,
    objectifs: <Objectifs {...pageProps} />,
    parcours: <Parcours {...pageProps} />,
    assistant: <AssistantIA {...pageProps} />,
    paiements: <Paiements {...pageProps} />,
    transactions: <Transactions {...pageProps} />,
    budget: <Budget {...pageProps} />,
    epargne: <Epargne {...pageProps} />,
    dettes: <Dettes {...pageProps} />,
    simulateur: <Simulateur {...pageProps} />,
    explorer: <Explorer {...pageProps} />,
    horizon: <Horizon {...pageProps} />,
    monplan: <MonPlan {...pageProps} />,
    profil: <Profil {...pageProps} />,
    reglages: <Reglages {...pageProps} />,
    notifications: <Notifications {...pageProps} />,
    historique: <Historique {...pageProps} />,
    guide: <Guide {...pageProps} />,
    patchnotes: <PatchNotes {...pageProps} />,
  };

  function closeVictoryOverlay() {
    const ids = Array.isArray(appState.unseenVictories)
      ? appState.unseenVictories.map((goal) => goal.id)
      : [];

    if (ids.length > 0) {
      appState.markVictoriesSeen(ids);
    }

    setShowVictoryOverlay(false);
  }

  function handleTouchStart(event) {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;

    swipeAllowed.current = navHidden;
  }

  function handleTouchEnd(event) {
    if (
      touchStartX.current === null ||
      touchStartY.current === null ||
      !swipeAllowed.current
    ) {
      touchStartX.current = null;
      touchStartY.current = null;
      swipeAllowed.current = false;
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;
    swipeAllowed.current = false;

    const isMostlyHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
    const isRealSwipe = Math.abs(deltaX) >= 90;

    if (!isMostlyHorizontal || !isRealSwipe) return;

    if (deltaX < 0) {
      goForwardBySwipe();
      return;
    }

    goBackwardBySwipe();
  }

  function shouldShowFloatingAssistant() {
    const mode = appState.settings?.aiAssistantMode || "auto";

    if (mode === "disabled") return false;
    if (mode === "always") return currentPage !== "assistant";

    return ["accueil", "parcours", "monplan", "simulateur"].includes(
      currentPage
    );
  }

  const victoryCount = Array.isArray(appState.unseenVictories)
    ? appState.unseenVictories.length
    : 0;

  const firstVictory = victoryCount > 0 ? appState.unseenVictories[0] : null;

  return (
    <div className={`app-shell ${navHidden ? "nav-is-hidden" : ""}`}>
      <main
        className="page-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <OnJaramaLive
          financeData={appState.financeData}
          selectedGoals={appState.selectedGoals}
          settings={appState.settings}
        />

        <TopBar
          currentPage={currentPage}
          goBack={goBack}
          canGoBack={canGoBack}
          setCurrentPage={navigateTo}
          notifications={appState.notifications}
          settings={appState.settings}
          setSettings={appState.setSettings}
          auth={auth}
        />

        <div className="page-stage">
          <div className="page-scroll-shell" ref={pageScrollRef}>
            {pages[currentPage] || <Accueil {...pageProps} />}
          </div>
        </div>
      </main>

      {shouldShowFloatingAssistant() && (
        <button
          onClick={() => navigateTo("assistant")}
          className="floating-ai-button"
          aria-label="Assistant IA"
          title="Assistant IA"
        >
          <Bot size={24} />
          <span>IA</span>
        </button>
      )}

      {showVictoryOverlay && victoryCount > 0 && (
        <div style={victoryOverlay}>
          <div style={victoryModal}>
            <button
              onClick={closeVictoryOverlay}
              style={victoryClose}
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div style={trophyCircle}>
              <Trophy size={42} />
            </div>

            <h1 style={victoryTitle}>
              {victoryCount > 1
                ? `🏆 ${victoryCount} objectifs atteints`
                : "🏆 Objectif atteint !"}
            </h1>

            <p style={victoryText}>
              {victoryCount > 1
                ? "Votre discipline porte ses fruits."
                : `${firstVictory?.title || "Votre objectif"} est complété.`}
            </p>

            <p style={victoryMuted}>Félicitations. Vous avancez réellement.</p>
          </div>
        </div>
      )}

      <BottomNav
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        navHidden={navHidden}
        setNavHidden={setNavHidden}
        settings={appState.settings}
      />
    </div>
  );
}

const victoryOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "rgba(0,0,0,.56)",
  display: "grid",
  placeItems: "center",
  padding: "22px",
  backdropFilter: "blur(5px)",
};

const victoryModal = {
  position: "relative",
  width: "min(360px, 100%)",
  background: "linear-gradient(135deg, rgba(212,175,55,.22), var(--bg-card))",
  border: "1px solid var(--gold)",
  borderRadius: "26px",
  padding: "28px 20px",
  textAlign: "center",
  boxShadow: "0 0 36px rgba(212,175,55,.32)",
  animation: "victoryPop .28s ease",
};

const victoryClose = {
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "34px",
  height: "34px",
  borderRadius: "999px",
  border: "1px solid var(--border)",
  background: "var(--bg-panel)",
  color: "var(--text-main)",
  display: "grid",
  placeItems: "center",
};

const trophyCircle = {
  width: "86px",
  height: "86px",
  borderRadius: "999px",
  margin: "0 auto 16px",
  background: "rgba(212,175,55,.18)",
  border: "1px solid var(--gold)",
  color: "var(--gold)",
  display: "grid",
  placeItems: "center",
  boxShadow: "0 0 22px rgba(212,175,55,.28)",
};

const victoryTitle = {
  margin: "0 0 8px",
  color: "var(--text-main)",
  fontSize: "24px",
};

const victoryText = {
  margin: "0",
  color: "var(--text-main)",
  fontWeight: "700",
};

const victoryMuted = {
  margin: "10px 0 0",
  color: "var(--text-muted)",
};

export default App;