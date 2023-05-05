import './banner.css';

export default function Banner({img}) {
  return (
    <div className="bannerContainer">
        <img className="bannerImg" src={"./locmarket/assets/"+img} alt="" />
    </div>
  )
}
