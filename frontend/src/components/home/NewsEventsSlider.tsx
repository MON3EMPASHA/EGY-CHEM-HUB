import { Box, Text, Heading, Flex, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
        title: 'Event Title 1',
        date: 'October 15, 2023',
        description: 'Description of the event or news item goes here.'
    },
    {
      image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
      title: 'Event Title 2',
      date: 'October 15, 2023',
      description: 'Description of the event or news item goes here.'
  },
  {
    image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1500&q=80',
    title: 'Event Title 3',
    date: 'October 15, 2023',
    description: 'Description of the event or news item goes here.'
},
    
]

const SLIDE_DURATION = 5000

const NewsEventsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState<NodeJS.Timeout | null>(null)

  const startAutoplay = useCallback(() => {
    if (autoplay) clearInterval(autoplay)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
    setAutoplay(timer)
  }, [autoplay])

  useEffect(() => {
    startAutoplay()
    return () => {
      if (autoplay) clearInterval(autoplay)
    }
  }, [startAutoplay])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    startAutoplay()
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    startAutoplay()
  }

  return (
    <Box py={20}>
      <Box maxW="1200px" mx="auto" px={4}>
        <Heading size="lg" mb={8}>
          News & Events
        </Heading>

        <Box position="relative">
          {/* Navigation Buttons */}
          <Flex justify="space-between" position="absolute" w="full" top="50%" transform="translateY(-50%)" zIndex="1" px={4}>
            <IconButton
              aria-label="Previous slide"
              icon={<ChevronLeftIcon />}
              onClick={handlePrevSlide}
              variant="outline"
              borderColor="red.500"
              color="red.500"
              borderRadius="full"
              bg="white"
              _hover={{ bg: 'red.50' }}
            />
            <IconButton
              aria-label="Next slide"
              icon={<ChevronRightIcon />}
              onClick={handleNextSlide}
              variant="outline"
              borderColor="red.500"
              color="red.500"
              borderRadius="full"
              bg="white"
              _hover={{ bg: 'red.50' }}
            />
          </Flex>

          {/* Slider Content */}
          <MotionBox
            bgImage={slides[currentSlide].image}
            bgSize="cover"
            bgPosition="center"
            height="400px"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
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
              bg="blackAlpha.500"
            />

            {/* Content */}
            <Box
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              p={8}
              bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
            >
              <Text color="red.500" mb={2} fontWeight="bold">
                {slides[currentSlide].date}
              </Text>
              <Heading color="white" size="lg" mb={2}>
                {slides[currentSlide].title}
              </Heading>
              <Text color="whiteAlpha.900">
                {slides[currentSlide].description}
              </Text>
            </Box>
          </MotionBox>

          {/* Slide Indicators - Using the original style */}
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
                onClick={() => {
                  setCurrentSlide(index)
                  startAutoplay()
                }}
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
        </Box>
      </Box>
    </Box>
  );
}

export default NewsEventsSlider
