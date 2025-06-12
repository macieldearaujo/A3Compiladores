import React from "react";
import { useNavigate } from "react-router-dom";

const tarefasPendentesMock = [
  {
    id: 1,
    titulo: "Enviar relatório mensal",
    descricao: "Preparar e enviar o relatório mensal até sexta-feira.",
    prazo: "2025-06-20",
  },
  {
    id: 2,
    titulo: "Atualizar cadastro de clientes",
    descricao: "Verificar e atualizar informações dos clientes ativos.",
    prazo: "2025-06-18",
  },
  {
    id: 3,
    titulo: "Revisar procedimento interno",
    descricao: "Revisar e sugerir melhorias para o procedimento X.",
    prazo: "2025-06-25",
  },
];

export default function TarefasPendentes() {
  const navigate = useNavigate();

  function handleVoltar() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Minhas Tarefas Pendentes
        </h1>

        <div className="space-y-6">
          {tarefasPendentesMock.length === 0 ? (
            <p className="text-center text-gray-600">Você não tem tarefas pendentes.</p>
          ) : (
            tarefasPendentesMock.map(({ id, titulo, descricao, prazo }) => (
              <div
                key={id}
                className="border border-gray-300 rounded p-4 hover:shadow-md transition cursor-default"
              >
                <h2 className="text-xl font-semibold text-gray-800">{titulo}</h2>
                <p className="text-gray-600 mt-1">{descricao}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Prazo: <span className="font-medium">{prazo}</span>
                </p>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleVoltar}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
