import React from "react";
import { useNavigate } from "react-router-dom";

const fluxosMock = [
  { id: 1, nome: "Aprovação de Pedido", status: "Ativo" },
  { id: 2, nome: "Relatório Mensal", status: "Em revisão" },
  { id: 3, nome: "Cadastro de Fornecedor", status: "Concluído" },
];

export default function FluxosExistentes() {
  const navigate = useNavigate();

  function handleVoltar() {
    navigate(-1);
  }

  function handleEditar(id) {
    navigate(`/fluxos/${id}/editar`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Fluxos Existentes
        </h1>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Nome do Fluxo</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fluxosMock.map((fluxo) => (
              <tr key={fluxo.id} className="hover:bg-gray-100 cursor-pointer">
                <td className="border border-gray-300 px-4 py-2">{fluxo.nome}</td>
                <td className="border border-gray-300 px-4 py-2">{fluxo.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEditar(fluxo.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
