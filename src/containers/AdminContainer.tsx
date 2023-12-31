import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react"
import { IconShield, IconUsers } from "@tabler/icons-react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { UserRole } from "../types"
import { useEffect } from "react"
import { Loader } from "../components"

const navigation: { label: string; path: string; icon: React.ReactNode }[] = [
  {
    icon: <IconShield />,
    label: "Lessons",
    path: "/admin/lessons",
  },
  {
    icon: <IconUsers />,
    label: "Users",
    path: "/admin/users",
  },
]

export default function AdminContainer() {
  const navigate = useNavigate()
  const authStore = useAuthStore()
  const path = useLocation().pathname

  useEffect(() => {
    if (authStore.user && authStore.user.role !== UserRole.ADMIN) navigate("/")
  }, [authStore.user])

  if (!authStore.user) return <Loader text="Fetching user" />
  if (authStore.user.role !== UserRole.ADMIN)
    return <Loader text="Redirecting" />

  return (
    <Box minH="100vh">
      <Box bg="teal.600" pos="sticky" top="0" zIndex={10}>
        <Flex as="nav" p="10px" align="center" justify="space-between">
          <Box as={Link} to="/">
            <img
              src="https://app.valearnis.com/static/media/logoSolid.7d462550.svg"
              width="200px"
            />
          </Box>

          <HStack align="center">
            <Button as={Link} to="/api-testing" size="xs">
              Go to api testing
            </Button>
            {authStore.user?.role === UserRole.ADMIN && (
              <IconButton
                aria-label="admin-link"
                icon={<IconShield />}
                variant="outline"
                isRound
                onClick={() => navigate("/admin/lessons")}
              />
            )}
            <Menu>
              <MenuButton>
                <Avatar name="John Doe" src="https://bit.ly/dan-abramov" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/quiz-results")}>
                  My Quizzes
                </MenuItem>
                <MenuItem onClick={() => navigate("/my-account")}>
                  My Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("accessToken")
                    authStore.logout()
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
      <Flex>
        <Stack
          w="200px"
          p="10px"
          borderRight="1px"
          borderColor="teal.600"
          position="fixed"
          bottom="0"
          top="68px"
          spacing={2}
        >
          {navigation.map((n) => (
            <HStack
              as={Link}
              to={n.path}
              key={n.path}
              _hover={{
                backgroundColor: "gray.300",
              }}
              backgroundColor={path === n.path ? "gray.200" : ""}
              p="10px"
              borderRadius="md"
            >
              {n.icon} <Text>{n.label}</Text>
            </HStack>
          ))}
        </Stack>
        <Box p="20px" ml="200px" flex="1">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}
