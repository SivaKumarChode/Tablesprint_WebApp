import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
  useToast
} from '@chakra-ui/react'
import { AuthContext } from '../Context/Context'
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  let toast=useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
   
      login(user);
      
      // Navigate to dashboard
      navigate('/dashboard');
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      // You might want to show an error message to the user here
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "An error occurred during login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  
  return (
    
    <Box maxWidth="400px" margin="auto" mt={8} border={2} p={5} borderRadius="md..base" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Sign In
          </Button>
        </form>
        <Text textAlign="center">
          Don't have an account?{' '}
          <Link color="blue.500" href="/signup">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Box>
  )
}

export default Login
