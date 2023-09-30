import { Box, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { ErrorResponse, Lesson } from "../../../types"
import { LessonsService } from "../../../api/lessons"
import AdminLessonForm from "./AdminLessonForm"

export default function AdminLessonCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const mutate = useMutation({
    mutationFn: async (data: Lesson) => {
      return LessonsService.createLesson(data).then((res) => res.data)
    },
    onSuccess: (lesson) => {
      navigate(`/admin/lessons/${lesson.slug}`)
      toast({
        title: "Lesson created",
        duration: 5000,
        isClosable: true,
        status: "success",
      })
    },
    onError: (res: ErrorResponse) => {
      toast({
        title: "Lesson creation failed",
        description: res.response.data.detail[0].msg,
        duration: 5000,
        isClosable: true,
        status: "error",
      })
    },
  })

  return (
    <Box>
      <AdminLessonForm onSubmit={mutate.mutate} />
    </Box>
  )
}
