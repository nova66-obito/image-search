import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import pic from './assets/404.png'
export default function Search() {
  const api_key = "mRDYIBwxYx0EFNW_fYUjnyqbOobmcDroyqCa3H9hKFI"
  const page = 30;
  // page reset
  const [count,setCount] = useState(1);
  const [totalpage, setTotalpage] = useState(0);
  // apicall
  const api_serch = `https://api.unsplash.com/search/photos?page=${count}&per_page=${page}&query=`
  const [val, setVal] = useState([]);
  const [total ,setTotal] = useState("")
  let [search, setSearch] = useState("code");
  // click function
  const find =() => {
    let data = fetch(api_serch + search + "&client_id=" + api_key)
    let datavalue = data.then((value) => value.json());
    datavalue.then((curval) => setVal(curval.results))
    datavalue.then((curval)=>setTotal(curval.total))
  } 
  console.log(total)
  useEffect(function(){
    find()
  },[count])
  console.log(val)
  return (
    <>
      <main>
        <div className="container">
          <h1>image search</h1>
          {/* this for the seacrch */}
          <Form className="d-flex">
            <Form.Control 
            type="search" 
            placeholder="search image" 
            onChange={(e) => setSearch(e.target.value)}
            />
           <Button onClick={()=>find()}>search</Button>
          </Form>
          <div className="cell">
          <Button variant="secondary" onClick={() => find(setSearch("bird")) }>bird</Button>
          <Button variant="warning"  onClick={() => find(setSearch("anime")) }>anime</Button>
          <Button variant="info"  onClick={() => find(setSearch("nature")) }>nature</Button>
          <Button variant="dark"  onClick={() => find(setSearch("computer")) }>computer</Button>
          </div>
        </div>
        {/* this for the image */}
           { total === 0 ? 
             <div className="error text-center">
                <div>
                <h1>no image found !!!</h1>
                </div>
                <div className="gif">
                   <img src={pic} alt="not fonded" />
                </div>
            </div>
            :
            <div className="image-holder">
            {
              val.map((items) => {
                return (
                  <div className="img-holder">
                      <img src={items.urls.small} alt={items.alt_description} />
                  </div>
                )
              })
            }
          </div> 
           }
        {/* this for the refresh page */}
        <div className="next">
           { count > 1 && 
           (<Button onClick={() => setCount(count-1)} variant="light">Pervious</Button>)}
           { count >  totalpage && 
           (<Button onClick={() => setCount(count+1)} variant="danger">next page</Button>)}
        </div>
      </main>
    </>
  )
}