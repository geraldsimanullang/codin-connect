"use client";

import NavbarComponent from "@/components/homeComponents/Navbar";
// import ChallengeCard from "@/app/global-challenges/ChallengeCard";
import FollowedChallengeCard from "@/components/homeComponents/FollowedChallengeCard";

const Home: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-0"> {/* Set gap to 0 to eliminate space between elements */}
        <NavbarComponent />
        <FollowedChallengeCard />
        {/* <Hero /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Home;
