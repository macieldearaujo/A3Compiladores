import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const fluxosMock = [
  { id: 1, nome: "Aprovação de Pedido", etapas: ["Verificar Pedido", "Aprovar Pedido"], status: "Ativo" },
  { id: 2, nome: "Relatório Mensal", etapas: ["Escrever Relatório", "Revisar", "Enviar"], status: "Em revisão" },
  { id: 3, nome: "Cadastro de Fornecedor", etapas: ["Preencher Dados", "Validar Documentos"], status: "Concluído" },
];

export default function EditarFluxo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [etapas, setEtapas] = useState([""]);
  const [status, setStatus] = useState("Ativo");

  useEffect(() => {
    const fluxo = fluxosMock.find((f) => f.id === parseInt(id));
    if (fluxo) {
      setNome(fluxo.nome);
      setEtapas(fluxo.etapas);
      setStatus(fluxo.status);
    }
  }, [id]);

  const handleEtapaChange = (index, value) => {
    const novasEtapas = [...etapas];
    novasEtapas[index] = value;
    setEtapas(novasEtapas);
  };

  const adicionarEtapa = () => {
    setEtapas([...etapas, ""]);
  };

  const removerEtapa = (index) => {
    const novasEtapas = etapas.filter((_, i) => i !== index);
    setEtapas(novasEtapas);
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log("Fluxo atualizado:", { nome, etapas, status });
    navigate("/fluxos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Editar Fluxo
        </h1>

        <form onSubmit={handleSalvar} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nome do Fluxo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Etapas do Fluxo
            </label>
            {etapas.map((etapa, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={etapa}
                  onChange={(e) => handleEtapaChange(index, e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removerEtapa(index)}
                  className="ml-2 text-red-600 hover:text-red-800 font-bold"
                  title="Remover etapa"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarEtapa}
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded transition"
            >
              + Adicionar Etapa
            </button>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Ativo</option>
              <option>Em revisão</option>
              <option>Concluído</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
