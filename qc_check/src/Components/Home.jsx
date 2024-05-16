import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

import Select from 'react-select'
import { getLoginToken } from '../Context/LocalStorage'
import { useState } from 'react'

import { useEffect } from 'react'
export default function Home({ frappe }) {
    let [names, setnames] = useState([])
    let [items, setItems] = useState([])
    let [suggestions, setSuggestions] = useState([])
    let [search, setSearch] = useState("")
    let [singleItem, setSingleItem] = useState("")
    const [orders, setOrders] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [showOrders, setShowOrders] = useState(false)
    const [allOrders, setAllOrders] = useState([])
    const getToken = getLoginToken()


    const db = frappe.db();

    const inputRef = useRef(null)


    console.log("orders", items)

    const getNames = () => {
        getToken
            ?
            db.getDocList('Purchase Receipt')
                .then((docs) => {
                    setnames(docs)
                    console.log("names", names)
                }
                )
                .catch((error) => console.error(error))
            :
            "Login to access the Data"
    }

    useEffect(() => {
        getNames()

    }, [])

    // const handleClick = () => {

    //     // setShowData(true)
    //     const promises = names && names.map(item =>
    //         db.getDoc('Purchase Receipt', item.name)
    //             .then(doc => {
    //                 return doc;
    //             })
    //             .catch(error => console.error(error))
    //     );

    //     Promise.all(promises)
    //         .then(results => {
    //             setItems(results)
    //             // setAllOrders(r)
    //             console.log("results- items-------->", items)

    //         })
    //         .catch(error => console.error(error));
    // }


    useEffect(() => {
        const promises = names && names.map(item =>
            db.getDoc('Purchase Receipt', item.name)
                .then(doc => {
                    return doc;
                })
                .catch(error => console.error(error))
        );

        Promise.all(promises)
            .then(results => {
                setItems(results)
                // setAllOrders(r)
                console.log("results- items-------->", items)

            })
            .catch(error => console.error(error));
    }, [names])


    // const handleDetails = (e) => {
    //     const inputValue = e;
    //     console.log(inputValue)
    // }

    function handleChange(e) {
        const inputValue = e.target.value;
        // if(inputValue){
        setSearch(inputValue);
        // const filterSuggestions = items.filter((item) =>  item.items.some(order => order.item_name.toLowerCase().includes(inputValue.toLowerCase())

        const filterSuggestions = items?.filter((item) => {

            return item?.items.some(order => order?.item_name.toLowerCase().includes(inputValue.toLowerCase()));
        });
        setSuggestions(filterSuggestions)
        console.log("suggestions", suggestions)
        // }else{
        //     setSuggestions([])
        // }

    }


    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='card h-100 mt-5 w-50 shadow'>
                <div className='card-body'>
                    <div className='d-flex justify-content-center'>
                        <h4 className="card-title">Quality Inspection</h4>
                    </div>
                    <div className=' row'
                    >

                        <div className='col-12'
                        >
                            <input class="form-control" id="exampleDataList" placeholder="Search search..." value={search} onChange={handleChange} />

                            {/* {suggestions.length ? <ul className='' style={{ height: items.length > 0 ? "100px" : "", overflowY: "auto", overflowX: "hidden" }}>
                                {
                                    suggestions.length > 0 && suggestions.map((item, index) => {
                                        return (
                                            <li className=' overflow-auto  border px-2  m-1'
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setSingleItem(item)
                                                    setOrders(item.items)
                                                }} value={item?.name} >{item?.name}</li>
                                        )
                                    })
                                }

                            </ul>
                                :

                                <ul style={{ height: items.length > 0 ? "100px" : "", overflowY: "auto", overflowX: "hidden" }} >
                                    {
                                        items.length > 0 && items.map((item, index) => {
                                            return (
                                                <li className=' overflow-auto  border px-2  m-1'
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        setSingleItem(item)
                                                        setOrders(item.items)
                                                    }} value={item?.name} >{item?.name}</li>
                                            )
                                        })
                                    }

                                </ul>


                            } */}
                        </div>


                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Item Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {search ? suggestions?.map((item, index) => {
                                    return item.items.map((order, orderIndex) => {
                                        return (
                                            <tr onClick={()=>{
                                                setSingleItem(item)
                                            }} 
                                            key={orderIndex}>
                                                <Link key={order.id}
                                                    to={order?.item_code}
                                                    state={{ order, singleItem }}
                                                    className='text-decoration-none'
                                                >
                                                    <td style={{ textDecoration: "none", fontSize: "12px" }}>{order?.item_code}</td>
                                                </Link>
                                                <td>{order?.item_name}</td>
                                                <td>{order?.creation.slice(0, 10).split("-").reverse().join("-")}</td> 
                                            </tr>
                                        );
                                    });
                                }) :

                                items.map((item, index) => {
                                    return item.items.map((order, orderIndex) => {
                                        return (
                                            <tr onClick={()=>{
                                                setSingleItem(item)
                                                console.log("singleItems",singleItem)
                                            }} 
                                            >
                                                <Link key={order.id}
                                                    to={order?.item_code}
                                                    state={{ order, singleItem }}
                                                    className='text-decoration-none'
                                                >
                                                    <td style={{ textDecoration: "none", fontSize: "12px" }}>{order?.item_code}</td> </Link>
                                                <td>{order?.item_name}</td>
                                                <td>{order?.creation.slice(0, 10).split("-").reverse().join("-")}</td> 
                                            </tr>
                                        );
                                    });
                                })
                                
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
