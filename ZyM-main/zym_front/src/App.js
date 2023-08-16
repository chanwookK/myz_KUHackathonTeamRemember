import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Group from './components/Group/Group';
import My from './components/Mypage/My'
import Setting from './components/Settings/Setting';
import LoginPage from './components/LoginPage';
import Calendar from './components/Calendar/Calendar';

import GlobalStyles from './styles/GlobalStyle';
function App() {
  return (
    <BrowserRouter>
    <GlobalStyles/> 
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/my" element={<My/>}/>
      <Route path="/setting" element={<Setting/>}/>
      <Route path="/group" element={<Group/>}/>
      <Route path="/calendar" element={<Calendar/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
