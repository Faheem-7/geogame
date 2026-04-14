import React from 'react'
import { useEffect , useState} from 'react'

const HeroSection = () => {


    const [isFade , setFade] = useState(false)
    const [isText , setText] = useState(false)
    const [text , setTheText] = useState("")
    const [head , setHead] = useState('')

    useEffect(() => {
      const settingText = () => {
      if(isFade){
      setTheText(`
Savor the perfect slice! Our pizzas are crafted with a golden, hand-tossed crust, rich tomato sauce, 
and melted cheese that stretches with every bite. From classic Margherita to bold, adventurous toppings, each pizza is made 
fresh to satisfy every craving. Bite into the flavor, 
share the joy, and experience pizza the way it’s meant to be—delicious, fresh, and unforgettable`) 

 setHead('Delicious Pizza, Made for Every Craving')
      }
        else{
          setTheText(`Each of our signature cheesy burgers is crafted with flame-grilled beef, stacked high with melted, golden cheese, and served on a 
        freshly toasted bun. Whether you're a classic cheeseburger lover or craving something with a bold twist, we've got something to satisfy every craving. 
        No shortcuts, no gimmicks — just real ingredients, big flavor, and that satisfying first bite that keeps you coming back for more.`) 
        setHead('Irresistible Burgers, Packed with Flavor')
          }
      }

    settingText()
}, [isText])

    useEffect(() => {
     const interval = setInterval(() => {
    setFade(prev => !prev)
    setText(previ => !previ)
      },10000)

      return () => clearInterval(interval)

    },[])


  return (
    <div>
          <section className='home'>
      <div className="text-cont">
      <div className="p-head">{head}</div>
      <div className="paragraph">{text}</div>
</div>
    <div className={isFade ? "bg" : "fadeOut"}></div>
    <div className="btns">
        <div className="order-now"><div className="text-in">order now</div></div>
    <div className="see-more"><div className="text-in">see more</div></div>
    </div>
    </section>
    </div>
  )
}

export default HeroSection
