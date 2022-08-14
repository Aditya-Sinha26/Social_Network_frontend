import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes , useNavigate} from 'react-router-dom'
import { Home } from './components/screens/Home';
import { Signup } from './components/screens/Signup';
import { Login } from './components/screens/Login';
import { Profile } from './components/screens/Profile';
import { Createpost } from './components/screens/Createpost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducers/userReducer';
import { UserProfile } from './components/screens/UserProfile';

export const UserContext = createContext()
const Routing = ()=>{
  const navigate = useNavigate();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      navigate("/signin")
    }
  },[])
  return(
  <Routes>
      <Route exact path= "/" element={<Home/>}></Route>
      <Route exact path= "/signin" element={<Login/>}></Route>
      <Route exact path= "/signup" element={<Signup/>}></Route>
      <Route exact path= "/profile" element={<Profile/>}></Route>
      <Route exact path= "/create" element={<Createpost/>}></Route>
      <Route exact path= "/profile/:userid" element={<UserProfile/>}></Route>
      </Routes>
)}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routing/>
    </div>
    </BrowserRouter>
    </UserContext.Provider>
  
  );
}

export default App;
