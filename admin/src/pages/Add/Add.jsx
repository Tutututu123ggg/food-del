import { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const[image, setImage] =useState(false);

  const[data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHander = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }
  useEffect(()=>{
    console.log(data);
  },[data])

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh món ăn</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên món ăn</p>
          <input onChange={onChangeHander} value={data.name} type="text" name='name' placeholder='Nhập tên món' />
        </div>
        <div className="add-product-description flex-col">
          <p>Miêu tả món ăn</p>
          <textarea onChange={onChangeHander} value={data.description} name="description" rows="6" placeholder='Nội dung miêu tả' required/>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Phân loại món ăn</p>
            <select onChange={onChangeHander} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Cuốn</option>
              <option value="Deserts">Tráng miệng</option>
              <option value="Sandwich">Bánh mì</option>
              <option value="Cake">Bánh ngọt</option>
              <option value="Pure Veg">Đồ chay</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Mì</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá</p>
            <input onChange={onChangeHander} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Thêm</button>
      </form>        
    </div>
  )
}

export default Add