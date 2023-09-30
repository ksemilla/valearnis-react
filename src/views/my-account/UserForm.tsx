import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { User } from "../../types"
import { UserRoleChoices } from "../../const"
import { useEffect } from "react"

interface UserFormProps {
  onSubmit: (data: User) => void
  loading?: boolean
  initialValues?: User
}

export default function UserForm(props: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: props.initialValues ?? {},
  })

  useEffect(() => {
    props.initialValues && reset(props.initialValues)
  }, [props.initialValues])

  return (
    <form onSubmit={handleSubmit((data) => props.onSubmit(data))}>
      <Stack spacing={3}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Role</FormLabel>
          <Select {...register("role")}>
            {UserRoleChoices.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          isLoading={props.loading}
          disabled={props.loading}
        >
          Update
        </Button>
      </Stack>
    </form>
  )
}
