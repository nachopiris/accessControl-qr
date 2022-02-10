import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
})

export default function Scanner() {
  const router = useRouter()

  const [dni, setDni] = useState('')
  const [reading, setReading] = useState(true)

  useEffect(() => {
    if (dni && dni.length === 8 && !isNaN(Number(dni))) {
      setReading(false)
      router.replace(`/guests/${dni}`)
    } else if (dni) {
      alert("QR inválido!")
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

  return (
    <div
      className={`h-screen flex flex-col items-center ${
        reading ? 'bg-slate-800' : 'justify-center'
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
            <button className="mt-8 p-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full">
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
}
