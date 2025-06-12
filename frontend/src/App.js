import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FlowBuilder from './pages/FlowBuilder';
import TaskList from './pages/TaskList';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/flow-builder" element={<FlowBuilder />} />
                <Route path="/task-list" element={<TaskList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;