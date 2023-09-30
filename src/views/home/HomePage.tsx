import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { LessonsService } from "../../api/lessons"
import { IconPhoto } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../components"

export default function HomePage() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return LessonsService.list().then((res) => res.data)
    },
  })

  return isLoading ? (
    <Loader text="Fetching lessons" />
  ) : data?.length === 0 ? (
    <Center>
      <Text fontWeight={500} fontSize="xl" mt="50px">
        There's no lessons added yet.
      </Text>
    </Center>
  ) : (
    <Box>
      <Center mb={10}>
        <Heading>Lessons</Heading>
      </Center>
      <Grid templateColumns="repeat(4, 1fr)" gap={3}>
        {data?.map((l) => (
          <GridItem key={l.id}>
            <Card
              cursor="pointer"
              _hover={{ backgroundColor: "gray.50" }}
              onClick={() => navigate(`/${l.slug}`)}
            >
              <CardBody>
                <Center>
                  {l.img_url ? (
                    <Image
                      src={l.img_url}
                      fallbackSrc="https://via.placeholder.com/150"
                      h="200px"
                    />
                  ) : (
                    <IconPhoto size="200px" color="gray" />
                  )}
                </Center>
              </CardBody>
              <CardHeader>
                <Center>
                  <Heading size="md">{l.name}</Heading>
                </Center>
              </CardHeader>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
