import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import DashboardGuia from '../pages/DashboardGuia'; // Importa o DashboardGuia
import PrivateRouteGuia from './PrivateRouteGuia'; // Importa a rota privada para guias
import CadastroPasseio from '../pages/CadastroPasseio';
import ListagemPasseios from '../pages/ListagemPasseios';
import DetalhePasseio from '../pages/DetalhePasseio';
import Reservas from '../pages/Reservas'
import AvaliacaoPasseio from '../pages/AvaliacaoPasseio';

function AppRoutes() {
    return (
      <Routes>

         {/* Rota para Login */}
        <Route path="/login" element={<Login />} />

         {/* Rota para Cadastro de Usuário */}
        <Route path="/cadastro" element={<CadastroUsuario />} />

        {/* Rota para Cadastro de Novo Passeio - */}
        <Route path="/passeio/novo" element={<CadastroPasseio />} />

         {/* Rota para Listagem de Passeios */}
        <Route path="/passeios" element={<ListagemPasseios />} />

        {/* Rota para Detalhe de Passeio */}
        <Route path="/passeio/:id" element={<DetalhePasseio />} />

        <Route path="/reservas" element={<Reservas />} />

        <Route path="/avaliacoes/:id" element={<AvaliacaoPasseio />} />
        
        {/* Rota protegida para o Dashboard do Guia */}
        <Route
        path="/dashboard-guia"
        element={
          <PrivateRouteGuia>
            <DashboardGuia />
          </PrivateRouteGuia>
        }
      />
      </Routes>
    );
  }
  
  export default AppRoutes;