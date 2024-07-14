import { useCallback, useEffect, useState } from "react"

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export const useFetch = <T>(
  url: string,
  options?: RequestInit,
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setData(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error }
}
