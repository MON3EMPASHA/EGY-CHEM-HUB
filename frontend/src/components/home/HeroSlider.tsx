import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  QuestionIcon,
  DownloadIcon,
  SearchIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    title: "Egyptian Paints",
    subtitle: "Egyptian-made products of fantastic quality",
    description: "for you and your industry",
    subtext:
      "Join EGY-HEM-HUB and Find Everything You Need From High‑Quality Chemicals and Paints for The Manufacturing and Support Buildings Industry.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    title: "Industrial Solutions",
    subtitle: "Complete Industrial Solutions",
    description: "for your manufacturing needs",
    subtext:
      "Discover our wide range of industrial solutions and manufacturing support services.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    title: "Chemical Manufacturing",
    subtitle: "Quality Chemical Products",
    description: "for various industries",
    subtext:
      "Expert solutions in chemical manufacturing and processing for multiple industrial applications.",
  },
];

const SLIDE_DURATION = 5000;

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <Box position="relative" height="600px" overflow="hidden">
      {/* Background + fade */}
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
        {/* Dark overlay */}
        <Box position="absolute" inset={0} bg="blackAlpha.500" />

        {/* Text panel */}
        <MotionBox
          position="absolute"
          top="25%"
          left={0}
          transform="translateY(-50%)"
          w="33.33%"
          px={8}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            borderRadius="xl"
            p={6}
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <Text
              fontSize="md"
              textTransform="uppercase"
              mb={2}
              color="red.500"
              fontWeight="bold"
            >
              {slides[currentSlide].title}
            </Text>
            <Text
              as="h2"
              fontSize="2xl"
              mb={4}
              fontWeight="bold"
              color="white"
              lineHeight="1.2"
            >
              {slides[currentSlide].subtitle}
            </Text>
            <Text fontSize="lg" mb={4} color="white">
              {slides[currentSlide].description}
            </Text>
            <Text fontSize="md" color="whiteAlpha.900" noOfLines={3}>
              {slides[currentSlide].subtext}
            </Text>
          </Box>
        </MotionBox>

        {/* Slide indicators */}
        <Flex
          position="absolute"
          bottom="40px"
          left="50%"
          transform="translateX(-50%)"
          gap={4}
        >
          {slides.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => handleSlideChange(idx)}
              cursor="pointer"
            >
              <MotionBox
                w={currentSlide === idx ? "24px" : "8px"}
                h="8px"
                bg="white"
                borderRadius={currentSlide === idx ? "4px" : "full"}
                animate={{
                  width: currentSlide === idx ? "24px" : "8px",
                  opacity: currentSlide === idx ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                _hover={{ opacity: 0.8 }}
              />
            </Box>
          ))}
        </Flex>

        {/* Right‑side buttons */}
        <VStack
          position="absolute"
          right={0}
          top="50%"
          transform="translateY(-50%)"
          spacing={4}
          pr={4}
          align="end"
        >
          {/* Support pop‑out */}
          <Popover trigger="hover" placement="left" gutter={0}>
            <PopoverTrigger>
              <MotionIconButton
                aria-label="Support"
                icon={<QuestionIcon />}
                bg="red.600"
                color="white"
                size="lg"
                _hover={{ bg: "red.700" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            </PopoverTrigger>
            <PopoverContent
              bg="transparent"
              border="none"
              w="auto"
              _focus={{ boxShadow: "none" }}
              mr={2}
              p={0}
            >
              <PopoverBody p={0}>
                <VStack spacing={2} align="end">
                  {/* Search pill */}
                  <HStack
                    bg="red.600"
                    borderRadius="full"
                    px={4}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: "red.700" }}
                    spacing={2}
                  >
                    <SearchIcon color="white" boxSize={5} />
                    <Text color="white" fontSize="sm">
                      Search for a product
                    </Text>
                  </HStack>
                  
                  
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

                 {/* Support pop‑out */}
                 <Popover trigger="hover" placement="left" gutter={0}>
            <PopoverTrigger>
              <MotionIconButton
                aria-label="Download"
                icon={<DownloadIcon />}
                bg="red.600"
                color="white"
                size="lg"
                _hover={{ bg: "red.700" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            </PopoverTrigger>
            <PopoverContent
              bg="transparent"
              border="none"
              w="auto"
              _focus={{ boxShadow: "none" }}
              mr={2}
              p={0}
            >
              <PopoverBody p={0}>
                <VStack spacing={2} align="end">
                  {/* gettt code */}
                  <HStack
                    bg="red.600"
                    borderRadius="full"
                    px={4}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: "red.700" }}
                    spacing={2}
                  >
                    <SearchIcon color="white" boxSize={5} />
                    <Text color="white" fontSize="sm">
                      Get Code
                    </Text>
                  </HStack>
                  
                  
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>


          {/* Chat icon with pop‑out */}
          <Popover trigger="hover" placement="left" gutter={0}>
            <PopoverTrigger>
              <MotionIconButton
                aria-label="Chat"
                icon={<ChatIcon />}
                bg="red.600"
                color="white"
                size="lg"
                _hover={{ bg: "red.700" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            </PopoverTrigger>
            <PopoverContent
              bg="transparent"
              border="none"
              w="auto"
              _focus={{ boxShadow: "none" }}
              mr={2}
              p={0}
            >
              <PopoverBody p={0}>
                <HStack
                  bg="red.600"
                  borderRadius="full"
                  px={4}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "red.700" }}
                  spacing={2}
                  alignSelf="end"
                >
                  <ChatIcon color="white" boxSize={5} />
                  <Text color="white" fontSize="sm">
                    Talk to support chatbot
                  </Text>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </VStack>
      </MotionBox>
    </Box>
  );
};

export default HeroSlider;
