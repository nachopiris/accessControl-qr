import dynamic from 'next/dynamic'
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
    if (dni) {
      router.replace(`/guest/${dni}`)
    }
  }, [dni, router])

  const handleScan = (data: string | null) => {
    if (data) {
      setReading(false)
      setDni(data)
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <div
      className={
        'h-screen flex items-center justify-center ' + (reading && 'bg-black')
      }
    >
      {reading ? (
        <QrReader
          delay={reading && 500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
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
