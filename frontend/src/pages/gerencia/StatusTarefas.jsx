import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default function StatusTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const statusBgColors = {
    "concluída": "bg-green-100 text-green-800",
    "em andamento": "bg-blue-100 text-blue-800",
    "em atraso": "bg-red-100 text-red-800",
    "pendente": "bg-yellow-100 text-yellow-800",
  };

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTarefas(response.data.data || []);
      } catch (err) {
        setErro(err.response?.data?.error || "Erro ao carregar tarefas");
      }
    };

    carregarTarefas();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-4xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Status das Tarefas
        </h2>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}

        {tarefas.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhuma tarefa encontrada.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tarefas.map(({ taskId, title, status, responsible }) => (
              <li
                key={taskId}
                className="py-4 px-2 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                  <p className="text-sm text-gray-500">Responsável: {responsible}</p>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded ${statusBgColors[status] || "bg-gray-100 text-gray-600"}`}
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline font-medium"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
