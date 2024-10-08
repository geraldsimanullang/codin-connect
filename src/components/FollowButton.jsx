"use client";

import React, { useState } from "react";

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-3 py-1 text-white text-sm font-bold rounded ${
        isFollowing ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
