

// import { useState } from 'react';
// import axios from 'axios';
// import datasolvelogo from '../assets/datasolve.png';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import '../css/otpcomponent.css';

// export default function Otpcomponent() {
//   const location = useLocation();
//   const navigate = useNavigate(); // Initialize useNavigate for navigation
//   const [otp, setOtp] = useState(Array(6).fill('')); // Store OTP input values
//   const [email, setEmail] = useState(location.state?.email || ''); // Get email from navigation state or default to empty
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0); // Track progress
//   const [redirecting, setRedirecting] = useState(false); // Track redirection state

//   // Handle OTP input change
//   const handleOtpChange = (e, index) => {
//     const value = e.target.value;
//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);
//   };

//   // Validate OTP (basic check)
//   const validateOtp = () => {
//     if (otp.some((digit) => digit === '')) {
//       toast.error('Please enter all OTP digits');
//       return false;
//     }
//     return true;
//   };

//   // Handle OTP submission
  
//   const handleOtpSubmit = async () => {
//     if (!email) {
//       toast.error("Email is required!");
//       return; // Stop execution if email is not provided
//     }
  
//     if (!validateOtp()) return;
  
//     const otpCode = otp.join(''); // Join the OTP array into a string
  
//     setLoading(true);
//     setProgress(25); // Start progress bar at 25%
//     try {
//       const response = await axios.post('http://localhost:5000/auth/verifyemail', {
//         email, // Pass email from the state
//         otp: otpCode,
//       });
  
//       setProgress(100); // Complete progress bar when OTP is verified
  
//       // On successful OTP verification
//       toast.success(response.data.message);
  
//       // Add a longer delay before redirecting (e.g., 5 seconds)
//       setTimeout(() => {
//         setOtp(Array(6).fill('')); // Clear OTP input fields
//         setRedirecting(true); // Set redirection flag
//         navigate("/login"); // Navigate to login page after OTP is verified
//       }, 5000); // Increase the delay to 5 seconds for slower transition
//     } catch (error) {
//       toast.error(error.response?.data.message || "Failed to verify OTP. Please try again.");
//       setProgress(0); // Reset progress bar on error
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Handle Resend OTP
//   const handleResendOtp = async () => {
//     if (!email) {
//       toast.error("Email is required!");
//       return; // Stop execution if email is not provided
//     }

//     setLoading(true);
//     setProgress(25); // Start progress bar when resending OTP
//     try {
//       const response = await axios.post('http://localhost:5000/auth/resendotp', { email });
//       toast.success(response.data.message);
//       setProgress(100); // Complete progress bar after resending OTP
//     } catch (error) {
//       toast.error(error.response?.data.message || "Failed to resend OTP. Please try again.");
//       setProgress(0); // Reset progress bar on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
//         <img src={datasolvelogo} alt="datasolvelogo" className="img-fluid mb-4" style={{ maxHeight: '50px', objectFit: 'contain' }} />
//         <h3 className="text-center mb-4">Enter OTP</h3>
//         <p className="text-center mb-4">Please enter the OTP sent to your email</p>

//         {/* Spinner (only if loading is true and not redirecting) */}
//         {loading && !redirecting && (
//           <div className="text-center mb-4">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}

//         {/* Progress Bar (only if redirecting is false) */}
//         {!redirecting && loading && (
//           <div className="progress mb-4">
//             <div
//               className="progress-bar progress-bar-striped progress-bar-animated"
//               role="progressbar"
//               style={{ width: `${progress}%` }}
//               aria-valuenow={progress}
//               aria-valuemin="0"
//               aria-valuemax="100"
//             />
//           </div>
//         )}

//         <div className="d-flex justify-content-between mb-3">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="6"
//               pattern='\d{6}'
//               value={digit}
//               onChange={(e) => handleOtpChange(e, index)}
//               className="form-control text-center"
//               style={{ width: '50px', height: '50px' }}
//             />
//           ))}
//         </div>

