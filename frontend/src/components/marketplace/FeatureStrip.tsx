import react from 'react'
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { FaShoppingCart, FaCreditCard, FaGift, FaHeadset } from 'react-icons/fa'


import { Box, Flex, Text, HStack, Image, Icon } from '@chakra-ui/react'

const features = [
  {
    iconUrl:
      'https://uxwing.com/shopping-cart-icon/',
    title: 'View & buy your product',
    subtitle: 'Discount for our customers 10%'
  },
  {
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/svgs/solid/credit-card.svg',
    title: 'Quick Payment',
    subtitle: '100% Secure'
  },
  {
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/svgs/solid/gift.svg',
    title: 'Big Cashback',
    subtitle: 'Over 10% Cashback'
  },
  {
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/svgs/solid/headset.svg',
    title: '24/7 Support',
    subtitle: 'Ready for You'
  }
]


const FeatureStrip: React.FC = () => (
  <Box position="relative" pb={6}>
    <Flex
      maxW="container.xl"
      mx="auto"
      justify="space-between"
      px={8}
      py={4}
      wrap="wrap"
      gap={6}
    >
   
   {features.map((feat, idx) => (
        <HStack key={idx} spacing={3} minW="200px">
          {/* <Image src={feat.iconUrl} boxSize={6} alt={feat.title} /> */}
          <Box>
            <Text fontWeight="medium" fontSize="sm">
              {feat.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {feat.subtitle}
            </Text>
          </Box>
        </HStack>
      ))}

    </Flex>

    {/* horizontal line beneath the features */}
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

export default FeatureStrip
