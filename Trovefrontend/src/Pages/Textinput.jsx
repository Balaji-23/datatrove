import '../css/textinput.css'
import analyticslogo from '../assets/datasolve.png'
import Footer from '../Components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';



const apiURL = import.meta.env.VITE_BACKENDAPIURL;
console.log("Api:", apiURL)

export default function Textinput() {

  const [tables, setTables] = useState([])
  const [selectedtable, setSelectedtable] = useState(null);
  const [isTableselected, setIstableselected] = useState(false)
  const [inputFields, setInputFields] = useState([{ dropdownValue: "", textBoxValue: '' }]);
  const [columns, setColumns] = useState([]);
  const [searchkeyword, setSearchkeyword] = useState("");
  const [searchresults, setSearchResults] = useState([])

  const [selectedcolumn, setselectedcolumn] = useState("");
  const [inputvalue, setInputvalue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${apiURL}gettable/gettablesbutton`)
      .then((response) => {
        // console.log("response is:",response)
        setTables(response.data.tables)
        // console.log("Settables is:",response.data.tables)
      }).catch((error) => {
        console.error("There was an error to fetching tables", error)
      })

  }, [])

  const fetchtablecolumns = async (table) => {
    try {
      const response = await axios.post(`${apiURL}gettable/getcolumns`, {
        table: table,
      });
      setColumns(response.data.tablecolumns); // Update state with fetched columns
      // console.log('Fetched columns:', response.data.tablecolumns);
    } catch (error) {
      console.error("Error fetching columns:", error.response?.data || error.message);
    }
  };

  //one input with one column 


  // const fetchkeyworddetails = async () => {

  //   try {

  //     const fields = inputFields.map((field) => ({
  //       key: field.dropdownValue,
  //       value: field.textBoxValue
  //     }))
  //     const response = await axios.post(`${apiURL}keywordsearch/searchfields`, {
  //       tablename: selectedtable,
  //       fields

  //     })
  //     setSearchResults(response.data.keywordsearch || [])
  //     console.log(response.data.keywordsearch)
  //   }
  //   catch (error) {
  //     console.log('Error in fetching the necessary details:', error.response?.data || error.message)
  //   }
  // }


  const fetchkeyworddetails = async () => {
    setLoading(true)
    try {
      // Map the inputFields to match the backend's expected structure
      const fields = inputFields.map((field) => ({
        key: field.dropdownValue,
        value: field.textBoxValue
      }));

      // Send the request to the backend to fetch the search results
      const response = await axios.post(`${apiURL}keywordsearch/searchfields`, {
        tablename: selectedtable,
        fields
      });

      // Update the search results state with the response data
      setSearchResults(response.data.keywordsearch || []);
      console.log(response.data.keywordsearch); // Debug the response data
    } catch (error) {
      console.error('Error in fetching the necessary details:', error.response?.data || error.message);
    }
    finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (selectedcolumn && inputvalue) {
      setSearchkeyword(`${selectedcolumn}: ${inputvalue}`);
    }
  }, [selectedcolumn, inputvalue]);



  // const handleAddRow = () => {
  //   setInputFields([...inputFields, { dropdownValue: '', textBoxValue: '' }]);
  // };

  // const handleRemoveRow = (index) => {
  //   const updatedFields = inputFields.filter((_, i) => i !== index);
  //   setInputFields(updatedFields);
  // };

  // const handleInputChange = (index, field, value) => {
  //   const updatedFields = [...inputFields];
  //   updatedFields[index][field] = value;
  //   setInputFields(updatedFields);

  //   if (field === "dropdownValue") {
  //     setselectedcolumn(value)
  //   }
  //   if (field === "textBoxValue") {
  //     setInputvalue(value)
  //   }
  // };

  const handleAddRow = () => {
    setInputFields([...inputFields, { dropdownValue: '', textBoxValue: '' }]);
    updateSearchKeyword();
  };

  const handleRemoveRow = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
    updateSearchKeyword();
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index][field] = value;
    setInputFields(updatedFields);
    updateSearchKeyword();
  };

  const updateSearchKeyword = () => {
    // Update the search keyword based on all input fields
    const keyword = inputFields
      .map((field) => {
        if (field.dropdownValue && field.textBoxValue) {
          return `${field.dropdownValue}: ${field.textBoxValue}`;
        }
        return '';
      })
      .filter(Boolean) // Remove any empty strings
      .join(' | '); // Join all the fields with " | "

    setSearchkeyword(keyword);
  };



  const handleselectedtable = (tablename) => {
    if (selectedtable === tablename) {
      setSelectedtable(null)
      setIstableselected(false)
      setColumns([])
      setSearchResults([])
    }
    else {
      setSelectedtable(tablename);
      setIstableselected(true)
      fetchtablecolumns(tablename)
    }

  }

  const downloadexcel = () => {

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(searchresults);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet')
    XLSX.writeFile(workbook, 'Results.xlsx')

  }


  return (
    <div className='box'>


      <header className='header bg-white bg-gradient '>
        <div className="d-flex mb-4">
          <img src={analyticslogo} style={{ height: 70 }} className="mb-0 logo" />
          <form className="subnav-search d-flex flex-nowrap ms-auto container-fluid">

            <input className="form-control search m-2 " id="search" type="search" placeholder="Search" autoComplete="off" value={searchkeyword ? `Search: ${searchkeyword}` : "Search the field"} onChange={(e) => setSearchkeyword(e.target.value)} />
            <div className='buttoncontainer '>
              <button type="button" className="btn btn-dark m-2" onClick={fetchkeyworddetails} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-search" viewBox="0 0 20 20">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg></button>

              <button type="button" className="btn btn-dark m-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-sort-down" viewBox="0 0 10 15">
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"></path>
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
              <button key={index} className={selectedtable === table ? 'btn btn-dark mt-2 m-2 p-2' : "btn btn-primary mt-2 m-2 p-2"} type='button' onClick={() => handleselectedtable(table)} disabled={isTableselected && selectedtable !== table} >
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
                    type="text"
                    className="form-control"
                    placeholder="Enter keyword"
                    value={input.textBoxValue}
                    onChange={(e) => handleInputChange(index, 'textBoxValue', e.target.value)}
                  />
                </div>

                <div className="row-md-4 m-3 text-center">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => handleRemoveRow(index)}
                    disabled={inputFields.length === 1}
                  >
                    Remove
                  </button>
                  {index === inputFields.length - 1 && (
                    <button type="button" className="btn btn-primary" onClick={handleAddRow}>
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Loading Columns...</p>
          )}
        </div>


      </aside>






      <main>
        <div className="d-flex mb-4">
          {/* <h4 id="icons" className="mb-0">{selectedtable ? `${selectedtable} Table Connected Successfully !` : " Database Table Not Connected"}</h4> */}
          <h2 className='mt-1'>Results</h2>
          <form className="subnav-search d-flex flex-nowrap ms-auto">
            <button type="button" className="btn btn-dark bg-gradient downloadbutton  " onClick={downloadexcel} disabled={!searchresults|| searchresults.length === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 20 20">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708"></path>
              </svg>Download</button>
          </form>
        </div>

        {/* <div className="container mt-3">
          <h2>Results</h2>


          {searchresults.length > 0 ? (
            <table className="table table-bordered table-light">
              <thead>
                <tr>
                  {Object.keys(searchresults[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchresults.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p>
          )}

        </div> */}
        <div className="container">

          {loading ? (
            <div className='text-center'>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            </div>
          ) : searchresults.length > 0 ? (
            <table className="table table-secondary table-bordered table-striped table-hover">
              <thead>
                <tr>
                  {Object.keys(searchresults[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {searchresults.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p>
          )}
        </div>


      </main>
     <Footer />

    </div>

  )
}