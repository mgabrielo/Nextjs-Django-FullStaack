"use client";
import { useState } from "react";
import Modal from "./Modal";
import CustomButton from "../buttons/CustomButton";
import useSignUpModal from "@/app/hooks/useSignUpModal";
import { useRouter } from "next/navigation";
import { apiService } from "@/app/service/apiService";
import { handleLogin } from "@/app/actions/serverActions";

const SignUpModal = () => {
  const router = useRouter();
  const signupModal = useSignUpModal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignUp = async () => {
    console.log(formData);
    const response = await apiService.post(
      "/api/auth/register/",
      JSON.stringify(formData)
    );
    if (response?.access) {
      handleLogin(response?.user?.pk, response?.access, response?.refresh);
      signupModal.close();
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
      <h2 className="mb-4 text-xl">Welcome to Django Airbnb, Please Signup</h2>
      <form className="space-y-2">
        <input
          type="text"
          className="w-full h-12 px-2 border border-gray-100 rounded-lg"
          placeholder="Your Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          className="w-full h-12 px-2 border border-gray-100 rounded-lg"
          placeholder="Your Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full h-12 px-2 border border-gray-100 rounded-lg"
          placeholder="Your Password"
          onChange={(e) =>
            setFormData({ ...formData, password1: e.target.value })
          }
        />
        <input
          type="password"
          className="w-full h-12 px-2 border border-gray-100 rounded-lg"
          placeholder="Repeat Password"
          onChange={(e) =>
            setFormData({ ...formData, password2: e.target.value })
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
          label="Sign Up"
          onClick={submitSignUp}
          className="w-full text-center"
        />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign Up"
      content={content}
    />
  );
};

export default SignUpModal;
