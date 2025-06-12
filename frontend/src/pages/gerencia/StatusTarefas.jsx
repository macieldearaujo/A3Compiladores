import React from "react";
import { useNavigate } from "react-router-dom";

const tarefasMock = [
  { id: 1, titulo: "Enviar relatório financeiro", status: "Em andamento", colaborador: "Ana" },
  { id: 2, titulo: "Aprovar pedido de compra", status: "Pendente", colaborador: "Carlos" },
  { id: 3, titulo: "Revisar contrato", status: "Concluído", colaborador: "Beatriz" },
  { id: 4, titulo: "Atualizar base de dados", status: "Em atraso", colaborador: "Eduardo" },
];

export default function StatusTarefas() {
  const navigate = useNavigate();

  function handleVoltar() {
    navigate(-1);
  }

  // Map status para cores claras de fundo
  const statusBgColors = {
    "Concluído": "bg-green-100",
    "Em andamento": "bg-blue-100",
    "Em atraso": "bg-red-100",
    "Pendente": "bg-yellow-100",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Status das Tarefas
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Tarefa</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Colaborador</th>
              </tr>
            </thead>
            <tbody>
              {tarefasMock.map(({ id, titulo, status, colaborador }) => (
                <tr key={id} className="hover:bg-gray-50 cursor-default">
                  <td className="border border-gray-300 px-4 py-2">{titulo}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 text-center font-semibold rounded ${statusBgColors[status] || ""}`}
                  >
                    {status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{colaborador}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
