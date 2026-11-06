import { SectionStack } from "@/components/layout/SectionStack";
import { About } from "@/components/sections/About";
import { Arsenal } from "@/components/sections/Arsenal";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";

export default function Home() {
  return (
    <SectionStack>
      <Hero />
      <About />
      <Arsenal />
      <Projects />
      <Research />
      <Certifications />
      <Contact />
    </SectionStack>
  );
}
