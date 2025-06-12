import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashboardGerente from './pages/gerencia/DashboardGerente';
import DashboardColaborador from './pages/colaborador/DashboardColaborador';
import FluxosExistentes from './pages/gerencia/FluxosExistentes';
import CriarNovoFluxo from './pages/gerencia/CriarNovoFluxo';
import StatusTarefas from './pages/gerencia/StatusTarefas';
import FlowBuilder from './pages/FlowBuilder';
import TaskList from './pages/TaskList';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/gerente/dashboard" element={<DashboardGerente />} />
                <Route path="/colaborador/dashboard" element={<DashboardColaborador />} />
                <Route path="/gerente/fluxos-existentes" element={<FluxosExistentes />} />
                <Route path="/gerente/criar-fluxo" element={<CriarNovoFluxo />} />
                <Route path="/gerente/status-tarefas" element={<StatusTarefas />} />
                <Route path="/flow-builder" element={<FlowBuilder />} />
                <Route path="/task-list" element={<TaskList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;