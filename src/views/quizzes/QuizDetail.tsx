import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { LessonsService } from "../../api/lessons"
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { Choice, Question, ErrorResponse, QuestionType } from "../../types"
import { useEffect, useState } from "react"
import { useQuizAnswerStore } from "../../stores/quiz"

function ChoiceInline(props: {
  choice: Choice
  idx: number
  question: Question
  answers: Choice[]
}) {
  const quizAnswerStore = useQuizAnswerStore()
  return (
    <HStack
      border="2px"
      borderRadius="4px"
      p="10px"
      _hover={{ backgroundColor: "gray.100" }}
      cursor="pointer"
      borderColor={
        props.answers.map((a) => a.id).includes(props.choice.id)
          ? "blue.500"
          : "transparent"
      }
      onClick={() =>
        quizAnswerStore.applyAnswer(
          props.question,
          props.question.type,
          props.choice
        )
      }
    >
      <Box>{String.fromCharCode(props.idx + 65)}.</Box>
      <Box>{props.choice.text}</Box>
    </HStack>
  )
}

function QuestionInline(props: { question: Question; idx: number }) {
  const quizAnswerStore = useQuizAnswerStore()

  return (
    <Flex>
      <Box mr="10px" fontWeight={500}>
        {props.idx + 1}.
      </Box>
      <Box flex="1">
        <Text fontWeight={500}>{props.question.text}</Text>
        <Badge colorScheme="purple" variant="outline">
          {props.question.type === QuestionType.SINGLE_MUTIPLE_CHOICE
            ? "Single"
            : "Multi"}
        </Badge>
        <Stack spacing={2}>
          {props.question.choices.map((c, i) => (
            <ChoiceInline
              key={c.id}
              choice={c}
              idx={i}
              question={props.question}
              answers={
                quizAnswerStore.items.find(
                  (i) => i.question.id === props.question.id
                )?.answers ?? []
              }
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}

export default function QuizDetail() {
  const [isOpen, setIsOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [quizAnswerId, setQuizAnswerId] = useState(0)
  const quizAnswerStore = useQuizAnswerStore()
  const navigate = useNavigate()
  const toast = useToast()
  const { id, slug } = useParams()
  const { data } = useQuery({
    queryKey: ["quizzes", "public", id],
    queryFn: async () => {
      return LessonsService.getPublicQuiz(slug ?? "", parseInt(id ?? "")).then(
        (res) => res.data
      )
    },
  })

  useEffect(() => {
    if (data) {
      quizAnswerStore.setItems(
        data.questions.map((q) => ({
          question: q,
          answers: [],
        }))
      )
    }
  }, [data])

  const mutate = useMutation({
    mutationFn: async (quizItems: any) => {
      return LessonsService.submitPublicQuiz(slug ?? "", parseInt(id ?? ""), {
        quiz_items: quizItems,
      }).then((res) => res.data)
    },
    onSuccess: (res) => {
      setQuizAnswerId(res.quiz_answer_id)
      setTotal(res.total)
      setNumberOfItems(res.total_items)
      setIsOpen(true)
    },
    onError: (res: ErrorResponse) => {
      toast({
        title: "Failed to submit answers",
        description: (
          <div>
            {res.response.data.detail.map((message, i) => (
              <ul key={i}>
                <li>
                  {message.loc?.[2] === "quiz_items" &&
                  typeof message.loc?.[3] === "number"
                    ? `Item ${message.loc?.[3] + 1} - `
                    : ""}{" "}
                  {message.msg}
                </li>
              </ul>
            ))}
          </div>
        ),
        duration: 10000,
        isClosable: true,
        status: "error",
      })
    },
  })

  return (
    <Box maxW="600px" m="auto">
      <Box ml={5} mb={5}>
        <Heading>{data?.name}</Heading>
      </Box>
      <Stack spacing={10}>
        {data?.questions.map((q, i) => (
          <QuestionInline key={q.id} question={q} idx={i} />
        ))}
      </Stack>
      <Center my="30px">
        <Button
          type="button"
          onClick={() => mutate.mutate(quizAnswerStore.items)}
        >
          Submit
        </Button>
      </Center>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quiz Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              {total} / {numberOfItems}
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => navigate(`/quiz-results/${quizAnswerId}`)}
            >
              View Results
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsOpen(false)
                quizAnswerStore.reset()
              }}
            >
              Retake Quiz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
