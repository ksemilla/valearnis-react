import { useQuery } from "@tanstack/react-query"
import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { UsersService } from "../../api"
import { useAuthStore } from "../../stores/auth"
import { Loader } from "../../components"

export default function QuizAnswerList() {
  const authStore = useAuthStore()
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["my-quiz-results"],
    queryFn: async () => {
      return UsersService.getQuizAnswers(authStore.userId).then(
        (res) => res.data
      )
    },
    enabled: !!authStore.userId,
  })

  return isLoading ? (
    <Loader text="Fetching quiz answers" />
  ) : data?.length === 0 ? (
    <Center>
      <Text fontWeight={500} fontSize="xl" mt="50px">
        Take a quiz first.
      </Text>
    </Center>
  ) : (
    <Box>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Score</Th>
              <Th>Percentage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((u) => (
              <Tr
                key={u.id}
                cursor="pointer"
                onClick={() => navigate(`${u.id}`)}
              >
                <Td>{u.id}</Td>
                <Td>{u.quiz.name}</Td>
                <Td>
                  {u.total} / {u.total_items}
                </Td>
                <Td>{Math.trunc(u.percentage)} %</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
