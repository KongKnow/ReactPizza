import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "../redux/filterSlice"
import { RootState } from "../redux/store"

const Categories: React.FC = () => {

  const activeCategory = useSelector((state: RootState) => state.filter.category)
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