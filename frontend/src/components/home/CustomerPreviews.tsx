import { Box, Flex, Text, Heading, Image, IconButton, HStack, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mohamed Radwan",
    position: "CEO",
    company: "Egy-chem Company",
    content: "This is not the first collaboration between Oleo Misr and EGYCHEMHUB to receive and receive products in the shortest time and the easiest way to receive them, so I recommend dealing with them.",
    avatar: "/images/uncle-mohamed.jpg"
  },
  
];

const CustomerPreviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Box bg="gray.50" py={20}>
      <Box maxW="1200px" mx="auto" px={2}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} alignItems="center">
          {/* Left Column - Info Section */}
          <Box>
            <Heading as="h2" fontSize="3xl" mb={4}>
              What our customers are saying us?
            </Heading>
            <Text color="gray.600" mb={8}>
              We have hundreds of chemical products for construction and 
              painting ready to be distributed in Egyptian shopping. You can 
              become a member of our team now.
            </Text>
            
            <Flex gap={12}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold">10K+</Text>
                <Text color="gray.600">Happy People</Text>
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight="bold">3.08</Text>
                <Text color="gray.600">Overall rating</Text>
                <HStack spacing={1} mt={1}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Box
                      key={star}
                      color={star <= 3 ? "yellow.400" : "gray.200"}
                      as="span"
                    >
                      ★
                    </Box>
                  ))}
                </HStack>
              </Box>
            </Flex>
          </Box>

          {/* Right Column - Testimonial Slider */}
          <Box>
            <Box
              bg="white"
              borderRadius="2xl"
              borderBottomRightRadius={0}
              p={8}
              boxShadow="sm"
              mb={6}
            >
              <Flex gap={6} align="flex-start">
                <Box flexShrink={0}>
                  <Image
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].name}
                    borderRadius="full"
                    boxSize="80px"
                    objectFit="cover"
                  />
                </Box>
                <Box flex={1}>
                  <Flex justify="space-between" align="flex-start" mb={4}>
                    <Box>
                      <Text fontSize="xl" fontWeight="semibold">
                        {testimonials[currentSlide].name}
                      </Text>
                      <Text color="gray.600">
                        {testimonials[currentSlide].position} {testimonials[currentSlide].company}
                      </Text>
                    </Box>
                    <Box color="red.600" fontSize="4xl">
                      "
                    </Box>
                  </Flex>
                  <Text fontSize="lg">
                    {testimonials[currentSlide].content}
                  </Text>
                </Box>
              </Flex>
            </Box>

            {/* Navigation Buttons */}
            <Flex justify="flex-end" gap={4}>
              <IconButton
                aria-label="Previous"
                icon={<ChevronLeftIcon />}
                onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                variant="outline"
                borderRadius="full"
                borderColor="red.500"
                color="red.500"
                size="lg"
              />
              <IconButton
                aria-label="Next"
                icon={<ChevronRightIcon />}
                onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                variant="outline"
                borderRadius="full"
                borderColor="red.500"
                color="red.500"
                size="lg"
              />
            </Flex>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomerPreviews;