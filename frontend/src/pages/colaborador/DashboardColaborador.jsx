import { useNavigate } from "react-router-dom";

export default function DashboardColaborador() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const abrirMinhasTarefas = () => navigate("/colaborador/tarefas");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Dashboard do Colaborador
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded p-6 text-center shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Minhas Tarefas</h2>
            <p className="text-gray-600 mb-4">Acesse suas tarefas e atualize o status conforme avança no fluxo.</p>
            <button
              onClick={abrirMinhasTarefas}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Ver Tarefas
            </button>
          </div>
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
