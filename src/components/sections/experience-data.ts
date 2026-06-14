export interface Link {
  href: string;
  label: string;
}

export interface Role {
  title: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  description?: string;
  bullets?: string[];
  link?: Link;
  skills: string[];
}

export interface ExperienceEntry {
  company: string;
  location: string;
  roles: Role[];
}

export interface EducationEntry {
  title: string;
  school: string;
  period: string;
  description: string;
  skills: string[];
  link?: Link;
}

const calculateDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44));

  if (diffMonths >= 12) {
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    const monthsStr = months === 1 ? "1 mo" : `${months} mos`;
    return months > 0 ? `${years} yr ${monthsStr}` : `${years} yr`;
  }
  return diffMonths === 1 ? "1 mo" : `${diffMonths} mos`;
};

export const experiences: ExperienceEntry[] = [
  {
    company: "Jeskin",
    location: "London, UK",
    roles: [
      {
        title: "Founding Engineer",
        type: "Full-time",
        period: "Jul 2025 - Present",
        duration: calculateDuration("2025-07-01T00:00:00"),
        location: "London, UK · Remote",
        bullets: [
          "Building fullstack web applications with Next.js, TypeScript, and Python — B2B landing pages, internal tooling, and client management systems backed by Firestore.",
          "Developing internal automation applications to streamline corporate client onboarding workflows.",
          "Provisioning and managing GCP infrastructure via Terraform; architecting backend services for a MedTech product — iPhone-attachable lens with 3D body mapping and dermatological tracking capabilities.",
          "Collaborating in a small cross-functional team, owning features from concept to deployment.",
        ],
        skills: [
          "Next.js",
          "TypeScript",
          "Python",
          "Firestore",
          "Terraform",
          "GCP",
        ],
      },
    ],
  },
  {
    company: "Aclarity AB",
    location: "Stockholm, Sweden",
    roles: [
      {
        title: "Software Developer",
        type: "Full-time",
        period: "Jul 2025 - May 2026",
        duration: calculateDuration("2025-07-01T00:00:00", "2026-05-31T00:00:00"),
        location: "Stockholm, Sweden",
        bullets: [
          "Developed ShelfSense — a B2B SaaS product with live AI demo for out-of-stock shelf detection, integrated with FireCMS/Firestore backend.",
          "Developed and optimised React/Next.js frontend components integrated with cloud-based backends and FireCMS/Firestore, empowering non-technical teams to manage content independently.",
          "Built and maintained Python/FastAPI backend services and REST APIs interfacing with BigQuery — enabling real-time product search and retrieval across 270,000+ records.",
          "Provisioned and managed GCP infrastructure via Terraform (Cloud Run, BigQuery, Firestore, IAM) — reducing environment setup time by 70% and eliminating configuration drift.",
        ],
        link: { href: "https://www.aclarity.se/", label: "aclarity.se" },
        skills: [
          "Python",
          "FastAPI",
          "BigQuery",
          "React/Next.js",
          "FireCMS",
          "Terraform",
        ],
      },
    ],
  },
  {
    company: "Independent Developer",
    location: "Remote",
    roles: [
      {
        title: "Fullstack Developer",
        type: "Self-employed",
        period: "2022 - Present",
        duration: calculateDuration("2022-01-01T00:00:00"),
        location: "Remote",
        bullets: [
          "Built a full-stack property rental platform (Airbnb-style) — Next.js, Hono/Node.js, PostgreSQL via Supabase, Docker. Full auth flow, booking system, and property management.",
          "Developed an AI-enhanced presentation tool integrating Google Gemini 1.5 Flash for real-time speaker coaching — React 19, Vite, Tailwind CSS, deployed on Cloud Run.",
          "Architected Kyra — MCP server connecting AI coding agents to Figma design systems, enforcing design token constraints at generation time. Cline AI-Assisted Enterprise Coding Hackathon, Stockholm · May 2026.",
          "Built and shipped Athlete AI Platform — multi-agent coaching system with Next.js, FastAPI, Google ADK, Firestore, BigQuery, deployed on GCP. Live at athlete-ai.tech.",
          "Built Med Voice — real-time voice AI system for medical patient outreach using Gemini Live, Twilio, and Cloud Run with dual-mode architecture.",
        ],
        skills: [
          "Next.js",
          "FastAPI",
          "Google ADK",
          "Gemini",
          "MCP",
          "Supabase",
        ],
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    title: "Webbutveckling (YH)",
    school: "Nackademin",
    period: "2024 - 2026 · Stockholm",
    description:
      "Two-year higher vocational education in fullstack web development — frontend, backend, databases, CMS, and application lifecycle management with workplace learning (LIA).",
    link: {
      href: "https://nackademin.se/utbildningar/webbutvecklare-fullstack-open-source/",
      label: "Program at nackademin.se",
    },
    skills: ["TypeScript", "Node.js", "JavaScript", "Fullstack", "Open Source"],
  },
  {
    title: "Cloud Fundamentals (Azure)",
    school: "Nackademin",
    period: "Dec 2025 · VG · Stockholm",
    description:
      "Higher vocational course covering cloud fundamentals on Microsoft Azure — infrastructure, services, and deployment concepts.",
    skills: ["Azure", "Cloud Infrastructure", "Cloud Fundamentals"],
  },
  {
    title: "Google Cloud Certified — Associate Cloud Engineer (ACE)",
    school: "Google",
    period: "Feb 2026 - Feb 2029",
    description:
      "Validates the ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud Platform.",
    link: {
      href: "https://www.credly.com/badges/e4ef998b-5f33-4e61-a7d3-dbcbd0a8a33a/linked_in_profile",
      label: "Verify on Credly",
    },
    skills: ["GCP", "Cloud Infrastructure", "Kubernetes", "IAM", "Cloud Monitoring"],
  },
  {
    title: "Bachelor's Degree — Sports Science",
    school:
      "Lesgaft National State University of Physical Education, Sport and Health",
    period: "2014 - 2018 · St. Petersburg",
    description:
      "Four-year degree in sports science, athletic training, biomechanics, and physiology. Developed strong analytical and problem-solving skills through a scientific approach to athletics.",
    skills: ["Sports Science", "Athletic Training", "Analytical Skills"],
  },
];
