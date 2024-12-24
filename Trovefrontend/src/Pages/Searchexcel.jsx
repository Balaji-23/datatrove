import '../css/textinput.css';
import analyticslogo from '../assets/datasolve.png';
import Footer from '../Components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const apiURL = import.meta.env.VITE_BACKENDAPIURL;

export default function Searchexcel() {
  const [tables, setTables] = useState([]);
  const [selectedtable, setSelectedtable] = useState(null);
  const [isTableselected, setIstableselected] = useState(false);
  const [inputFields, setInputFields] = useState([{ dropdownValue: "", textBoxValue: '' }]);
  const [columns, setColumns] = useState([]);
  const [searchkeyword, setSearchkeyword] = useState("");
  const [searchresults, setSearchResults] = useState([]);
  const [selectedcolumn, setselectedcolumn] = useState("");
  const [inputvalue, setInputvalue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${apiURL}gettable/gettablesbutton`)
      .then((response) => {
        setTables(response.data.tables);
      }).catch((error) => {
        console.error("There was an error fetching tables", error);
      });
  }, []);

  const fetchtablecolumns = async (table) => {
    try {
      const response = await axios.post(`${apiURL}gettable/getcolumns`, { table });
      setColumns(response.data.tablecolumns);
    } catch (error) {
      console.error("Error fetching columns:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (index, field, value, event = null) => {
    const updatedFields = [...inputFields];
    // console.log("Field being updated:", field);

    if (field === "textBoxValue" && event) {
      const file = event.target.files[0]; // Get the file object
      // console.log("File selected:", file);
      updatedFields[index][field] = file; // Store the file object
    } else {
      // console.log("Value entered:", value);
      updatedFields[index][field] = value;
    }

    setInputFields(updatedFields);

    if (field === "dropdownValue") {
      setselectedcolumn(value);
      // console.log("Selected column updated to:", value);
    }
  };



  const fetchkeyworddetails = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('table', selectedtable);

      let fileUploaded = false;

      inputFields.forEach((field, index) => {
        // console.log("Processing field:", field);
        if (field.textBoxValue instanceof File) {
          formData.append('file', field.textBoxValue); // Add the file to FormData
          fileUploaded = true;

        }
      });

      if (!fileUploaded) {
        throw new Error('Please upload a valid Excel file.');
      }

      const response = await axios.post(`${apiURL}searchinputexcel/searchwithexcel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('Api response is:',response)
      setSearchResults(response.data.results || []);
      //  console.log("Response is:",response.data.results)
      setResults(response.data.results); // Enable download button
    } catch (error) {
      console.error('Error in fetching details:', error.response?.data || error.message);
    }
    finally {
      setLoading(false);
    }
  };







  useEffect(() => {
    if (searchkeyword) {
      fetchkeyworddetails(searchkeyword);
    } else {
      setSearchResults([]);
    }
  }, [searchkeyword]);

  useEffect(() => {
    if (selectedcolumn && inputvalue) {
      setSearchkeyword(`${selectedcolumn}: ${inputvalue}`);
    }
  }, [selectedcolumn, inputvalue]);



  const handleselectedtable = (tablename) => {
    if (selectedtable === tablename) {
      setSelectedtable(null);
      setIstableselected(false);
      setColumns([]);
      setSearchResults([]);
    } else {
      setSelectedtable(tablename);
      setIstableselected(true);
      fetchtablecolumns(tablename);
      setResults(null);
    }
  };

  const downloadexcel = () => {
    console.log("Results to be exported:", results);
    if (!results || !Array.isArray(results) || results.length === 0) {
      console.error("Invalid results format or no results available.");
      return; // Prevent download if results are invalid
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(results);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    XLSX.writeFile(workbook, 'Results.xlsx');
  };


  return (
    <div className='box'>
      <header className='header bg-white bg-gradient '>
        <div className="d-flex mb-4">
          <img src={analyticslogo} style={{ height: 70 }} className="mb-0 logo" />
          <form className="subnav-search d-flex flex-nowrap ms-auto container-fluid">
            <input
              className="form-control search m-2 "
              id="search"
              type="search"
              placeholder="Search"
              autoComplete="off"
              value={selectedcolumn ? `Selected column is: ${selectedcolumn} and ${selectedcolumn} File` : "Search the field"}
              onChange={(e) => setSearchkeyword(e.target.value)}

            />
            <div className='buttoncontainer'>
              <button type="button" className="btn btn-dark m-2" onClick={fetchkeyworddetails} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-search" viewBox="0 0 20 20">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </header>

      <aside>
        <div className='databasetables mt-2 p-2'>
          <h5>Select the Database Table</h5>
        </div>
        {
          tables.length > 0 ? (
            tables.map((table, index) => (
              <button key={index} className={selectedtable === table ? 'btn btn-dark mt-2 m-2 p-2' : "btn btn-primary mt-2 m-2 p-2"} type='button' onClick={() => handleselectedtable(table)} disabled={isTableselected && selectedtable !== table}>
                {table}
              </button>
            ))
          ) : (
            <p>Loading Tables ...</p>
          )
        }

        <div className="keywordsearch mt-3 p-2">
          <h5>Selected Database Columns</h5>
          {columns && columns.length > 0 ? (
            inputFields.map((input, index) => (
              <div className="col mb-2 align-items-center" key={index}>
                <select
                  className="form-select"
                  value={input.dropdownValue}
                  onChange={(e) => handleInputChange(index, 'dropdownValue', e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {columns.map((column, i) => (
                    <option key={i} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
                <div className="mt-4">
                  <input
                    type="file"
                    className="form-control"

                    name='file'
                    onChange={(e) => handleInputChange(index, 'textBoxValue', null, e)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Loading Columns...</p>
          )}
        </div>
        {/* <div className='row-md-4 m-3 text-center'>
          <button type='button' className='btn btn-danger me-2'>Remove    </button>
          <button type="button" className='btn btn-primary'>Add</button>
        </div> */}
      </aside>

      <main>
        <div className="d-flex mb-4">
          {/* <h4 id="icons" className="mb-0">{selectedtable ? `${selectedtable} Table Connected Successfully !` : "Database Table Not Connected"}</h4> */}
          <h2 className='mt-1'>Results</h2>
          <form className="subnav-search d-flex flex-nowrap ms-auto">
            <button type="button" className="btn btn-dark btn-outline bg-gradient downloadbutton" onClick={downloadexcel} disabled={!results || results.length === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 20 20">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.5 16 9.318c0-1.813-1.078-3.286-2.436-4.005a5.443 5.443 0 0 0-1.465-2.384A5.53 5.53 0 0 0 8 2zM5 9h2v5h3V9h2l-4 4-4-4z"></path>
              </svg> Download
            </button>
          </form>
        </div>

        <div className="mt-4" id="tableContainer">

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table table-secondary table-bordered table-striped table-hover text-center">
              <thead>
                <tr>
                  {Array.isArray(results) && results.length > 0
                    ? Object.keys(results[0]).map((columnName, index) => (
                      <th key={index}>{columnName}</th>
                    ))
                    : <th>No Data Available</th>
                  }
                </tr>
              </thead>
              <tbody>
                {Array.isArray(results) && results.length > 0 ? (
                  results.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cellValue, cellIndex) => (
                        <td key={cellIndex}>{cellValue}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length || 1}>No Results Found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
