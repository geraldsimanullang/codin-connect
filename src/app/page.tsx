import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";

import Navbar from "@/components/main/Navbar";
// import UlasanContent from "@/components/sub/UlasanContent";
import Dashboard from "./dashboard/page";
import Profile from "./profile/profile";
import CodeEditorPage from "./sandbox/page";
import Addquestion from "./addquestion/page";

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        <Navbar />
        <Hero />
        {/* <UlasanContent /> */}
        <Footer />

        {/* <Addquestion /> */}
      </div>
    </div>
  );
}
