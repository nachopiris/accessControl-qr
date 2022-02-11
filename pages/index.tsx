import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
})

export default function Scanner() {
  const { data: session } = useSession()
  const router = useRouter()

  const [dni, setDni] = useState('')
  const [reading, setReading] = useState(true)

  useEffect(() => {
    if (dni && dni.length === 8 && !isNaN(Number(dni))) {
      setReading(false)
      router.replace(`/guests/${dni}`)
    } else if (dni) {
      alert('QR inválido!')
    }
  }, [dni, router])

  const handleScan = (data: string | null) => {
    if (data) {
      setDni(data)
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  if (session) {
    return (
      <div
        className={`flex flex-col items-center ${
          reading ? 'bg-slate-800' : 'justify-center h-screen'
        }`}
      >
        {reading ? (
          <>
            <QrReader
              delay={reading && 500}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <Link href="/guests" passHref>
              <button className="my-6 p-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
                Ver lista
              </button>
            </Link>
          </>
        ) : (
          <>
            <svg
              className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-opacity-50 inline mr-2"
              style={{ borderRightColor: 'black', borderTopColor: 'black' }}
              viewBox="0 0 24 24"
            ></svg>
            <p className="font-sans font-medium text-lg inline">Cargando</p>
          </>
        )}
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
