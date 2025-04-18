import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Checkbox,
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { CustomerIcon, SafetyIcon, SatisfiedIcon } from '../components/icons/CustomIcons';

const MotionBox = motion(Box);


const buttonStyles = {
  size: "lg",
  borderRadius: "9999px",
  w: "full",
};

const primaryButtonStyles = {
  ...buttonStyles,
  bg: "brand.primary",
  color: "white",
  _hover: { opacity: 0.9 },
};

const outlineButtonStyles = {
  ...buttonStyles,
  variant: "outline",
  borderColor: "brand.primary",
  color: "brand.primary",
  _hover: { bg: 'transparent', opacity: 0.8 },
};

const inputStyles = {
  size: "lg",
  borderRadius: "lg",
  _focus: {
    borderColor: 'brand.primary',
    boxShadow: '0 0 0 1px var(--chakra-colors-brand-primary)',
  },
};

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    setIsLoginView(true);
  };

  const handleBackClick = () => {
    setIsLoginView(false);
  };
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/register');
  };
  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} minH="100vh">
      {/* Left Side */}
      <Flex align="center" justify="center">
        <Container maxW="container.sm" py={10} position="relative">
          {/* Initial View */}
          <MotionBox
            initial={{ opacity: 1, x: 0 }}
            animate={{ 
              opacity: isLoginView ? 0 : 1,
              x: isLoginView ? -50 : 0,
              display: isLoginView ? 'none' : 'block'
            }}
            transition={{ duration: 0.3 }}
          >
            <VStack align="flex-start" spacing={8}>
              <HStack spacing={2}>
                <Image 
                  src="/images/logo1.png" 
                  //alt="EGY CHEM HUB" 
                  w="50px" 
                />
                <Image 
                  src="/images/logo2.png" 
                  //alt="EGY CHEM HUB" 
                  w="100px" 
                />

              </HStack>  
              

              <Box>
                <Heading size="lg" mb={4}>Login</Heading>
                <Text color="gray.600" fontSize="sm" maxW="400px">
                  We are a group of integrated solutions to improve and facilitate 
                  the trade of chemical resources of all kinds, providing all services 
                  and technical consultations to individuals, institutions and concerned bodies.
                </Text>
              </Box>

              <Grid 
                templateColumns="repeat(3, 1fr)" 
                gap={8} 
                w="full"
                mt={8}
              >
                <VStack align="center" spacing={2}>
                  <CustomerIcon boxSize="30px" color="brand.primary" />
                  <Text fontSize="sm" fontWeight="medium" textAlign="center">
                    Our customers
                  </Text>
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    We have clients all over the world and we have suppliers.
                  </Text>
                </VStack>
                
                <VStack align="center" spacing={2}>
                  <SafetyIcon boxSize="30px" color="brand.primary" />
                  <Text fontSize="sm" fontWeight="medium" textAlign="center">
                    Safety and service
                  </Text>
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    24/24 service with the best quality
                  </Text>
                </VStack>
                
                <VStack align="center" spacing={2}>
                  <SatisfiedIcon boxSize="30px" color="brand.primary" />
                  <Text fontSize="sm" fontWeight="medium" textAlign="center">
                    Satisfied users
                  </Text>
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    2,670 users
                  </Text>
                </VStack>
              </Grid>

              <VStack spacing={4} w="full">
                <Button 
                  {...primaryButtonStyles}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button 
                  {...outlineButtonStyles}
                  onClick={handleCreateAccount}
                >
                  Dive In Now
                </Button>
              </VStack>
            </VStack>
          </MotionBox>

          {/* Login Form */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isLoginView ? 1 : 0,
              x: isLoginView ? 0 : 50,
              display: isLoginView ? 'block' : 'none'
            }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label="Back to main"
              variant="ghost"
              position="absolute"
              top="4"
              left="4"
              onClick={handleBackClick}
            />

            <VStack spacing={6} w="full" pt={16}>
              <VStack spacing={2}>
                <Heading size="lg">Login</Heading>
                <Text color="gray.500">Please login to continue to your account.</Text>
              </VStack>
              
              <VStack spacing={4} w="full">
                <Input 
                  {...inputStyles}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <InputGroup size="lg">
                  <Input
                    {...inputStyles}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>

                <Checkbox 
                  alignSelf="start"
                  sx={{
                    '.chakra-checkbox__control[data-checked]': {
                      bg: 'brand.primary',
                      borderColor: 'brand.primary',
                      _hover: {
                        bg: 'brand.primary',
                        borderColor: 'brand.primary',
                      }
                    }
                  }}
                >
                  Keep me logged in
                </Checkbox>

                <Button 
                  {...primaryButtonStyles}
                >
                  Login
                </Button>

                <Flex align="center" w="full">
                  <Box flex="1" h="1px" bg="gray.300" />
                  <Text px={4} color="gray.500">or</Text>
                  <Box flex="1" h="1px" bg="gray.300" />
                </Flex>

                <Button 
                  {...outlineButtonStyles}
                  rightIcon={<Image src="/icons/google.png" boxSize="20px" />}
                >
                  Sign in with Google
                </Button>

                <Flex w="full" justify="center" gap={1}>
                  <Text color="gray.500">Need an account?</Text>
                  <Text 
                    color="brand.primary" 
                    cursor="pointer" 
                    fontWeight="medium"
                    onClick={handleCreateAccount}
                  >
                    Create One
                  </Text>
                </Flex>
              </VStack>
            </VStack>
          </MotionBox>
        </Container>
      </Flex>

      {/* Right Side - Image */}
      <Box
        display={{ base: 'none', md: 'block' }}
        bgImage="url('/banner/img1.png')"
        bgSize="cover"
        bgPosition="center"
        borderRadius="2xl"
        overflow="hidden"
        m={4}
      />
    </Grid>
  );
};

export default Login;