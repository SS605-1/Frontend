import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/loginPage';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoginLoadingPage from './pages/Loading/loginLoadingPage';
import Main from './pages/Main/main';
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/kakao" element={<LoginLoadingPage />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
};
export default App;
