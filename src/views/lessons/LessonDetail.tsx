import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { LessonsService } from "../../api/lessons"
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"
import { LessonElement } from "../../types"
import { Loader } from "../../components"

function LessonElementInline(props: { lessonElement: LessonElement }) {
  return (
    <Center>
      {props.lessonElement.type === "text" ? (
        <Text>{props.lessonElement.text}</Text>
      ) : (
        <Image src={props.lessonElement.img_url} h="300px" />
      )}
    </Center>
  )
}

export default function LessonPublicDetail() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ["lessons", slug],
    queryFn: async () => {
      return LessonsService.getBySlug(slug ?? "").then((res) => res.data)
    },
  })

  return isLoading ? (
    <Loader text="Fetching Lesson" />
  ) : (
    <Box maxW="600px" m="auto">
      <Flex mb="40px" justify="space-between">
        <Box>
          <Heading>{data?.name}</Heading>
          <Text fontWeight={500}>{data?.subtitle}</Text>
        </Box>
        {data?.quizzes.length !== 0 && (
          <Box>
            <Button as="a" href="#quizzes">
              View quizzes
            </Button>
          </Box>
        )}
      </Flex>
      <Stack spacing={5}>
        {data?.lesson_elements.map((l) => (
          <LessonElementInline key={l.id} lessonElement={l} />
        ))}
      </Stack>
      {data?.quizzes.length !== 0 && (
        <>
          <Divider my="30px" />
          <Center my="20px" id="quizzes">
            <Stack spacing={5} w="100%">
              <Center>
                <Heading fontSize="3xl">Take a quiz</Heading>
              </Center>
              <Stack>
                {data?.quizzes.map((q) => (
                  <Card
                    key={q.id}
                    onClick={() => navigate(`${q.id}`)}
                    cursor="pointer"
                    _hover={{ backgroundColor: "gray.50" }}
                  >
                    <CardBody>
                      <Heading size="lg">{q.name}</Heading>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Center>
        </>
      )}
    </Box>
  )
}
