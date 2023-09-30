import { useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { getAccessToken } from "./utils"
import { useMutation } from "@tanstack/react-query"
import { AccessToken } from "./types"
import { AuthService } from "./api/auth"
import { useAuthStore } from "./stores/auth"
import { Loader } from "./components"
import { useToast } from "@chakra-ui/react"

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const accessToken = getAccessToken()
  const authStore = useAuthStore()
  const toast = useToast()

  const mutate = useMutation({
    mutationFn: async (data: AccessToken) => {
      return AuthService.verifyToken(data).then((res) => res.data)
    },
    onSuccess: (user) => {
      authStore.setIsLogged(true)
      authStore.setUserId(user.id ?? 0)
      setLoading(false)
    },
    onError: (res: { response: { data: { detail: string } } }) => {
      setLoading(false)
      localStorage.removeItem("accessToken")
      toast({
        title: "Authentication failed",
        description: res.response.data.detail,
        duration: 5000,
        isClosable: true,
        status: "error",
      })
    },
  })

  useEffect(() => {
    if (accessToken) {
      mutate.mutateAsync({ access_token: accessToken })
    } else {
      setLoading(false)
    }
  }, [])

  return <RouterProvider router={router} />

  return loading ? (
    <Loader text="Authenticating" />
  ) : (
    <RouterProvider router={router} />
  )
}

export default App
