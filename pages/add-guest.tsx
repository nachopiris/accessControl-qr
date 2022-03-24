import Alert from "components/Alert";
import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import capitalize from "lib/capitalize";
import Button from "components/Button";

interface Guest {
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
}

export default function NewGuest() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rrppDni, setRrppDni] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const addGuest = () => {
    const guest = {
      firstName,
      lastName,
      dni,
      phoneNumber,
    };
    setGuests([...guests, guest]);
    setFirstName("");
    setLastName("");
    setDni("");
    setPhoneNumber("");
  };

  const sendForm = async () => {
    setLoading(true);
    setGuests([...[]]);
    setError("");
    setSuccess("");
    const res = await fetch("/api/guests", {
      method: "POST",
      body: JSON.stringify({
        rrppDni,
        guests,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(data.message);
    }
    setLoading(false);
  };

  const removeGuest = (dni: string) => {
    const guestIndex = guests.findIndex((guest) => guest.dni === dni);
    const guestsTemp = guests;
    guestsTemp.splice(guestIndex, 1);
    setGuests([...guestsTemp]);
  };

  return (
    <div className="container mx-auto flex items-center flex-col">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-4 w-full p-4 mt-3">
        <form>
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nombre
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstName"
              className="text-sm rounded-lg block w-full p-2.5 border border-gray-300"
              placeholder="Juan"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Apellido
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastName"
              className="text-sm rounded-lg block w-full p-2.5 border border-gray-300"
              placeholder="Perez"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="dni"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              DNI
            </label>
            <input
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              type="number"
              id="dni"
              className="text-sm rounded-lg block w-full p-2.5 border border-gray-300"
              placeholder="41228458"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Número de teléfono
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="number"
              id="phoneNumber"
              className="text-sm rounded-lg block w-full p-2.5 border border-gray-300"
              placeholder="3447511292"
            />
          </div>
          {guests && guests.length !== 0 && (
            <div className="mb-6">
              {guests.map((guest: Guest, index) => {
                return (
                  <span
                    key={index}
                    className="mr-2 px-1 inline-flex text-sm leading-5 rounded-md font-semibold bg-blue-400 text-white"
                  >
                    <button
                      type="button"
                      onClick={() => removeGuest(guest.dni)}
                    >
                      <XIcon className="h-5 w-5 text-gray-500 mr-1" />
                    </button>{" "}
                    {`${capitalize(guest.firstName)} ${capitalize(
                      guest.lastName
                    )}`}
                  </span>
                );
              })}
            </div>
          )}
          <Button
            onClick={addGuest}
            disabled={!firstName || !lastName || !dni || !phoneNumber}
            text="Agregar"
            loading={false}
          />
          <div className="mb-6">
            <label
              htmlFor="rrppDni"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Tú DNI
            </label>
            <input
              value={rrppDni}
              onChange={(e) => setRrppDni(e.target.value)}
              type="number"
              id="rrppDni"
              className="text-sm rounded-lg block w-full p-2.5 border border-gray-300"
              placeholder="41228458"
              required
            />
          </div>
          <Button
            onClick={sendForm}
            disabled={guests.length === 0 || !rrppDni}
            text="Enviar formulario"
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}
