import { Metadata } from "next";
import Hero from "@/components/Hero";
import Integration from "@/components/Integration";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";


export const metadata: Metadata = {
  title: "Sentioai | The Future of Emotion Detecttion",
  description: "AI Powered",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Contact />
    </main>
  );
}
