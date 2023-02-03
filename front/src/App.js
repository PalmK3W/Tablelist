import ListJson from './list.json';
import Table from 'react-bootstrap/Table';
import { useState, Fragment,useMemo,useEffect} from 'react';
import Pagination from './Pagination';
import AED from './AED';
import axios from 'axios';
export default function App() {
//variable
    let [Len,setLen] = useState(0);
    const [sortAsc, setSortAsc] = useState(true);
    let [Inputdata, setInputdata] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 16;
    let [Foundtext,setFoundtext] = useState(ListJson.length);
   
//Filter Data
    const filterName = (Inputdata) => {
               return ListJson.filter((item)=>{
                return item.name.toLowerCase().includes(Inputdata.toLowerCase());
        });
    }
  


//Table
    const currentTableDevice = useMemo(()=>{
        const firstPageIndex = (currentPage - 1) * postsPerPage;
        const lastPageIndex = firstPageIndex + postsPerPage;
        if(Inputdata===""){setFoundtext(ListJson.length);return ListJson.slice(firstPageIndex, lastPageIndex);}
        else{setFoundtext(filterName(Inputdata).length);return filterName(Inputdata).slice(firstPageIndex, lastPageIndex);}
    },[Inputdata,currentPage])

// Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
      
// Call item list
    useEffect(()=>{
    axios.post('http://localhost:4000/get_item').then((res)=>{ 
      setLen(ListJson.length);
      })
      .catch((error)=>{
        console.log(error)
      })
},[Len]);

// Min Man sort
useEffect(()=>{
    currentTableDevice.sort((a,b)=>{
        if (sortAsc) {
            return a["price"] > b["price"] ? 1 : -1;
          } else {
            return a["price"] < b["price"] ? 1 : -1;
          }
});
},[sortAsc]);
    
return(
    <>
          
          
           
            <div className="Search">
                
                <input
                    className="search_device"
                    type="text"
                    placeholder="Search by name..."
                    value={Inputdata}
                    onChange={(e)=>setInputdata(e.target.value)}
                    autoFocus
                />
                <p className="searchtxt">found result: {Foundtext}</p>
                <div className='AED'>
                <AED data={ListJson}/>
                </div>
            </div>
            
            <div className="device_table">
                
            <Table striped borderless hover size="lg" >
            <thead>
            <tr>
                <th>order</th>
                <th>Name</th>
                <th onClick={()=>setSortAsc(!sortAsc)}>Price <span className='arrow'></span></th>
               
            </tr>
            </thead>
            <tbody>
            {currentTableDevice.map((device,index)=>{
                    
                    return(
                        <Fragment key={index}>
                        
                        <tr >
                            <td>{index+1}</td>
                            <td >{device.name}</td>
                            <td >{device.price}</td>
                         </tr>
                         
                        </Fragment>
                    )}
                   
            )}
            
            </tbody>
                </Table>
            </div>
            
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={ListJson.length}
            paginate={paginate}
            />
            
    </>
)
}