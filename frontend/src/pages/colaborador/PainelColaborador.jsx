import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function TarefasColaborador() {
  const [tarefasPorFluxo, setTarefasPorFluxo] = useState({});
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const { data } = await api.get("/tasks");
        const agrupado = {};

        for (const tarefa of data.data) {
          if (!agrupado[tarefa.flowId]) agrupado[tarefa.flowId] = [];
          agrupado[tarefa.flowId].push(tarefa);
        }

        setTarefasPorFluxo(agrupado);
      } catch (err) {
        setErro("Erro ao buscar tarefas");
      }
    }
    fetchTarefas();
  }, []);

  const atualizarStatus = async (taskId, novoStatus) => {
    try {
      setErro("");
      setMensagem("");
      await api.patch(`/tasks/${taskId}`, { status: novoStatus });
      setMensagem("Status atualizado com sucesso!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setErro(
        err.response?.data?.error || "Erro ao atualizar status da tarefa"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Minhas Tarefas
        </h1>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
        {mensagem && <p className="text-green-600 text-center mb-4">{mensagem}</p>}

        {Object.keys(tarefasPorFluxo).length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma tarefa atribuída.</p>
        ) : (
          Object.entries(tarefasPorFluxo).map(([fluxoId, tarefas]) => (
            <div key={fluxoId} className="mb-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                Fluxo: {tarefas[0]?.flowName || fluxoId}
              </h2>
              <div className="grid gap-4">
                {tarefas.map((tarefa) => (
                  <div
                    key={tarefa.taskId}
                    className="border p-4 rounded shadow-sm bg-gray-50"
                  >
                    <p className="text-lg font-medium">{tarefa.title}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Etapa: {tarefa.stepName} | Status: {tarefa.status}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Prazo: {new Date(tarefa.deadline).toLocaleDateString()}
                    </p>
                    {tarefa.status !== "concluída" && (
                      <button
                        onClick={() => atualizarStatus(tarefa.taskId, "concluída")}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Marcar como concluída
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
