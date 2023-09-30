import { Box, Button, HStack } from "@chakra-ui/react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

export default function AdminQuizzesContainer() {
  const { slug } = useParams()
  const [_, quizResource, quizSub] = useLocation()
    .pathname.split("/")
    .slice(3, 6)

  return (
    <Box>
      <HStack>
        <Button
          as={Link}
          to={`/admin/lessons/${slug}`}
          backgroundColor={!quizResource && !quizSub ? "gray.300" : "gray.100"}
        >
          Back to {slug}
        </Button>
        <Button
          as={Link}
          to={`/admin/lessons/${slug}/quizzes`}
          backgroundColor={quizResource && !quizSub ? "gray.300" : "gray.100"}
        >
          Quizzes
        </Button>
        <Button
          as={Link}
          to={`/admin/lessons/${slug}/quizzes/create`}
          backgroundColor={quizSub === "create" ? "gray.300" : "gray.100"}
        >
          Create Quiz
        </Button>
      </HStack>
      <Outlet />
    </Box>
  )
}
