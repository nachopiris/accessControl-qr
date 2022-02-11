import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { Guest } from 'interfaces/Guest'

export default function Guests() {
  const { data: session } = useSession()

  const [guests, setGuests] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)

  const getGuests = async (query: string) => {
    const res = await fetch(`/api/guests?dni=${query}`)
    const data = await res.json()
    setGuests(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!searchInput || searchInput.length >= 3) {
      setLoading(true)
      getGuests(searchInput)
    }
  }, [searchInput])

  if (session) {
  return (
    <div className="container mx-auto flex items-center flex-col p-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex rounded-full border-grey-light border mb-3">
            <input
              type="number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded ml-4 focus:outline-none"
              placeholder="DNI"
            />
            <span className="w-auto flex justify-end items-center p-2">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </span>
          </div>

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
                              <a>{guest.guestName}</a>
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            guest.gotIn
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {guest.gotIn ? 'Adentro' : 'Afuera'}
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
                <>
                  <svg
                    className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50 inline mr-2"
                    style={{
                      borderRightColor: 'black',
                      borderTopColor: 'black',
                    }}
                    viewBox="0 0 24 24"
                  ></svg>
                  <p className="font-sans font-medium text-lg inline">
                    Cargando
                  </p>
                </>
              ) : (
                <p className="font-sans font-medium text-lg inline">
                  Sin resultados
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
  } else {
    return (
      <div className="container flex flex-col items-center mx-auto">
        <div
          className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          No autorizado
        </div>
        <Link href="/api/auth/signin" passHref>
          <button className="p-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
            Iniciar sesión
          </button>
        </Link>
      </div>
    )
  }
}
