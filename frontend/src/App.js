import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

// Gerente
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
import PainelColaborador from './pages/colaborador/PainelColaborador';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gerencia/fluxo/:id" element={<VisualizarFluxo />} />
        <Route path="/gerencia/fluxo/:id/editar" element={<EditarFluxo />} />
        <Route path="/gerencia/criar-fluxo" element={<CriarFluxo />} />
        <Route path="/gerencia/criar-tarefa" element={<CriarTarefa />} />

        <Route path="/gerente/dashboard" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/gerente/fluxos-existentes" element={<FluxosExistentes />} />
        <Route path="/gerente/criar-fluxo" element={<CriarNovoFluxo />} />
        <Route path="/gerente/fluxos/:id/editar" element={<EditarFluxo />} />
        <Route path="/gerente/status-tarefas" element={<StatusTarefas />} />

        <Route path="/colaborador/dashboard" element={<DashboardColaborador />} />
        <Route path="/colaborador/tarefas" element={<PainelColaborador />} />
      


      </Routes>
    </BrowserRouter>
  );
}

export default App;
