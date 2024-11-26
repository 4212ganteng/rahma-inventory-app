// Next Imports
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function POST(req: Request) {
  // Vars
  const {
    company,
    industry,
    picFirstName,
    picLastName,
    picEmail,
    picPhone,
    legalEntity,
    leadSource,
    leadStatus,
    city,
    province,
    address
  } = await req.json()

  try {
  } catch (error) {}
}
