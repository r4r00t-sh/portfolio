export type Project = {
  id: string;
  number: string;
  title: string;
  status: "Ongoing" | "Completed" | "Research";
  period?: string;
  summary: string;
  highlights: string[];
  tech: string[];
  href?: string;
  stars?: number;
  language?: string;
  pattern: "grid" | "halftone" | "diagonal" | "circuit" | "blueprint" | "crosshatch";
};

/** GitHub pinned repos — https://github.com/r4r00t-sh */
export const projects: Project[] = [
  {
    id: "nanosec-os",
    number: "01",
    title: "NanoSec-OS",
    status: "Ongoing",
    summary:
      "Independent operating system development in C and x86 Assembly — custom kernel and Unix-like environment built from scratch.",
    highlights: [
      "Custom kernel",
      "Preemptive multitasking",
      "Virtual memory / paging",
      "System calls",
      "Unix-like shell",
      "Networking stack",
    ],
    tech: ["C", "x86 Assembly", "Kernel", "Shell"],
    href: "https://github.com/r4r00t-sh/NanoSec-OS",
    stars: 1,
    language: "C",
    pattern: "crosshatch",
  },
  {
    id: "petti",
    number: "02",
    title: "petti",
    status: "Ongoing",
    summary:
      "Petti (പെട്ടി): a Docker-like container runtime in Go — namespaces, cgroups v2, overlay, OCI pull, and rootless execution.",
    highlights: [
      "Linux namespaces",
      "cgroups v2",
      "Overlay filesystem",
      "OCI image pull",
      "Rootless containers",
      "Systems programming in Go",
    ],
    tech: ["Go", "Linux", "OCI", "cgroups", "namespaces"],
    href: "https://github.com/r4r00t-sh/petti",
    stars: 0,
    language: "Go",
    pattern: "circuit",
  },
  {
    id: "d4dos",
    number: "03",
    title: "d4dos",
    status: "Ongoing",
    summary:
      "Enterprise-grade DDoS threat detection with Django — real-time monitoring, advanced threat analysis, and a glassmorphism control surface.",
    highlights: [
      "Real-time monitoring",
      "Threat analysis",
      "Network traffic inspection",
      "Anomaly detection",
      "Django platform",
    ],
    tech: ["Python", "Django", "Networking", "ML"],
    href: "https://github.com/r4r00t-sh/d4dos",
    stars: 2,
    language: "Python",
    pattern: "blueprint",
  },
  {
    id: "wayrecon",
    number: "04",
    title: "wayrecon",
    status: "Completed",
    summary:
      "Lightweight CLI for the Wayback Machine CDX API — query, filter, and export archived URLs for recon, OSINT, and bug bounty.",
    highlights: [
      "Wayback Machine CDX API",
      "Historical URL discovery",
      "URL filtering",
      "JSON export",
      "OSINT / bug bounty",
    ],
    tech: ["Python", "OSINT", "CDX API"],
    href: "https://github.com/r4r00t-sh/wayrecon",
    stars: 2,
    language: "Python",
    pattern: "halftone",
  },
];
