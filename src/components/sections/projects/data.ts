export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  imageContainerClassName?: string;
};

export const projects: Project[] = [
  {
    title: "Athlete AI",
    description:
      "Nutrition and training AI coaches that stay in sync. Next.js landing with live agent demo, waitlist, and a multi-agent GCP backend (A2A).",
    image: "/athlete-ai-preview.png",
    imageFit: "cover",
    imagePosition: "-5% center",
    imageContainerClassName: "bg-[#07090f]",
    tags: [
      "Next.js",
      "React 19",
      "Tailwind CSS",
      "Framer Motion",
      "Google ADK",
      "A2A",
      "GCP",
    ],
    link: "https://athlete-ai.tech/",
    github: "#",
  },
  {
    title: "Kyra — MCP Design System Server",
    description:
      "MCP server linking coding agents to Figma and enforcing design tokens at generation time. Architecture, MVP, and compliance scorecard — Cline Hackathon, Team Husqvarna (2026).",
    image: "/kyra-project-card.png",
    imageFit: "contain",
    imageContainerClassName: "bg-black",
    tags: ["Python", "FastMCP", "MCP Protocol", "Figma API"],
    link: "#",
    github: "#",
  },
  {
    title: "Med Voice",
    description:
      "Voice-first clinical automation with Gemini Live (ADK). Serverless on Cloud Run with Cloud Tasks, Firestore, and Twilio voice/WebSocket.",
    image: "/med_voice.png",
    tags: [
      "Gemini Live",
      "Google ADK",
      "GCP",
      "Cloud Run",
      "Terraform",
      "Twilio",
      "Firestore",
    ],
    link: "https://github.com/Prostecki/med-voice",
    github: "https://github.com/Prostecki/med-voice",
  },
  {
    title: "BNB Application",
    description:
      "Airbnb-style rentals — browse, book, and manage listings. Next.js frontend with a Hono API backend.",
    image: "/bnb_app.png",
    tags: ["Next.js", "Hono", "Supabase", "Docker", "TypeScript"],
    link: "",
    github: "https://github.com/Prostecki/bnb-application",
  },
  {
    title: "AI Bookstore Agent",
    description:
      "RAG bookstore agent over 270k+ titles in BigQuery with Vertex vector search. One chat for discovery, cart, checkout, and orders.",
    image: "/ai_bookstore_agent.png",
    tags: [
      "Python",
      "Google ADK",
      "Vertex AI",
      "Gemini Embeddings",
      "BigQuery",
      "Vector Search",
      "Next.js",
      "Terraform",
    ],
    link: "#",
    github: "#",
  },
  {
    title: "GCP Event-Driven Image Processing Pipeline",
    description:
      "Event-driven image pipeline on GCP (Terraform): Storage, Pub/Sub, Cloud Functions, and Vision API metadata extraction.",
    image: "/gcp_pipeline.png",
    tags: [
      "GCP",
      "Terraform",
      "Node.js",
      "Eventarc",
      "Vision API",
      "Cloud Functions",
    ],
    link: "https://github.com/Prostecki/gcp-event-driven-image-pipeline",
    github: "https://github.com/Prostecki/gcp-event-driven-image-pipeline",
  },
];

export function isValidHref(href: string) {
  return Boolean(href && href !== "#");
}

export function getProjectHref(project: Project) {
  if (isValidHref(project.link)) return project.link;
  if (isValidHref(project.github)) return project.github;
  return null;
}
