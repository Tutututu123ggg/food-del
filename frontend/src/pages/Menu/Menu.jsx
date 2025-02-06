import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import React, { useState } from 'react';

const Menu = () => {
    
    const [category, setCategory] = useState("All");

  return (
    
    <div>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Menu
