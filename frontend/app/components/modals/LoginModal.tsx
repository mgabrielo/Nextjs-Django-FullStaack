"use client";
import { useState } from "react";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../buttons/CustomButton";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/app/actions/serverActions";
import { apiService } from "@/app/service/apiService";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const submitSignIn = async () => {
    const response = await apiService.post(
      "/api/auth/login/",
      JSON.stringify(formData)
    );
    if (response?.access) {
      handleLogin(response?.user?.pk, response?.access, response?.refresh);
      loginModal.close();
      router.push("/");
    } else {
      const errorData: string[] = Object.values(response).map((err: any) => {
        return err;
      });
      setErrors(errorData);
    }
  };

  const content = (
    <>
      <h2 className="mb-4 text-xl">Welcome to Django Airbnb, Please Login</h2>
      <form className="space-y-2">
        <input
          type="text"
          className="w-full h-12 px-2 border border-gray-100 rounded-lg"
          placeholder="Your Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full h-12 px-2 border border-gray-100 rounded-lg"
          placeholder="Your Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.length > 0 &&
          errors.map((error, index) => (
            <div
              key={index}
              className="p-2 bg-airbnb text-white rounded-lg opacity-80"
            >
              <p>{error}</p>
            </div>
          ))}
        <CustomButton
          label="Log In"
          onClick={submitSignIn}
          className="w-full text-center"
        />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log In"
      content={content}
    />
  );
};

export default LoginModal;
