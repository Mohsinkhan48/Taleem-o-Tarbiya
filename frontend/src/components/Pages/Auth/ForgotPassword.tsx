import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Input from "../../Reusable/Input";
import Button from "../../Reusable/Button";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { forgotPassword } from "../../../redux/slices/forgotPasswordSlice";
import { verifyPasswordOtp } from "../../../redux/slices/otpPasswordResetSlice";
import { resetPassword } from "../../../redux/slices/resetPasswordSlice";
import OtpInput from "../../Reusable/OtpInput";
import AuthLayout from "./AuthPageLayout";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [form, setForm] = useState({ email: "", newPassword: "" });

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const { loading: forgotLoading } = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const { loading: otpLoading } = useSelector((state: RootState) => state.otp);
  const { loading: resetLoading } = useSelector(
    (state: RootState) => state.resetPassword
  );

  // Step 1: Submit Email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(form.email)).unwrap();
    if (result) setStep("otp");
  };

  // Step 2: Submit OTP
  const handleOtpSubmit = async (otp: string) => {
    const result = await dispatch(
      verifyPasswordOtp({ otp, email: form.email })
    );
    if (result.payload) setStep("reset");
  };

  // Step 3: Submit New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      resetPassword({ email: form.email, newPassword: form.newPassword })
    ).unwrap();
    if (result) navigate("/");
  };

  return (
    <>
      {step === "email" && (
        <AuthLayout title={t("forgot_password")}>
          <form onSubmit={handleEmailSubmit}>
            <Input
              type="email"
              placeholder={t("email")}
              value={form.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              disabled={forgotLoading}
              isLoading={forgotLoading}
              variant="primary"
            >
              {t("forgot_password")}
            </Button>
          </form>
        </AuthLayout>
      )}

      {step === "otp" && (
        <OtpInput onSubmit={handleOtpSubmit} isLoading={otpLoading} />
      )}

      {step === "reset" && (
        <AuthLayout title={t("reset_password")}>
          <form onSubmit={handleResetPassword}>
            <Input
              type="password"
              placeholder={t("password")}
              value={form.newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              disabled={resetLoading}
              isLoading={resetLoading}
              variant="primary"
            >
              {t("reset_password")}
            </Button>
          </form>
        </AuthLayout>
      )}
    </>
  );
};

export default ForgotPassword;
