import React from 'react'

export default function StringCard() {
  return (
  <div className='d-flex justify-content-center align-items-center'>
            <div className='card h-100 mt-5 w-50 shadow'>
                <div className='card-body'>
                    <div className='d-flex justify-content-center'>
                        <h4 className="card-title">Inspection Template</h4>
                    </div>
                    <div className=' m-2 d-flex justify-content-center'>
                        <h3>{qadocument?.name}</h3>

                    </div>

                    <p>Specification :
                       {/* {specification} */}
                       </p>
                    <div>

                        <label for="specification"> Acceptance Criteria :</label>
                        <input type="text"
                            className="form-control m-2 w-50"
                            name="specification"
                            // value={acceptanceCriteria}
                            onChange={(e) => {
                                console.log("accetancecriteria", e.target.value)
                                // setacceptancecriteria(e.target.value)
                            }}
                            id="specification"
                            placeholder="Acceptance Criteria" />

                    </div>
                    <div className='d-flex justify-content-around'>
                        <button className='btn btn-primary'
                        //  value={readingValue}
                          onClick={() => {
                            // handleReadValue(acceptanceCriteria)
                            // updateInspectionString()
                        }

                        }>
                          {/* {acceptanceCriteria} */}
                        </button>

                    </div>

                </div>

            </div>
        </div>
  )
}
