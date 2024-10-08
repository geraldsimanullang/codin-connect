"use client";

import NavbarComponent from "@/components/homeComponents/Navbar";
import ChallengeCard from "@/components/homeComponents/ChallengeCard";
import FollowedChallengeCard from "@/components/homeComponents/FollowedChallengeCard";
const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-56">
        <NavbarComponent />
        {/* <Hero /> */}
        <h1>ini global challenge yaaaa</h1>
        <ChallengeCard />
        <h1>ini challenge yang kamu follow mbak</h1>
        <FollowedChallengeCard/>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
