import { 
  Box, 
  Flex, 
  Button, 
  Image, 
  HStack, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem,
  Link,
  LinkProps,
  Text
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const languages = [
  { code: 'EN', flag: '/flags/us.png', name: 'English' },
  { code: 'AR', flag: '/flags/eg.png', name: 'Arabic' },
  { code: 'FR', flag: '/flags/fr.png', name: 'French' },
  { code: 'TR', flag: '/flags/tr.png', name: 'Turkish' },
  { code: 'SP', flag: '/flags/es.png', name: 'Spanish' },
  { code: 'RU', flag: '/flags/ru.png', name: 'Russian' },
  { code: 'IT', flag: '/flags/it.png', name: 'Italian' },
  { code: 'DE', flag: '/flags/de.png', name: 'German' },
];

interface NavLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  isActive?: boolean;
}

const NavLink = ({ href, children, isActive = false, ...props }: NavLinkProps) => (
  <Link
    href={href}
    position="relative"
    color={isActive ? "red.600" : "gray.700"}
    _hover={{
      color: "red.600",
      textDecoration: "none",
      _after: {
        width: "100%",
      }
    }}
    _after={{
      content: '""',
      position: "absolute",
      width: isActive ? "100%" : "0%",
      height: "2px",
      bottom: "-2px",
      left: "0",
      bg: "red.600",
      transition: "all 0.3s ease"
    }}
    {...props}
  >
    {children}
  </Link>
);

interface NavbarProps {
  currentPath?: string;
}

const Navbar = ({ currentPath = "/" }: NavbarProps) => {
  return (
    <Box bg="gray.50" py={4} borderBottom="1px" borderColor="gray.200">
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        justify="space-between"
        align="center"
      >
        {/* Logo */}
        <Link href="/">
        <HStack spacing={4}>
          <Image 
            src="/images/logo1.png" 
            //alt="EGY CHEM HUB" 
            h="30px" 
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          />
          <Image 
            src="/images/logo2.png" 
            //alt="EGY CHEM HUB" 
            h="30px" 
            _hover={{ opacity: 0.8 }}
            transition="opacity 0.2s"
          />
        </HStack>  
        </Link>

        {/* Navigation Links */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <NavLink href="/" isActive={currentPath === "/"}>
            Home
          </NavLink>
          <NavLink href="/products" isActive={currentPath === "/products"}>
            Products
          </NavLink>
          <NavLink href="/industries" isActive={currentPath === "/industries"}>
            Industries
          </NavLink>
          <NavLink href="/services" isActive={currentPath === "/services"}>
            Services
          </NavLink>
          <NavLink href="/news" isActive={currentPath === "/news"}>
            News & Articles
          </NavLink>
          <NavLink href="/contact" isActive={currentPath === "/contact"}>
            Contact Us
          </NavLink>
        </HStack>

        {/* Right Side - Sign In & Language */}
        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/login"
            bg="gray.600"
            color="white"
            _hover={{ bg: 'gray.700' }}
            size="md"
            px={6}
            rightIcon={<Box as="span" ml={2}>→</Box>}
          >
            Sign In
          </Button>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
              p={2}
              _hover={{ bg: 'gray.100' }}
              _active={{ bg: 'gray.200' }}
            >
              <HStack spacing={2}>
                <Text>EN</Text>
                <Box 
                  width="24px" 
                  height="24px" 
                  borderRadius="full" 
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Image
                    src="/flags/us.png"
                    alt="US Flag"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList py={2}>
              {languages.map((lang) => (
                <MenuItem 
                  key={lang.code}
                  _hover={{ bg: 'gray.100' }}
                  px={4}
                  py={2}
                >
                  <HStack spacing={3}>
                    <Text>{lang.code}</Text>
                    <Box 
                      width="24px" 
                      height="24px" 
                      borderRadius="full" 
                      overflow="hidden"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <Image
                        src={lang.flag}
                        alt={`${lang.name} Flag`}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </Box>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar