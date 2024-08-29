import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/loginPage';
import SplashScreen from './pages/SplashScreen/splashScreen';
import LoginLoadingPage from './pages/Loading/loginLoadingPage';
import Main from './pages/Main/main';
import SignInPage from './pages/SignIn/signIn';
import JoinStore from './pages/Store/joinStore';
import NewStore from './pages/Store/newStore';
import HomePage from './pages/Home/homePage';
import SettingPage from './pages/Setting/settingPage';
import Commute from './pages/Commute/commute';
import WageCalculate from './pages/Setting/wageCalculate';
import InviteEmployee from './pages/Setting/inviteEmployee';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth2/kakao" element={<LoginLoadingPage />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/JoinStore" element={<JoinStore />} />
        <Route path="/NewStore" element={<NewStore />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Setting" element={<SettingPage />} />
        <Route path="/Commute" element={<Commute />} />
        <Route path="/WageCalculate" element={<WageCalculate />} />
        <Route path="/InviteEmployee" element={<InviteEmployee />} />
      </Routes>
    </div>
  );
};
export default App;
