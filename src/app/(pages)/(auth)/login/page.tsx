"use client";
import { useState } from "react";
import Image from "next/image";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center my-14">
      <Image width={350} height={350} alt="logo" src="/images/logoName.png" />

      <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-8 mt-6">
        <p className="font-semibold mb-2">E-Mail</p>
        <input
          type="email"
          className="input mb-4"
          placeholder="Digite seu e-mail"
        />

        <p className="font-semibold mb-2">Senha</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Digite sua senha"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <Eye size={20} className="text-gray-500" />
            ) : (
              <EyeSlash size={20} className="text-gray-500" />
            )}
          </button>
        </div>

        <button type="submit" className="btn-primary w-full mt-4">
          Entrar
        </button>

        <p className="text-start text-[#387AA1] mt-4 underline cursor-pointer hover:text-[#090934]">
          Esqueci minha senha
        </p>
      </div>
    </div>
  );
}
