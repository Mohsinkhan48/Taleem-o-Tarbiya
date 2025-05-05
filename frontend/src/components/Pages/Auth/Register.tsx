import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { registerUser } from "../../../redux/slices/authSlice";
import Input from "../../Reusable/Input";
import Button from "../../Reusable/Button";
import { Link } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import SelectInput from "../../Reusable/SelectInput";
import { fetchAllRoles, Role } from "../../../redux/slices/fetch/fetchSlices";
import AuthLayout from "./AuthPageLayout";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLanguage();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { data } = useSelector((state: RootState) => state.role); // 👈 fetch roles from store

  useEffect(() => {
    dispatch(fetchAllRoles());
  }, [dispatch]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "", // 👈 added role field
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };
  return (
    <AuthLayout title={t("signup")}>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder={t("full_name")}
          value={form.fullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, fullName: e.target.value })
          }
          required
        />
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
        <SelectInput
          options={data.map((role: Role) => ({
            label: role.name,
            value: role._id,
          }))}
          value={form.role}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setForm({ ...form, role: e.target.value })
          }
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
          <Link to={"/login"}>{t("already_registered")}</Link>
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default Register;
