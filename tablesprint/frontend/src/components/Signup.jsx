import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/Context'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { signup } = useContext(AuthContext)
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(name,email,password);
      const response = await axios.post('/api/v1/auth/signup', { name, email, password })
      signup(response.data)
      navigate('/dashboard')
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.response?.data?.message || 'Unable to create account.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8} border={2} p={5} borderRadius="md..base" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Heading>Sign Up</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Sign Up
          </Button>
        </form>
        <Text>
          Already have an account?{' '}
          <Link color="blue.500" href="/login">
            Log in
          </Link>
        </Text>
      </VStack>
    </Box>
  )
}

export default Signup
