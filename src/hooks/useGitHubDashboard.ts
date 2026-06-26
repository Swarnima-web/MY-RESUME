import { useEffect, useState } from "react";
import { fetchGitHubDashboard, getFallbackDashboard, type GitHubDashboardData } from "../lib/github";

export function useGitHubDashboard(owner: string) {
  const [dashboard, setDashboard] = useState<GitHubDashboardData>(() => ({
    ...getFallbackDashboard(),
    status: "loading"
  }));

  useEffect(() => {
    let alive = true;

    fetchGitHubDashboard(owner)
      .then((data) => {
        if (alive) setDashboard(data);
      })
      .catch(() => {
        if (alive) {
          setDashboard({
            ...getFallbackDashboard(),
            status: "fallback"
          });
        }
      });

    return () => {
      alive = false;
    };
  }, [owner]);

  return dashboard;
}
