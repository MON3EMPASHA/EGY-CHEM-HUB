import {
    Box,
    Flex,
    Button,
    Image,
    HStack,
    Link,
    Select,
    useColorModeValue,
  } from '@chakra-ui/react'
  import { ChevronRightIcon } from '@chakra-ui/icons'
  
  const Navbar = () => {
    const navItems = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Industries', href: '/industries' },
      { label: 'Services', href: '/services' },
      { label: 'News & Articles', href: '/news' },
      { label: 'Contact Us', href: '/contact' },
    ]
  
    return (
      <Box 
        bg={useColorModeValue('gray.50', 'gray.900')} 
        px={4} 
        boxShadow="sm"
        position="fixed"
        width="full"
        zIndex="sticky"
      >
        <Flex 
          h={16} 
          alignItems="center" 
          justifyContent="space-between"
          maxW="container.xl"
          mx="auto"
        >
          {/* Logo */}
          <Image
            src="/dummy-logo.png" //mhtag replacement 
            alt="EgychemHub"
            h="35px"
          />
  
          {/* links */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _hover={{
                  color: 'red.500',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
  
          {/* Right Side - Sign In & Language */}
          <HStack spacing={4}>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ChevronRightIcon />}
              color="gray.600"
              _hover={{
                bg: 'gray.100',
              }}
            >
              Sign In
            </Button>
            
            <Select
              size="sm"
              width="70px"
              variant="unstyled"
              defaultValue="EN"
            >
              <option value="EN">EN 🇺🇸</option>
              <option value="AR">AR 🇪🇬</option>
            </Select>
          </HStack>
        </Flex>
      </Box>
    )
  }
  
  export default Navbar