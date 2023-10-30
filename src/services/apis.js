const BASE_URL=process.env.REACT_APP_BASE_URL
export const endpoints={
    SENDOTP_URL:BASE_URL + "/sendOtp",
    SIGNUP_URL:BASE_URL + "/signUp",
    LOGIN_URL:BASE_URL + "/login",
    CREATEENQUERY_URL:BASE_URL + "/createEnquiry",
    GETENQUERIES_URL:BASE_URL + "/getEnquiry",
    UPDATAEQUERIES_URL:BASE_URL + "/updateEnquiry",
    CREATEDEMATE_URL:BASE_URL+"/createDemate",
    GETREFFERD_URL:BASE_URL+"/getReferD",
}