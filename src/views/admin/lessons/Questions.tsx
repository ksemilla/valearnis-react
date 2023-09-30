import {
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import { IconCheck, IconPointFilled } from "@tabler/icons-react"
import { QuestionType, Quiz } from "../../../types"

function ChoiceItem(props: {
  questionIdx: number
  choiceIdx: number
  remove: UseFieldArrayRemove
  choicesLength: number
}) {
  const { register, setValue, watch, getValues } = useFormContext<Quiz>()
  const questionType = getValues(`questions.${props.questionIdx}.type`)

  const isAnswer = watch(
    `questions.${props.questionIdx}.choices.${props.choiceIdx}.is_answer`
  )

  const setAnswer = () => {
    if (questionType === QuestionType.MULTI_MULTIPLE_CHOICE) {
      setValue(
        `questions.${props.questionIdx}.choices.${props.choiceIdx}.is_answer`,
        !isAnswer
      )
    } else {
      ;[...Array(props.choicesLength)].forEach((_, i) => {
        if (i !== props.choiceIdx) {
          setValue(
            `questions.${props.questionIdx}.choices.${i}.is_answer`,
            false
          )
        } else {
          setValue(
            `questions.${props.questionIdx}.choices.${i}.is_answer`,
            true
          )
        }
      })
    }
  }

  return (
    <HStack>
      <InputGroup borderColor={isAnswer ? "green.400" : ""}>
        <InputLeftElement>
          {String.fromCharCode(props.choiceIdx + 65)}
        </InputLeftElement>
        <Input
          type="text"
          {...register(
            `questions.${props.questionIdx}.choices.${props.choiceIdx}.text`,
            {
              required: "Text is required",
            }
          )}
        />
        <InputRightElement
          cursor="pointer"
          _hover={{ color: "blue" }}
          onClick={() => setAnswer()}
        >
          {isAnswer ? (
            <IconCheck color="green" />
          ) : (
            <IconPointFilled color="green" />
          )}
        </InputRightElement>
      </InputGroup>
      <CloseButton onClick={() => props.remove(props.choiceIdx)} />
    </HStack>
  )
}

function Choices(props: { questionIdx: number }) {
  const { control, watch } = useFormContext<Quiz>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${props.questionIdx}.choices`,
    keyName: "uuid",
  })
  const question = watch(`questions.${props.questionIdx}`)

  return (
    <Box mt={2}>
      <Box fontWeight={500} fontSize="sm" whiteSpace="nowrap">
        <HStack>
          <Badge colorScheme="purple" variant="outline">
            {question.type === QuestionType.SINGLE_MUTIPLE_CHOICE
              ? "Single"
              : "Multi"}
          </Badge>
          <HStack spacing={0}>
            <Text>Click on the dot</Text> <IconPointFilled />{" "}
            <Text>to set (or unset) as an answer</Text>
          </HStack>
        </HStack>
      </Box>
      <Stack spacing={1}>
        {fields.map((c, i) => (
          <ChoiceItem
            key={c.uuid}
            questionIdx={props.questionIdx}
            choiceIdx={i}
            remove={remove}
            choicesLength={fields.length}
          />
        ))}
      </Stack>
      <Button
        onClick={() =>
          append({
            text: "",
            is_answer: false,
          })
        }
        my="5px"
        size="xs"
      >
        Add choice
      </Button>
    </Box>
  )
}

function Question(props: { idx: number; remove: UseFieldArrayRemove }) {
  const { register } = useFormContext<Quiz>()
  return (
    <Flex>
      <Box mr={3}>{props.idx + 1}.</Box>
      <Box flex="1">
        <Textarea
          {...register(`questions.${props.idx}.text`, {
            required: "Text is required",
          })}
        />
        <Choices questionIdx={props.idx} />
      </Box>
      <CloseButton onClick={() => props.remove(props.idx)} />
    </Flex>
  )
}

export default function Questions() {
  const [isOpen, setIsOpen] = useState(false)
  const { control } = useFormContext<Quiz>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
    keyName: "uuid",
  })
  const [text, setText] = useState("")
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SINGLE_MUTIPLE_CHOICE
  )

  return (
    <Box>
      <Text my="10px" fontSize="3xl" fontWeight={500}>
        Questions
      </Text>
      <Stack spacing={3}>
        {fields.map((q, i) => (
          <Question key={q.uuid} idx={i} remove={remove} />
        ))}
      </Stack>
      <HStack my="10px">
        <Button
          onClick={() => {
            setIsOpen(true)
            setQuestionType(QuestionType.SINGLE_MUTIPLE_CHOICE)
          }}
        >
          Add Single Multiple Choice
        </Button>
        <Button
          onClick={() => {
            setIsOpen(true)
            setQuestionType(QuestionType.MULTI_MULTIPLE_CHOICE)
          }}
        >
          Add Multi Multiple Choice
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {questionType === QuestionType.SINGLE_MUTIPLE_CHOICE
                ? "Single Multiple Question"
                : "Multi Multiple Question"}
            </Text>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Write question"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                setIsOpen(false)
                setText("")
              }}
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsOpen(false)
                append({
                  text,
                  type: questionType,
                  choices: [],
                })
                setText("")
              }}
            >
              Add question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
