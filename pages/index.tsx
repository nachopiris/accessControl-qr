import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import Button from "components/Button";

const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

export default function Scanner() {
  const router = useRouter();

  const [dni, setDni] = useState("");
  const [reading, setReading] = useState(true);

  useEffect(() => {
    if (dni && dni.length === 8 && !isNaN(Number(dni))) {
      setReading(false);
      router.push(`/guests/${dni}`);
    } else if (dni) {
      alert("QR inválido!");
    }
  }, [dni, router]);

  const handleScan = (data: string | null) => {
    if (data) {
      setDni(data);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const guestsTable = () => {
    router.push("/guests");
  };

  return (
    <div
      className={`flex flex-col items-center ${
        reading ? "bg-slate-800" : "justify-center h-screen"
      }`}
    >
      {reading ? (
        <>
          <QrReader
            delay={reading && 500}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />

          <Button
            text="Ver lista"
            onClick={guestsTable}
            disabled={false}
            loading={false}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
