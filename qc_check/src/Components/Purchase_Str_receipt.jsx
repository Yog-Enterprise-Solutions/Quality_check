import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import StringCard from './StringCard';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Purchase_Str_receipt({ frappe }) {
    const navigate = useNavigate()
    const db = frappe.db();
    const location = useLocation();

    let [count, setCount] = useState(0)

    const [qadocument, setqaDocument] = useState(null)

    const [items, setItems] = useState([])

   const [inuputValue1,setInputValue1] = useState("")
   const [inuputValue2,setInputValue2] = useState("")


    const [inputValue, setInputValue] = useState("")

   
    const handleChange = (value) => {
        setInputValue(value)
    }

    useEffect(() => {
        let LocalStoredItem = localStorage.getItem("document");
        if (LocalStoredItem) {
            setqaDocument(JSON.parse(LocalStoredItem));
            console.log("")
        
        }
    }, [count ])

    useEffect(() => {
            if (qadocument) {
                setItems(qadocument?.readings)
        }
    }, 
    // [count===0&&qadocument&&items&&qadocument?.readings]
    [count===0,count && qadocument && items ,qadocument?.readings ,items[count]]
) 


    const previous = () => {
        if (count <= 0) {

            alert("no previuos element")
        } else {
            setCount(count - 1);

        }

    }

    const next = () => {
        if (count === items.length - 1) {
            alert("no next element")
        } else {
            setCount(count + 1)

        }

    }


    const saveData = () => {
        const updatedItems = items.map((item) => {
          if(item?.numeric){
            return {
                ...item,
                specification :item?.specification,
                reading_1 : inuputValue1,
                reading_2 : inuputValue2,

            }
           

          } else { 
            return {
                ...item,
                specification: item?.specification,
                status: item?.status,
                reading_value: inputValue

            }
         
        }
        })
        db.updateDoc('Quality Inspection', qadocument?.name, {   
            readings: updatedItems

        })
            .then((doc) => {
                if(count === doc?.readings.length-1){
                     console.log("updated")
                     navigate("/home")
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>

            <div className='d-flex justify-content-center align-items-center'>
                <div className='card h-100 mt-5 w-50 shadow'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-center'>
                            <h4 className="card-title">Inspection Template</h4>
                        </div>
                        <div className=' m-2 d-flex justify-content-center'>
                            <h6>{items?.[count]?.idx} of {items?.length}</h6>
                        </div>


                        <p className='m-2 d-flex justify-content-center'>{items?.[count]?.specification}</p>


                        {!items?.[count]?.numeric ? <>
                            <div>
                                <p className='m-2 d-flex justify-content-center'>  Acceptance Criteria :{items?.[count]?.value}</p>

                            </div>
                            <div className='d-flex  justify-content-around my-1'>
                                <button className='btn btn-success'
                                    value={inputValue}
                                    onClick={() => {
                                        handleChange(`${items?.[count]?.value}`)
                                        console.log(`${items?.[count]?.value}`)


                                    }
                                    }>{items?.[count]?.value}</button>
                                <button className='btn btn-danger'
                                    value={inputValue}
                                    onClick={() => {
                                        handleChange(`${"Not"}` + `${items?.[count]?.value}`)
                                        console.log((`${"Not"}` + `${items?.[count]?.value}`))
                                    }
                                    }>{"Not"}  {items?.[count]?.value}</button>

                            </div>

                        </>

                            : <div>
                                <div className=''>Reading 1 </div>
                                <input className='form-control'  type='text' onChange={
                                    (e)=> {setInputValue1(e.target.value)
                                        console.log(inuputValue1)
                                    }
                                    
                                    } />

                                <div className='' >Reading 2 {}</div>
                                <input className='form-control' type='text' onChange={(e)=>{
                                    setInputValue2(e.target.value)
                                    console.log(inuputValue2)
                                }}    />

                            
                            </div>}







                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className='card h-50  w-50 shadow'>
                    <div className="card-body">
                        <p className="card-text"></p>
                        <div className='d-flex justify-content-around'>
                            <button className='btn btn-outline-primary ' onClick={() => previous(items)}>{"<"}</button>
                            <button className='btn btn-dark ' onClick={saveData}>Save Button</button>
                            <button className='btn btn-outline-primary ' onClick={() => next(items)}>{">"}</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    )
}
