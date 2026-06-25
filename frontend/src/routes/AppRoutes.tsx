import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../pages/DashboardPage";
import LotesPage from "../pages/LotesPage";
import CervejaPage from "../pages/CervejaPage";
import EstiloPage from "../pages/EstiloPage";
import TanquePage from "../pages/TanquePage";

export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout />} >

          <Route index element={<DashboardPage />} />
          <Route path="lotes" element={<LotesPage />} />
          <Route path="cervejas" element={<CervejaPage />} />
          <Route path="estilos" element={<EstiloPage />}/>
          <Route path="tanques" element={<TanquePage />}/>

        </Route>

      </Routes>

    </BrowserRouter>
  );
}