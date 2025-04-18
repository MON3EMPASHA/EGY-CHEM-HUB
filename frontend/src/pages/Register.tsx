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
    // Checkbox,
  } from '@chakra-ui/react';
  import { ChevronLeftIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { FC, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  
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
  
  const Register: FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      CompanyName: '',
      email: '',
      password: '',
      birthDate: '',
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleBackToLogin = () => {
      navigate('/login');
    };
  
    return (
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} minH="100vh">
        <Flex align="center" justify="center">
          <Container maxW="container.sm" py={10} position="relative">
            <IconButton
              icon={<ChevronLeftIcon />}
              aria-label="Back to login"
              variant="ghost"
              position="absolute"
              top="4"
              left="4"
              onClick={handleBackToLogin}
            />
  
            <VStack spacing={6} w="full" pt={16}>
              <VStack spacing={2}>
                <Heading size="lg">Sign up</Heading>
                <Text color="gray.500">Sign up to enjoy the features of EGY CHEM HUB</Text>
              </VStack>
              
              <VStack spacing={4} w="full">
                <Flex gap={4} w="full">
                  <Input 
                    {...inputStyles}
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input 
                    {...inputStyles}
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Flex>
  
                <Input 
                  {...inputStyles}
                  placeholder="CompanyName"
                  name="CompanyName"
                  value={formData.CompanyName}
                  onChange={handleInputChange}
                />
  
                <Input 
                  {...inputStyles}
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
  
                <Input 
                  {...inputStyles}
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                
                <InputGroup size="lg">
                  <Input
                    {...inputStyles}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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
  
                <Button {...primaryButtonStyles}>
                  Sign up
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
                  Continue with Google
                </Button>
  
                <Flex w="full" justify="center" gap={1}>
                  <Text color="gray.500">Already have an account?</Text>
                  <Text 
                    color="brand.primary" 
                    cursor="pointer" 
                    fontWeight="medium"
                    onClick={handleBackToLogin}
                  >
                    login
                  </Text>
                </Flex>
              </VStack>
            </VStack>
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
  
  export default Register;