import "./App.css";

import { useEffect, useMemo, useRef, useState } from "react";

import useAppState from "./hooks/useAppState";
import useNavigation from "./hooks/useNavigation";

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

function App() {
  const appState = useAppState();

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const swipeAllowed = useRef(false);

  const [navHidden, setNavHidden] = useState(false);

  const {
    currentPage,
    setCurrentPage,
    goBack,
    goForwardBySwipe,
    goBackwardBySwipe,
    canGoBack,
  } = useNavigation();

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");

    if (appState.settings.theme === "clair") {
      document.body.classList.add("theme-light");
    } else {
      document.body.classList.add("theme-dark");
    }
  }, [appState.settings.theme]);

  useEffect(() => {
    const preventPageBounce = (event) => {
      if (event.touches.length > 1) return;
    };

    document.addEventListener("touchmove", preventPageBounce, {
      passive: true,
    });

    return () => {
      document.removeEventListener("touchmove", preventPageBounce);
    };
  }, []);

  const pageProps = useMemo(
    () => ({
      ...appState,
      setCurrentPage,
      goBack,
    }),
    [appState, setCurrentPage, goBack]
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
  };

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
          setCurrentPage={setCurrentPage}
          notifications={appState.notifications}
        />

        <div className="page-stage">
          <div className="page-scroll-shell">
            {pages[currentPage] || <Accueil {...pageProps} />}
          </div>
        </div>
      </main>

      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navHidden={navHidden}
        setNavHidden={setNavHidden}
      />
    </div>
  );
}

export default App;