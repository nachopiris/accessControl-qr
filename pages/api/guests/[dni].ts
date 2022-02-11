import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Guest } from 'interfaces/Guest'
import * as fs from 'fs'

const getData = () => {
  const data = fs.readFileSync('data/list.json')
  return JSON.parse(data.toString())
}

const writeData = (data: string) => {
  fs.writeFile('data/list.json', JSON.stringify(data), function (err) {
    if (err) throw err
  })
}

const getGuest = (dni: string | string[]) => {
  const guests = getData()
  return guests.find((guest: Guest) => guest.guestDNI === Number(dni))
}

const updateGuest = (dni: string | string[]) => {
  const guests = getData()
  const guestIndex = guests.findIndex(
    (guest: Guest) => guest.guestDNI === Number(dni),
  )
  guests[guestIndex].gotIn = true
  writeData(guests)
  return guests[guestIndex]
}

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { dni },
  } = req

  try {
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (method !== 'GET' && method !== 'PUT') {
      throw new Error('Method not allowed')
    }

    if (dni.length !== 8 || isNaN(Number(dni))) {
      throw new Error('DNI inválido')
    }

    const guest = getGuest(dni)

    if (!guest) {
      throw new Error('No está en lista')
    }

    if (method === 'GET') {
      res.json(guest)
    } else {
      const updatedGuest = updateGuest(dni)
      res.json(updatedGuest)
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
