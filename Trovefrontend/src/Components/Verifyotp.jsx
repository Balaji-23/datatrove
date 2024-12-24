import datasolvelogo from '../assets/datasolve.png'

export default function Verifyotp(){

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4 w-100" style={{maxWidth:'400px'}}>
<img src={datasolvelogo} alt="datasolvelogo" style={{maxHeight:'50px',objectFit:'contain'}}/>
<h3 className='text-center mt-4'>Resend OTP</h3>
<p className='text-center mt-4'>We have sent you OTP to your Email</p>
<div className='d-flex justify-content-between mb-3'>
    <input type='email' className='form-control' placeholder='Enter email'/>
   </div>
   <div className='d-flex justify-content-between mt-3'>
            <input type="text" className='form-control' placeholder='Enter resend OTP' />
            </div>
            </div>
         
        </div>
       
    )
}