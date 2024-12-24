import { useNavigate } from "react-router-dom";

export default function Gridcards() {
  // Function to navigate to external URLs
 
 const navigate=useNavigate();

  function gotochatsql() {
    window.location.href = "https://troveapp-jja2bzppva-uc.a.run.app/";
  }
  function handleelicita(){
    window.location.href = "https://datasolve-webapp.el.r.appspot.com/"
  }
  function handletextinputsearch(){
    navigate("/textinputsearch")
  }
  function handlesearchwithexcel(){
    navigate('/searchwithexcel')
  }

  return (
    <>
      <div className="container mt-5 mb-5 " >
        <div className="row row-cols-1 row-cols-md-3 g-4 ">
          {/* Chat with SQL Card */}
          <div className="col">
            <div className="card bg-dark bg-gradient text-white">
              <div className="card-body">
                <h3 className="card-title text-center fw-bold">Chat with SQL</h3>
                <p
                  className="card-text-justify text-justify "
                  style={{ textAlign: "justify" }}
                >
                  ChatSQL is a powerful tool that transforms natural language
                  questions into SQL queries, making database interaction
                  seamless and accessible. It allows users to explore, retrieve,
                  and analyze data without requiring technical SQL skills. By
                  bridging the gap between plain language and databases, ChatSQL
                  simplifies data-driven decision-making for everyone.
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-info bg-gradient"
                    onClick={gotochatsql}
                  >
                    Chat With SQL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Text Input Search Card */}
          <div className="col">
            <div className="card bg-dark bg-gradient text-white">
              <div className="card-body">
                <h3 className="card-title text-center fw-bold">
                  Elicita App
                </h3>
                <p
                  className="card-text-justify"
                  style={{ textAlign: "justify" }}
                >
                  Text Input Search is a simple and effective way to find data
                  by typing keywords or phrases into a search bar. It
                  dynamically filters results in real-time, making it ideal for
                  quick data retrieval. This feature enhances user experience by
                  providing instant, accurate results in an intuitive and
                  user-friendly manner.
                </p>
                <div className="text-center">
                  <button className="btn btn-info bg-gradient" onClick={handleelicita}>
                    Elicita App
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search With Excel Card */}
          <div className="col">
            <div className="card bg-dark bg-gradient text-white">
              <div className="card-body">
                <h3 className="card-title text-center fw-bold">
                  Search With Excel
                </h3>
                <p
                  className="card-text-justify"
                  style={{ textAlign: "justify" }}
                >
                  Search with Excel using Input Tags lets users filter and
                  retrieve data by entering criteria through input fields and
                  export the results to an Excel file. This feature simplifies
                  data querying, enhances usability, and provides an efficient
                  way to manage and share data dynamically, catering to diverse
                  user needs efficiently.
                </p>
                <div className="text-center">
                  <button className="btn btn-info bg-gradient" onClick={handlesearchwithexcel}>
                    Search With Excel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Web App Card */}
          <div className="col">
            <div className="card bg-dark bg-gradient text-white">
              <div className="card-body">
                <h3 className="card-title text-center fw-bold">
                  Tools Web App
                </h3>
                <p
                  className="card-text-justify"
                  style={{ textAlign: "justify" }}
                >
                  Search with Excel using Input Tags lets users filter and
                  retrieve data by entering criteria through input fields and
                  export the results to an Excel file. This feature simplifies
                  data querying, enhances usability, and provides an efficient
                  way to manage and share data dynamically, catering to diverse
                  user needs efficiently.
                </p>
                <div className="text-center">
                  <button className="btn btn-info bg-gradient ">Tools Web App</button>
                </div>
              </div>
            </div>
          </div>


  {/* Text input search */}
  <div className="col">
            <div className="card bg-dark bg-gradient text-white">
              <div className="card-body">
                <h3 className="card-title text-center fw-bold">
                  Text Input Search
                </h3>
                <p
                  className="card-text-justify"
                  style={{ textAlign: "justify" }}
                >     
A text input search using a form allows users to enter queries into a text field and submit them via a button or key press to search for specific data dynamically. It is commonly used for filtering or retrieving information from a database, interactive, and precise search functionality in modern applications or websites.</p>
                <div className="text-center">
                  <button className="btn btn-info bg-gradient " onClick={handletextinputsearch}>Text input search</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
