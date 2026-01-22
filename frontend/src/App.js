import './App.css';
import {Routes,Route,Navigate} from "react-router"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useSelector, useDispatch } from "react-redux";
import { login, checkAuth } from "./redux/authSlice";
import { useEffect } from "react";
function App() {

  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
  <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0" />
     <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
     <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

  <Routes>
  <Route
      path="/"
      element={authUser ? <Chat /> : <Navigate to="/login" />}
    />
    <Route path='/login' element={authUser?<Navigate to="/" />:<Login />} />
    <Route path='/signup' element={authUser?<Navigate to="/" />:<Signup/>} />
  </Routes>
  </div>
  );
}

export default App;
