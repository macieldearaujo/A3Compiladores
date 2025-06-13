import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

// Gerente
import DashboardGerente from './pages/gerencia/DashboardGerente';
import FluxosExistentes from './pages/gerencia/FluxosExistentes';
import CriarNovoFluxo from './pages/gerencia/CriarNovoFluxo';
import EditarFluxo from './pages/gerencia/EditarFluxo';
import StatusTarefas from './pages/gerencia/StatusTarefas';
import Dashboard from './pages/gerencia/DashboardGerente';
import DashboardColaborador from './pages/colaborador/DashboardColaborador';
import Cadastro from './pages/Cadastro';
import VisualizarFluxo from './pages/gerencia/VisualizarFluxos';
import CriarFluxo from './pages/gerencia/CriarNovoFluxo';
import CriarTarefa  from './pages/gerencia/CriarTarefas';

// Colaborador
import TarefasPendentes from './pages/colaborador/TarefasPendentes';
import TarefasConcluidas from './pages/colaborador/HistoricoTarefas';

// Extras/Futuras Funcionalidades
import FlowBuilder from './pages/FlowBuilder';
import TaskList from './pages/TaskList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/gerencia/fluxo/:id" element={<VisualizarFluxo />} />
        <Route path="/gerencia/fluxo/:id/editar" element={<EditarFluxo />} />
        <Route path="/gerencia/criar-fluxo" element={<CriarFluxo />} />
        <Route path="/gerencia/criar-tarefa" element={<CriarTarefa />} />
        



        {/* Gerente */}
        <Route path="/gerente/dashboard" element={<Dashboard />} />
        <Route path="/colaborador/dashboard" element={<DashboardColaborador />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/gerente/fluxos-existentes" element={<FluxosExistentes />} />
        <Route path="/gerente/criar-fluxo" element={<CriarNovoFluxo />} />
        <Route path="/gerente/fluxos/:id/editar" element={<EditarFluxo />} />
        <Route path="/gerente/status-tarefas" element={<StatusTarefas />} />

        {/* Colaborador */}
        <Route path="/colaborador/dashboard" element={<DashboardColaborador />} />
        <Route path="/colaborador/tarefas-pendentes" element={<TarefasPendentes />} />
        <Route path="/colaborador/tarefas-concluidas" element={<TarefasConcluidas />} />

        {/* Funcionalidades adicionais ou em desenvolvimento */}
        <Route path="/flow-builder" element={<FlowBuilder />} />
        <Route path="/task-list" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
