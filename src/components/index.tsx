import { Center, CircularProgress, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const Loader = (props: { text: string }) => {
  const [showProgress, setShowProgress] = useState(true)

  useEffect(() => {
    // Define a function to execute after 5 seconds
    const delayedFunction = () => {
      setShowProgress(false)
    }

    // Set a timeout to call the delayed function after 5 seconds
    const timeoutId = setTimeout(delayedFunction, 5000)

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Center mt="4rem">
      <Stack align="center" spacing={5}>
        <CircularProgress isIndeterminate />
        {showProgress ? (
          <Text fontWeight={500}>{props.text}</Text>
        ) : (
          <Text>This is taking too long. Try refreshing.</Text>
        )}
      </Stack>
    </Center>
  )
}
