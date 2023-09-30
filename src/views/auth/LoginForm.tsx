import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Credentials } from "../../types"

export default function LoginForm(props: {
  onSubmit: (data: Credentials) => void
  loading?: boolean
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>()

  return (
    <form onSubmit={handleSubmit((data) => props.onSubmit(data))}>
      <Stack spacing={3}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", {
              required: "Enter password",
              minLength: {
                value: 4,
                message: "Minimum length of 4",
              },
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={props.loading}
          isDisabled={props.loading}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  )
}
