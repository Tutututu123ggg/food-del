import './AboutUs.css'
import headerImage from '../../assets/header_img2.png';

const AboutUs = () => {
  return (
    <div>
      <div className='title'>Về chúng tôi</div>
      <div className="content">
        <img className="pic" src={headerImage} alt="" />
        <div className="text">
            <p>Nhà hàng của chúng tôi là điểm đến lý tưởng cho những ai yêu thích khám phá đa dạng các món ăn từ nhiều nền văn hóa khác nhau. Với thực đơn phong phú, chúng tôi mang đến cho khách hàng những lựa chọn tuyệt vời từ các món ăn truyền thống Việt Nam đầy đậm đà, đến những món ăn nổi tiếng của các quốc gia trên thế giới. Mỗi món ăn được chế biến tỉ mỉ, từ nguyên liệu tươi ngon, đảm bảo không chỉ chất lượng mà còn hương vị tuyệt hảo. Đặc biệt, nhà hàng còn cung cấp các món ăn phù hợp với nhu cầu và sở thích của mọi khách hàng, từ các món ăn chay nhẹ nhàng, các món hải sản tươi sống cho đến các món thịt nướng thơm ngon.</p>
            <p>Chúng tôi luôn cam kết đem đến cho thực khách những bữa ăn không chỉ ngon mà còn đầy đủ dinh dưỡng, an toàn và sạch sẽ. Dù bạn đến để thưởng thức bữa ăn gia đình, một buổi hẹn hò lãng mạn hay một bữa tiệc đặc biệt, nhà hàng chúng tôi luôn sẵn sàng chào đón và phục vụ bạn với sự nhiệt huyết và lòng hiếu khách. Hãy đến và cảm nhận sự khác biệt trong từng món ăn tại nhà hàng của chúng tôi!</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
