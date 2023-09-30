import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { UsersService } from "../../../api"
import { Loader } from "../../../components"

export default function UserList() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return UsersService.list().then((res) => res.data)
    },
  })

  return isLoading ? (
    <Loader text="Fetching users" />
  ) : (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Name</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((u) => (
            <Tr key={u.id} cursor="pointer" onClick={() => navigate(`${u.id}`)}>
              <Td>{u.id}</Td>
              <Td>{u.email}</Td>
              <Td>{u.name}</Td>
              <Td>{u.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
