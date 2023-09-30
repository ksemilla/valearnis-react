import { Box, Button, HStack } from "@chakra-ui/react"
import { Link, Outlet, useParams } from "react-router-dom"

export default function AdminQuizzesContainer() {
  const { slug } = useParams()

  return (
    <Box>
      <HStack>
        <Button as={Link} to={`/admin/lessons/${slug}`}>
          Back to {slug}
        </Button>
        <Button as={Link} to={`/admin/lessons/${slug}/quizzes`}>
          Quizzes
        </Button>
        <Button as={Link} to={`/admin/lessons/${slug}/quizzes/create`}>
          Create Quiz
        </Button>
      </HStack>
      <Outlet />
    </Box>
  )
}