//         <div className="d-flex justify-content-between mt-3">
//           <button onClick={handleOtpSubmit} disabled={loading || redirecting} className="btn btn-primary w-100">
//             {loading ? 'Verifying...' : 'Verify OTP'}
//           </button>
//         </div>

//         <div className="d-flex justify-content-between mt-3">
//           <button onClick={handleResendOtp} disabled={loading || redirecting} className="btn btn-secondary w-100">
//             {loading ? 'Resending...' : 'Resend OTP'}
//           </button>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme="colored"
//       />
//     </div>
//   );
// }

import { useState } from 'react';
import axios from 'axios';
import datasolvelogo from '../assets/datasolve.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../css/otpcomponent.css';



const apiURL=import.meta.env.VITE_BACKENDAPIURL;
console.log("Apootp",apiURL)

export default function Otpcomponent() {

 

  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [otp, setOtp] = useState(Array(6).fill('')); // Store OTP input values
  const [email, setEmail] = useState(location.state?.email || ''); // Get email from navigation state or default to empty
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress
  const [redirecting, setRedirecting] = useState(false); // Track redirection state

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric input
    if (/[^0-9]/.test(value)) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input when a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle backspace (focus on the previous input if the current one is empty)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };


  // Validate OTP (basic check)
  const validateOtp = () => {
    if (otp.some((digit) => digit === '')) {
      toast.error('Please enter all OTP digits');
      return false;
    }
    return true;
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    if (!email) {
      toast.error("Email is required!");
      return; // Stop execution if email is not provided
    }

    if (!validateOtp()) return;

    const otpCode = otp.join(''); // Join the OTP array into a string

    setLoading(true);
    setProgress(25); // Start progress bar at 25%
    try {
      
      const response = await axios.post(`${apiURL}/auth/verifyemail`, {
        email, // Pass email from the state
        otp: otpCode,
      });
      console.log("Response is:",response)
    

      setProgress(100); // Complete progress bar when OTP is verified

      // On successful OTP verification
      toast.success(response.data.message);

      // Add a longer delay before redirecting (e.g., 5 seconds)
      setTimeout(() => {
        setOtp(Array(6).fill('')); // Clear OTP input fields
        setRedirecting(true); // Set redirection flag
        navigate("/login"); // Navigate to login page after OTP is verified
      }, 5000); // Increase the delay to 5 seconds for slower transition
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to verify OTP. Please try again.");
      setProgress(0); // Reset progress bar on error
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is required!");
      return; // Stop execution if email is not provided
    }

    setLoading(true);
    setProgress(25); // Start progress bar when resending OTP
    try {
      const response = await axios.post(`${apiURL}/auth/resendotp`, { email });
      toast.success(response.data.message);
      setProgress(100); // Complete progress bar after resending OTP
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to resend OTP. Please try again.");
      setProgress(0); // Reset progress bar on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
        <img src={datasolvelogo} alt="datasolvelogo" className="img-fluid mb-4" style={{ maxHeight: '50px', objectFit: 'contain' }} />
        <h3 className="text-center mb-4">Enter OTP</h3>
        <p className="text-center mb-4">Please enter the OTP sent to your email</p>

        {/* Spinner (only if loading is true and not redirecting) */}
        {loading && !redirecting && (
          <div className="text-center mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Progress Bar (only if redirecting is false) */}
        {!redirecting && loading && (
          <div className="progress mb-4">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        )}

        <div className="d-flex justify-content-between mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`} // Unique ID for each input
              type="text"
              maxLength="1" // Allow only one character per input box
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace behavior
              className="form-control text-center"
              style={{ width: '50px', height: '50px' }}
            />
          ))}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button onClick={handleOtpSubmit} disabled={loading || redirecting} className="btn btn-primary w-100">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button onClick={handleResendOtp} disabled={loading || redirecting} className="btn btn-secondary w-100">
            {loading ? 'Resending...' : 'Resend OTP'}
          </button>
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


