import { Box } from "@chakra-ui/react";
import HeroSlider from "../components/home/HeroSlider";
import Marketplace from "../components/marketplace/Marketplace";
import CustomerPreviews from "../components/home/CustomerPreviews";
import CommitmentSection from "../components/home/CommitmentSection";
import NewsEventsSlider from "../components/home/NewsEventsSlider";
import ContactUs from "../components/home/ContactUs";
const Home = () => {
  return (
    <Box>
      <HeroSlider />
      <Marketplace />
      <CustomerPreviews />
      <CommitmentSection />
      <NewsEventsSlider />
      <ContactUs />
    </Box>
  );
};

export default Home;
