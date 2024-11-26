// Next Imports
import { NextResponse } from 'next/server'

// import type { UserTable } from './users'

import type { User } from '@prisma/client'

import prisma from '@/utils/prisma'

// Types
type responseType = Omit<User, 'password'>

export async function POST(req: Request) {
  // Vars
  const { email, password } = await req.json()

  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password
    }
  })

  let response: responseType | null = null

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...filteredUserData } = user

    response = {
      ...filteredUserData
    }

    return NextResponse.json(response)
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email or Password is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
