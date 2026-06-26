export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  updated_at: string;
  created_at: string;
  topics?: string[];
  size: number;
};

export type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type ProjectCardData = {
  id: number;
  title: string;
  description: string;
  url: string;
  homepage?: string | null;
  languages: string[];
  techStack: string[];
  topics: string[];
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  updatedAt: string;
  readmePreview: string;
  features: string[];
  futureScope: string[];
  structure: string[];
  latestCommit?: string;
  imageSeed: string;
};

export type GitHubDashboardData = {
  user: GitHubUser | null;
  repos: ProjectCardData[];
  mostUsedLanguages: { name: string; value: number; color: string }[];
  latestRepos: ProjectCardData[];
  pinnedRepos: ProjectCardData[];
  totalStars: number;
  totalForks: number;
  status: "loading" | "live" | "fallback" | "error";
};

const GITHUB_API = "https://api.github.com";
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Java: "#F89820",
  "C++": "#00599C",
  C: "#A8B9CC",
  MATLAB: "#E16737",
  Shell: "#89E051",
  Jupyter: "#DA5B0B"
};

const fallbackProjects: ProjectCardData[] = [
  {
    id: 1,
    title: "AI Learning Lab",
    description:
      "A practical collection of AI and machine learning experiments shaped around clear notebooks, small demos, and learning-focused documentation.",
    url: "https://github.com/Swarnima-web",
    homepage: null,
    languages: ["Python", "Jupyter"],
    techStack: ["Python", "Machine Learning", "Data Analysis", "AI"],
    topics: ["ai", "machine-learning", "learning"],
    stars: 0,
    forks: 0,
    watchers: 0,
    issues: 0,
    updatedAt: new Date().toISOString(),
    readmePreview:
      "A hands-on workspace for building confidence with artificial intelligence, data thinking, and practical model experimentation.",
    features: ["Experiment-first learning", "Readable project notes", "AI and data workflows"],
    futureScope: ["Add interactive demos", "Publish model cards", "Connect robotics experiments"],
    structure: ["notebooks/", "src/", "README.md"],
    latestCommit: "Fallback project shown while GitHub data loads.",
    imageSeed: "ai-learning-lab"
  },
  {
    id: 2,
    title: "Game Systems Prototype",
    description:
      "An interactive project concept focused on game mechanics, responsive input, and immersive experiences for future game development practice.",
    url: "https://github.com/Swarnima-web",
    homepage: null,
    languages: ["JavaScript", "HTML", "CSS"],
    techStack: ["Game Development", "Canvas", "Interaction Design", "Web"],
    topics: ["game-development", "interactive", "prototype"],
    stars: 0,
    forks: 0,
    watchers: 0,
    issues: 0,
    updatedAt: new Date().toISOString(),
    readmePreview:
      "A foundation for testing game loops, UI feedback, level ideas, and player-centered interactions.",
    features: ["Interactive state handling", "Gameplay-focused UI", "Expandable mechanics"],
    futureScope: ["Add levels", "Introduce AI enemies", "Publish browser demo"],
    structure: ["src/", "assets/", "README.md"],
    latestCommit: "Fallback project shown while GitHub data loads.",
    imageSeed: "game-systems"
  },
  {
    id: 3,
    title: "Robotics Notes Engine",
    description:
      "A structured learning space for robotics concepts, analytical problem solving, and emerging technology notes.",
    url: "https://github.com/Swarnima-web",
    homepage: null,
    languages: ["Python", "Markdown"],
    techStack: ["Robotics", "Python", "Problem Solving", "Documentation"],
    topics: ["robotics", "notes", "engineering"],
    stars: 0,
    forks: 0,
    watchers: 0,
    issues: 0,
    updatedAt: new Date().toISOString(),
    readmePreview:
      "A knowledge base for connecting robotics ideas with practical programming and engineering intuition.",
    features: ["Concept maps", "Implementation notes", "Problem-solving archive"],
    futureScope: ["Add simulation demos", "Include sensor projects", "Link hardware builds"],
    structure: ["docs/", "examples/", "README.md"],
    latestCommit: "Fallback project shown while GitHub data loads.",
    imageSeed: "robotics-notes"
  }
];

const cleanMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const sentence = (value: string, fallback: string) => {
  const cleaned = cleanMarkdown(value);
  if (!cleaned) return fallback;
  const parts = cleaned.split(/(?<=[.!?])\s+/);
  return (parts[0] || cleaned).slice(0, 220);
};

const inferFeatures = (repo: GitHubRepo, readme: string, languages: string[]) => {
  const lower = `${repo.name} ${repo.description ?? ""} ${readme} ${repo.topics?.join(" ")}`.toLowerCase();
  const features = new Set<string>();

  if (lower.includes("ai") || lower.includes("machine") || lower.includes("model")) {
    features.add("AI-oriented implementation and learning workflow");
  }
  if (lower.includes("game") || lower.includes("canvas") || lower.includes("unity")) {
    features.add("Interactive gameplay or simulation foundation");
  }
  if (lower.includes("robot")) {
    features.add("Robotics-focused concepts and practical experimentation");
  }
  if (lower.includes("web") || languages.some((language) => ["TypeScript", "JavaScript", "HTML", "CSS"].includes(language))) {
    features.add("Responsive web interface and browser-first delivery");
  }
  if (lower.includes("matlab") || languages.includes("MATLAB")) {
    features.add("Numerical computing and mathematical problem solving");
  }

  features.add("Readable repository structure for iteration");
  features.add("Project documentation through README insights");

  return Array.from(features).slice(0, 4);
};

