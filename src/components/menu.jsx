import React from 'react'
import axios from 'axios'
import { useEffect , useState} from 'react'

const Menu = () => {

    
const renderData = () => {

        const [meals , setMeals] = useState([])


    useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
    .then((res) => {
        setMeals(res.data.meals)
    })
    } , [])

  return (
    meals.map(({strMeal , strMealThumb , idMeal}) => (
      <section className='each-food' key={idMeal}>
        <img src={strMealThumb} alt="strMeal" className='image' />
        <p className='name'>{strMeal}</p>
      </section>
    ))

  )

}
  return (
    <div>
        <div className="all-cont">{renderData()}</div>
    </div>
  )
}

export default Menu
