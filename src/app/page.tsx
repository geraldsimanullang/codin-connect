import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";

import Navbar from "@/components/main/Navbar";
<<<<<<< HEAD
// import UlasanContent from "@/components/sub/UlasanContent";
import Dashboard from "./dashboard/page";
import Profile from "./profile/profile";
import CodeEditorPage from "./sandbox/page";
import Addquestion from "./addquestion/page";
=======
>>>>>>> d34ab86b8aa463118ed4931d4b64a02411f187a3

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        <Navbar />
        <Hero />
<<<<<<< HEAD
        {/* <UlasanContent /> */}
        <Footer />

        {/* <Addquestion /> */}
=======
        <Footer />
>>>>>>> d34ab86b8aa463118ed4931d4b64a02411f187a3
      </div>
    </div>
  );
}
