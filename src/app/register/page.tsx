'use client';

import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (email: string, password: string, name?: string) => {
    try {
      await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        name,
      });
      alert('Usuário registrado com sucesso!');
      router.push('/login');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao registrar.');
    }
  };

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
