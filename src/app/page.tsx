import Footer from "@/components/main/Footer";
import Hero from "@/components/main/Hero";
import NavbarComponent from "@/components/homeComponents/Navbar";
import ChallengeCard from "@/components/homeComponents/ChallengeCard";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col">
        <NavbarComponent />
        {/* <Hero /> */}
        <ChallengeCard />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
