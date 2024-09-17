import AlunoService from "../Services/AlunoService"
import FirebaseContext from "../Utils/FirebaseContext"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"

const ListarAlunosAgrupadosPorCurso = () => {
    const [alunosPorCurso, setAlunosPorCurso] = useState({})
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        AlunoService.listar(firebase.getFirestoreDb(), (alunos) => {
            const agrupados = alunos.reduce((acc, aluno) => {
                if (!acc[aluno.curso]) acc[aluno.curso] = [];
                acc[aluno.curso].push(aluno);
                return acc;
            }, {});

            setAlunosPorCurso(agrupados);
        });
    }, [firebase]);

    const handleDelete = (id) => {
        if (window.confirm(`Deseja excluir id = ${id}`)) {
            AlunoService.apagar(
                firebase.getFirestoreDb(),
                (response) => {
                    const result = alunosPorCurso.filter((aluno) => aluno.id !== id)
                    setAlunosPorCurso(result)
                },
                id
            )
        }
    }

    const renderizarAlunosPorCurso = () => {
        return Object.keys(alunosPorCurso).map((curso) => (
            <div key={curso}>
                <h2>{curso}</h2>
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">IRA</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunosPorCurso[curso].map((aluno) => {
                            const destaqueIra = Number(aluno.ira) >= 7;

                            return (
                                <tr
                                    key={aluno.id}
                                    style={{
                                        backgroundColor: destaqueIra ? 'lightgreen' : 'transparent'
                                    }}
                                >
                                    <th style={{
                                        backgroundColor: destaqueIra ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.4)'

                                    }} scope="row">{aluno.id}</th>
                                    <td style={{ backgroundColor: destaqueIra ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.4)'
, }}>
                                        {aluno.nome}
                                    </td>
                                    <td style={{ backgroundColor: destaqueIra ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.4)'
 }}>
                                        {aluno.ira}
                                    </td>
                                    <td style={{ backgroundColor: destaqueIra ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.4)'
 }}>
                                        <div className="button-content">
                                            <Link
                                                to={`/aluno/editar/${aluno.id}`}
                                                className="btn btn-primary"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(aluno.id)}
                                            >
                                                Apagar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        ));
    };

    return (
        <div className="page-content">
            <h1>Listar Alunos Agrupados por Curso</h1>
            {renderizarAlunosPorCurso()}
        </div>
    );
};

export default ListarAlunosAgrupadosPorCurso;
