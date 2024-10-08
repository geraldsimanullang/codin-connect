"use client";

import NavbarComponent from "@/components/homeComponents/Navbar";
import ChallengeCard from "@/components/homeComponents/ChallengeCard";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col">
        <NavbarComponent />
        <ChallengeCard />
      </div>
    </div>
  );
};

export default Home;
