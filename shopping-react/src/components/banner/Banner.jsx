import './banner.css';

export default function Banner({img}) {
  return (
    <div className="bannerContainer">
        <img className="bannerImg" src={"/assets/"+img} alt="" />
    </div>
  )
}
