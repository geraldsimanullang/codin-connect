"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link dari Next.js
import Image from "next/image"; // Import Image dari Next.js

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Username from URL:", username); // Cek apakah username valid
      if (!username) {
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/profile/search/user?username=${username}`
        );
        const data = await response.json();

        if (response.ok) {
          setUserData(data[0]); // Mengakses elemen pertama jika data berupa array
        } else {
          setError(data.message || "User not found");
        }
      } catch (err) {
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Search Results</h1>
      {userData ? (
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          {/* Avatar */}
          <Image
            src={"/default-avatar.jpg"} // URL foto avatar atau fallback jika tidak ada
            alt={'s avatar'}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />

          {/* User Info */}
          <div>
            <p className="text-gray-700">
              <Link href={`/profile/${userData.username}`} className=" font-semibold">
                <i>{userData.name}</i>
              </Link>
              <span className="m-3 text-gray-500">
                (
                <Link href={`/profile/${userData.username}`} className="">
                  <i>{userData.username}</i>
                </Link>
                )
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user found.</p>
      )}
    </div>
  );
};

export default SearchPage;
