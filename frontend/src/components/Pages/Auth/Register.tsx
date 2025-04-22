import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { registerUser } from "../../../redux/slices/authSlice";
import Input from "../../Reusable/Input";
import Button from "../../Reusable/Button";
import { Link } from "react-router";
import Card from "../../Reusable/Card";
import { useLanguage } from "../../../context/LanguageContext";
import SelectInput from "../../Reusable/SelectInput";
import { Role } from "../../../types/auth.types";
import { fetchAllRoles } from "../../../redux/slices/roleSlice";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLanguage();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { allRoles } = useSelector((state: RootState) => state.role); // 👈 fetch roles from store

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
  console.log(form);
  return (
    <div className="flex items-center justify-center m-12">
      <Card className="p-4 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
        <form onSubmit={handleSubmit}>
          <div className="text-xl mb-2">{t("signup")}</div>
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
            options={allRoles.map((role: Role) => ({
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
            <Link to={"/login"}>{t("dont_have_account")}</Link>
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Card>
    </div>
  );
};

export default Register;
