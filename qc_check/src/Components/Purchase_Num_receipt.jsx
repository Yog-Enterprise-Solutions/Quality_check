import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Purchase_Num_receipt() {
    const location = useLocation();
    const order = location.state && location.state.order
    console.log(order)
  return (

    <div className='d-flex justify-content-center align-items-center'>
            <div className='card h-100 mt-5 shadow'>
                <div className='card-body'>
                    <div className='d-flex justify-content-center'>
                        <h4 className="card-title">Inspection Template</h4>
                    </div>
                   <div className='m-2 d-flex justify-content-center'>
                   <img
                                style={{ height: "300px" }}
                                src={
                                    order?.image
                                }
                                alt="logo"
                                className="img-fluid"
                            />
                   </div>
                    <div className='d-flex justify-content-center m-1'>
                    <div className=''>Reading :</div>
                    <div>
                        <button className='btn btn-primary mx-1'>1</button>
                        <button className='btn btn-primary  mx-1'>2</button>
                        <button className='btn btn-primary  mx-1'>3</button>
                        <button className='btn btn-primary  mx-1'>4</button>
                        <button className='btn btn-primary  mx-1'>5</button>
                    </div>
                    <button className='btn btn-primary  mx-1'>OK</button>
                    </div>
                   
                    </div>

                </div>
            </div>
        
  )
}
