import { SimpleGrid, Box, Text, Image, Checkbox } from '@chakra-ui/react'

const categories = [
    {
        name: 'Water treatment',
        image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80'
    },
    {
        name: 'Oleo',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80'
    },
    {
        name: 'Sodium Chloride',
        image: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?w=800&q=80'
    },
    {
        name: 'Mining',
        image: 'https://images.unsplash.com/photo-1624028772867-f9954b7c3bac?w=800&q=80'
    },
    {
        name: 'Printing',
        image: 'https://images.unsplash.com/photo-1601225998165-31400a36d882?w=800&q=80'
    },
    {
        name: 'Paints',
        image: 'https://images.unsplash.com/photo-1580462611434-39cde8c01e65?w=800&q=80'
    },
    {
        name: 'Adhesives & Sealant',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80'
    }
]

const ProductCategories = () => {
  return (
    <SimpleGrid columns={[2, 3, 4]} spacing={4}>
      {categories.map((category) => (
        <Box
          key={category.name}
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          cursor="pointer"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{ transform: 'scale(1.02)' }}
        >
          {/* Image */}
          <Image
            src={category.image}
            alt={category.name}
            w="full"
            h="150px"
            objectFit="cover"
          />

          {/* Red Strip with Text */}
          <Box
            position="absolute"
            left={0}
            right={0}
            top="50%"
            transform="translateY(-50%)"
            bg="red.600"
            py={2}
          >
            <Text
              color="white"
              fontSize="sm"
              fontWeight="medium"
              textAlign="center"
            >
              {category.name}
            </Text>
          </Box>

          {/* Checkbox */}
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="white"
            borderRadius="md"
            p={1}
          >
            <Checkbox
              size="sm"
              colorScheme="red"
              sx={{
                'span.chakra-checkbox__control': {
                  borderColor: 'red.600',
                  _checked: {
                    bg: 'red.600',
                    borderColor: 'red.600',
                  }
                }
              }}
              onChange={(e) => {
                
                console.log(`${category.name} selected:`, e.target.checked)
              }}
            />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default ProductCategories