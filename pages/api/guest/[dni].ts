import { NextApiRequest, NextApiResponse } from 'next'
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
  console.log(guestIndex)
  guests[guestIndex].gotIn = true
  writeData(guests)
  return guests[guestIndex]
}

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { dni },
  } = req

  try {
    if (method !== 'GET' && method !== 'PUT') {
      throw new Error('Method not allowed')
    }

    if (dni.length !== 8 || isNaN(Number(dni))) {
      throw new Error('DNI invalido')
    }

    const guest = getGuest(dni)

    if (!guest) {
      throw new Error('No esta en lista')
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
