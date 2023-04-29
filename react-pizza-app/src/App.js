import { Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound";
import { useState, createContext } from "react";


const MyContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <MyContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
      </MyContext.Provider>
    </div>
  );
}

export default App;
