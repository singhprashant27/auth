import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate()

  const handleSignIn = async () => {
    try {
      const res = await axios.post('http://localhost:5500/auth/login', data, {
        headers: { "Content-Type": "application/json" }
      })
      console.log(res)
      if (res.data.error) toastIdRef.current = toast({ description: res.data.error, status: 'error' })
      else {
        toastIdRef.current = toast({ description: "Logged in successfully", status: 'success' })
        navigate('/')
        if (res.data.token)
          localStorage.setItem("token", res.data.token)
      }
    } catch (err) {
      toastIdRef.current = toast({ description: err.message, status: 'error' })
    }
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </FormControl>
            <Stack spacing={3}>
              <Button
                onClick={handleSignIn}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
            <Stack>
              <Text align={'center'}>
                Don't have an account? <Link to="/signup" color={'blue.400'}>Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}