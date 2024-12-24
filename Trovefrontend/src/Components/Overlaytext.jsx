import '../css/overlaytext.css';

export default function Overlaytext() {
  return (
    <div className="card text-bg-dark mt-3">
      <img 
        src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
        className="card-img" 
        alt="Mission Background"
      />
      <div className="card-img-overlay">
        <h2 className="card-text fw-bold text-center text-white lh-lg">
          Our mission is to deliver unparalleled value to clients through subject expertise and process excellence!
        </h2>
        <h3 className="text-center lh-lg text-white ">
          DataSolve is a global solutions provider in the areas of Analytics, Knowledge and Business solutions. 
          DataSolve was founded by a team of seasoned professionals and adept subject experts from the industry. 
          DataSolve provides a wide range of offerings including Data Science, Machine Learning, IPR, Informatics, 
          Medical Communications, Market Intelligence and Marketing solutions serving various geographic markets and industry verticals.
        </h3>
      </div>
    </div>
  );
}
