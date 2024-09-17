import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4">AP02 Web2024 - T02</h1>
            </div>
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h2 className="card-title mb-4">Alunos :</h2>
                    <h3 className="card-subtitle mb-2 text-muted">Marcelo Mikael - 536011</h3>
                    <h3 className="card-subtitle mb-2 text-muted">Renan Victor - 538428</h3>
                </div>
            </div>
        </div>
    );
}

export default Home;
