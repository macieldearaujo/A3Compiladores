import React from "react";
import { useNavigate } from "react-router-dom";

const tarefasConcluidasMock = [
  {
    id: 101,
    titulo: "Finalizar relatório financeiro",
    descricao: "Relatório do trimestre finalizado e enviado.",
    concluidoEm: "2025-06-10",
  },
  {
    id: 102,
    titulo: "Treinamento de integração",
    descricao: "Participação confirmada e feedback enviado.",
    concluidoEm: "2025-06-05",
  },
  {
    id: 103,
    titulo: "Atualizar documentos da equipe",
    descricao: "Documentos internos organizados na pasta correta.",
    concluidoEm: "2025-06-02",
  },
];

export default function HistoricoTarefas() {
  const navigate = useNavigate();

  function handleVoltar() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Histórico de Tarefas Concluídas
        </h1>

        <div className="space-y-6">
          {tarefasConcluidasMock.length === 0 ? (
            <p className="text-center text-gray-600">
              Nenhuma tarefa concluída registrada.
            </p>
          ) : (
            tarefasConcluidasMock.map(({ id, titulo, descricao, concluidoEm }) => (
              <div
                key={id}
                className="border border-gray-300 rounded p-4 hover:shadow-md transition cursor-default bg-green-50"
              >
                <h2 className="text-xl font-semibold text-gray-800">{titulo}</h2>
                <p className="text-gray-600 mt-1">{descricao}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Concluída em: <span className="font-medium">{concluidoEm}</span>
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
