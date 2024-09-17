import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Criar from "./Aluno/Criar";
import Editar from "./Aluno/Editar";
import Listar from "./Aluno/Listar";

import MyNavbar from "../MyNavbar";
import Home from "./Home";

import Firebase from "./Utils/Firebase";
import FirebaseContext from "./Utils/FirebaseContext";
import ListarAlunosPorCurso from "./Aluno/ListarAlunosPorCurso";

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MyNavbar />,
            children: [
                {
                    path: "/aluno/criar",
                    element: <Criar />
                },
                {
                    path: "/aluno/editar/:id",
                    element: <Editar />
                },
                {
                    path: "/aluno/listar",
                    element: <Listar />
                },
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/aluno/listarAlunosPorCurso",
                    element: <ListarAlunosPorCurso />
                }
            ]
        }
    ]
)

const Main = () => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider router={Router} />

        </FirebaseContext.Provider>
    )
}

export default Main