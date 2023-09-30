import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ApiService } from "../../api/BaseService"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.jWZVxYKD4dg9P8UHk6_TfbiNbMwhx-spi0ooDf0lTvc"

const items: {
  label: string
  description: string
  res: boolean
  func: (
    path: string,
    data: any,
    config: AxiosRequestConfig<any>
  ) => Promise<AxiosResponse<any, any>>
  path: string
  data: any
  config?: any
}[] = [
  {
    label: "Login Success - Admin",
    description: "Api will respond with access token",
    res: true,
    func: ApiService.post,
    data: {
      email: "admin@admin.com",
      password: "admin",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "Login Success - User",
    description: "Api will respond with access token",
    res: true,
    func: ApiService.post,
    data: {
      email: "test@test.com",
      password: "test",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "Login Fail 1",
    description: "Wrong password",
    res: true,
    func: ApiService.post,
    data: {
      email: "admin@admin.com",
      password: "admin1",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "Login Fail 2",
    description: "Wrong email",
    res: true,
    func: ApiService.post,
    data: {
      email: "admin1@admin.com",
      password: "admin",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "View lesson list Success",
    description: "Wrong email",
    res: true,
    func: ApiService.get,
    data: {},
    path: `lessons/`,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
]
export default function ApiTesting() {
  const [data, setData] = useState<any>()
  const [dataDesc, setDataDesc] = useState("")
  const [response, setResponse] = useState<any>()
  const [statusCode, setStatusCode] = useState<number>()
  const [detail, setDetail] = useState<any>()
  const [viewRawResponse, setViewRawResponse] = useState(false)

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
                      .func(item.path, item.data, item.config)
                      .then((res) => {
                        setResponse(res.data)
                        setStatusCode(res.status)
                        setDetail(res)
                      })
                      .catch((res) => {
                        setResponse(res.response.data)
                        setDetail(res.response)
                        setStatusCode(res.response.status)
                      })
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
                gap={1}
              >
                <Text>Data sent</Text>
                <Text>{dataDesc}</Text>
                <Box flex="1" overflow="scroll">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </Box>
              </Flex>
              <Flex flex="1" p="10px" direction="column" maxH="50%" gap={1}>
                <HStack>
                  <Button size="xs" onClick={() => setViewRawResponse(false)}>
                    View Response Detail
                  </Button>
                  <Button size="xs" onClick={() => setViewRawResponse(true)}>
                    View Raw Response
                  </Button>
                </HStack>
                <Box flex="1" overflow="scroll">
                  {!viewRawResponse ? (
                    <Box>
                      <Text>Status Code: {statusCode}</Text>
                      <pre>{JSON.stringify(response, null, 2)}</pre>
                    </Box>
                  ) : (
                    <pre>{JSON.stringify(detail, null, 2)}</pre>
                  )}
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </div>
    </Box>
  )
}
