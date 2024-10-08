"use client";

import NavbarComponent from "@/components/homeComponents/Navbar";
// import ChallengeCard from "@/app/global-challenges/ChallengeCard";
import FollowedChallengeCard from "@/components/homeComponents/FollowedChallengeCard";
const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        <NavbarComponent />
        {/* <Hero /> */}
        <FollowedChallengeCard/>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
