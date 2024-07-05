import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Home() {
    return (
        <div>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src="/img/img1.png" style={{ width: "500px", height: "500px" }} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="/img/img2.png" style={{ width: "500px", height: "500px" }} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="/img/img3.png" style={{ width: "500px", height: "500px" }} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src="/img/img4.png" style={{ width: "500px", height: "500px" }} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}
