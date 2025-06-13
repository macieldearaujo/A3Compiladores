import { useState } from 'react';
import api from '../services/api';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErro('');
  setSucesso('');

  if (senha !== confirmarSenha) {
    return setErro('As senhas não coincidem');
  }

  try {
    const response = await api.post('/users/create', {
      name: nome,
      email,
      password: senha,
      role: 'Colaborador',
    });

    setSucesso('Conta criada com sucesso! Faça login.');
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  } catch (err) {
    setErro(err.response?.data?.error || 'Erro ao cadastrar usuário');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Criar nova conta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-gray-700 font-medium mb-1">Nome</label>
            <input
              id="nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-gray-700 font-medium mb-1">Senha</label>
            <input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          <div>
            <label htmlFor="confirmarSenha" className="block text-gray-700 font-medium mb-1">Confirmar Senha</label>
            <input
              id="confirmarSenha"
              type="password"
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center -mt-2">{erro}</p>}
          {sucesso && <p className="text-green-600 text-sm text-center -mt-2">{sucesso}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Já tem uma conta?</span>
          <button
            onClick={() => window.location.href = '/'}
            className="ml-2 text-blue-600 hover:underline font-medium"
          >
            Fazer login
          </button>
        </div>
      </div>
    </div>
  );
}
