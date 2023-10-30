import loginImg from "../assets/banner-img.svg"
import Template from "../Componets/Template"

function Login() {
  return (
    <div className="">
    <Template
      title="Welcome Back"
      description1="Create your account and oPen your Demate account for trading"
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
      
    </div>
   
  )
}

export default Login