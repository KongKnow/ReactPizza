import { Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllItems, setTotalPrice } from "./redux/cartSlice";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const pizzas = localStorage.getItem('cartPizzas')
    const totalPrice = localStorage.getItem('totalPrice')

    if(pizzas && totalPrice) {
      dispatch(setAllItems(JSON.parse(pizzas)))
      dispatch(setTotalPrice(+totalPrice))
      
    }
  })

  return (
    <div className="wrapper">
        <Header />
        <div className="content">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
