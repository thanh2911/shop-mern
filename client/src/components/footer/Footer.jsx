import React , {useContext} from 'react';
import './footer.scss' ;
import { GlobalState } from '../../GlobalState';
import logo from '../../assets/logo.png'

const Footer = () => {

  const {state} = useContext(GlobalState);

  return (
    <div className="footer grid">
      <div className="row">
      <div className="footer-item footer-item__img col l-3 m-6 c-12">
            <img src={logo} alt="" />
            <p>Hướng đến mục tiêu mang lại niềm vui ăn mặc mới mỗi ngày cho 
              hàng triệu người tiêu dùng Việt. Hãy cùng ThanhFS hướng đến một 
              cuộc sống năng động, tích cực hơn.</p>
        </div>
        <div className="footer-item col l-3 m-6 c-12">
            <h2>Về ThanhFS</h2>
            <p>Giới Thiệu</p>
            <p>Sản Phẩm</p>
            <p>Tin Tức</p>
        </div>
        <div className="footer-item col l-3 m-6 c-12">
            <h2>Chăm sóc khách hàng</h2>
            <p>Chính sách đổi trả</p>
            <p>Chính sách bảo hành</p>
            <p>Chính sách hoàn tiền</p>
        </div>
        <div className="footer-item col l-3 m-6 c-12">
            <h2>Tổng đài hỗ trợ</h2>
            <p>Liên hệ đặt hàng <b>0123456789</b></p>
            <p>Thắc mắc đơn hàng <b>0123456789</b></p>
            <p>Góp ý, khiếu nại  <b>0123456789</b></p>
        </div>
      </div>

    </div>
  )
}

export default Footer