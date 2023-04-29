import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setItems } from "../../redux/cartSlice"

const PizzaBlock = ({title, id, price, imageUrl, sizes, types}) => {
    const [counterType, setCounterType] = useState(0)
    const [counterSize, setCounterSize] = useState(0)

    const cartPizza = useSelector(state => state.cart.items.filter(item => item.id === id))
    const dispatch = useDispatch()

    const pizzaTypes = ['тонкое', 'традиционное']

    const amount = cartPizza.map(item => item.counter)
    const initialAmount = 0

    const onAdd = () => {
      const item = {
        title,
        id,
        price,
        imageUrl,
        size: sizes[counterSize],
        type: pizzaTypes[counterType],
        counter: 1
      }

      dispatch(setItems(item))
    } 

    return (
        <div className="pizza-block">
              <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
              />
              <h4 className="pizza-block__title">{title}</h4>
              <div className="pizza-block__selector">
                <ul>
                  {
                    types.map(type => {
                      if(types.length === 1) {
                        return <li key={type} className="active">{pizzaTypes[type]}</li>
                      }
                      return <li 
                        onClick={() => setCounterType(type)} 
                        className={counterType === type ? 'active' : ''} 
                        key={type}>
                          {pizzaTypes[type]}
                        </li>
                    })
                  }
                </ul>
                <ul>
                  {
                    sizes.map((size, i) => <li 
                      onClick={() => setCounterSize(i)} 
                      className={counterSize === i ? 'active' : ''} 
                      key={i}>
                        {size} см.
                      </li>)
                  }
                </ul>
              </div>
              <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>
                <div onClick={onAdd} className="button button--outline button--add">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                      fill="white"
                    />
                  </svg>
                  <span>Добавить</span>
                  <i>{cartPizza ? amount.reduce((sum, currentValue) => sum + currentValue, initialAmount) : 0}</i>
                </div>
              </div>
            </div> 
    )
}

export default PizzaBlock