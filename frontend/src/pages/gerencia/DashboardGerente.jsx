import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  function handleLogout() {

    navigate("/");
  }

  function abrirFluxosExistentes() {
    navigate("/gerente/fluxos-existentes");
  }

  function abrirCriarFluxo() {
    navigate("/gerente/criar-fluxo");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          CorpFlow - Dashboard do Gerente
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded p-6 text-center hover:shadow-lg cursor-pointer transition">
            <h2 className="text-xl font-semibold mb-2"
            onClick={abrirCriarFluxo}
            >Criar Novo Fluxo</h2>
            <p className="text-gray-600 mb-4">
              Monte um fluxo de trabalho do zero.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={abrirCriarFluxo}>
              Novo Fluxo
            </button>
          </div>

          <div className="border border-gray-300 rounded p-6 text-center hover:shadow-lg cursor-pointer transition">
            <h2 className="text-xl font-semibold mb-2">Fluxos Existentes</h2>
            <p className="text-gray-600 mb-4">
              Veja e edite fluxos já criados.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={abrirFluxosExistentes}>
              Meus Fluxos
            </button>
          </div>

          <div className="border border-gray-300 rounded p-6 text-center hover:shadow-lg cursor-pointer transition">
            <h2 className="text-xl font-semibold mb-2">Status das Tarefas</h2>
            <p className="text-gray-600 mb-4">
              Acompanhe andamento das tarefas dos colaboradores.
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Ver Status
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="text-red-600 hover:text-red-800 font-semibold" 
          onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
