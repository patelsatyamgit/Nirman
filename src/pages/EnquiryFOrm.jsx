import loginImg from "../assets/banner-img.svg"
import Template from "../Componets/Template"

function EnquiryFOrm() {
  return (
    <div className="">
    <Template
      title="Welcome"
      description1="Ask your query, Please provide right Info"
      description2="Education to future-proof your career."
      image={loginImg}
      formType="enqury"
    />
      
    </div>
   
  )
}

export default EnquiryFOrm