import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Container, 
  Flex,
  Button,
  Icon,
  Center
} from '@chakra-ui/react'
import { FaShoppingCart } from 'react-icons/fa'
import FeatureStrip from './FeatureStrip'
import SearchBar from './SearchBar'
import ProductCategories from './ProductCategories'
import ProductCard from './ProductCard'

const saleProducts = [
  {
    name: 'Iron Oxide',
    image: '/images/iron-oxide.jpg',
    originalPrice: 89.99,
    discountedPrice: 72.50,
    discount: 10,
    rating: 4
  },
  {
    name: 'Over print Varnish',
    image: '/images/varnish.jpg',
    originalPrice: 150.00,
    discountedPrice: 112.50,
    discount: 25,
    rating: 3
  },
  {
    name: 'Poly Aluminium Chloride PAC',
    image: '/images/pac.jpg',
    originalPrice: 85.00,
    discountedPrice: 71.50,
    discount: 5,
    rating: 4
  },
  {
    name: 'Sodium Chloride NaCl',
    image: '/images/nacl.jpg',
    originalPrice: 120.00,
    discountedPrice: 60.00,
    discount: 50,
    rating: 5
  },
]

const Marketplace = () => {
  return (
    <Box>
      <FeatureStrip />
      
      <Container maxW="container.xl" py={8}>
        {/* Products heading and search bar in one row */}
        <Flex align="center" gap={4} px={4} mb={8}>
          <Heading size="lg" minW="fit-content">Products</Heading>
          <SearchBar />
        </Flex>

        <Box px={4}>
          <ProductCategories />
        </Box>

        <Box mt={12} px={4}>
          <Heading size="lg" mb={4}>Items on Sale</Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {saleProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Add to Cart Button */}
        <Center mt={12} mb={6}>
          <Button
            //leftIcon={<Icon as={FaShoppingCart} />}
            bg="gray.600"
            color="white"
            px={8}
            py={6}
            borderRadius="md"
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800' }}
          >
            Add to cart
          </Button>
        </Center>
      </Container>
    </Box>
  )
}

export default Marketplace