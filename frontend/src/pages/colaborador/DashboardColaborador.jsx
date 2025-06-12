import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardColaborador() {
    const navigate = useNavigate();
    function handleLogout() {

        navigate("/");
    }

    function handleTarefasPendentes() {
        navigate("/colaborador/tarefas-pendentes");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-3xl w-full bg-white p-8 rounded shadow">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                    CorpFlow - Dashboard do Colaborador
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="border border-gray-300 rounded p-6 text-center hover:shadow-lg cursor-pointer transition">
                        <h2 className="text-xl font-semibold mb-2">Minhas Tarefas Pendentes</h2>
                        <p className="text-gray-600 mb-4">
                            Veja as tarefas que você precisa executar.
                        </p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            onClick={handleTarefasPendentes}>
                            Ver Tarefas
                        </button>
                    </div>

                    <div className="border border-gray-300 rounded p-6 text-center hover:shadow-lg cursor-pointer transition">
                        <h2 className="text-xl font-semibold mb-2">Tarefas Concluídas</h2>
                        <p className="text-gray-600 mb-4">
                            Confira o histórico de tarefas já finalizadas.
                        </p>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Histórico
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
