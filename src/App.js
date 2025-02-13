import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/Header/MainNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Switch } from "@mui/material";
import Trending from "./Pages/Trending/Trending";
import Series from "./Pages/Series/Series";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
        <Container>
          <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/series' element={<Series />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;