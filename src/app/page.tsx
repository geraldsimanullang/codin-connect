import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-between">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
