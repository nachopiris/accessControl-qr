import { useRouter } from "next/router";
import Button from "./Button";
import Alert from "./Alert";

export default function Unauthorized() {
  const router = useRouter();

  const login = () => {
    router.push("/api/auth/signin");
  };

  return (
    <div className="container flex flex-col items-center mx-auto">
      <Alert type="error" message="No autorizado" />
      <Button text="Iniciar Sesión" onClick={login} />
    </div>
  );
}
