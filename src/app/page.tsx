import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
