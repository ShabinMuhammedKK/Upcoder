import upcoderLogo from "../../assets/upcoderlogo.png"

const Footer = () => {
  return (
    <div className="footer">
        <div className="flex justify-evenly h-5/6 py-10 ">
          <div className="flex justify-start items-center gap-5">
            <img src={upcoderLogo} alt="" style={{height:"40px"}}/>
            <h1 className="text-[26px] font-bold">Upcoder</h1>
          </div>
          <div>
            <h1 className="text-[20px] font-bold mb-5">Quick links</h1>
            <h1 >Home</h1>
            <h1>courses</h1>
            <h1>Lab</h1>
            <h1>contact</h1>
          </div>
          <div >
            <h1 className="text-[20px] font-bold mb-5">Legal</h1>
            <h1>Privacy policy</h1>
            <h1>Terms of use</h1>
            <h1>Refunc and canclation policy</h1>
          </div>
          <div>
            <h1 className="text-[20px] font-bold mb-5">Get in touch</h1>
            <h1>support@upcoder.in</h1>
          </div>
        </div>
        <div className="flex justify-center">Copyrigh@2024 Upcoder</div>
    </div>
  )
}

export default Footer