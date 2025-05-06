import { 
    Box, 
    Grid, 
    Heading, 
    Text, 
    Image, 
    Button, 
    VStack, 
    HStack,
    Icon
  } from "@chakra-ui/react";
  import { 
    ViewIcon, 
    CheckIcon   
  } from '@chakra-ui/icons';
  
  const CommitmentSection = () => {
    return (
      <Box py={20} maxW="1200px" mx="auto" px={4}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
          {/* Left Column - Quality Commitments */}
          <Box>
            <Heading size="lg" mb={8}>
              Our Commitment to Quality
            </Heading>
  
            <VStack spacing={6} align="stretch">
              <HStack spacing={4} align="flex-start">
                <Box
                  bg="red.600"
                  p={4}
                  borderRadius="lg"
                  color="white"
                >
                  <Icon as={ViewIcon} boxSize={6} />
                </Box>
                <Box>
                  <Heading size="md" mb={2}>
                    Wide Product Range
                  </Heading>
                  <Text color="gray.600">
                    We have a wide range of products from more than one company, with varying prices and discounts for our customers.
                  </Text>
                </Box>
              </HStack>
  
              <HStack spacing={4} align="flex-start">
                <Box
                  bg="red.600"
                  p={4}
                  borderRadius="lg"
                  color="white"
                >
                  <Icon as={CheckIcon} boxSize={6} />
                </Box>
                <Box>
                  <Heading size="md" mb={2}>
                    Quality Assurance
                  </Heading>
                  <Text color="gray.600">
                    We have the best quality, so we allow you to inspect a small quantity before ordering quantities.
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
  
          {/* Right Column - Promotion Card */}
          <Box>
            <Box
              bg="gray.50"
              borderRadius="xl"
              overflow="hidden"
              position="relative"
            >
              <Grid templateColumns="1fr 1fr" gap={0}>
                <Box p={8}>
                  <Text color="gray.900" mb={2}>Big Sale</Text>
                  <Heading size="lg" mb={2} lineHeight="tight">
                    Get an Extra
                  </Heading>
                  <Heading size="lg" color="red.600" mb={3}>
                    50% Off
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={6}>
                    Al Hamad Paints Manufacturing Company Products
                  </Text>
                  <Button
                    bg="red.600"
                    color="white"
                    _hover={{ bg: 'red.700' }}
                    size="md"
                    px={6}
                  >
                    Discover Now
                  </Button>
                </Box>
                <Box>
                  <Image
                    src="/images/news3.jpg"
                    alt="Paint Product"
                    objectFit="cover"
                    h="100%"
                    w="100%"
                  />
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Box>
    );
  };
  
  export default CommitmentSection;