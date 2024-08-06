import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/loginPage';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoginLoadingPage from './pages/Loading/loginLoadingPage';
import Main from './pages/Main/main';
import SignInPage from './pages/SignIn/signIn';
import JoinStore from './pages/Store/joinStore';
import NewStore from './pages/Store/newStore';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/SplashScreen" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/kakao" element={<LoginLoadingPage />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/JoinStore" element={<JoinStore />} />
        <Route path="/NewStore" element={<NewStore />} />
      </Routes>
    </div>
  );
};
export default App;
