import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import GuestCard from "components/GuestCard";
import Error from "components/Error";
import Button from "components/Button";
import Unauthorized from "components/Unauthorized";

export default function Guest() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { dni } = router.query;

  const [guest, setGuest] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGuest = async () => {
    setLoading(true);
    const res = await fetch(`/api/guests/${dni}`);
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setGuest(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (dni) {
      getGuest();
    }
  }, [dni]);

  const gotIn = async () => {
    await fetch(`/api/guests/${guest?.guestDNI}`, {
      method: "PUT",
    });
    getGuest();
  };

  const backToScanner = () => {
    router.push("/");
  };

  if (session) {
    return (
      <div className="container mx-auto flex items-center flex-col p-4">
        {guest ? (
          <GuestCard
            rrppName={guest.rrppName}
            guestName={guest.guestName}
            guestDNI={guest.guestDNI}
            gotIn={guest.gotIn}
          />
        ) : (
          <div>{loading ? <Loading /> : <Error message={error} />}</div>
        )}

        {!loading && (
          <Button
            text={
              error || guest?.gotIn ? "Volver al scanner" : "Marcar ingreso"
            }
            onClick={error || guest?.gotIn ? backToScanner : gotIn}
          />
        )}
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
