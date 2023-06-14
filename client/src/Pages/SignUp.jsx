import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom'
import { axiosPost } from '../Services/AxiosService';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

export default function SignUp() {
  const toast = useToast();
  const toastIdRef = useRef();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    
    email: "",
    password: ""
  })

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:5500/auth/signup', data, {
        headers: { "Content-Type": "application/json" }
      })
      console.log(res)
      if (res.data.error) toastIdRef.current = toast({ description: res.data.error, status: 'error' })
      else {
        toastIdRef.current = toast({ description: "Account created successfully", status: 'success' })
        navigate('/signin')
        // localStorage.setItem("token", res.data.token)
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text"
                    value={data.firstname}
                    onChange={(e) => setData({ ...data, firstname: e.target.value })} />
                </FormControl>
              </Box>
              
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSignUp}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to="/signin" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}