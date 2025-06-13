import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function CriarTarefa() {
  const navigate = useNavigate();
  const [fluxos, setFluxos] = useState([]);
  const [fluxoSelecionado, setFluxoSelecionado] = useState(null);
  const [etapas, setEtapas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [stepId, setStepId] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [prazo, setPrazo] = useState("");

  useEffect(() => {
    async function fetchFluxos() {
      try {
        const { data } = await api.get("/flows");
        setFluxos(data.data);
      } catch (err) {
        setErro("Erro ao buscar fluxos");
      }
    }
    fetchFluxos();
  }, []);

  const handleFluxoChange = (id) => {
    const fluxo = fluxos.find((f) => f.flowId === id);
    setFluxoSelecionado(fluxo);
    setEtapas(fluxo?.step || []);
    setStepId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagem("");

    if (!titulo || !responsavel || !fluxoSelecionado || !stepId || !prazo) {
      return setErro("Preencha todos os campos obrigatórios.");
    }

    const etapaSelecionada = etapas.find((etapa) => etapa.id === stepId);
    if (!etapaSelecionada) return setErro("Etapa inválida");

    const novaTarefa = {
      taskId: uuidv4(),
      title: titulo,
      description: descricao,
      responsible: responsavel,
      status: "pendente",
      deadline: prazo,
      flowId: fluxoSelecionado.flowId,
      stepId: etapaSelecionada.id,
      stepName: etapaSelecionada.name,
    };

    try {
      await api.post("/tasks/create", novaTarefa);
      setMensagem("Tarefa criada com sucesso!");
      setTimeout(() => navigate("/gerencia/criar-tarefa"), 1500);
    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao criar tarefa");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Criar Nova Tarefa
        </h2>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
        {mensagem && (
          <p className="text-green-600 text-center mb-4">{mensagem}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título da tarefa"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            rows={2}
          />

          <input
            type="text"
            placeholder="ID do responsável"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          <select
            value={fluxoSelecionado?.flowId || ""}
            onChange={(e) => handleFluxoChange(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          >
            <option value="">Selecione um fluxo</option>
            {fluxos.map((f) => (
              <option key={f.flowId} value={f.flowId}>
                {f.name}
              </option>
            ))}
          </select>

          {etapas.length > 0 && (
            <select
              value={stepId}
              onChange={(e) => setStepId(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            >
              <option value="">Selecione uma etapa</option>
              {etapas.map((step) => (
                <option key={step.id} value={step.id}>
                  {step.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Criar Tarefa
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
