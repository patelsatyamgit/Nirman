import signupImg from "../assets/banner-img.svg"
import Template from "../Componets/Template"

function Signup() {

  return (
    <Template
      title="Create your account and oPen your Demate account for trading"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup