import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Dashboard do Gerente
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card
            titulo="Criar Fluxo"
            descricao="Monte um novo fluxo de trabalho."
            corBotao="bg-blue-600 hover:bg-blue-700"
            textoBotao="Novo Fluxo"
            onClick={() => navigate("/gerente/criar-fluxo")}
          />
          <Card
            titulo="Fluxos Existentes"
            descricao="Gerencie fluxos já criados."
            corBotao="bg-green-600 hover:bg-green-700"
            textoBotao="Meus Fluxos"
            onClick={() => navigate("/gerente/fluxos-existentes")}
          />
          <Card
            titulo="Status das Tarefas"
            descricao="Acompanhe o andamento das tarefas."
            corBotao="bg-purple-600 hover:bg-purple-700"
            textoBotao="Ver Status"
            onClick={() => navigate("/gerente/status-tarefas")}
          />
          <Card
            titulo="Criar Tarefa"
            descricao="Atribua uma nova tarefa a um colaborador."
            corBotao="bg-yellow-500 hover:bg-yellow-600"
            textoBotao="Nova Tarefa"
            onClick={() => navigate("/gerencia/criar-tarefa")}
          />
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-semibold transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({ titulo, descricao, corBotao, textoBotao, onClick }) {
  return (
    <div className="border border-gray-200 rounded p-6 text-center shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-medium text-gray-800 mb-2">{titulo}</h2>
      <p className="text-gray-600 mb-4">{descricao}</p>
      <button
        onClick={onClick}
        className={`w-full text-white py-2 rounded transition ${corBotao}`}
      >
        {textoBotao}
      </button>
    </div>
  );
}
