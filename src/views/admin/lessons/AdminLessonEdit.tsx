import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Box, useToast } from "@chakra-ui/react"
import { LessonsService } from "../../../api/lessons"
import { ErrorResponse, Lesson } from "../../../types"
import AdminLessonForm from "./AdminLessonForm"

export default function AdminLessonEdit() {
  const navigate = useNavigate()
  const toast = useToast()
  const { slug } = useParams()
  const { data } = useQuery({
    queryKey: ["lessons", slug],
    queryFn: async () => {
      return LessonsService.getBySlug(slug ?? "").then((res) => res.data)
    },
    enabled: !!slug,
  })

  const mutate = useMutation({
    mutationFn: async (data: Lesson) => {
      return LessonsService.updateLesson(slug ?? "", data).then(
        (res) => res.data
      )
    },
    onSuccess: (res) => {
      navigate(`/admin/lessons/${res.slug}`)
      toast({
        title: "Lesson updated!",
        duration: 5000,
        isClosable: true,
        status: "success",
      })
    },
    onError: (res: ErrorResponse) => {
      toast({
        title: "Lesson update failed",
        description: res.response.data.detail[0].msg,
        duration: 5000,
        isClosable: true,
        status: "error",
      })
    },
  })

  if (!data) {
    return
  }

  return (
    <Box mb="200px">
      <AdminLessonForm onSubmit={mutate.mutate} initialValues={data} />
    </Box>
  )
}
