"use client";

import React, { useState, useEffect } from "react";

const FollowButton = ({
  followUserId,
  fetchProfile,
  currentFollowers,
  ownId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Check if the current user is already following
  useEffect(() => {
    const isAlreadyFollowing = currentFollowers.some(
      (follower) => follower._id.toString() === ownId
    );
    setIsFollowing(isAlreadyFollowing);
  }, [currentFollowers, ownId]);

  const handleFollow = async () => {
    try {
      const response = await fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followUserId }),
        credentials: "include",
      });

      if (response.ok) {
        setIsFollowing(!isFollowing); // Toggle follow/unfollow state
        fetchProfile(); // Refresh the profile data after following/unfollowing
      } else {
        console.error("Failed to follow/unfollow user");
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
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
