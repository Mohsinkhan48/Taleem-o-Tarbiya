import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import { loginUser } from "../../../redux/slices/authSlice";
import Input from "../../Reusable/Input";
import Button from "../../Reusable/Button";
import getDeviceId from "../../../utils/getDeviceId";
import { Link, useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import AuthLayout from "./AuthPageLayout";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
    device_id: getDeviceId(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form)).unwrap();
    if (result?.user) {
      if (result.user.isEmailVerified) {
        navigate("/");
      } else if (!result.user.isEmailVerified) {
        navigate(`/email-verification`);
      }
    }
  };
  const onForgotPasswordClick = async () => {
    navigate("/forgot-password");
  };
  return (
    <AuthLayout title={t("login")}>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder={t("email")}
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />
        <Input
          type="password"
          placeholder={t("password")}
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />
        <Button
          type="submit"
          disabled={loading}
          isLoading={loading}
          variant="primary"
        >
          {t("login")}
        </Button>
        <Button variant="link" type="button" className="mt-3">
          <Link to={"/register"}>{t("dont_have_account")}</Link>
        </Button>
        <Button
          variant="link"
          type="button"
          className="mt-3"
          onClick={onForgotPasswordClick}
        >
          <span>{t("forgot_password?")}</span>
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default Login;
