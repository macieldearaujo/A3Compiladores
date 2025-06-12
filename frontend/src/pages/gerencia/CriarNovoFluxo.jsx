import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CriarNovoFluxo() {
  const navigate = useNavigate();

  const [nomeFluxo, setNomeFluxo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nomeFluxo.trim()) {
      setErro("O nome do fluxo é obrigatório.");
      return;
    }

    setErro("");
    alert(`Fluxo "${nomeFluxo}" criado com sucesso!`);
    navigate(-1);
  }

  function handleVoltar() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Criar Novo Fluxo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nomeFluxo" className="block text-gray-700 font-medium mb-1">
              Nome do Fluxo
            </label>
            <input
              id="nomeFluxo"
              type="text"
              value={nomeFluxo}
              onChange={(e) => setNomeFluxo(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do fluxo"
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="block text-gray-700 font-medium mb-1">
              Descrição (opcional)
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição do fluxo"
              rows={4}
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleVoltar}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
