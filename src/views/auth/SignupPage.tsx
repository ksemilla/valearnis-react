import { Link, useNavigate } from "react-router-dom"
import SignupForm from "./SignupForm"
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { UsersService } from "../../api/users"
import { Credentials, ErrorResponse } from "../../types"
import { decodeJwt } from "../../utils"
import { useAuthStore } from "../../stores/auth"

export default function SignupPage() {
  const authStore = useAuthStore()
  const toast = useToast()
  const navigate = useNavigate()
  const mutate = useMutation({
    mutationFn: async (data: Credentials) => {
      return UsersService.createUser(data).then((res) => res.data)
    },
    onSuccess: (res) => {
      const userData: { user_id: number } = decodeJwt(res.access_token)
      authStore.setUserId(userData.user_id)
      authStore.setIsLogged(true)
      localStorage.setItem("accessToken", res.access_token)
      navigate("/")
      toast({
        title: "Account created!",
        duration: 5000,
        isClosable: true,
        status: "success",
      })
    },
    onError: (res: ErrorResponse) => {
      toast({
        title: "Create user failed",
        description: res.response.data.detail[0].msg,
        duration: 9000,
        isClosable: true,
        status: "error",
      })
    },
  })

  const onSubmit = (data: Credentials) => {
    mutate.mutate(data)
  }

  return (
    <Box pt="100px">
      <Card maxW="500px" m="auto">
        <CardBody>
          <Stack m="auto" maxW="400px" spacing={4}>
            <Center>
              <Heading>Sign up now!</Heading>
            </Center>
            <SignupForm onSubmit={onSubmit} loading={mutate.isLoading} />
            <Center>
              <Box as={Link} to="/login" fontSize={14}>
                Already have an account? Click here
              </Box>
            </Center>
          </Stack>
        </CardBody>
      </Card>
      <Center mt="10px">
        <Button as={Link} to="/api-testing">
          Go to api testing
        </Button>
      </Center>
    </Box>
  )
}
