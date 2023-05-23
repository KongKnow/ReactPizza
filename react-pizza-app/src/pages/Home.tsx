import React, { useEffect, useRef } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { pizzaAsyncThunk } from "../redux/pizzaSlice"
import qs from 'qs'
import { setFilters } from "../redux/filterSlice"
import Categories from "../components/Categories"
import Sort from "../components/Sort"
import PizzaBlock from "../components/PizzaBlock"
import Skeleton from "../components/PizzaBlock/Skeleton"
import { RootState, useAppDispatch } from "../redux/store"
// import Pagination from '../components/Pagination'

const Home: React.FC = () => {

    const pizzas = useSelector((state: RootState) => state.pizza.pizzas)
    const status = useSelector((state: RootState) => state.pizza.getStatus)
    const isSearch = useRef(false)
    const isMounted = useRef(false)
    const category = useSelector((state: RootState) => state.filter.category)
    const sortBy = useSelector((state: RootState) => state.filter.sortBy)
    const searchValue = useSelector((state: RootState) => state.filter.searchValue)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
      if(window.location.search) {
        const currentParams = qs.parse(window.location.search.substring(1))

        console.log(currentParams)
        dispatch(setFilters(currentParams))

        isSearch.current = true
      }
      // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
      const search = searchValue === '' ? '' : `&search=${searchValue}`
      const link = !category ? `https://643a818790cd4ba563fae6cd.mockapi.io/items?sortBy=${sortBy[1][0]}&order=${sortBy[1][1]}${search}` :
      `https://643a818790cd4ba563fae6cd.mockapi.io/items?category=${category}&sortBy=${sortBy[1][0]}&order=${sortBy[1][1]}${search}`

      // For pagination in link should be added 'page=${currentPage}&limit=4&'

     
      dispatch(pizzaAsyncThunk(link))

      isSearch.current = false

        window.scrollTo(0, 0)


      if (isMounted.current) {
        const searchParams = qs.stringify({
          category,
          sortBy
        })

        navigate(`?${searchParams}`)
      }

      isMounted.current = true
      // eslint-disable-next-line
    }, [category, sortBy, searchValue])

    const pizzaBlocks = pizzas.map((pizza) => {
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
          
          {
            status === 'error' 
            ? 
            <h2 className="error">Произошла ошибка 😕</h2> 
            : 
            <>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
              {
                status === 'loading' ? skeletons : pizzaBlocks
              }
            </div>
            </>
          }
          {/* <Pagination onPageChange={setCurrentPage}/> */}
        </div>
    )
}

export default Home