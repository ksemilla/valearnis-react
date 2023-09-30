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
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { LessonsService } from "../../../api/lessons"
import { Loader } from "../../../components"

export default function AdminQuizList() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ["admin", slug, "quizzes"],
    queryFn: async () => {
      return LessonsService.getQuizzes(slug ?? "").then((res) => res.data)
    },
  })

  return isLoading ? (
    <Loader text="Fetching quizzes" />
  ) : data?.length === 0 ? (
    <Box mt="50px">
      <Center>
        <Text fontWeight={500} fontSize="3xl">
          No quizzes yet
        </Text>
      </Center>
    </Box>
  ) : (
    <Box>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((q) => (
              <Tr
                key={q.id}
                cursor="pointer"
                onClick={() => navigate(`${q.id}`)}
              >
                <Td>{q.id}</Td>
                <Td>{q.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
