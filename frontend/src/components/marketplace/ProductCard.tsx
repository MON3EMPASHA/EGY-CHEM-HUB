import { Box, Image, Text, Badge, Stack, HStack } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

interface ProductCardProps {
  name: string
  image: string
  originalPrice: number
  discountedPrice: number
  discount: number
  rating: number
}

const ProductCard = ({ name, image, originalPrice, discountedPrice, discount, rating }: ProductCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: 'md' }}
    >
      <Box position="relative">
        <Image src={image} alt={name} h="200px" w="full" objectFit="cover" />
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="red"
          borderRadius="full"
          px={2}
        >
          {discount}% OFF
        </Badge>
      </Box>

      <Box p={4}>
        <Text fontWeight="semibold" noOfLines={2}>
          {name}
        </Text>
        
        <HStack mt={2}>
          <Text color="gray.500" textDecoration="line-through">
            EG{originalPrice.toFixed(2)}
          </Text>
          <Text color="red.600" fontWeight="bold">
            EG{discountedPrice.toFixed(2)}
          </Text>
        </HStack>

        <HStack mt={2}>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < rating ? 'yellow.400' : 'gray.300'}
             
              />
            ))}
        </HStack>
      </Box>
    </Box>
  )
}

export default ProductCard