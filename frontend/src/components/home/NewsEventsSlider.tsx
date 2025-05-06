
import React, { useState, useEffect } from 'react'
import { Box, Text,Icon,  Heading, Flex, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { CartIcon } from '../icons/CustomIcons'

const MotionBox = motion(Box)

interface NewsSection {
  image: string
  date: string
  title: string
  description: string
  //descriptionn: string
}

interface NewsSlide {
  sections: NewsSection[]
}

const slides: NewsSlide[] = [
  {
    sections: [
      {
        image: "/images/news2.jpg",
        date: 'April 5, 2025',
        title: ' EGY CHEM HUB Launches a New Production Line for Heat‑Resistant Paints',
        description: 'New Step Towards Leadership in the Industrial Market'
       
      },
      {
        image: "/images/news1.jpg",
        date: 'March 10, 2025',
        title: ' EGY CHEM HUB Participates in the Middle East Specialized Industries Exhibition',
        description: 'Share our achievements and learn about our latest neighborhood design technologies!'
        //descriptionn: 'Share our achievements and learn about our latest neighborhood design technologies!'
      },
      {
        image: "/images/news3.jpg",
        date: 'April 5, 2025',
        title: 'Industry Innovation',
        description: 'Towards a shared future, not dependent on local resources, and enhancing creativity.'
        //descriptionn: 'Towards a shared future, not dependent on local resources, and enhancing creativity.'
      }
    ]
  },
  {
    sections: [
      {
        image: "/images/news3.jpg",
        date: 'March 15, 2025',
        title: ' EGY CHEM HUB Launches a New Production Line for Heat-Resistant Paints',
        description: 'New Step Towards Leadership in the Industrial Market'
        //descriptionn: 'Share our achievements and learn about our latest neighborhood design technologies!'
      },
      {
        image: "/images/news2.jpg",
        date: 'April 20, 2025',
        title: ' EGY CHEM HUB Participates in the Middle East Specialized Industries Exhibition',
        description: 'Share our achievements and learn about our latest neighborhood design technologies!'
        //descriptionn: 'Share our achievements and learn about our latest neighborhood design technologies!'
      },
      {
        image: "/images/news1.jpg",
        date: 'May 1, 2025',
        title: 'Industry Innovation',
        description: 'Towards a shared future, not dependent on local resources, and enhancing creativity.'
        //descriptionn: 'Towards a shared future, not dependent on local resources, and enhancing creativity.'
      }
    ]
  }
]

const SLIDE_DURATION = 5000

const NewsEventsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      SLIDE_DURATION
    )
    return () => clearInterval(timer)
  }, [])

  const handlePrevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const handleNextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length)

  const getGlobalIndex = (slideIndex: number, sectionIndex: number) =>
    slideIndex * slides[0].sections.length + sectionIndex + 1

  const getBorderRadius = (i: number) => {
    if (i % 3 === 0) return "20px 0 0 20px"
    if (i % 3 === 2) return "0 20px 20px 0"
    return "0"
  }

  return (
    <Box py={20}>
      <Box maxW="1200px" mx="auto" px={4}>
        <Box position="relative">
          {/* News & Events heading inside the slider */}
          <Heading
            size="lg"
            position="absolute"
            top={4}
            left="15%"
            transform="translateX(-50%)"
            zIndex={2}
            color="white"
          >
            News &amp; Events
          </Heading>

          {/* Navigation Buttons */}
          <Flex
            justify="space-between"
            position="absolute"
            w="full"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            px={4}
          >
            <IconButton
              aria-label="Previous slide"
              icon={<ChevronLeftIcon />}
              onClick={handlePrevSlide}
              variant="outline"
              borderColor="white"
              color="white"
              borderRadius="full"
              bg="rgba(0,0,0,0.4)"
              _hover={{ bg: 'rgba(0,0,0,0.6)' }}
            />
            <IconButton
              aria-label="Next slide"
              icon={<ChevronRightIcon />}
              onClick={handleNextSlide}
              variant="outline"
              borderColor="white"
              color="white"
              borderRadius="full"
              bg="rgba(0,0,0,0.4)"
              _hover={{ bg: 'rgba(0,0,0,0.6)' }}
            />
          </Flex>

          {/* Slides */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Flex>
              {slides[currentSlide].sections.map((section, idx) => (
                <Box
                  key={idx}
                  position="relative"
                  flex="1"
                  height="400px"
                  overflow="hidden"
                  borderRadius={getBorderRadius(idx)}
                >
                  {/* Background image */}
                  <Box
                    position="absolute"
                    inset={0}
                    bgImage={`url(${section.image})`}
                    bgSize="cover"
                    bgPosition="center"
                    filter="brightness(0.6)"
                  />

                  {/* Number badge + date stacked */}
                  <Box
                    position="absolute"
                    top={100}
                    left={8}
                    zIndex={1 }
                    display="flex"
                    flexDirection="row"
                    alignItems="start"
                  >
                    <Box
                      bg="red.600"
                      color="white"
                      borderRadius="full"
                      w="40px"
                      h="40px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="normal"
                    >
                      {getGlobalIndex(currentSlide, idx)}
                    </Box>
                    <Text color="white" fontWeight="bold" mt={12}>
                      {section.date}
                    </Text>
                  </Box>

                  {/* Centered title + descriptions */}
                  <Box
                    position="absolute"
                    top="55%"
                    left="44%"
                    transform="translate(-50%, -50%)"
                    textAlign="left"
                    zIndex={1}
                    px={2}
                  >
                    
                    <Text
                      color="white"
                      fontSize="x-small"
                      fontWeight="normal"
                      mb={1}
                    >
                      {section.description}
                    </Text>
                    <Text color="whiteAlpha.900" fontSize="x-small" mb={1}>
                      {section.description}
                    </Text>
                    
                  </Box>
                </Box>
              ))}
            </Flex>
          </MotionBox>

          {/* Slide Indicators */}
          <Flex
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            gap={4}
            alignItems="center"
            zIndex={2}
          >
            {slides.map((_, i) => (
              <Box key={i} onClick={() => setCurrentSlide(i)} cursor="pointer">
                <MotionBox
                  w={currentSlide === i ? "24px" : "8px"}
                  h="8px"
                  bg="white"
                  borderRadius={currentSlide === i ? "4px" : "full"}
                  animate={{
                    width: currentSlide === i ? "24px" : "8px",
                    opacity: currentSlide === i ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                  _hover={{ opacity: 0.8 }}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsEventsSlider
