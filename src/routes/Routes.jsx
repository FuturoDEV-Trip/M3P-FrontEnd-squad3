import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import { EditLocation } from "../pages/EditLocations/Editar";
import Locations from "../pages/Locations/Locations";
import RegistrationLocation from "../pages/RegisterLocations/RegisterLocations";
import Login from "../pages/SignIn/Login";
import SignUp from "../pages/SignUp/SignUp";

export const AppRoutes = createBrowserRouter([
  {
    path: "/", // Dashboard como a página inicial e pública
    element: <Dashboard />,
  },
  {
    path: "/login", // Página de login
    element: <Login />,
  },
  {
    path: "/signup", // Página de cadastro
    element: <SignUp />,
  },
  {
    path: "/dashboard", // Manter o dashboard acessível e outras rotas privadas
    element: <PrivateRoute />, // Protegendo as rotas filhas com PrivateRoute
    children: [
      {
        path: "", // Essa rota serve para acessar o dashboard
        element: <Dashboard />,
      },
      {
        path: "cadastrarLocais",
        element: <RegistrationLocation />,
      },
      {
        path: "locais/:id",
        element: <EditLocation />,
      },
      {
        path: "tabelaLocais",
        element: <Locations />,
      },
    ],
  },
]);

export default AppRoutes;
// export function AppRoutes() {
//   return (

//       {
//         path: "/dashboard",
//         element: <PrivateRoute />,
//         children: [
//           {
//             path:'/dashboard',
//             element: <Dashboard />,

//           },
//       //     {
//       //       path:'/dashboard/locais',
//       //       element:<Locais/>,
//       // },
//       {
//         path:'/dashboard/locais/:id',
//         element: <Locais/>
//       },
//         ],
//       },

//       // { <Routes>
//       // <Route path="/" element={<Login />} />
//       // <Route path="/SignUp" element={<SignUp />} />
//         /* <Route path="/Dashboard" element={<PrivateRoute />}>
//         <Route index element={<Dashboard />} />
//         <Route path="locais/:id" element={<Locais />} />
//       </Route> }*/
//     // </Routes>
//   );
// }
