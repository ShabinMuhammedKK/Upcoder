
import Footer from "../../components/user/Footer";
import Header from "../../components/user/Header";
import HeroSection from "../../components/user/HeroSection";
import HomeBanners from "../../components/user/HomeBanners";


const Home: React.FC = () => {


  return (
    <div className="home">
      <Header />
      <HeroSection />
      <HomeBanners />
      <Footer />
    </div>
  );
};

export default Home;
