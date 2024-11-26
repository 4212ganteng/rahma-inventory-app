import axios from 'axios'

export const getWilayahApi = async (params: string) => {
  return await axios.get(`https://wilayah.id/api/${params}`)
}
