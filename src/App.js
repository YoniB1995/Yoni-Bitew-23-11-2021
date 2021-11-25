import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from './components/routes/AppRouter';
import { useDispatch, useSelector } from "react-redux";

function App() {
  const getTheme = useSelector((state) => state.theme);

    const { theme } = getTheme;
  return (
    <div className="App" style={theme}>
     <AppRouter/>
    </div>
  );
}

export default App;
