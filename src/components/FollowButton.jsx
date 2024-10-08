"use client";

import React, { useState, useEffect } from "react";

const FollowButton = ({
  followUserId,
  fetchProfile,
  currentFollowers,
  ownId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

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
        setIsFollowing(!isFollowing);
        fetchProfile();
      } else {
        console.error("Failed to follow/unfollow user");
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  if (followUserId && ownId && followUserId !== ownId) {
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
  }
};

export default FollowButton;
