

const Slider = () => {
  return (
    <>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel " style={{objectFit:"contain !important", Object:"cover"}} >
  <div className="carousel-inner" style={{maxHeight:"500px"}}>

     <div className="carousel-caption" style={{zIndex:"10"}}>
     <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
     </div>
    <div className="carousel-item active ">
   
<img src="https://insanelygoodrecipes.com/wp-content/uploads/2024/04/Pepperoni-Pizza-Burgers-Close-Up.jpg" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="Pizza"/>

    </div>
    <div className="carousel-item">
      <img src="https://b.zmtcdn.com/data/pictures/9/19501509/8b2241f4d66527cba79ee5f9c45f2a40.jpg" className="d-block w-100"  style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://media.istockphoto.com/id/1133151212/photo/japanese-dumplings-gyoza-with-pork-meat-and-vegetables.jpg?s=612x612&w=0&k=20&c=vC6GTUDGK6dD5_QHvY1V7fVUdPx-z4TG73DUACR_L5s=" className="d-block w-100"   style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </>
  )
}

export default Slider
