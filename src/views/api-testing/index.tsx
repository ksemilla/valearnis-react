import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { AuthService } from "../../api"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const items: {
  label: string
  description: string
  res: boolean
  func: (data: any) => Promise<AxiosResponse<any, any>>
  data: any
}[] = [
  {
    label: "Login Success",
    description: "Api will respond with access token",
    res: true,
    func: AuthService.login,
    data: {
      email: "admin@admin.com",
      password: "admin",
    },
  },
  {
    label: "Login Fail 1",
    description: "Wrong password",
    res: true,
    func: AuthService.login,
    data: {
      email: "admin@admin.com",
      password: "admin1",
    },
  },
  {
    label: "Login Fail 2",
    description: "Wrong email",
    res: true,
    func: AuthService.login,
    data: {
      email: "admin1@admin.com",
      password: "admin",
    },
  },
]
export default function ApiTesting() {
  const [data, setData] = useState<any>()
  const [dataDesc, setDataDesc] = useState("")
  const [response, setResponse] = useState<any>()

  return (
    <Box>
      <Box h="40px" p="5px">
        <Button as={Link} to="/" size="sm">
          Go to app
        </Button>
      </Box>
      <div
        style={{
          height: "calc(100vh - 40px)",
          border: "1px solid",
          maxWidth: "100wh",
        }}
      >
        <Flex h="100%">
          <Box p="10px" borderRight="1px" flex="1" maxW="50%">
            <Flex gap={3} wrap="wrap">
              {items.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => {
                    setData(item.data)
                    setDataDesc(item.description)
                    item
                      .func(item.data)
                      .then((res) => setResponse(res.data))
                      .catch((res) => setResponse(res.response))
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Flex>
          </Box>
          <Box maxH="100%" flex="1" maxW="50%">
            <Flex direction="column" h="100%" w="100%">
              <Flex
                flex="1"
                borderBottom="1px"
                p="10px"
                h="50%"
                direction="column"
              >
                <Text>Data sent</Text>
                <Text>{dataDesc}</Text>
                <Box flex="1" overflow="scroll">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </Box>
              </Flex>
              <Flex flex="1" p="10px" direction="column" maxH="50%">
                <Text>Response</Text>
                <Box flex="1" overflow="scroll">
                  <pre>{JSON.stringify(response, null, 2)}</pre>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </div>
    </Box>
  )
}
