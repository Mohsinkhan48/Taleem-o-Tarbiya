import { useDispatch } from "react-redux";
import { verifyEmailOtp } from "../../../redux/slices/otpEmailSlice";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router";
import OtpInput from "../../Reusable/OtpInput";

export default function EmailVerification() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (otp: string) => {
    const result = await dispatch(verifyEmailOtp(otp)).unwrap();
    if (result) {
      navigate("/");
    }
  };

  return (
    <OtpInput onSubmit={handleSubmit} isLoading={false}/>
  );
}
