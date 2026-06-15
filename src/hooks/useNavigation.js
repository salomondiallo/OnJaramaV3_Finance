import { useState } from "react";

function useNavigation() {
  const [currentPage, setCurrentPageState] = useState(() => {
    return localStorage.getItem("onjaramaCurrentPage") || "accueil";
  });

  const [history, setHistory] = useState([]);

  function setCurrentPage(page) {
    setHistory((previous) => [...previous, currentPage]);
    setCurrentPageState(page);
    localStorage.setItem("onjaramaCurrentPage", page);
  }

  function goBack() {
    setHistory((previous) => {
      if (previous.length === 0) return previous;

      const lastPage = previous[previous.length - 1];
      setCurrentPageState(lastPage);
      localStorage.setItem("onjaramaCurrentPage", lastPage);

      return previous.slice(0, -1);
    });
  }

  return { currentPage, setCurrentPage, goBack };
}

export default useNavigation;