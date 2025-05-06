import { Box } from '@chakra-ui/react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Home from '../pages/Home'
function HomePage() {
  return (
    <Box>
      <Navbar />
      <Home />
      <Footer />
    </Box>
  )
}

export default HomePage