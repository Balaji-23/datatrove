import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import analyticslogo from '../assets/datasolve.png';
import trovegif from '../assets/Trove.gif';
import signupimg from '../assets/signup.png';
import '../css/signup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKENDAPIURL;
console.log("Api:",apiURL)




export default function Signup() {
  const [formdata, setFormdata] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onchangefunction = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const validateform = () => {
    const usernameregex = /^[A-Za-z\s]+$/;
    const domainemailregex = /@datasolve-analytics\.com$/;

    if (!formdata.username) {
      toast.error("Username is Required!");
      return false;
    }
    if (!usernameregex.test(formdata.username)) {
      toast.error('Username must contain only alphabets');
      return false;
    }

    if (!formdata.email) {
      toast.error("Please Enter the Email address!");
      return false;
    }
    if (!domainemailregex.test(formdata.email)) {
      toast.error('Invalid email address!');
      return false;
    }

    if (!formdata.password) {
      toast.error("Password is Required!");
      return false;
    }
    if (formdata.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  // const handlesignup = async (e) => {
  //   e.preventDefault();

  //   if (validateform()) {
  //     setLoading(true);
  //     setProgress(30);
  //     try {
  //       const response = await axios.post(`${apiURL}/auth/signup`, formdata, {
  //         onUploadProgress: (progressEvent) => {
  //           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //           setProgress(percentCompleted);
  //         },
  //       });
       
  //       setProgress(100);
  //       setLoading(false);
  //       toast.success(response.data.message);
  //       setTimeout(() => navigate("/enterotp", { state: { email: formdata.email } }));
  //     } catch (error) {
  //       setLoading(false);
  //       setProgress(0);
  //       toast.error(error.response?.data?.data.message || "An error occurred, please try again.");
  //       console.error("Error is:",error)
  //     } finally {
  //       setTimeout(() => {
  //         setProgress(0);
  //         setLoading(false);
  //       }, 2000);
  //     }
  //   }
  // };

  const handlesignup = async (e) => {
    e.preventDefault();
  
    if (validateform()) {
      setLoading(true);
      setProgress(30);
      try {
        const response = await axios.post(`${apiURL}/auth/signup`, formdata, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });
  
        setProgress(100);
        setLoading(false);
        toast.success(response.data.message);
        setTimeout(() => navigate("/enterotp", { state: { email: formdata.email } }));
      } catch (error) {
        setLoading(false);
        setProgress(0);
  
        // Check for error.response object to avoid TypeError
        if (error.response) {
          // Handle server-side error
          toast.error(error.response?.data?.message || "An error occurred, please try again.");
        } else if (error.request) {
          // Handle no response from server
          toast.error("No response from the server. Please check your network connection.");
        } else {
          // Catch other errors
          toast.error("Error: " + error.message);
        }
        console.error("Error details:", error);
      } finally {
        setTimeout(() => {
          setProgress(0);
          setLoading(false);
        }, 2000);
      }
    }
  };
  

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  //src={signupimg}
                  src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?ga=GA1.1.1708815232.1728220913&semt=ais_hybrid"
                  alt="signupimg"
                  className="img-fluid"
                  style={{ borderradius: '1rem 0 0 1rem', objectFit: 'contain' }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <span className="h1 fw-bold mb-0">
                        <img src={analyticslogo} style={{ height: 60 }} />
                        <img src={trovegif} alt="" style={{ height: 60, margin: 10 }} />
                      </span>
                    </div>
                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                      Sign up your account
                    </h5>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="username">
                        Username<span className="required"> * </span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        name="username"
                        value={formdata.username}
                        onChange={onchangefunction}
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        Email address <span className="required"> * </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email address"
                        name="email"
                        value={formdata.email}
                        onChange={onchangefunction}
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password <span className="required"> * </span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        name="password"
                        value={formdata.password}
                        onChange={onchangefunction}
                        autoComplete="off"
                      />
                    </div>

                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="button"
                        onClick={handlesignup}
                        disabled={loading}
                      >
                        {loading ? "Submitting.." : "Signup"}
                      </button>

                      <a className="small text-muted m-4" href="#!">Forgot password?</a>
                      <p className="mb-5 mt-4 pb-lg-2 text-muted">You have an account? <Link to="/login"
                        style={{ color: "#393f81" }}>Sign in here</Link></p>
                      <a href="#!" className="small text-muted">Terms of use.</a>
                      <a href="#!" className="small text-muted">Privacy policy</a>
                    </div>
                  </form>

                  {loading && (
                    <div className='progress mt-3' style={{ height: "25px" }}>
                      <div className='progress-bar progress-bar-striped progress-bar-animated' role='progress' style={{ width: `${progress}%` }}>
                        {progress}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
