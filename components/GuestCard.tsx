interface Props {
  rrppDni: number;
  fullName: string;
  dni: number;
  gotIn: boolean;
  sector: number;
}

export default function GuestCard({
  rrppDni,
  fullName,
  dni,
  gotIn,
  sector,
}: Props) {
  return (
    <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-4 w-full">
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Nombre invitado
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {fullName}
              {rrppDni === dni && " ⭐"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">DNI</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {dni}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Sector</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {sector === 1 ? "🥶" : "🌚"}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Estado</dt>
            <dd className="mt-1 sm:mt-0">
              <span
                className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  gotIn
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {gotIn ? "Adentro" : "Afuera"}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
