import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { LessonsService } from "../../../api/lessons"
import { ErrorResponse, Quiz } from "../../../types"
import AdminQuizForm from "./AdminQuizForm"
import { Loader } from "../../../components"
import { useToast } from "@chakra-ui/react"

export default function AdminQuizDetail() {
  const { id, slug } = useParams()
  const toast = useToast()
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "quizzes", id],
    queryFn: async () => {
      return LessonsService.getQuiz(slug ?? "", parseInt(id ?? "")).then(
        (res) => res.data
      )
    },
  })

  const mutate = useMutation({
    mutationFn: async (data: Quiz) => {
      return LessonsService.updateQuiz(
        slug ?? "",
        parseInt(id ?? ""),
        data
      ).then((res) => res.data)
    },
    onSuccess: () => {
      toast({
        title: "Quiz updated!",
        duration: 5000,
        isClosable: true,
        status: "success",
      })
    },
    onError: (res: ErrorResponse) => {
      toast({
        title: "Failed to create quiz",
        description: (
          <div>
            {res.response.data.detail.map((message, i) => (
              <ul key={i}>
                <li>
                  {message.loc?.[2] === "questions" &&
                  typeof message.loc?.[3] === "number"
                    ? `Question ${message.loc?.[3] + 1} - `
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

  return isLoading ? (
    <Loader text="Fetching quiz" />
  ) : (
    <AdminQuizForm
      onSubmit={mutate.mutate}
      initialValues={data}
      loading={isLoading}
    />
  )
}
