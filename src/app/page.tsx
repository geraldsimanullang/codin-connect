import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import StarsCanvas from "@/components/main/StarBackground";
import UlasanContent from "@/components/sub/UlasanContent";

import Profile from "./profile/profile";

export default function Home() {
  return (
    <div className="h-full w-full">
      {/* <StarsCanvas /> */}
      <div className="flex flex-col gap-56">
        {/* <Navbar />
        <Hero />
        <UlasanContent />
        <Footer /> */}
        <Profile />
      </div>
    </div>
  );
}
