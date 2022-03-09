import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "components/Loading";
import Unauthorized from "components/Unauthorized";
import GuestsTable from "components/GuestsTable";

export default function Guests() {
  const { data: session, status } = useSession();

  const [guests, setGuests] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const getGuests = async (query?: string) => {
    setLoading(true);
    const res = await fetch(`/api/guests${query ? `?name=${query}` : ""}`);
    const data = await res.json();
    setGuests(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!searchInput) {
      getGuests();
    }
    if (searchInput.length >= 3) {
      const timer = setTimeout(() => getGuests(searchInput), 1500);
      return () => clearTimeout(timer);
    }
  }, [searchInput]);

  if (session) {
    return (
      <div className="container mx-auto flex items-center flex-col">
        <GuestsTable
          guests={guests}
          loading={loading}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>
    );
  }

  if (status !== "loading") {
    return <Unauthorized />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loading />
    </div>
  );
}
