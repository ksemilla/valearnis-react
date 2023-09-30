import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
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
import {
  FormProvider,
  UseFieldArrayRemove,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form"
import { useState } from "react"
import { Lesson, LessonElement } from "../../../types"

function LessonElementInline(props: {
  lessonElement: LessonElement
  remove: UseFieldArrayRemove
  idx: number
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Lesson>()
  const [imgUrl, setImgUrl] = useState(props.lessonElement.img_url)

  return (
    <Flex _hover={{ background: "gray.100" }} p="10px">
      <Center flex="1" mr={1}>
        {props.lessonElement.type === "text" ? (
          <FormControl isInvalid={!!errors?.lesson_elements?.[props.idx]?.text}>
            <Textarea
              {...register(`lesson_elements.${props.idx}.text`, {
                validate: (val, values) => {
                  return (
                    (values.lesson_elements?.[props.idx].type === "text" &&
                      !!val) ||
                    "This field is required"
                  )
                },
              })}
              placeholder="Text content"
              defaultValue={props.lessonElement.text}
            />
            <FormErrorMessage>
              {errors?.lesson_elements?.[props.idx]?.text?.message}
            </FormErrorMessage>
          </FormControl>
        ) : (
          <Stack>
            <Image src={imgUrl} width="300px" />
            <FormControl
              isInvalid={!!errors?.lesson_elements?.[props.idx]?.img_url}
            >
              <Input
                {...register(`lesson_elements.${props.idx}.img_url`)}
                placeholder="Image URL"
                defaultValue={props.lessonElement.img_url}
                onChange={(e) => setImgUrl(e.target.value)}
              />
              <FormErrorMessage>
                {errors?.lesson_elements?.[props.idx]?.img_url?.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        )}
      </Center>

      <CloseButton onClick={() => props.remove(props.idx)} />
    </Flex>
  )
}

function LessonElementsArray() {
  const { control } = useFormContext<Lesson>()
  const {
    fields: elements,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "lesson_elements",
    keyName: "uuid",
  })

  const [isOpenTextModal, setIsOpenTextModal] = useState(false)
  const [content, setContent] = useState<string>("")
  const [elementType, setElementType] = useState<"text" | "image">("text")

  return (
    <Box>
      <Stack spacing={3}>
        {elements.map((e, i) => (
          <LessonElementInline
            key={e.uuid}
            lessonElement={e}
            remove={remove}
            idx={i}
          />
        ))}
      </Stack>
      <Center>
        <HStack>
          <Button
            onClick={() => {
              setIsOpenTextModal(true)
              setContent("")
              setElementType("text")
            }}
          >
            Add text
          </Button>
          <Button
            onClick={() => {
              setIsOpenTextModal(true)
              setContent("")
              setElementType("image")
            }}
          >
            Add Image
          </Button>
        </HStack>
      </Center>
      <Modal isOpen={isOpenTextModal} onClose={() => setIsOpenTextModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {elementType} element</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {elementType === "text" ? (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
                placeholder="Text content"
              />
            ) : (
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
                placeholder="Image URL"
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => {
                setIsOpenTextModal(false)
                setContent("")
              }}
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                content &&
                  append({
                    type: elementType,
                    display_order: elements.length,
                    text: elementType === "text" ? content : "",
                    img_url: elementType === "image" ? content : "",
                  })
                setIsOpenTextModal(false)
                setContent("")
              }}
            >
              Add Content
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

interface LessonFormProps {
  onSubmit: (data: Lesson) => void
  loading?: boolean
  initialValues?: Lesson
}

export default function AdminLessonForm(props: LessonFormProps) {
  const methods = useForm<Lesson>({
    defaultValues: props.initialValues ?? {},
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => props.onSubmit(data))}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.subtitle}>
            <FormLabel>Subtitle</FormLabel>
            <Input type="text" {...register("subtitle")} />
            <FormErrorMessage>{errors.subtitle?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.img_url}>
            <FormLabel>Image</FormLabel>
            <Textarea {...register("img_url")} />
            <FormErrorMessage>{errors.img_url?.message}</FormErrorMessage>
          </FormControl>
          <Text my="10px" fontSize="3xl" fontWeight={500}>
            Lesson Body
          </Text>
          <Center>
            <Box w="100%" maxW="600px" m="auto">
              <LessonElementsArray />
            </Box>
          </Center>
          <Button
            type="submit"
            isLoading={props.loading}
            isDisabled={props.loading}
            mt={10}
          >
            {props.initialValues ? "Update Lesson" : "Create Lesson"}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
