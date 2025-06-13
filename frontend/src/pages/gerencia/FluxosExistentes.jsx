import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


export default function FluxosExistentes() {
  const [fluxos, setFluxos] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFluxos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/flows', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFluxos(response.data.data || []);
      } catch (err) {
        setErro(err.response?.data?.error || 'Erro ao buscar fluxos');
      }
    };

    fetchFluxos();
  }, []);

  const visualizarDetalhes = (id) => {
    navigate(`/gerencia/fluxo/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Fluxos Existentes</h2>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}

        {fluxos.length === 0 ? (
          <p className="text-gray-600 text-center">Nenhum fluxo encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fluxos.map((fluxo) => (
              <div
                key={fluxo.flowId}
                className="border border-gray-200 p-6 rounded shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{fluxo.name}</h3>
                {fluxo.description && (
                  <p className="text-gray-600 mb-2">{fluxo.description}</p>
                )}
                <p className={`mb-4 font-medium ${fluxo.active ? 'text-green-600' : 'text-red-500'}`}>
                  {fluxo.active ? 'Ativo' : 'Inativo'}
                </p>
                <button
                  onClick={() => visualizarDetalhes(fluxo.flowId)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Visualizar Detalhes
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
