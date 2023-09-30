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
  Text,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { UsersService } from "../../../api"
import { Loader } from "../../../components"

export default function UserDetail() {
  const { id } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      return UsersService.getUser(parseInt(id ?? "0")).then((res) => res.data)
    },
    enabled: !!id,
  })

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["my-stats"],
    queryFn: async () => {
      return UsersService.getUserStats(parseInt(id ?? "0")).then(
        (res) => res.data
      )
    },
    enabled: !!data && !!id,
  })

  return isLoading && isLoadingStats ? (
    <Loader text="Fetching user and stats" />
  ) : (
    <Box>
      <Heading>{data?.email}</Heading>
      <Text>{data?.name}</Text>
      <Text>{data?.role}</Text>
      <Divider my="10px" />
      <Stack spacing={5}>
        <Heading>Stats</Heading>
        <Flex gap={5}>
          <Card flex="1">
            <CardBody>
              <Stat>
                <StatLabel>Total Quizzes</StatLabel>
                <StatNumber>{stats?.total_quizzes}</StatNumber>
                <StatHelpText>Number of quizzes taken</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card flex="1">
            <CardBody>
              <Stat>
                <StatLabel>Average</StatLabel>
                <StatNumber>
                  {Math.trunc(stats?.average_percentage ?? 0)} %
                </StatNumber>
                <StatHelpText>Percentage</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
