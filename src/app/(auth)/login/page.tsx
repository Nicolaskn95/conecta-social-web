"use client";
import { Box, IconButton, Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@radix-ui/react-form";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log({ email, password });
  // };

  return (
    <Box className="flex flex-col items-center max-w-md m-auto mt-16 p-8 bg-white shadow-lg rounded-lg border border-gray-300">
      <Form onSubmit={() => {}}>
        {/* Campo de Email */}
        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <FormControl asChild>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </FormControl>
          {/* <FormMessage match="valueMissing">
            Por favor, insira um email válido.
          </FormMessage> */}
        </FormField>

        {/* Campo de Senha */}
        <FormField name="password" className="mt-4">
          <FormLabel>Senha</FormLabel>
          <FormControl asChild>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <IconButton
                onClick={handleClickShowPassword}
                aria-label="Toggle password visibility"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                }}
              >
                {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
              </IconButton>
            </div>
          </FormControl>
          {/* <FormMessage match="valueMissing">A senha é obrigatória.</FormMessage> */}
        </FormField>

        <Button
          variant="solid"
          color="indigo"
          // type="submit"
          className="mt-6 w-full"
        >
          Entrar
        </Button>

        {/* Link para Esqueci a Senha */}
        <Box className="mt-4">
          <Link href="/forgot-password">
            <Text className="text-sm text-rose-500 hover:underline">
              Esqueci a senha
            </Text>
          </Link>
        </Box>
      </Form>
    </Box>
  );
}
