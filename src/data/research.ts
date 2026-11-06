export type ResearchArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  href: string;
  pattern: "grid" | "halftone" | "diagonal" | "circuit" | "blueprint" | "radial";
};

/** Actual publications from r4r00t-blog.vercel.app/feed.xml — never invent. */
export const researchArticles: ResearchArticle[] = [
  {
    id: "ghosts-on-the-wire",
    title: "Ghosts on the Wire: C2 Protocol Design and Staying Off the Radar",
    excerpt:
      "How C2 protocols work, what gets operators burned, and how to think about traffic design from first principles — beaconing, DNS, DGA, domain fronting, TLS fingerprinting, and what defenders are actually watching.",
    category: "Malware Research",
    date: "2026-03-28",
    readingTime: "18 min",
    href: "https://r4r00t-blog.vercel.app/blog/ghosts-on-the-wire-c2-protocol-design-staying-off-the-radar",
    pattern: "circuit",
  },
  {
    id: "poisoning-the-pool",
    title: "Poisoning the Pool: A Deep Dive Into Heap Exploitation",
    excerpt:
      "glibc heap internals, tcache poisoning, House of Botcake, Safe-Linking bypass, and the evolution of heap exploitation from glibc 2.26 to 2.35.",
    category: "Binary Exploitation",
    date: "2026-03-24",
    readingTime: "22 min",
    href: "https://r4r00t-blog.vercel.app/blog/poisoning-the-pool-deep-dive-into-heap-exploitation",
    pattern: "blueprint",
  },
  {
    id: "reversing-black-basta",
    title: "Reversing Black Basta: Inside One of the Most Capable Ransomware Families",
    excerpt:
      "A technical deep-dive into Black Basta's binary — encryption scheme, anti-analysis tricks, safe mode abuse, and the crypto flaw that got it cracked.",
    category: "Malware Analysis",
    date: "2026-03-22",
    readingTime: "20 min",
    href: "https://r4r00t-blog.vercel.app/blog/reversing-black-basta-inside-one-of-the-most-capable-ransomware-families",
    pattern: "halftone",
  },
  {
    id: "reading-malware",
    title: "Reading Malware: A Beginner's Guide to Win32 API Analysis",
    excerpt:
      "How to read a malware sample's Win32 API calls to understand what it's doing — for analysts just getting started.",
    category: "Security",
    date: "2026-03-21",
    readingTime: "12 min",
    href: "https://r4r00t-blog.vercel.app/blog/reading-malware-beginners-guide-to-win32-api-analysis",
    pattern: "grid",
  },
  {
    id: "ring-0-or-die",
    title: "Ring 0 or Die: LKMs, Rootkits, & Kernel Domination",
    excerpt:
      "How Linux kernel modules are loaded, how kernel rootkits abuse that path, and what defenders can monitor.",
    category: "Security",
    date: "2026-03-21",
    readingTime: "14 min",
    href: "https://r4r00t-blog.vercel.app/blog/ring-0-or-die-lkms-rootkits-and-kernel-domination",
    pattern: "radial",
  },
  {
    id: "waking-the-dead",
    title: "Waking the Dead: Windows Process Injection Explained",
    excerpt:
      "How Windows process injection techniques work, why they're effective, and what defenders monitor to catch them.",
    category: "Security",
    date: "2026-03-21",
    readingTime: "15 min",
    href: "https://r4r00t-blog.vercel.app/blog/waking-the-dead-windows-process-injection-explained",
    pattern: "diagonal",
  },
];
