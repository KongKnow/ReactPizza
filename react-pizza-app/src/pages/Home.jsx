import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import axios from 'axios'
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
// import Pagination from '../components/Pagination'

const Home = ({searchValue}) => {

    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)
    const category = useSelector(state => state.filter.category)
    const sortBy = useSelector(state => state.filter.sortBy)
    // const [currentPage, setCurrentPage] = useState(1)
    
    useEffect(() => {
      const search = searchValue === '' ? '' : `&search=${searchValue}`
      const link = !category ? `https://643a818790cd4ba563fae6cd.mockapi.io/items?sortBy=${sortBy[0]}&order=${sortBy[1]}${search}` :
      `https://643a818790cd4ba563fae6cd.mockapi.io/items?category=${category}&sortBy=${sortBy[0]}&order=${sortBy[1]}${search}`

      // For pagination in link should be added 'page=${currentPage}&limit=4&'

      setLoading(true)
      axios.get(link)
        .then(res => {
          setPizzas(res.data)
          setLoading(false)
        })

        window.scrollTo(0, 0)
    }, [category, sortBy, searchValue])

    const pizzaBlocks = pizzas.map(pizza => {
      return <PizzaBlock
        key={pizza.id} 
        {...pizza}
      />
    })

    const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i}/>)

    return (
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              loading ? skeletons : pizzaBlocks
            }
          </div>
          {/* <Pagination onPageChange={setCurrentPage}/> */}
        </div>
    )
}

export default Home