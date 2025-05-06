"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header";
import Footer from "@/components/footer";
import ImageContainer from "@/components/image-container";
import FirstContainer from "@/components/FirstContainer";
import SecondContainer from "@/components/SecondContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010314] text-white flex flex-col">
      <Header />

      <main className="container mx-auto px-4 flex-grow">
        <section className="flex flex-col items-center justify-center min-h-[80vh] relative mb-16">
          <ImageContainer
            src="/placeholder.svg?height=600&width=600"
            alt="Cofre digital 3D"
            width={600}
            height={600}
            priority
          />
          <div className="absolute bottom-8 animate-bounce" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            <ChevronDown className="w-8 h-8 text-white/70 cursor-pointer" />
          </div>
        </section>

        <FirstContainer />
        <SecondContainer />
      </main>

      <Footer />
    </div>
  );
}
