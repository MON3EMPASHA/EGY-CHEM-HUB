import { Box, Image, Text, HStack, Icon } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { CartIcon } from '../icons/CustomIcons'

interface ProductCardProps {
  name: string
  image: string
  discount?: number
  rating: number
}

const ProductCard = ({ name, image, discount, rating }: ProductCardProps) => {
  const [isInCart, setIsInCart] = useState(false)
  const [isDetailsHovered, setIsDetailsHovered] = useState(false)

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ shadow: 'xl' }}
      position="relative"
    >
      {/* Cart Icon */}
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={2}
        cursor="pointer"
        onClick={() => setIsInCart(!isInCart)}
        transition="all 0.2s"
        _hover={{ transform: 'scale(1.1)' }}
      >
        <Icon
          as={CartIcon}
          boxSize={4}
          color={isInCart ? 'gray.400' : 'red.600'}
          transition="color 0.6s"
        />
      </Box>

      {/* Discount Badge */}
      {discount != null && (
        <Box
          position="absolute"
          top={0}
          right={0}
          zIndex={2}
          bg="red.600"
          color="white"
          px={4}
          py={2}
          borderBottomLeftRadius="2xl"
          fontSize="sm"
          fontWeight="bold"
        >
          offer
          <Text fontSize="lg" fontWeight="bold">
            {discount}%
          </Text>
        </Box>
      )}

      {/* Product Image */}
      <Box position="relative">
        <Image 
          src={image} 
          alt={name} 
          h="200px" 
          w="full" 
          objectFit="cover" 
        />
      </Box>

      {/* Product Info */}
      <Box p={4}>
        <Text 
          fontWeight="semibold" 
          noOfLines={2}
          mb={2}
        >
          {name}
        </Text>

        <HStack spacing={1} mb={4}>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              as={StarIcon}
              color={i < rating ? 'yellow.400' : 'gray.300'}
              boxSize={4}
            />
          ))}
        </HStack>

        {/* More Details / Get Code Button */}
        <Box
          as="button"
          mt={2}
          w="full"
          py={2}
          border="1px"
          borderColor="red.600"
          color="red.600"
          borderRadius="md"
          fontSize="sm"
          onMouseEnter={() => setIsDetailsHovered(true)}
          onMouseLeave={() => setIsDetailsHovered(false)}
          _hover={{
            bg: 'red.50',
            color: 'gray.600',
            borderColor: 'gray.600',
          }}
        >
          {isDetailsHovered ? 'Add to Get Code' : 'More details'}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductCard
