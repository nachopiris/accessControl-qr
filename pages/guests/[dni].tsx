import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function GuestCard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { dni } = router.query

  const [guest, setGuest] = useState(null as any)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getGuest = async () => {
    setLoading(true)
    const res = await fetch(`/api/guests/${dni}`)
    const data = await res.json()
    if (data.error) {
      setError(data.error)
    } else {
      setGuest(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (dni) {
      getGuest()
    }
  }, [dni])

  const gotIn = async () => {
    await fetch(`/api/guests/${guest?.guestDNI}`, {
      method: 'PUT',
    })
    getGuest()
  }

  const backToScanner = () => {
    router.replace('/')
  }

  if (session) {
    return (
      <div className="container mx-auto flex items-center flex-col p-4">
        {guest ? (
          <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mb-4 w-full">
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nombre RRPP
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {guest.rrppName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nombre invitado
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {guest.guestName}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">DNI</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {guest.guestDNI}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Estado</dt>
                  <dd className="mt-1 sm:mt-0">
                    <span
                      className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        guest.gotIn
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {guest.gotIn ? 'Adentro' : 'Afuera'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ) : (
          <div>
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
                <p className="font-sans font-medium text-lg inline">Cargando</p>
              </>
            ) : (
              <div
                className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        )}

        {!loading && (
          <button
            onClick={error || guest?.gotIn ? backToScanner : gotIn}
            className="p-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
          >
            {error || guest?.gotIn ? 'Volver al scanner' : 'Marcar ingreso'}
          </button>
        )}
      </div>
    )
  } else if (status !== 'loading') {
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
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <svg
          className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50 inline mr-2"
          style={{ borderRightColor: 'black', borderTopColor: 'black' }}
          viewBox="0 0 24 24"
        ></svg>
        <p className="font-sans font-medium text-lg inline">Cargando</p>
      </div>
    )
  }
}
