import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    HStack,
    Box,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useRef, useState } from 'react';
import axios from 'axios';

export default function UpdateProfile() {
    const [data, setData] = useState({
        firstname: "",
        email: ""
    })
    const userId = localStorage.getItem("userId")
    const toast = useToast();
    const toastIdRef = useRef();

    const handleEdit = async () => {
        try {
            const res = await axios.put(`http://localhost:5500/auth/updatedetails/${userId}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if (res.data.error) toastIdRef.current = toast({ description: res.data.error, status: 'error' })
            else {
                toastIdRef.current = toast({ description: res.data.message, status: 'success' })
            }
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
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
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} >
                    User Profile Edit
                </Heading>
                <FormControl id="userName">
                    <FormLabel>User Icon</FormLabel>
                    <Stack direction={['column', 'row']} spacing={6}>
                        <Center>
                            <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                                <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="red"
                                    aria-label="remove Image"
                                    icon={<SmallCloseIcon />}
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <Input
                                type="file"
                            />
                        </Center>
                    </Stack>
                </FormControl>
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
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Link to="/">
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        onClick={handleEdit}
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Update
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}