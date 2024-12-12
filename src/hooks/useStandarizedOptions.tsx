import { useState, useEffect } from 'react'

export const useStandarizedOptions = (options: unknown, label: unknown, value: unknown) => {
  const [data, setData] = useState([])


  useEffect(() => {
    if (options && Array.isArray(options)) {
      const newData = options?.map(item => {
        return {
          label: item[label],
          value: item[value]
        }
      })

      setData(newData)
    } else {
      setData([])
    }
  }, [options, label, value])

  return data
}
