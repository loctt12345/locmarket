import CartItem from '../../components/cartItem/CartItem';
import Banner from '../../components/banner/Banner';
import Footer from '../../components/footer/Footer';
import Topbar from '../../components/topbar/Topbar';
import Pagination from '../../components/pagination/Pagination';
import './cart.css';
import { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { CartContext } from '../../context/CartContext';

let PageSize = 3;

export default function Cart() {

    const [subTotal, setSubTotal] = useState(0);
    const {cart} = useContext(CartContext);
    const [currentPage, setCurrentPage] = useState(1);
    const nodeRef = useRef();

    

    useEffect(() => {
        let total = 0;
        cart.map(p => {
            total += p.quantity * p.product.sellPrice;
            return 1;
        });
        setSubTotal(total);
        if (currentTableData.length === 0 && currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }, [cart]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return cart.slice(firstPageIndex, lastPageIndex);
      }, [currentPage, cart]);
    
    return (
        <>
            <Topbar/>
            <Banner img="cartBanner.jpg" />
            <div className="cartContainer">
                <div className="cartLeft">
                    <div className="cartHeader">
                    <div className="cartHeaderEmpty"></div>
                    <div className="cartHeaderPrice"><span>Giá</span></div>
                    <div className="cartHeaderTotal"><span>Tổng giá</span></div>
                    </div>
                    {
                        currentTableData.map((c, index) => {
                            return <CartItem key={index} item={c}/>
                        })
                    }
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={cart.length}
                  pageSize={PageSize}
                  onPageChange={page => setCurrentPage(page)}/>
                </div>
                <div className="cartRight">
                    <div className="cartSummary">
                        <div className="cartSummaryTitle">
                            <span>Tóm tắt đơn hàng</span>
                        </div>
                        <div className="cartSummaryContent">
                        <div className="cartSummarySubTotal">
                            <span className='subTotalLabel'>Tổng đơn giá</span>
                            <span className='subTotalValue' key={subTotal}>{subTotal}</span>
                        </div>
                        <div className="cartSummaryShip">
                            <span className='shipLabel'>Phí vận chuyển</span>
                            <span className='shipValue'>100000</span>
                        </div>
                        </div>
                        <div className="cartSummaryTotal">
                            <span className='totalLabel'>Tổng cộng</span>
                            <span key={subTotal + 100000} className='totalValue' ref={nodeRef}>{subTotal + 100000}</span>
                        </div>

                        <button className="checkoutButton">
                            <span>Thanh toán với</span>
                            <img src="/assets/paypalLogo.svg" alt="" className="paypalLogo" />
                        </button>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
    )
}
