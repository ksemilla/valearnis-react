import {
  Box,
  Button,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { LessonsService } from "../../../api/lessons"
import { Loader } from "../../../components"

export default function AdminLessonList() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return LessonsService.list().then((res) => res.data)
    },
  })

  return isLoading ? (
    <Loader text="Fetching lessons" />
  ) : data?.length === 0 ? (
    <Center>
      <Button as={Link} to="create">
        Create a Lesson
      </Button>
    </Center>
  ) : (
    <Box>
      <Button as={Link} to="create">
        Create Lesson
      </Button>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Slug</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((u) => (
              <Tr
                key={u.id}
                cursor="pointer"
                onClick={() => navigate(`${u.slug}`)}
              >
                <Td>{u.id}</Td>
                <Td>{u.name}</Td>
                <Td>{u.slug}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
