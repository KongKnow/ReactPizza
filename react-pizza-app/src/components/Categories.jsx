import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../redux/filterSlice"

const Categories = () => {

  const activeCategory = useSelector(state => state.filter.category)
  const dispatch = useDispatch()

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
              <ul>
                {
                  categories.map((category, i) => {
                    return (
                      <li key={i} onClick={() => {
                          dispatch(setCategory(i))
                        }} 
                        className={activeCategory === i ? 'active' : ''}>
                        {category}
                      </li>
                    )
                  })
                }
              </ul>
        </div>
    )
}

export default Categories