import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTransaction from './pages/CreateTransaction';

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateTransaction />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
