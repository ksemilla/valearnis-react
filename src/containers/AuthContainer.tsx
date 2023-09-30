import { Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { UsersService } from "../api/users"

export default function AuthContainer() {
  const navigate = useNavigate()
  const authStore = useAuthStore()

  useEffect(() => {
    if (!authStore.isLogged) navigate("/login")
  }, [authStore.isLogged])

  useQuery({
    queryKey: ["my-account"],
    queryFn: async () => {
      return UsersService.getUser(authStore.userId).then((res) => res.data)
    },
    enabled: !!authStore.userId,
    onSuccess: (user) => {
      authStore.setUser(user)
    },
  })

  return <Outlet />
}
