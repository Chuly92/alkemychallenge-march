import {Routes, Route} from 'react-router-dom';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Home} from './components/Home';
import {Login} from './components/Login';
import {Details} from './components/Details';
import { Results } from './components/Results';

//Styles
import './css/App.css';
import './css/bootstrap.min.css';

function App() {

  return (
    <>
      <Header/>
      
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/details" element={<Details/>} />
        <Route path="/react-movielist/results" element={ <Results/>} />
      </Routes>   

      <Footer/>   
    </>
  );
}

export default App;
