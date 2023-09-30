import { useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { ErrorResponse, Quiz } from "../../../types"
import { LessonsService } from "../../../api/lessons"
import AdminQuizForm from "./AdminQuizForm"
import { useToast } from "@chakra-ui/react"

export default function AdminQuizCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const { slug } = useParams()
  const mutate = useMutation({
    mutationFn: async (data: Quiz) => {
      return LessonsService.createQuiz(slug ?? "", data).then((res) => res.data)
    },
    onSuccess: (quiz) => {
      navigate(`/admin/lessons/${slug}/quizzes/${quiz.id}`)
      toast({
        title: "Quiz created!",
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

  return <AdminQuizForm onSubmit={mutate.mutate} loading={mutate.isLoading} />
}
