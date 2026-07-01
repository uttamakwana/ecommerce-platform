import { useEffect } from "react";
import { useLocation } from "react-router";

/** Resets scroll to the top whenever the route path changes. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
