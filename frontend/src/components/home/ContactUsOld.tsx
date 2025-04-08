import { Box, Grid, Heading, Text, Input, Button, VStack, Textarea } from '@chakra-ui/react'

const ContactUs = () => {
  return (
    <Box py={20}>
      <Box maxW="1200px" mx="auto" px={4}>
        <Heading size="lg" mb={8}>
          Contact Us
        </Heading>

        <Box
          position="relative"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="xl"
        >
          {/* Background Image */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage="url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80')" // Replace with your image
            bgSize="cover"
            bgPosition="center"
            filter="brightness(0.8)"
          />

          {/* Inner Shadow Overlay */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            boxShadow="inset 0 0 100px rgba(0,0,0,0.5)"
          />

          {/* Content Grid */}
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={8}
            position="relative"
            p={12}
          >
            {/* Left Column - Text Content */}
            <Box>
              <Box
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                p={6}
                border="1px solid"
                borderColor="blackAlpha.200"
              >
                <Heading
                  color="white"
                  size="lg"
                  mb={4}
                >
                  An easy way to send requests to all suppliers
                </Heading>
                <Text
                  color="whiteAlpha.900"
                  fontSize="md"
                >
                  It is very important to determine what you want from the supplier, and if you are a supplier, you must determine what to offer
                </Text>
              </Box>
            </Box>

            {/* Right Column - Contact Form */}
            <Box>
              <Box
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                p={6}
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <VStack spacing={4}>
                  <Heading
                    color="white"
                    size="sm"
                    alignSelf="flex-start"
                    mb={2}
                  >
                    Send your request to suppliers
                  </Heading>
                  
                  <Input
                    placeholder="What item you need?"
                    bg="whiteAlpha.200"
                    border="none"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.600' }}
                  />
                  
                  <Input
                    placeholder="Enter your email ..."
                    bg="whiteAlpha.200"
                    border="none"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.600' }}
                  />
                  
                  <Textarea
                    placeholder="Type more details ..."
                    bg="whiteAlpha.200"
                    border="none"
                    color="white"
                    _placeholder={{ color: 'whiteAlpha.600' }}
                  />
                  
                  <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full">
                    <Input
                      placeholder="Quantity..."
                      bg="whiteAlpha.200"
                      border="none"
                      color="white"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                    />
                    <Input
                      placeholder="Product NO..."
                      bg="whiteAlpha.200"
                      border="none"
                      color="white"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                    />
                    <Input
                      placeholder="EG..."
                      bg="whiteAlpha.200"
                      border="none"
                      color="white"
                      _placeholder={{ color: 'whiteAlpha.600' }}
                    />
                  </Grid>

                  <Button
                    colorScheme="red"
                    size="lg"
                    w="full"
                    mt={2}
                  >
                    Send Inquiry
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactUs