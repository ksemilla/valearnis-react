import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { LessonsService } from "../../api/lessons"
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react"
import { Choice, Question } from "../../types"
import { useQuizAnswerStore } from "../../stores/quiz"
import { useEffect } from "react"
import { IconCheck, IconX } from "@tabler/icons-react"
import { Loader } from "../../components"

function ChoiceInline(props: {
  choice: Choice
  idx: number
  question: Question
}) {
  const quizAnswerStore = useQuizAnswerStore()
  const isCorrectAnswer = props.choice.is_answer
  const question = quizAnswerStore.items.find(
    (qa) => qa.question.id === props.question.id
  )
  const isChoiceInAnswers = question?.answers
    .map((a) => a.id)
    .includes(props.choice.id)

  return (
    <Flex
      border="2px"
      borderRadius="4px"
      p="10px"
      borderColor={
        isCorrectAnswer && !isChoiceInAnswers ? "green.500" : "transparent"
      }
      bg={
        isCorrectAnswer && isChoiceInAnswers
          ? "green.100"
          : !isCorrectAnswer && isChoiceInAnswers
          ? "red.100"
          : "white"
      }
    >
      <Box mr={3}>{String.fromCharCode(props.idx + 65)}.</Box>
      <Box flex="1">{props.choice.text}</Box>
      <Box>
        {isCorrectAnswer && isChoiceInAnswers && <IconCheck color="green" />}
        {!isCorrectAnswer && isChoiceInAnswers && <IconX color="red" />}
      </Box>
    </Flex>
  )
}

function QuestionInline(props: { question: Question; questionIdx: number }) {
  return (
    <Flex>
      <Box mr={3}>{props.questionIdx + 1}.</Box>
      <Box flex="1">
        <Text>{props.question.text}</Text>
        <Stack spacing={2}>
          {props.question.choices.map((c, i) => (
            <ChoiceInline
              key={i}
              choice={c}
              idx={i}
              question={props.question}
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}

export default function QuizAnswerDetail() {
  const quizAnswerStore = useQuizAnswerStore()
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ["quiz-results", id],
    queryFn: async () => {
      return LessonsService.getQuizAnswer(parseInt(id ?? "")).then(
        (res) => res.data
      )
    },
  })

  useEffect(() => {
    data && quizAnswerStore.setItems(data.quiz_items)
  }, [data])

  return isLoading ? (
    <Loader text="Fetching result" />
  ) : (
    <Box maxW="600px" m="auto">
      <Box ml={5} mb={5}>
        <Heading>{data?.quiz.name}</Heading>
        <Text fontWeight={500} fontSize="larger">
          {data?.total} / {data?.total_items} (
          {Math.trunc(((data?.total ?? 0) / (data?.total_items ?? 0)) * 100)} %)
        </Text>
      </Box>
      <Stack spacing={10}>
        {data?.quiz.questions.map((q, i) => (
          <QuestionInline key={i} question={q} questionIdx={i} />
        ))}
      </Stack>
    </Box>
  )
}
