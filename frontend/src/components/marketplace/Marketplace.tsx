import React, { FC } from 'react'
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Container, 
  Flex,
  Button,
  Icon,
} from '@chakra-ui/react'
import FeatureStrip from './FeatureStrip'
import SearchBar from './SearchBar'
import ProductCategories from './ProductCategories'
import ProductCard from './ProductCard'
import { CartIcon } from '../icons/CustomIcons'

const saleProducts = [
  {
    name: 'Iron Oxide',
    image: "/images/prod2.jpg",
    discount: 10,
    rating: 4,
  },
  {
    name: 'Over print Varnish',
    image: "/images/prod3.png",
    discount: 25,
    rating: 3,
  },
  {
    name: 'Poly Aluminium Chloride PAC',
    image: "/images/prod1.jpg",
    discount: 5,
    rating: 4,
  },
  {
    name: 'Sodium Chloride NaCl',
    image: "/images/prod6.jpg",
    discount: 50,
    rating: 5,
  },
]

const Marketplace: FC = () => {
  return (
    <Box>
      <FeatureStrip />

      <Container maxW="container.xl" py={8}>
        {/* Products heading and search bar */}
        <Flex align="center" gap={4} px={4} mb={8}>
          <Heading size="lg" minW="fit-content">Products</Heading>
          <SearchBar />
        </Flex>

        <Box px={4} mb={8}>
          <ProductCategories />
        </Box>

        {/* Items on Sale header + View All button */}
        <Box mt={12} px={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="lg">Items on Sale</Heading>
            <Button
              variant="outline"
              color="gray.600"
              borderColor="gray.300"
              borderWidth="1px"
              borderRadius="full"
              px={6}
              py={2}
              _hover={{ bg: 'gray.50' }}
              _active={{ bg: 'gray.100' }}
            >
              View All
            </Button>
          </Flex>

          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {saleProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}

export default Marketplace
