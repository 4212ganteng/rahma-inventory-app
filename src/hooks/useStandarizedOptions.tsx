import { useState, useEffect } from 'react'

export const useStandarizedOptions = <L extends string, V extends string | number>(options: ({
  [key in L | V]: string
})[], label: L, value: V) => {
  const [data, setData] = useState<
    ({
      [key in L | V]: string
    })[]
  >([])


  useEffect(() => {
    if (options && Array.isArray(options)) {
      const newData = options?.map(item => {
        return {

          label: item[label],
          value: item[value]
        }
      })

      setData(newData as any)
    } else {
      setData([])
    }
  }, [options, label, value])

  return data
}


export const useStandarizedOptions2 = <T,>(options: T[], cb: (item: T) => { label: string, value: string }) => {
  return options?.map(item => {
    return cb(item)
  })
}


