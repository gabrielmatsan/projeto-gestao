import { BookOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm, { LoginFormData } from "../components/LoginForm";

export function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);

    try {
      // Simulação de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Integrar com Firebase
      if (data.email !== "teste@cesupa.br" || data.password !== "123456") {
        throw new Error("Credenciais inválidas");
      }

      console.log("Login bem-sucedido!");
      // TODO: Salvar token/sessão do usuário
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Gestão
          </h1>
          <p className="text-gray-600">Plataforma de Agendamento de Sala</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Fazer Login
          </h2>

          <LoginForm onSubmit={onSubmit} isLoading={isLoading} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          {/* Info de Acesso */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Não tem uma conta?</p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Contate o administrador (Desativado)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Sistema de Gestão - Cesupa</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
