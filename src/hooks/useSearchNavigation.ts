import { useNavigate } from "react-router-dom"

export const useSearchNavigation = () => {
  const navigate = useNavigate()

  const navigateToSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  return navigateToSearch
}
