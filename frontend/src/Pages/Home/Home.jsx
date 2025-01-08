import { useEffect,useState } from "react";
import Card from "../../Components/Card/Card";
import { Footer } from "../../Components/Footer/Footer";
const Home = () => {
  const[search,setSearch]=useState("");
const[foodcat,SetFoodcat]=useState([]);
const[foodItem,SetFoodItem]=useState([]);
const loadData=async()=>{
  let response=await fetch("http://localhost:5000/api/foodData",{
    method:'POST',
    headers:{
      'Content-Type':'application/json'

    }
  });
  response=await response.json();
  SetFoodItem(response[0])
  SetFoodcat(response[1])
 // console.log(response[0],response[1])
}
useEffect(()=>{
  loadData()
},[])




  return (
    <>

<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel " style={{objectFit:"contain !important", Object:"cover"}} >
  <div className="carousel-inner" style={{maxHeight:"500px"}}>

     <div className="carousel-caption" style={{zIndex:"10"}}>
     <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
     {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
    </div>
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
















<div className="container">
  
{foodcat.length > 0 ? (
        foodcat.map((data, index) => (
          <div key={index} className="row mb-3">
            <div key={data.id}
            className="fs-3 m-3"
            >{data.CategoryName}
            </div>
            <hr/>
            {foodItem.length > 0 ? (
              foodItem
                .filter((item) =>( item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map((filteredItem) => (
                  <div key={filteredItem.id} className="col-12 col-md-6 col-lg-3 ">
                   <Card 
                //  foodName={filteredItem.name}
                //    options={filteredItem.options[0]}
                //    imgSrc={filteredItem.img}
                //    desc={filteredItem.description}
                //    price={filteredItem.data} 
                   foodItem={filteredItem}
                   options={filteredItem.options[0]}
                   
                   />
                  </div>
                ))
            ) : (
              <div>No items found for this category.</div>
            )}

  {foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                  <div>No item with this name found.</div>
                )}

          </div>
        ))
      ) : (
        <p>No categories found.</p>
      )

      }


      </div>
<Footer/>
  
    </>
  );
};


export default Home;