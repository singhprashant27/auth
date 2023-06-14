import {
    Button,
    Flex,
    FormControl,
    Heading,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
    Text,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

export default function Profile() {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const getUserDetails = async () => {
       
        try {
            const res = await axios.get('http://localhost:5500/auth/me', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            console.log(res)
            localStorage.setItem('userDetails', JSON.stringify(res.data))
            setData(res.data)

        } catch (err) {
            console.log(err)
            if (err.request.status === 500) {
                navigate('/signin')
            }
        }
    }
    const handleLogout = async () => {
        localStorage.removeItem("token")
        navigate('/signin')
    }
    useEffect(() => {
        getUserDetails()
    }, [])
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} textAlign={'center'}>
                    Welcome
                </Heading>
                <FormControl id="userName">
                    {/* <Center>
                        <Avatar size="xl"></Avatar>
                    </Center> */}
                </FormControl>
                <Stack pt={6}>
                    <Text lineHeight={1.1} fontSize={{ base: '1xl', sm: '2xl' }} textAlign={'center'}>
                        {data.firstname} {data.lastname}
                    </Text>
                </Stack>
                <Stack>
                    <Text lineHeight={1.1} fontSize={{ base: '1xl', sm: '1xl' }} textAlign={'center'}>
                        {data.email}
                    </Text>
                </Stack>
                <Stack>
                    <Text lineHeight={1.1} fontSize={{ base: '1xl', sm: '1xl' }} textAlign={'center'}>
                       Your JWT is {localStorage.getItem("token")}
                    </Text>
                </Stack>
                <Stack spacing={3}>
                    <Button
                    onClick={handleLogout}
                        bg={'red.500'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.600',
                        }}>
                        Logout
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}