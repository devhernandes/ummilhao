"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header";
import Footer from "@/components/footer";
import FirstContainer from "@/components/FirstContainer";
import SecondContainer from "@/components/SecondContainer";
import PixelGrid from "@/components/PixelGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#010314] text-white flex flex-col">
      <Header />

      <main className="container mx-auto px-4 flex-grow">
        <PixelGrid />
        <FirstContainer />
        <SecondContainer />
      </main>

      <Footer />
    </div>
  );
}
