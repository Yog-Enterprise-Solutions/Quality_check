import React, { createContext, useRef, useState ,useContext} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// import { DataProvider ,useData} from './DataContext';
export default function Exp_View( {frappe} ) {
    let index = 0;
    
    const db = frappe.db();
    const location = useLocation();
  
    const {order,singleItem} = location.state ;

    console.log("order in Exp_View",order,singleItem)
    const [docs,setDocs]  =useState()
    const [document, setDocument] = useState({});
    const [Items, setItems] = useState([])
    const [currentItem, setCurrentItem] = useState("")
    
    const handleAddInspection = async  (order) => {
        console.log("inspection created");
        try {
            const doc = await db.createDoc('Quality Inspection', {
                inspection_type: "Incoming",
                reference_name: order?.parent,
                sample_size: order?.qty,
                reference_type: "Purchase Receipt",
                inspected_by: 'Administrator',
                item_code: order?.item_code
            });
            console.log("document created", doc)
            setDocs(doc);
            localStorage.setItem("document", JSON.stringify(doc))

            const storedDocument = localStorage.getItem("document")
            if (storedDocument) {
                setDocument(JSON.parse(storedDocument));
                console.log("")
                console.log("storedDocument",document)
                  setItems(document?.readings)
                //   console.log()
            //   setCurrentItem(document?.readings[index])

            }
        } catch (error) {
            console.error(error);
        }
    };
    

  console.log("docs",docs)
    useEffect(() => {
       setCurrentItem(document?.readings?.[index])
    }, [Items]);


    const originalDate = order?.creation.slice(0, 10); // Assuming order?.creation is in format "YYYY-MM-DD"
    const [year, month, day] = originalDate.split('-');
    
    const formattedDate = `${day}-${month}-${year}`;
    


    return (
         <div className='d-flex justify-content-center align-Items-center'>
            <div className='card h-100 mt-5 w-75 shadow'>
                <div className='card-body'>
                    <div className='d-flex justify-content-center'>
                        <h4 className="card-title">Items Details</h4>
                    </div>
                    <div className='d-flex'>
                        <div className='col-4'>
                            <img
                                style={{ height: "150px" }}
                                src={
                                    order?.image
                                }
                                alt="logo"
                                className="img-fluid"
                            />
                        </div>
                        <div className='col-8'>
                            <h3 className='ms-5'>{order?.item_name}</h3>
                            <div className='d-flex justify-content-around m-3'>
                               
                                <div className=''>Ouantity : {order?.qty}</div>
                            </div>
                            <div className='d-flex justify-content-around m-3'>
                                <div className=''>Supplier : {singleItem?.supplier}</div>
                                <div className=''>Date : {`${formattedDate}`}</div>
                            </div>
                            <div className='d-flex justify-content-around '>
                                <div className=''>WareHouse : {order?.warehouse}</div>

                                <Link className='btn btn-success'
                                    to={`/${order?.item_code}/${currentItem &&currentItem?.numeric  === 1 ? 
                                        'purchasenumreceipt' : 'purchasestrreceipt'}`}
                                    state={{docs, Items,currentItem}}
                                    onClick={() => {
                                        handleAddInspection(order)
                                    }}
                                > Quality check</Link>
 
                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>

        
        
    )
}


