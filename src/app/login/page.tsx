'use client';

import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import axios from 'axios';


// Tipos para a resposta de sucesso
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

interface AuthResponse {
  accessToken: string;
  user: User;
}

// Tipo para a resposta de erro
interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  error: string;
}

type ApiResponse = AuthResponse | ErrorResponse;

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      // Aqui estamos utilizando o tipo genérico ApiResponse
      const res = await axios.post<ApiResponse>('http://localhost:3000/auth/login', {
        email,
        password,
      });

      if ('accessToken' in res.data) {
        // Resposta de sucesso
        localStorage.setItem('token', res.data.accessToken);
        router.push('/dashboard');
      } else {
        // Resposta de erro
        alert(res.data.error || 'Erro ao fazer login.');
      }
    } catch (error: unknown) {
      console.error("Erro ao fazer login:", error);
      alert('Erro ao fazer login.');
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
