// Next Imports
import { NextResponse } from 'next/server'

import prisma from '@/utils/prisma'

export async function POST(req: Request) {
  // Vars
  const { email, password, name, role } = await req.json()

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (user) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400, statusText: 'Bad Request' })
    }

    // create user

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role
      }
    })

    return NextResponse.json(
      {
        message: 'User created successfully',
        data: newUser
      },
      {
        status: 200,
        statusText: 'OK'
      }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong', error },
      { status: 500, statusText: 'Internal Server Error' }
    )
  }
}
