import {
  BookOpen,
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Gamepad2,
  GraduationCap,
  Languages,
  Lightbulb,
  Puzzle,
  Rocket,
  School,
  Sparkles,
  TerminalSquare,
  Trophy,
  type LucideIcon
} from "lucide-react";

export type Skill = {
  name: string;
  level: number;
  icon: LucideIcon;
  accent: string;
  summary: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  category: string;
  accent: string;
  credential: string;
};

export const profile = {
  name: "Swarnima Singh",
  product: "SwarnimaOS",
  role: "Artificial Intelligence & Machine Learning Student",
  fullRole: "B.Tech Artificial Intelligence & Machine Learning Student",
  university: "Bennett University",
  duration: "2025-2029",
  email: "rajputsinghswarnima@gmail.com",
  github: "https://github.com/Swarnima-web",
  githubUser: "Swarnima-web",
  tagline: "Artificial Intelligence & Machine Learning Student",
  careerGoal:
    "Become an AI Engineer and Game Developer capable of building intelligent systems and immersive interactive experiences while continuously learning modern technologies.",
  about:
    "Swarnima Singh is a B.Tech Artificial Intelligence and Machine Learning student at Bennett University with a builder's instinct and a sharp interest in intelligent systems. She is passionate about AI, robotics, coding, and game development, and she enjoys turning curiosity into practical projects that can be tested, improved, and shared. Her work is shaped by analytical thinking, a problem-solving mindset, and the energy of a continuous learner exploring new technologies with purpose.",
  languages: ["English", "Hindi", "Nepali"],
  hobbies: ["Gaming", "Game Development", "Coding", "Robotics", "Learning New Technologies", "Problem Solving"]
};

export const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" }
];

export const loaderPhrases = [
  "Booting SwarnimaOS...",
  "Loading AI Modules...",
  "Loading Skills...",
  "Loading Projects...",
  "Loading Experience...",
  "Loading Portfolio...",
  "Welcome Swarnima Singh"
];

export const education = [
  {
    school: "Bennett University",
    degree: "Bachelor of Technology",
    specialization: "Artificial Intelligence & Machine Learning",
    address: "Greater Noida, Uttar Pradesh, India",
    duration: "2025-2029",
    icon: GraduationCap
  },
  {
    school: "Om National Academy",
    degree: "+2 Qualification",
    specialization: "Science Stream (Bio+Math)",
    address: "Birgunj, Nepal",
    duration: "2023-2025",
    icon: BookOpen
  },
  {
    school: "Kadambari Academy",
    degree: "Secondary School Education (Class X)",
    specialization: "General",
    address: "Birgunj, Nepal",
    duration: "2013-2023",
    icon: School
  }
];

export const skills: Skill[] = [
  {
    name: "Programming",
    level: 82,
    icon: Code2,
    accent: "#00D9FF",
    summary: "Structured code, debugging discipline, and project-first implementation."
  },
  {
    name: "Artificial Intelligence",
    level: 78,
    icon: BrainCircuit,
    accent: "#7C5CFF",
    summary: "Core AI concepts, practical experimentation, and intelligent workflows."
  },
  {
    name: "Machine Learning",
    level: 74,
    icon: Cpu,
    accent: "#A855F7",
    summary: "Model thinking, data intuition, probability, and applied learning systems."
  },
  {
    name: "Robotics",
    level: 70,
    icon: Bot,
    accent: "#34D399",
    summary: "Curiosity for autonomous systems, sensors, and real-world interaction."
  },
  {
    name: "Game Development",
    level: 76,
    icon: Gamepad2,
    accent: "#F59E0B",
    summary: "Immersive systems, mechanics, player experience, and interactive worlds."
  },
  {
    name: "Web Development",
    level: 73,
    icon: TerminalSquare,
    accent: "#FB7185",
    summary: "Modern interfaces, responsive layouts, and polished product experiences."
  },
  {
    name: "Problem Solving",
    level: 86,
    icon: Puzzle,
    accent: "#22D3EE",
    summary: "Analytical reasoning, decomposition, iteration, and clear decisions."
  }
];

export const certificates: Certificate[] = [
  {
    title: "AI Python for Beginners",
    issuer: "DeepLearning.AI / Coursera",
    category: "Artificial Intelligence",
    accent: "#7C5CFF",
    credential: "Foundational Python for AI workflows and practical model thinking."
  },
  {
    title: "Engineering Probability and Statistics Part 1",
    issuer: "Northeastern University / Coursera",
    category: "Mathematics",
    accent: "#00D9FF",
    credential: "Probability fundamentals for analytical reasoning and machine learning."
  },
  {
    title: "Engineering Probability and Statistics Part 2",
    issuer: "Northeastern University / Coursera",
    category: "Mathematics",
    accent: "#A855F7",
    credential: "Statistics concepts for engineering analysis and data-informed decisions."
  },
  {
    title: "Solving Ordinary Differential Equations with MATLAB",
    issuer: "MathWorks",
    category: "Scientific Computing",
    accent: "#34D399",
    credential: "Computational methods for solving and visualizing ODE systems."
  },
  {
    title: "Solving Nonlinear Equations with MATLAB",
    issuer: "MathWorks",
    category: "Scientific Computing",
    accent: "#F59E0B",
    credential: "Numerical techniques for nonlinear problem solving with MATLAB."
  }
];

export const signatureStats = [
  { label: "Focus", value: "AI + ML", icon: Sparkles },
  { label: "Builder Mode", value: "Projects", icon: Rocket },
  { label: "Mindset", value: "Problem Solver", icon: Lightbulb },
  { label: "Languages", value: "EN / HI / NE", icon: Languages },
  { label: "Goal", value: "AI Engineer", icon: Trophy }
];
