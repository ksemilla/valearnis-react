import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import { IconShield } from "@tabler/icons-react"
import { UserRole } from "../types"

export default function BaseContainer() {
  const authStore = useAuthStore()
  const navigate = useNavigate()
  return (
    <Box>
      <Box bg="teal.600" pos="sticky" top="0" zIndex={10}>
        <Flex
          as="nav"
          py="10px"
          align="center"
          justify="space-between"
          maxW="1200px"
          m="auto"
        >
          <Box as={Link} to="/">
            <img
              src="https://app.valearnis.com/static/media/logoSolid.7d462550.svg"
              width="200px"
            />
          </Box>
          <HStack align="center">
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
      <Box maxW="1200px" m="auto" p="20px">
        <Outlet />
      </Box>
    </Box>
  )
}
