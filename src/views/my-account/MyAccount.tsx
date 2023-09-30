import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useToast,
} from "@chakra-ui/react"
import UserForm from "./UserForm"
import { User } from "../../types"
import { useAuthStore } from "../../stores/auth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UsersService } from "../../api/users"
import { Loader } from "../../components"

export default function MyAccount() {
  const authStore = useAuthStore()
  const toast = useToast()

  const mutate = useMutation({
    mutationFn: async (data: User) => {
      return UsersService.updateUser(authStore.userId, data).then(
        (res) => res.data
      )
    },
    onSuccess: (user) => {
      authStore.setUser(user)
      toast({
        title: "Profile updated!",
        duration: 5000,
        isClosable: true,
        status: "success",
      })
    },
  })

  const onSubmit = (data: User) => {
    mutate.mutate(data)
  }

  const { data } = useQuery({
    queryKey: ["my-stats"],
    queryFn: async () => {
      return UsersService.getUserStats(authStore.user?.id ?? 0).then(
        (res) => res.data
      )
    },
    enabled: !!authStore.user,
  })

  return (
    <Box maxW="500px" m="auto">
      <Stack spacing={5}>
        <Heading>Stats</Heading>
        <Flex gap={5}>
          <Card flex="1">
            <CardBody>
              <Stat>
                <StatLabel>Total Quizzes</StatLabel>
                <StatNumber>{data?.total_quizzes}</StatNumber>
                <StatHelpText>Number of quizzes taken</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card flex="1">
            <CardBody>
              <Stat>
                <StatLabel>Average</StatLabel>
                <StatNumber>
                  {Math.trunc(data?.average_percentage ?? 0)} %
                </StatNumber>
                <StatHelpText>Percentage</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Flex>
      </Stack>

      <Divider my="50px" />

      <Heading>My Account</Heading>
      <Box>
        {authStore.user ? (
          <UserForm
            onSubmit={onSubmit}
            initialValues={authStore.user}
            loading={mutate.isLoading}
          />
        ) : (
          <Loader text="Fetching user" />
        )}
      </Box>
    </Box>
  )
}
