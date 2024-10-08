import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) {
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/user?username=${username}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
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
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Search Results</h1>
      {userData ? (
        <div>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default SearchPage;
