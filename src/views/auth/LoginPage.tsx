import {
  Box,
  Card,
  CardBody,
  Center,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import LoginForm from "./LoginForm"
import { useMutation } from "@tanstack/react-query"
import { AuthService } from "../../api/auth"
import { Credentials } from "../../types"
import { useAuthStore } from "../../stores/auth"
import { decodeJwt } from "../../utils"
import { useEffect } from "react"

export default function LoginPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const authStore = useAuthStore()
  const mutate = useMutation({
    mutationFn: async (data: Credentials) => {
      return AuthService.login(data).then((res) => res.data)
    },
    onSuccess: (res) => {
      const userData: { user_id: number } = decodeJwt(res.access_token)
      authStore.setUserId(userData.user_id)
      authStore.setIsLogged(true)
      localStorage.setItem("accessToken", res.access_token)
      toast({
        title: "Login success",
        duration: 5000,
        isClosable: true,
        status: "success",
      })
    },
    onError: (res: { response: { data: { detail: string } } }) => {
      toast({
        title: "Authentication failed",
        description: res.response.data.detail,
        duration: 5000,
        isClosable: true,
        status: "error",
      })
    },
  })

  const onSubmit = (data: Credentials) => {
    mutate.mutate(data)
  }

  useEffect(() => {
    if (authStore.isLogged) navigate("/")
  }, [authStore.isLogged])

  return (
    <Box pt="100px">
      <Card maxW="500px" m="auto">
        <CardBody>
          <Stack m="auto" maxW="400px" spacing={4}>
            <Center>
              <Heading>Welcome back!</Heading>
            </Center>
            <LoginForm onSubmit={onSubmit} loading={mutate.isLoading} />
            <Center>
              <Box as={Link} to="/signup" fontSize={14}>
                Create new account here
              </Box>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}
