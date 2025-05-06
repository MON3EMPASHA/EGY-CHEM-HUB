
import { Box, Container, Grid, HStack, Text, Link, Image, Flex, IconButton } from '@chakra-ui/react'
import { ArrowUpIcon } from '@chakra-ui/icons'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box bg="gray.50">
      {/* logo wl goz2 elawl */}
      <Container maxW="1200px" py={4}>
        <Flex justify="space-between" align="center">
          <Image src="images/logo1.png" alt="EGY CHEM HUB" h="40px" />
          <IconButton
            aria-label="Return to top"
            icon={<ArrowUpIcon />}
            onClick={scrollToTop}
            colorScheme="red"
            rounded="full"
          />
        </Flex>
      </Container>

      {/* First Divider */}
      <Box h="1px" bg="red.500" />

      {/* goz2 2  */}
      <Container maxW="1200px" py={8}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          {/* Company Section */}
          <Box>
            <Text color="red.600" fontWeight="bold" mb={4}>
              Company
            </Text>
            <Grid gap={2}>
              <Link color="gray.600">Products</Link>
              <Link color="gray.600">Services</Link>
              <Link color="gray.600">Industries</Link>
              <Link color="gray.600">Contact Us</Link>
              <Link color="gray.600">News & Articles</Link>
            </Grid>
          </Box>

          {/* Resourcesss Section */}
          <Box>
            <Text color="red.600" fontWeight="bold" mb={4}>
              Resources
            </Text>
            <Grid gap={2}>
              <Link color="gray.600">Water treatment</Link>
              <Link color="gray.600">Oleo</Link>
              <Link color="gray.600">Sodium Chloride</Link>
              <Link color="gray.600">Mining</Link>
              <Link color="gray.600">Printing</Link>
              <Link color="gray.600">Paints</Link>
            </Grid>
          </Box>

          {/* Social Media Section */}
          <Box>
            <Text color="red.600" fontWeight="bold" mb={4}>
              Follow Our Social Media
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              <Link bg="gray.800" color="white" px={3} py={2} borderRadius="md" textAlign="center">
                Instagram
              </Link>
              <Link bg="gray.800" color="white" px={3} py={2} borderRadius="md" textAlign="center">
                Youtube
              </Link>
              <Link bg="gray.800" color="white" px={3} py={2} borderRadius="md" textAlign="center">
                Facebook
              </Link>
              <Link bg="gray.800" color="white" px={3} py={2} borderRadius="md" textAlign="center">
                Telegram
              </Link>
              <Link bg="gray.800" color="white" px={3} py={2} borderRadius="md" textAlign="center">
                LinkedIn
              </Link>
              <Link bg="gray.800" color="white" px={3} py={2} borderRadius="md" textAlign="center">
                Twitter
              </Link>
            </Grid>
          </Box>
        </Grid>
      </Container>

      {/* Second Divider */}
      <Box h="1px" bg="red.500" />

      {/* copy right */}
      <Container maxW="1200px" py={4}>
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="center"
          color="gray.600"
          fontSize="sm"
        >
          <Text>
            Copyright © {currentYear} EGY CHEM HUB | Design by Mariam Khaled
          </Text>
          <HStack spacing={4} mt={{ base: 2, md: 0 }}>
            <Link>Terms of Use</Link>
            <Text>|</Text>
            <Link>Privacy Policy</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer