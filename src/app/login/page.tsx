'use client';

import AuthForm from '@/components/AuthForm';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao fazer login.');
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
