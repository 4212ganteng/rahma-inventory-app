import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.RAJAONGKIR_API_KEY

    if (!apiKey) {
      throw new Error('API key is not defined')
    }

    const res = await fetch(`${process.env.API_RAJAONGKIR_URL}/province`, {
      method: 'GET',
      headers: { key: apiKey },
      cache: 'no-store'
    })

    const province = await res.json()

    console.log(province)

    return NextResponse.json(province)
  } catch (error: any) {
    console.log(error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
