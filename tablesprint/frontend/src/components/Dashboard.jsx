import React, { useContext } from 'react'
import { Box, Flex, Spacer, Avatar, useDisclosure, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, Text, Button, Link } from '@chakra-ui/react'
import { AuthContext } from '../Context/Context'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { FaHome, FaList, FaLayerGroup, FaBox } from 'react-icons/fa'

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Flex direction="column">
      {/* Top Navbar */}
      <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="green.100" paddingBlock={5} border={2} borderColor="green.200" borderRadius={10} boxShadow="md.">
        <Flex align="center" mr={5}>
          <i className="fa-solid fa-at"></i>
        </Flex>
        <Spacer />
        <Box>
          <Avatar name={user?.name} src={user?.avatar} onClick={onOpen} cursor="pointer" />
        </Box>
      </Flex>

      <Flex>
        {/* Vertical Menu */}
        <Box width="250px" bg="gray.100" minHeight="calc(100vh - 80px)" p={4}>
          <VStack spacing={4} align="stretch">
            <Link as={RouterLink} to="/dashboard" _hover={{ textDecoration: 'none' }}>
              <HStack>
                <FaHome />
                <Text>Dashboard</Text>
              </HStack>
            </Link>
            <Link as={RouterLink} to="/categories" _hover={{ textDecoration: 'none' }}>
              <HStack>
                <FaList />
                <Text>Category</Text>
              </HStack>
            </Link>
            <Link as={RouterLink} to="/subcategory" _hover={{ textDecoration: 'none' }}>
              <HStack>
                <FaLayerGroup />
                <Text>Subcategory</Text>
              </HStack>
            </Link>
            <Link as={RouterLink} to="/products" _hover={{ textDecoration: 'none' }}>
              <HStack>
                <FaBox />
                <Text>Products</Text>
              </HStack>
            </Link>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={5}>
          <Text fontSize="2xl" fontWeight="bold">Welcome to your Dashboard</Text>
          {/* Add more dashboard components here */}
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader>Logout</ModalHeader>
          <Text>Are you sure you want to logout?</Text>
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="xl" textAlign="center">{user?.name}</Text>
              <Text textAlign="center">{user?.email}</Text>
              <HStack>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button colorScheme="green" variant="solid" onClick={handleLogout}>Confirm</Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Dashboard
