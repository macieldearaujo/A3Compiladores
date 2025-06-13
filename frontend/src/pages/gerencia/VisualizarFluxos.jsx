import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

export default function VisualizarFluxo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fluxo, setFluxo] = useState(null);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const buscarFluxo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/flows/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFluxo(response.data.data);
      } catch (err) {
        setErro(err.response?.data?.error || 'Erro ao buscar fluxo');
      }
    };

    buscarFluxo();
  }, [id]);

  const excluirFluxo = async () => {
    const confirmado = window.confirm("Tem certeza que deseja excluir este fluxo?");
    if (!confirmado) return;

    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(`/flows/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMensagem(response.data.message || 'Fluxo excluído com sucesso');
      setTimeout(() => navigate('/gerente/fluxos-existentes'), 2000);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao excluir fluxo');
    }
  };

  const editarFluxo = () => {
    navigate(`/gerencia/fluxo/${id}/editar`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
        {mensagem && <p className="text-green-600 text-center mb-4">{mensagem}</p>}

        {!erro && !fluxo && (
          <p className="text-gray-600 text-center">Carregando fluxo...</p>
        )}

        {fluxo && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">{fluxo.name}</h2>
            {fluxo.description && <p className="text-gray-600 text-center mb-4">{fluxo.description}</p>}
            <p className={`text-center font-medium mb-6 ${fluxo.active ? 'text-green-600' : 'text-red-500'}`}>
              Status: {fluxo.active ? 'Ativo' : 'Inativo'}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">Etapas:</h3>
            <ul className="space-y-3">
              {fluxo.step.map((etapa, index) => (
                <li key={etapa.id} className="border border-gray-200 p-4 rounded">
                  <p><span className="font-medium">Etapa {index + 1}:</span> {etapa.name}</p>
                  <p className="text-sm text-gray-600">Responsável: {etapa.responsible}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-between flex-wrap gap-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Voltar
              </button>

              <button
                onClick={editarFluxo}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Editar Fluxo
              </button>

              <button
                onClick={excluirFluxo}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Excluir Fluxo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}