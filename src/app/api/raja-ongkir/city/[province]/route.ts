import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { province: string } }) {
  console.log(params)

  try {
    const apiKey = process.env.RAJAONGKIR_API_KEY

    if (!apiKey) {
      throw new Error('API key is not defined')
    }

    const res = await fetch(`${process.env.API_RAJAONGKIR_URL}/city?province=${params.province}`, {
      method: 'GET',
      headers: { key: apiKey },
      cache: 'no-store'
    })

    const province = await res.json()

    console.log(province)

    return NextResponse.json(province)
  } catch (error: unknown) {
    console.log(error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