const inferFutureScope = (repo: GitHubRepo, languages: string[]) => {
  const scope = new Set<string>();
  const name = repo.name.toLowerCase();

  if (languages.includes("Python")) scope.add("Add model evaluation metrics and reproducible notebooks");
  if (languages.includes("JavaScript") || languages.includes("TypeScript")) scope.add("Publish a live demo with richer interaction states");
  if (name.includes("game")) scope.add("Expand gameplay systems with progression and AI behaviors");
  if (name.includes("robot")) scope.add("Connect simulations to hardware-oriented experiments");

  scope.add("Improve documentation with screenshots and architecture notes");
  scope.add("Add tests, examples, and roadmap milestones");

  return Array.from(scope).slice(0, 3);
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const fetchReadme = async (owner: string, repo: string) => {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, {
      headers: { Accept: "application/vnd.github.raw" }
    });
    if (!response.ok) return "";
    return response.text();
  } catch {
    return "";
  }
};

const fetchLanguages = async (owner: string, repo: string) => {
  try {
    const values = await fetchJson<Record<string, number>>(`${GITHUB_API}/repos/${owner}/${repo}/languages`);
    return Object.keys(values);
  } catch {
    return [];
  }
};

const fetchStructure = async (owner: string, repo: string) => {
  try {
    const values = await fetchJson<Array<{ name: string; type: string }>>(`${GITHUB_API}/repos/${owner}/${repo}/contents`);
    return values.slice(0, 7).map((item) => `${item.name}${item.type === "dir" ? "/" : ""}`);
  } catch {
    return ["README.md"];
  }
};

const fetchLatestCommit = async (owner: string, repo: string) => {
  try {
    const values = await fetchJson<Array<{ commit: { message: string } }>>(
      `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=1`
    );
    return values[0]?.commit.message.split("\n")[0];
  } catch {
    return undefined;
  }
};

const buildProject = async (owner: string, repo: GitHubRepo): Promise<ProjectCardData> => {
  const [readme, languageList, structure, latestCommit] = await Promise.all([
    fetchReadme(owner, repo.name),
    fetchLanguages(owner, repo.name),
    fetchStructure(owner, repo.name),
    fetchLatestCommit(owner, repo.name)
  ]);

  const languages = languageList.length ? languageList : repo.language ? [repo.language] : [];
  const topics = repo.topics ?? [];
  const techStack = Array.from(new Set([...languages, ...topics.map((topic) => topic.replace(/-/g, " "))])).slice(0, 8);
  const fallbackDescription = repo.description || `${repo.name} by Swarnima Singh.`;

  return {
    id: repo.id,
    title: repo.name.replace(/[-_]/g, " "),
    description: repo.description || sentence(readme, fallbackDescription),
    url: repo.html_url,
    homepage: repo.homepage,
    languages,
    techStack: techStack.length ? techStack : ["GitHub", "Project"],
    topics,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    issues: repo.open_issues_count,
    updatedAt: repo.updated_at,
    readmePreview: sentence(readme, "README content will appear here as soon as GitHub provides it."),
    features: inferFeatures(repo, readme, languages),
    futureScope: inferFutureScope(repo, languages),
    structure,
    latestCommit,
    imageSeed: `${repo.name}-${repo.id}`
  };
};

export const getFallbackDashboard = (): GitHubDashboardData => ({
  user: null,
  repos: fallbackProjects,
  mostUsedLanguages: [
    { name: "Python", value: 38, color: LANGUAGE_COLORS.Python },
    { name: "JavaScript", value: 26, color: LANGUAGE_COLORS.JavaScript },
    { name: "HTML", value: 18, color: LANGUAGE_COLORS.HTML },
    { name: "CSS", value: 18, color: LANGUAGE_COLORS.CSS }
  ],
  latestRepos: fallbackProjects,
  pinnedRepos: fallbackProjects.slice(0, 2),
  totalStars: 0,
  totalForks: 0,
  status: "fallback"
});

export async function fetchGitHubDashboard(owner: string): Promise<GitHubDashboardData> {
  const [user, repos] = await Promise.all([
    fetchJson<GitHubUser>(`${GITHUB_API}/users/${owner}`),
    fetchJson<GitHubRepo[]>(`${GITHUB_API}/users/${owner}/repos?per_page=100&sort=updated&type=public`)
  ]);

  const visibleRepos = repos
    .filter((repo) => !repo.name.toLowerCase().includes(".github"))
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const projects = await Promise.all(visibleRepos.map((repo) => buildProject(owner, repo)));
  const languageCounts = new Map<string, number>();

  projects.forEach((project) => {
    project.languages.forEach((language) => languageCounts.set(language, (languageCounts.get(language) ?? 0) + 1));
  });

  const mostUsedLanguages = Array.from(languageCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([name, value]) => ({ name, value, color: LANGUAGE_COLORS[name] ?? "#94A3B8" }));

  const totalStars = projects.reduce((sum, project) => sum + project.stars, 0);
  const totalForks = projects.reduce((sum, project) => sum + project.forks, 0);
  const pinnedRepos = [...projects]
    .sort((a, b) => b.stars + b.forks + Number(new Date(b.updatedAt)) / 100000000000 - (a.stars + a.forks))
    .slice(0, 4);

  return {
    user,
    repos: projects.length ? projects : fallbackProjects,
    mostUsedLanguages: mostUsedLanguages.length ? mostUsedLanguages : getFallbackDashboard().mostUsedLanguages,
    latestRepos: projects.slice(0, 5),
    pinnedRepos: pinnedRepos.length ? pinnedRepos : fallbackProjects.slice(0, 2),
    totalStars,
    totalForks,
    status: "live"
  };
}
