import { Box, Flex, Text, Icon, HStack } from '@chakra-ui/react'
import { FaShoppingCart, FaCreditCard, FaGift, FaHeadset } from 'react-icons/fa'

const features = [
  {
    icon: FaShoppingCart,
    title: 'View & buy your product',
    subtitle: 'Discount for our customers 10%'
  },
  {
    icon: FaCreditCard,
    title: 'Quick Payment',
    subtitle: '100% Secure'
  },
  {
    icon: FaGift,
    title: 'Big Cashback',
    subtitle: 'Over 10% Cashback'
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    subtitle: 'Ready for You'
  }
]

const FeatureStrip = () => {
  return (
    <Box position="relative" pb={6}>
      <Flex
        maxW="container.xl"
        mx="auto"
        justify="space-between"
        px={8}
        py={4}
      >
        {features.map((feature, index) => (
          <HStack
            key={index}
            spacing={3}
          >
            <Icon
              //as={feature.icon}
              boxSize={6}
              color="red.600"
            />
            <Box>
              <Text
                fontWeight="medium"
                fontSize="sm"
              >
                {feature.title}
              </Text>
              <Text
                fontSize="xs"
                color="gray.500"
              >
                {feature.subtitle}
              </Text>
            </Box>
          </HStack>
        ))}
      </Flex>

      {/* line at el end */}
      <Box
        position="absolute"
        bottom={0}
        left="16.67%" 
        right="16.67%"
        height="1px"
        bg="gray.200"
      />
    </Box>
  )
}

export default FeatureStrip