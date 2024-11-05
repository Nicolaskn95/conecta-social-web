"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    if (!password && !email) {
      toast.error("Erro: informe um email ou senha");
    } else {
      toast.success("login realizado com sucesso!");
      router.push("/admin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-14">
      <h3 className="title-gradient">Conecta Social</h3>

      <div className="card w-full max-w-md bg-white shadow-md rounded-lg p-8 mt-6">
        <p className="font-semibold mb-2">E-Mail</p>
        <input
          type="email"
          className="input mb-4"
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="font-semibold mb-2">Senha</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          onClick={onSubmit}
          className="btn-primary w-full mt-4"
        >
          Entrar
        </button>

        <p className="text-start text-[#387AA1] mt-4 underline cursor-pointer hover:text-[#090934]">
          Esqueci minha senha
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}
