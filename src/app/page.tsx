"use client";

import Navbar from "@/components/homeComponents/Navbar";
import ChallengeCard from "@/components/homeComponents/ChallengeCard";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        <Navbar />
        <ChallengeCard />
      </div>
    </div>
  );
};

export default Home;
