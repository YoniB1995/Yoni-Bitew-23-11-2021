import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRouter from './components/routes/AppRouter';
import {useSelector } from "react-redux";
  import { ToastContainer } from 'react-toastify';

function App() {
  const getTheme = useSelector((state) => state.theme);

    const { theme } = getTheme;
  return (
    <div className="App" style={theme}>
     <AppRouter/>
     <ToastContainer/>
    </div>
  );
}

export default App;
