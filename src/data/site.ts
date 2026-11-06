export const site = {
  name: "Keerthanan PS",
  brand: "KEERTHANAN.PS",
  role: "Cybersecurity Researcher · Systems Developer · Security Engineer",
  location: "Thiruvananthapuram, Kerala",
  email: "keerthanan@tutanota.de",
  phone: "+91 8891975883",
  tagline: ["Understanding systems.", "Breaking assumptions.", "Building solutions."],
  summary:
    "Cybersecurity researcher and systems developer exploring the intersection of low-level programming, malware analysis, reverse engineering, vulnerability research, and software engineering.",
  meta: {
    lineA: "INDEPENDENT SECURITY RESEARCHER",
    lineB: "SYSTEMS DEVELOPER / SECURITY ENGINEER",
  },
  links: {
    github: "https://github.com/r4r00t-sh",
    linkedin: "https://www.linkedin.com/in/keerthananps",
    tryhackme: "https://tryhackme.com/p/r4r00t",
    blog: "https://r4r00t-blog.vercel.app",
    resume: "/keerthanan.pdf",
  },
  nav: [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERTISE", href: "#expertise" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ],
} as const;

export const aboutCards = [
  {
    id: "01",
    title: "PROFILE",
    body: "Cybersecurity researcher and systems developer with hands-on experience across security engineering, operating system development, network security, vulnerability research, and security infrastructure. Focused on engineering security solutions, understanding system-level vulnerabilities, and building practical tools.",
    treatment: "grid" as const,
  },
  {
    id: "02",
    title: "SYSTEMS",
    body: "Kernel development, assembly programming, memory management, process scheduling, and operating system internals — from custom kernels to Unix-like environments built from first principles.",
    treatment: "halftone" as const,
  },
  {
    id: "03",
    title: "SECURITY",
    body: "Malware analysis, vulnerability research, exploit development, and reverse engineering across Windows PE and Linux ELF binaries — static and dynamic analysis, IOC investigation, and controlled research environments.",
    treatment: "diagonal" as const,
  },
  {
    id: "04",
    title: "ENGINEERING",
    body: "Software development, infrastructure, automation, and backend engineering — Python security tooling, monitoring platforms, and production-minded systems that hold up under scrutiny.",
    treatment: "circuit" as const,
  },
] as const;

export const profileDomains = [
  {
    title: "CYBERSECURITY",
    items: [
      "Malware Analysis",
      "Exploit Development",
      "Vulnerability Research",
      "Reverse Engineering",
      "Penetration Testing",
    ],
  },
  {
    title: "SYSTEMS ENGINEERING",
    items: [
      "Kernel Development",
      "Assembly",
      "Memory Management",
      "Networking",
      "Operating System Development",
    ],
  },
  {
    title: "SOFTWARE ENGINEERING",
    items: [
      "Python",
      "C",
      "C++",
      "JavaScript",
      "TypeScript",
      "Go",
      "Rust",
      "Django",
      "Next.js",
    ],
  },
  {
    title: "INFRASTRUCTURE",
    items: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Networking",
      "Cloud Infrastructure",
      "Security Monitoring",
    ],
  },
] as const;

export const certifications = [
  {
    id: "01",
    title: "CAPT — Certified Associate Penetration Tester",
    org: "Hackviser",
    period: "Sep–Oct 2025",
  },
  {
    id: "02",
    title: "Advanced Diploma in Cyber Defence",
    org: "RedTeam Hackers Academy",
    period: "May 2025–Aug 2026",
  },
  {
    id: "03",
    title: "OCSA — Offenso Certified Security Analyst",
    org: "Offenso Hackers Academy",
    period: "Jan–Apr 2025",
  },
] as const;

export const achievements = [
  {
    number: "#1",
    label: "UK REGION",
    detail:
      "#1 in the UK region and #12 globally on TryHackMe’s monthly cybersecurity leaderboard.",
  },
  {
    number: "03",
    label: "ISRA CTF",
    detail: "3rd place in the Information Security Research Association (ISRA) offline CTF competition.",
  },
] as const;
