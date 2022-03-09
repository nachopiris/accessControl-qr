import { useRouter } from "next/router";
import Button from "./Button";
import Error from "./Error";

export default function Unauthorized() {
  const router = useRouter();

  const login = () => {
    router.push("/api/auth/signin");
  };

  return (
    <div className="container flex flex-col items-center mx-auto">
      <Error message="No autorizado" />
      <Button text="Iniciar Sesión" onClick={login} />
    </div>
  );
}
