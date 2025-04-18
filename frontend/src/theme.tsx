import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#C53030', 
    },
  },
  components: {
    Box: {
      variants: {
        droplet: {
          borderRadius: "16px",
          borderBottomRightRadius: "0",
          bg: "white",
          boxShadow: "md",
        }
      }
    },
    Button: {
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.primary',
            opacity: 0.9
          }
        },
        outline: {
          borderColor: 'brand.primary',
          color: 'brand.primary',
          _hover: {
            bg: 'transparent',
            opacity: 0.8
          }
        }
      }
    }
  }
})

export default theme