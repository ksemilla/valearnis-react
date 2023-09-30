import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { FormProvider, useForm } from "react-hook-form"
import { Quiz } from "../../../types"
import Questions from "./Questions"

export default function AdminQuizForm(props: {
  onSubmit: (data: Quiz) => void
  initialValues?: Quiz
  loading?: boolean
}) {
  const methods = useForm<Quiz>({
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
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Questions />
        <Divider my="10px" />
        <Button
          type="submit"
          isLoading={props.loading}
          isDisabled={props.loading}
        >
          {props.initialValues ? "Update" : "Create"} Quiz
        </Button>
      </form>
    </FormProvider>
  )
}
