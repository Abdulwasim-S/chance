import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import WelcomePage from './Pages/WelcomePage';
import { Route, Routes } from 'react-router-dom';
import RouteTestPage from './Pages/RouteTestPage';
import FooterPage from './Pages/FooterPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HeaderPage from './Pages/HeaderPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import CheckMailPage from './Pages/ForgetPassword/CheckMailPage';
import ResetPasswordPage from './Pages/ForgetPassword/ResetPasswordPage';
import JobPage from './Pages/JobPage/JobPage';
import PostNewJob from './Pages/JobPage/PostNewJob';

function App() {
  return (
    <div className='App'>
      <HeaderPage/>
      <Routes>
        <Route exact path='/' element={<WelcomePage/>}/>
        <Route path='/test' element={<RouteTestPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/mail' element={<CheckMailPage/>}/>
        <Route path='/resetpassword' element={<ResetPasswordPage/>}/>
        <Route path='/jobs' element={<JobPage/>}/>
        <Route path='/post-new-job' element={<PostNewJob/>}/>
      </Routes>
      <FooterPage/>
    </div>
  );
}

export default App;
