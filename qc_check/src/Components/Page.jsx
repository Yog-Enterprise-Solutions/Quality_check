import React, { useEffect, useState } from "react";
import { FrappeApp } from "frappe-js-sdk";
import "./Page.css";


 export default function Page({frappe}) {
  
  const db = frappe.db();
  const [countitem, setCountItem] = useState(0);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (countitem === 0) {
      db.getDocList("Purchase Receipt")
        .then((doclist) => {
          const list = doclist.map((doc) => doc.name);
          setOrderList(list);
        })
        .catch((error) => console.error(error));
    }
    setCountItem(1);
  }, [countitem, db]);

  // Suggestions for purchase order
  const [selectedOrder, setSelectedOrder] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedOrder(value);
    const suggestions = orderList.filter((order) =>
      order.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  const [itemlist, setitemlist] = useState([]);
  const handleSuggestionClick = async (suggestion) => {
    setSelectedOrder(suggestion);
    setSuggestions([]);
    try {
      const doclist = await db.getDoc("Purchase Receipt", suggestion);
      setitemlist(doclist.items); // Assuming doclist.items is an array
    } catch (error) {
      console.error(error);
    }
  };

  const showsuggestions = () => {
    if (selectedOrder.trim() === "") {
      setSuggestions(orderList);
    } else {
      const filteredSuggestions = orderList.filter((order) =>
        order.toLowerCase().includes(selectedOrder.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const [selectedindex, setselectedindex] = useState();
  const [singleitem, setsingleitem] = useState();
  const clickitem = (row, index) => {
    console.log(row);
    setsingleitem(row);
    setselectedindex(index);
    document.querySelector(".firstpage").style.display = "none";
    document.querySelector(".secondpage").style.display = "block";
  };
  // create item list //
  const createitem = () => {
    return itemlist.map((row, index) => (
      <tr key={index} style={{ width: "100%" }}>
        <td id={row.name} className="itemnames" style={{ width: "100%" }}>
          <button className="itemcode" onClick={() => clickitem(row, index)}>
            Item No. = {index}
          </button>
        </td>
      </tr>
    ));
  };

  const createitemnames = () => {
    return itemlist.map((row, index) => (
      <tr key={index} style={{ width: "100%" }} id={index}>
        <td id={row.name} className="names" style={{ width: "100%" }}>
          <h3>
            {index + 1}. {row.item_name}
          </h3>
          <div id={row.idx} key={index}>
            <input type="radio" id="ok" name="option" value="ok" />
            <label htmlFor="ok">Ok</label>
            <br />
            <input type="radio" id="notok" name="option" value="notok" />
            <label htmlFor="notok">Not Ok</label>
            <br />
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="firstpage" style={{ display: "block" }}>
        <div className="firstdiv">
          <h1 className="heading">Quality Inspection</h1>
        </div>
        <div className="itemdiv">
          <div>
            <h3>Item</h3>
            <input
              type="search"
              placeholder="Search for your Orders"
              className="purorder"
              value={selectedOrder}
              onChange={handleInputChange}
              onFocus={showsuggestions}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>Warehouse</h3>
            <input type="search" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <table
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <thead></thead>
            <tbody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {createitem(itemlist.items)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="secondpage">
        <div className="secondinnerdiv">
          <div
            className="detailbox"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              className="itemname"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {singleitem && singleitem.item_name && (
                <h1
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e3dddd",
                    padding: "10px",
                    borderRadius: "10px",
                    fontSize: "2em",
                  }}
                >
                  {singleitem.item_name}
                </h1>
              )}
            </div>
            <div
              className="itemquantity"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h2>Quantity</h2>
              {singleitem && singleitem.qty && (
                <h2
                  style={{
                    display: "flex",
                    width: "100px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e3dddd",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  className="itemValue"
                >
                  {singleitem.qty}
                </h2>
              )}
            </div>
            <div
              className="itemquantity"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h2>warehouse</h2>
              {singleitem && singleitem.warehouse && (
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e3dddd",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  className="itemValue"
                >
                  {singleitem.warehouse}
                </h2>
              )}
            </div>
            <div
              className="itemquantity"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h2>Price</h2>
              {singleitem && singleitem.amount && (
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e3dddd",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                  className="itemValue"
                >
                  {singleitem.amount}
                </h2>
              )}
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: "0px",
              width: "100%",
              height: "30px",
              fontSize: "1.2em",
              borderRadius: "10px",
            }}
            // onClick={(e)=>{changepage}}
          >
            Next
          </button>
        </div>
      </div>
      <div className="thirdpage">
        <div>
          <div className="heading">
            <h3>Inspection Template</h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <table
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <tbody
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {createitemnames(itemlist.items)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}




