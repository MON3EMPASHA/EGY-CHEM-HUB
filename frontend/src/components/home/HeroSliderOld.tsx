import { Box, Text, Heading, Flex, IconButton, VStack } from '@chakra-ui/react'
import { QuestionIcon, DownloadIcon, ChatIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
        title: 'Egyptian Paints',
        subtitle: 'Egyptian-made products of fantastic quality',
        description: 'for you and your industry',
        subtext: 'Join EGY CHEM HUB and find everything you need from high-quality chemicals and paints for the manufacturing and support buildings industry.'
    },
    {
        image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
        title: 'Industrial Solutions',
        subtitle: 'Complete Industrial Solutions',
        description: 'for your manufacturing needs',
        subtext: 'Discover our wide range of industrial solutions and manufacturing support services.'
    },
    {
        image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
        title: 'Chemical Manufacturing',
        subtitle: 'Quality Chemical Products',
        description: 'for various industries',
        subtext: 'Expert solutions in chemical manufacturing and processing for multiple industrial applications.'
    }
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box position="relative" height="600px" overflow="hidden">
      {/* Slider Content */}
      <MotionBox
        bgImage={slides[currentSlide].image}
        bgSize="cover"
        bgPosition="center"
        height="100%"
        filter="grayscale(0.3)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dark Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
        />

        {/* Text Content Container */}
        <MotionBox
          position="absolute"
          top="50%"
          left="120px"
          transform="translateY(-50%)"
          maxW="600px"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* White Semi-transparent Background */}
          <Box
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            borderRadius="xl"
            p={8}
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <Text
              fontSize="sm"
              textTransform="uppercase"
              mb={2}
              color="red.500"
              fontWeight="bold"
            >
              {slides[currentSlide].title}
            </Text>
            <Heading
              size="lg"
              mb={4}
              fontWeight="bold"
              lineHeight="1.2"
              color="white"
            >
              {slides[currentSlide].subtitle}
            </Heading>
            <Text
              fontSize="lg"
              mb={4}
              color="white"
            >
              {slides[currentSlide].description}
            </Text>
            <Text
              fontSize="sm"
              color="whiteAlpha.900"
            >
              {slides[currentSlide].subtext}
            </Text>
          </Box>
        </MotionBox>

        {/* Slide Indicators */}
        <Flex
          position="absolute"
          bottom="40px"
          left="50%"
          transform="translateX(-50%)"
          gap={4}
          alignItems="center"
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              cursor="pointer"
              position="relative"
            >
              <MotionBox
                w={currentSlide === index ? "24px" : "8px"}
                h="8px"
                bg="white"
                borderRadius={currentSlide === index ? "4px" : "full"}
                transition={{ duration: 0.3 }}
                animate={{
                  width: currentSlide === index ? "24px" : "8px",
                  opacity: currentSlide === index ? 1 : 0.5
                }}
                _hover={{ opacity: 0.8 }}
              />
            </Box>
          ))}
        </Flex>

        {/* Right Side Buttons */}
        <VStack
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-50%)"
          spacing={4}
          pr={4}
        >
          <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              aria-label="Support"
              icon={<QuestionIcon />}
              bg="red.600"
              color="white"
              size="lg"
              _hover={{ bg: 'red.700' }}
            />
          </MotionBox>
          <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              aria-label="Download"
              icon={<DownloadIcon />}
              bg="red.600"
              color="white"
              size="lg"
              _hover={{ bg: 'red.700' }}
            />
          </MotionBox>
          <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              aria-label="Chat"
              icon={<ChatIcon />}
              bg="red.600"
              color="white"
              size="lg"
              _hover={{ bg: 'red.700' }}
            />
          </MotionBox>
        </VStack>
      </MotionBox>
    </Box>
  )
}

export default HeroSlider