import loginImg from "../../assets/banner-img.svg"
import Template from "../../Componets/Template"

function CreateAccount() {
  return (
    <div className="">
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="dmate"
    />
      
    </div>
   
  )
}

export default CreateAccount;