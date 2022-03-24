import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import GuestCard from "components/GuestCard";
import Alert from "components/Alert";
import Button from "components/Button";
import Unauthorized from "components/Unauthorized";

export default function Guest() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { dni } = router.query;

  const [guest, setGuest] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingGuest, setUpdatingGuest] = useState(false);

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
    setUpdatingGuest(true);
    await fetch(`/api/guests/${guest?.dni}`, {
      method: "PUT",
    });
    setUpdatingGuest(false);
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
            rrppFullName={guest.rrpp.fullName}
            fullName={guest.fullName}
            dni={guest.dni}
            gotIn={guest.gotIn}
          />
        ) : (
          <div>
            {loading ? <Loading /> : <Alert type="error" message={error} />}
          </div>
        )}

        {!loading && guest && (
          <Button
            text={
              error || guest?.gotIn ? "Volver al scanner" : "Marcar ingreso"
            }
            onClick={error || guest?.gotIn ? backToScanner : gotIn}
            loading={updatingGuest}
            disabled={updatingGuest}
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
