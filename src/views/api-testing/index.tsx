import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ApiService } from "../../api/BaseService"
import { JsonView, defaultStyles } from "react-json-view-lite"
import "react-json-view-lite/dist/index.css"

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0fQ.jWZVxYKD4dg9P8UHk6_TfbiNbMwhx-spi0ooDf0lTvc"
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMH0.jzQFIVkQbIomdoyniLuJHHsQAGxaqbn0qbE9kv8f7XY"

// const adminToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.MYpIw7_Rjj1jNwSGS4brp0oFVXCBYVfUT-pIvUqIm9M"
// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyfQ.gHO35TGi4qWYaygCEz-A7edC8dsjW-Z-IKa0whst3y0"
const dummyToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozfQ.XlBbYBYfERrZyjFCXSYIvzxveKVtaGiQLdoq9iS53GI"

const items: {
  label: string
  description: string
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
    label: "Login Admin: Success",
    description: "Api will respond with access token",
    func: ApiService.post,
    data: {
      email: "admin@admin.com",
      password: "admin",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "Login User: Success",
    description: "Api will respond with access token",
    func: ApiService.post,
    data: {
      email: "test@test.com",
      password: "test",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "Login Wrong Password: Fail",
    description: "Wrong password",
    func: ApiService.post,
    data: {
      email: "admin@admin.com",
      password: "admin1",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "Login Wrong Email: Fail",
    description: "Wrong email",
    func: ApiService.post,
    data: {
      email: "admin1@admin.com",
      password: "admin",
    },
    path: `auth/`,
    config: {},
  },
  {
    label: "View lesson list: Success",
    description: "List of lessons",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `lessons/`,
  },
  {
    label: "Unauthorized View lesson list: Fail",
    description: "Wrong token",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken + "x"}`,
      },
    },
    path: `lessons/`,
  },
  {
    label: "View a lesson: Success",
    description: "Get lesson detail",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `lessons/testaasd/`,
  },
  {
    label: "View lesson's quizzes as admin: Success",
    description: "Get quizzes related to lesson",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    },
    path: `lessons/testaasd/quizzes/`,
  },
  {
    label: "View lesson's quizzes as user: Fail",
    description: "This endpoint shows the correct answer. Only admins can view",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `lessons/testaasd/quizzes/`,
  },
  {
    label: "Submit a quiz: Success",
    description: "Submit answers to quiz",
    func: ApiService.post,
    data: {
      quiz_items: [
        {
          question: { id: 28, text: "test", type: "mmc" },
          answers: [{ id: 78, text: "test" }],
        },
      ],
    },
    path: `lessons/testaasd/quizzes/9/submit/`,
    config: {
      headers: {
        Authorization: `Bearer ${dummyToken}`,
      },
    },
  },
  {
    label: "Submit a quiz: Fail",
    description:
      "Submit answers to quiz but one of the questions doesn't have an answer",
    func: ApiService.post,
    data: {
      quiz_items: [
        {
          question: { id: 28, text: "test", type: "mmc" },
          answers: [],
        },
      ],
    },
    path: `lessons/testaasd/quizzes/9/submit/`,
    config: {
      headers: {
        Authorization: `Bearer ${dummyToken}`,
      },
    },
  },
  {
    label: "View quiz result list: Success",
    description: "Submit answers to quiz",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `users/4/quiz-answers/`,
  },
  {
    label: "View a quiz result: Success",
    description: "Submit answers to quiz",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `quiz-answers/114/`,
  },
  {
    label: "Get user stats: Success",
    description: "Submit answers to quiz",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `users/4/stats/`,
  },
  {
    label: "Get user list as admin: Success",
    description: "Submit answers to quiz",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    },
    path: `users`,
  },
  {
    label: "Get user list as user: Fail",
    description: "Submit answers to quiz",
    func: ApiService.get,
    data: {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
    path: `users`,
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
                <Text>Description: {dataDesc}</Text>
                <Box flex="1" overflow="scroll">
                  {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                  <JsonView
                    data={data}
                    shouldExpandNode={(level) => level < 5}
                    style={defaultStyles}
                  />
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
                      {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
                      <JsonView
                        data={response}
                        shouldExpandNode={(level) => level < 3}
                        style={defaultStyles}
                      />
                    </Box>
                  ) : (
                    // <pre>{JSON.stringify(detail, null, 2)}</pre>
                    <JsonView
                      data={detail}
                      shouldExpandNode={(level) => level < 3}
                      style={defaultStyles}
                    />
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
