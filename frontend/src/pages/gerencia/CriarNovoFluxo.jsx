import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

export default function CriarFluxo() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [etapas, setEtapas] = useState([
    { id: uuidv4(), name: 'FAZER', responsible: '' },
  ]);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const tiposEtapa = ['FAZER', 'VERIFICAR', 'APROVAR'];

  const handleEtapaChange = (index, campo, valor) => {
    const novasEtapas = [...etapas];
    novasEtapas[index][campo] = valor;
    setEtapas(novasEtapas);
  };

  const adicionarEtapa = () => {
    setEtapas([...etapas, { id: uuidv4(), name: 'FAZER', responsible: '' }]);
  };

  const removerEtapa = (index) => {
    const novas = etapas.filter((_, i) => i !== index);
    setEtapas(novas);
  };

  const validarOrdemEtapas = () => {
    let encontrouVerificar = false;

    for (const etapa of etapas) {
      if (etapa.name === 'VERIFICAR') {
        encontrouVerificar = true;
      }
      if (etapa.name === 'APROVAR' && !encontrouVerificar) {
        return 'Etapa "APROVAR" só pode vir depois de uma "VERIFICAR".';
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (!nome.trim()) return setErro('O nome do fluxo é obrigatório.');
    if (etapas.length === 0) return setErro('Adicione pelo menos uma etapa.');
    if (etapas.some(etapa => !etapa.name || !etapa.responsible)) {
      return setErro('Todas as etapas devem ter tipo e responsável.');
    }

    const erroOrdem = validarOrdemEtapas();
    if (erroOrdem) return setErro(erroOrdem);

    try {
      await api.post('/flows/create', {
        name: nome,
        description: descricao,
        active: ativo,
        step: etapas
      });

      setMensagem('Fluxo criado com sucesso!');
      setTimeout(() => navigate('/gerente/fluxos-existentes'), 1500);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao criar fluxo');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Criar Novo Fluxo</h2>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
        {mensagem && <p className="text-green-600 text-center mb-4">{mensagem}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Nome do Fluxo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Descrição (opcional)</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Status</label>
            <select
              value={ativo}
              onChange={(e) => setAtivo(e.target.value === 'true')}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Etapas</label>
            {etapas.map((etapa, index) => (
              <div key={etapa.id} className="mb-3 border border-gray-200 p-4 rounded space-y-2">
                <select
                  value={etapa.name}
                  onChange={(e) => handleEtapaChange(index, 'name', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                >
                  {tiposEtapa.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Responsável (ID)"
                  value={etapa.responsible}
                  onChange={(e) => handleEtapaChange(index, 'responsible', e.target.value)}
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />

                <button
                  type="button"
                  onClick={() => removerEtapa(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remover etapa
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={adicionarEtapa}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2"
            >
              Adicionar Etapa
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Criar Fluxo
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
