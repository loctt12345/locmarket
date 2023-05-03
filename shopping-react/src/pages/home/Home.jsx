import './home.css';
import Topbar from '../../components/topbar/Topbar';
import Banner from '../../components/banner/Banner';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import ProductPath from '../../components/productPath/ProductPath';
import Footer from '../../components/footer/Footer';

export default function Home() {
    return (
        <>
          <Topbar/>
          <div className="homePageBanner" style={{display: "flex"}}>
            <Banner img="productBanner.jpg"/>
            <Banner img="banner.webp"/>
            <Banner img="banner.webp"/>
          </div>
          
          <ProductPath/>
          <div className='homeContainer'>
              <Sidebar/>
              <Rightbar/>
          </div>
          <Footer/>  
        </>
    )
}
