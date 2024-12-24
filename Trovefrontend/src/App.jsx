import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landingpage from './Pages/Landingpage';
// import Gridcards from './Components/gridcards'
// import Navigationbar from './Components/Navigationbar'
// import Overlaytext from './Components/Overlaytext'
// import Footer from './Components/Footer'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Textinput from './Pages/Textinput';
import Otppage from './Pages/Otppage';
import Searchexcel from './Pages/Searchexcel';
import Downloadpop from './Components/Downloadpop';
import VerifyOTP from './Pages/Verifyotp';

// import Downloadpop from './Components/Downloadpop';

function App() {


  return (
    <>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Signup/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/landingpage" element={<Landingpage/>}></Route>
  <Route path='/textinputsearch' element={<Textinput/>}></Route>
  <Route path="/enterotp" element={<Otppage/>}></Route>
  <Route path='/searchwithexcel' element={<Searchexcel/>}></Route>
  <Route path='/resendotp' element={<VerifyOTP/>}></Route>
</Routes>
    </BrowserRouter>
   

    {/* <Downloadpop/>  */}
      
    </>
    
  )
}

export default App
