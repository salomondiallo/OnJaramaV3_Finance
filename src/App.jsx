import "./App.css";

import { useEffect, useMemo, useRef } from "react";

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

function App() {
  const appState = useAppState();
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const {
    currentPage,
    setCurrentPage,
    goBack,
    goToNextPage,
    goToPreviousPage,
  } = useNavigation();

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");

    if (appState.settings.theme === "clair") {
      document.body.classList.add("theme-light");
    } else {
      document.body.classList.add("theme-dark");
    }
  }, [appState.settings.theme]);

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
  };

  function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaY) > 70) return;
    if (Math.abs(deltaX) < 70) return;

    if (deltaX < 0) {
      goToNextPage();
    } else {
      goToPreviousPage();
    }
  }

  return (
    <div className="app-shell">
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
          setCurrentPage={setCurrentPage}
          settings={appState.settings}
          setSettings={appState.setSettings}
          goBack={goBack}
        />

        {pages[currentPage] || <Accueil {...pageProps} />}
      </main>

      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        settings={appState.settings}
      />
    </div>
  );
}

export default App;