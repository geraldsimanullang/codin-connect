import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import Navbar from "@/components/main/Navbar";
import ChallengeCard from "@/components/homeComponents/ChallengeCard";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        {/* <Navbar /> */}
        {/* <Hero /> */}
        <ChallengeCard />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
