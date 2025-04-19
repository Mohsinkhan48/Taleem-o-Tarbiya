import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import { registerUser } from "../../../redux/slices/authSlice";
import Input from "../../Reusable/Input";
import Button from "../../Reusable/Button";
import { Link } from "react-router";
import Card from "../../Reusable/Card";
import { useLanguage } from "../../../context/LanguageContext";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLanguage();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="flex items-center justify-center m-12">
      <Card className="p-4 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
        <form onSubmit={handleSubmit}>
          <div className="text-xl mb-2">{t("signup")}</div>
          <Input
            type="text"
            placeholder={t("full_name")}
            value={form.fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder={t("email")}
            value={form.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            type="password"
            placeholder={t("password")}
            value={form.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            isLoading={loading}
            variant="primary"
          >
            {t("signup")}
          </Button>
          <Button variant="link" type="button" className="mt-3">
            <Link to={"/login"}>{t("dont_have_account")}</Link>
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default Register;
