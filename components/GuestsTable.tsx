import Link from "next/link";
import { Guest } from "interfaces/Guest";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

interface Props {
  guests: Guest[];
  loading: boolean;
  setSearchInput: Function;
  searchInput: string;
}

export default function GuestsTable({
  guests,
  loading,
  setSearchInput,
  searchInput,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />

        {guests && guests.length !== 0 ? (
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {guests.map((guest: Guest, index: any) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          <Link href={`/guests/${guest.guestDNI}`}>
                            {guest.guestName}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          guest.gotIn
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {guest.gotIn ? "Adentro" : "Afuera"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            {loading ? (
              <Loading />
            ) : (
              <p className="font-sans font-medium text-lg inline">
                Sin resultados
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
