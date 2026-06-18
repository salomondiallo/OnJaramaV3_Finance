import { useState } from "react";

const SWIPE_PAGES = [
  "accueil",
  "parcours",
  "monplan",
  "objectifs",
  "simulateur",
  "profil",
];

function useNavigation() {
  const [currentPage, setCurrentPageState] = useState(() => {
    return localStorage.getItem("onjaramaCurrentPage") || "accueil";
  });

  const [history, setHistory] = useState([]);

  function setCurrentPage(page) {
    if (!page || page === currentPage) return;

    setHistory((previous) => [...previous, currentPage].slice(-30));
    setCurrentPageState(page);
    localStorage.setItem("onjaramaCurrentPage", page);
  }

  function goBack() {
    setHistory((previous) => {
      if (previous.length === 0) {
        setCurrentPageState("accueil");
        localStorage.setItem("onjaramaCurrentPage", "accueil");
        return previous;
      }

      const lastPage = previous[previous.length - 1];

      setCurrentPageState(lastPage);
      localStorage.setItem("onjaramaCurrentPage", lastPage);

      return previous.slice(0, -1);
    });
  }

  function goForwardBySwipe() {
    const index = SWIPE_PAGES.indexOf(currentPage);

    if (index >= 0 && index < SWIPE_PAGES.length - 1) {
      setCurrentPage(SWIPE_PAGES[index + 1]);
    }
  }

  function goBackwardBySwipe() {
    const index = SWIPE_PAGES.indexOf(currentPage);

    if (index > 0) {
      setCurrentPage(SWIPE_PAGES[index - 1]);
    }
  }

  return {
    currentPage,
    setCurrentPage,
    goBack,
    goForwardBySwipe,
    goBackwardBySwipe,
    canGoBack: history.length > 0,
  };
}

export default useNavigation;