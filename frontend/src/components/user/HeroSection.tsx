import heroImage from "../../assets/view-3d-man-holding-laptop.png"
import Features from "./Features"

const HeroSection = () => {
  return (
    <div className="heroSection">
      <div>
      <div className="heroTitle">
        <h1 className="md:mt-40 mt-4">Crack the Code to Success With <span className="brandName">Upcoder</span></h1>
      </div>
      <div className="flex justify-center md:justify-start">
        <Features/>
      </div>
      </div>
      <div >
        <img className="heroImage" src={heroImage} alt="" />
      </div>
    </div>
  )
}

export default HeroSection