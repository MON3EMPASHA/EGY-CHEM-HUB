import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      // Add your brand colors here
      primary: '#FF0000', // Replace with your red color
    },
  },
  components:{
    Box:{
        droplet:{
            borderRadius: "16px",
            borderBottomRightRadius:"0",
            bg: "white",
            boxShadow: "md",
        }
    }
  }
})

export default theme