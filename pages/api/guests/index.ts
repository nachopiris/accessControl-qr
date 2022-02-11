import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Guest } from 'interfaces/Guest'
import * as fs from 'fs'

const getData = () => {
  const data = fs.readFileSync('data/list.json')
  return JSON.parse(data.toString())
}

const getGuests = () => {
  return getData()
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

    if (method !== 'GET') {
      throw new Error('Method not allowed')
    }

    const guests = getGuests()

    if (dni) {
      return res.json(
        guests.filter((guest: Guest) => String(guest.guestDNI).includes(dni)),
      )
    }

    res.json(guests)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
