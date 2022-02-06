import { Guest } from 'interfaces/Guest'
import { useRouter } from 'next/router'

interface Props {
  guest: Guest 
  error: string
}

export default function GuestCard(props: Props) {
  const { guest, error } = props
  const router = useRouter()

  const refreshGuest = () => {
    router.replace(router.asPath)
  }

  const gotIn = async () => {
    await fetch(
      `https://0521-201-253-85-215.ngrok.io/api/guest/${guest.guestDNI}`,
      {
        method: 'PUT',
      },
    )
    refreshGuest()
  }

  const backToScanner = () => {
    router.replace('/')
  }

  console.log(props)

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
                <dt className="text-sm font-medium text-gray-500">Ingresó</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {guest.gotIn ? 'Sí' : 'No'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {error}
        </div>
      )}

      <button
        onClick={error || guest.gotIn ? backToScanner : gotIn}
        className="p-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full"
      >
        {error || guest.gotIn ? 'Volver al scanner' : 'Marcar ingreso'}
      </button>
    </div>
  )
}

export const getServerSideProps = async ({ query }: {query: any}) => {
  const { dni } = query
  const res = await fetch(
    `https://0521-201-253-85-215.ngrok.io/api/guest/${dni}`,
  )
  const data = await res.json()

  if (res.status < 300) {
    return {
      props: {
        guest: data,
      },
    }
  }

  return {
    props: {
      error: data.error,
    },
  }
}
