import React, { useState, useEffect, useRef } from "react";
import { FrappeApp } from "frappe-js-sdk";
import { QrReader } from "react-qr-reader";
import DatePicker from "react-datepicker";
import { format, formatDate } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import { HashRouter,BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Page from "./Components/Page";
import Insp_Template from "./Components/Insp_Template";
import Exp_View from "./Components/Exp_View";
import Purchase_Str_receipt from "./Components/Purchase_Str_receipt";
import Purchase_Num_receipt from "./Components/Purchase_Num_receipt";
function App() {
	const getSiteName = () => {
		if (
			window.frappe?.boot?.versions?.frappe &&
			(window.frappe.boot.versions.frappe.startsWith("15") ||
				window.frappe.boot.versions.frappe.startsWith("16"))
		) {
			return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
		}
		return import.meta.env.VITE_SITE_NAME;
	};

	const frappeUrl = getSiteName();

	var frappe = new FrappeApp(frappeUrl);





	/************************************************************************************* */





	return (
		
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Login frappe={frappe} />} />

				<Route path={"/home"} element={<Home frappe={frappe} />} />
				<Route path="/template" element={<Insp_Template frappe={frappe} />} />

				<Route path="/page" element={<Page frappe={frappe} />} />
				<Route path="/home/:order_code" element={<Exp_View frappe={frappe} />} />
				<Route path=":order_code/purchasestrreceipt/" element={<Purchase_Str_receipt frappe={frappe}/>}/>
				<Route path=":order_code/purchasenumreceipt/" element={<Purchase_Num_receipt frappe={frappe}/>}/>

			
			</Routes>
		</BrowserRouter>

	)




	//   // Scaner //
	//   const [warehouseList, setWarehouseList] = useState([]);
	//   const [countcall, setCountCall] = useState(0);
	//   const [data, setData] = useState("");
	//   const [cameraOn, setCameraOn] = useState(true);

	//   useEffect(() => {
	//     if (countcall < 1) {
	//       db.getDocList("Warehouse").then((docList) => {
	//         const warehouses = docList.map((doc) => doc.name);
	//         setWarehouseList(warehouses);
	//       });
	//       setCountCall(1);
	//     }
	//   }, [countcall, db]);

	//   const handleScanResult = (result, error) => {
	//     if (!!result) {
	//       setData(result.text);
	//       setCameraOn(false);
	//       document.querySelector(".showmgs").style.display = "block";
	//       document.querySelector(".display").style.display = "none";
	//     }
	//   };

	//   const handleSubmitButtonClick = () => {
	//     if (warehouseList.includes(data)) {
	//       setCameraOn(false);
	//       document.querySelector(".scaner").style.display = "none";
	//       document.querySelector(".warehouse").style.display = "block";
	//     } else {
	//       alert("Select a warehouse");
	//     }
	//   };

	//   // Warehouse Code //

	//   const handleSendButtonClick = (e) => {
	//     document.querySelector(".senditems").style.display = "block";
	//     document.querySelector(".warehouse").style.display = "none";
	//     localStorage.setItem("clickbtn", e.target.className);
	//     setCameraOn2(true);
	//   };

	//   const handleReceiveButtonClick = (e) => {
	//     document.querySelector(".senditems").style.display = "block";
	//     document.querySelector(".warehouse").style.display = "none";
	//     localStorage.setItem("clickbtn", e.target.className);
	//   };

	//   const handleRequestButtonClick = (e) => {
	//     document.querySelector(".request").style.display = "block";
	//     document.querySelector(".warehouse").style.display = "none";
	//     localStorage.setItem("clickbtn", e.target.className);
	//     setCameraOn2(true);
	//   };

	//   const handleHomeClick = () => {
	//     document.querySelector(".scaner").style.display = "block";
	//     document.querySelector(".warehouse").style.display = "none";
	//   };

	//   // request //

	//   const [purpose, setpurpose] = useState("");
	//   const currentDate = new Date();
	//   const [date, setDate] = useState(new Date());
	//   const [trimDate, setTrimDate] = useState();

	//   const sendbtncall = () => {
	//     if (date < currentDate) {
	//       alert("Please select a date on or after today");
	//       return;
	//     } else {
	//       setTrimDate(formatDate(date, "yyyy-MM-dd"));
	//       setpurpose(document.querySelector(".select").value);
	//       document.querySelector(".senditems").style.display = "block";
	//       document.querySelector(".request").style.display = "none";
	//       setCameraOn2(true);
	//     }
	//   };

	//   const homebtncall = () => {
	//     document.querySelector(".scaner").style.display = "block";
	//     document.querySelector(".request").style.display = "none";
	//   };

	//   // SendItems//

	//   const [count, setCount] = useState(0);
	//   const [itemList, setItemList] = useState([]);
	//   const [selectedItem, setSelectedItem] = useState("");
	//   const [selectedItemName, setSelectedItemName] = useState("");
	//   const [data2, setData2] = useState("");
	//   const [cameraOn2, setCameraOn2] = useState(false);
	//   const [callitems, setcallitems] = useState(0);
	//   const [itemList1, setItemList1] = useState();
	//   const [itemList2, setItemList2] = useState();
	//   const [itemList3, setItemList3] = useState();

	//   const toggleCamera2 = () => {
	//     setCameraOn2((prevState) => !prevState);
	//   };

	//   const handleScanResult2 = (result, error) => {
	//     if (!!result) {
	//       setData2(result.text);
	//       setCameraOn2(false);
	//     }

	//     if (!!error) {
	//     }
	//   };
	//   useEffect(() => {
	//     if (itemList.map((item) => item.name).includes(data2)) {
	//       setItemList1(itemList.map((item) => item.name).indexOf(data2));
	//       setItemList2(itemList[itemList1]);
	//       if (itemList2) {
	//         setItemList3(itemList2.item_name);
	//       }
	//       setSelectedItem(data2);
	//       setSelectedItemName(itemList3);
	//     }
	//   });

	//   useEffect(() => {
	//     if (callitems < 1) {
	//       db.getDocList("Item", {
	//         fields: ["item_name", "name"],
	//       }).then((docList) => {
	//         const items = docList.map((doc) => ({
	//           item_name: doc.item_name,
	//           name: doc.name,
	//         }));
	//         setItemList(items);
	//       });
	//       setcallitems(1);
	//     }
	//   }, [db]);

	//   const createqnt = () => {
	//     setCount(document.querySelector(".qnt").value);
	//   };

	//   const handleButtonClick = () => {
	//     if (itemList.map((item) => item.item_name).includes(itemList3)) {
	//       if (itemList3.trim() !== "" && count > 0) {
	//         const newItem = {
	//           name: selectedItemName,
	//           quantity: count,
	//           id: selectedItem,
	//           warehouse: data,
	//         };
	//         addItem(newItem);
	//         setCount(0);
	//         setSelectedItem("");
	//         setSelectedItemName("");
	//       }
	//       document.querySelector(".senditems").style.display = "none";
	//       document.querySelector(".itemlist").style.display = "block";
	//     } else {
	//       alert("select a valid item name");
	//       setCameraOn2(true);
	//     }
	//   };

	//   const handleHomeButtonClick = () => {
	//     document.querySelector(".senditems").style.display = "none";
	//     document.querySelector(".scaner").style.display = "block";
	//     setCameraOn(true);
	//   };

	//   // ItemsList //

	//   const [items, setItems] = useState([]);
	//   const itemsRef = useRef([]);

	//   const [, setRender] = useState({});

	//   const addItem = (item) => {
	//     if (item.name && item.name.trim() !== "") {
	//       const existingItemIndex = itemsRef.current.findIndex(
	//         (i) => i.name === item.name
	//       );
	//       if (existingItemIndex === -1) {
	//         itemsRef.current.push(item);
	//         setItems([...itemsRef.current]);
	//       }
	//     }
	//   };

	//   const btnclick = localStorage.getItem("clickbtn");
	//   let item_list = [];

	//   const updatedata = () => {
	//     if (btnclick === "btn send") {
	//       const item_list = items.map((i) => ({
	//         item_code: i.id,
	//         qty: i.quantity,
	//         s_warehouse: i.warehouse,
	//       }));

	//       db.createDoc("Stock Entry", {
	//         stock_entry_type: "Material Issue",
	//         items: item_list,
	//       })
	//         .then((doc) => console.log(doc))
	//         .catch((error) => console.error(error));
	//     } else if (btnclick === "btn Request") {
	//       const item_list = items.map((i) => ({
	//         item_code: i.id,
	//         qty: i.quantity,
	//         warehouse: i.warehouse,
	//       }));

	//       db.createDoc("Material Request", {
	//         stock_entry_type: "Material Request",
	//         items: item_list,
	//         material_request_type: purpose,
	//         schedule_date: trimDate,
	//       })
	//         .then((doc) => console.log(doc))
	//         .catch((error) => console.error(error));
	//     } else {
	//       const item_list = items.map((i) => ({
	//         item_code: i.id,
	//         qty: i.quantity,
	//         t_warehouse: i.warehouse,
	//       }));

	//       db.createDoc("Stock Entry", {
	//         stock_entry_type: "Material Receipt",
	//         items: item_list,
	//       }).then((doc) => console.log(doc));
	//     }
	//   };

	//   const handleButton2Click = () => {
	//     updatedata();
	//     document.querySelector(".scaner").style.display = "block";
	//     document.querySelector(".itemlist").style.display = "none";
	//     setItems([]);
	//     itemsRef.current = [];
	//     setcountcall(0);
	//     setcallitems(0);
	//   };

	//   const handleButtonClick2 = () => {
	//     document.querySelector(".senditems").style.display = "block";
	//     document.querySelector(".itemlist").style.display = "none";
	//     setCameraOn2(true);
	//   };

	//   const handleHomeButton = () => {
	//     document.querySelector(".scaner").style.display = "block";
	//     document.querySelector(".itemlist").style.display = "none";
	//     setCameraOn(true);
	//   };

	//   return (
	//     <>
	//       {/* // Login */}
	//       <div
	//         id="login"
	//         style={{
	//           height: "100vh",
	//           backgroundColor: "#f8f9fa",
	//           display: "block",
	//         }}
	//         className="login"
	//       >
	//         <div className="Contaner">
	//           <main
	//             className="form-signin"
	//             style={{
	//               maxWidth: "400px",
	//               padding: "20px",
	//               borderRadius: "10px",
	//               boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
	//             }}
	//           >
	//             <form>
	//               <h1 className="h1 mb-1 fw-center text-center">STOCK TRANSFER</h1>
	//               <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

	//               <div className="form-floating">
	//                 <input
	//                   type="email"
	//                   className="form-control"
	//                   id="floatingInput"
	//                   placeholder="name@example.com"
	//                   value={username}
	//                   onChange={(e) => setUsername(e.target.value)}
	//                   style={{ borderRadius: "10px" }}
	//                 />
	//                 <label htmlFor="floatingInput">Email address</label>
	//               </div>
	//               <div className="form-floating">
	//                 <input
	//                   type="password"
	//                   className="form-control"
	//                   id="floatingPassword"
	//                   placeholder="Password"
	//                   value={password}
	//                   onChange={(e) => setPassword(e.target.value)}
	//                   style={{ borderRadius: "10px" }}
	//                 />
	//                 <label htmlFor="floatingPassword">Password</label>
	//               </div>

	//               <div className="form-check text-start my-3">
	//                 <input
	//                   className="form-check-input"
	//                   type="checkbox"
	//                   value="remember-me"
	//                   id="flexCheckDefault"
	//                 />
	//                 <label className="form-check-label" htmlFor="flexCheckDefault">
	//                   Remember me
	//                 </label>
	//               </div>
	//               <button
	//                 className="btn btn-primary w-100 py-2"
	//                 type="button"
	//                 onClick={handleLogin}
	//                 style={{ borderRadius: "10px" }}
	//               >
	//                 Sign in
	//               </button>
	//               <p className="mt-5 mb-3 text-body-secondary text-center">
	//                 © 2023-2024
	//               </p>
	//             </form>
	//           </main>
	//         </div>
	//       </div>
	//       {/* // Scaner */}
	//       <div
	//         className="scaner"
	//         style={{
	//           flexDirection: "column",
	//           alignItems: "center",
	//           width: "100vw",
	//           height: "100vh",
	//           padding: "10px",
	//           display: "none",
	//           justifyContent: "center",
	//         }}
	//       >
	//         <div className="scanercontant">
	//           <div
	//             style={{
	//               display: "flex",
	//               alignItems: "center",
	//               justifyContent: "space-between",
	//               width: "100%",
	//             }}
	//           >
	//             <h1
	//               style={{
	//                 fontSize: "24px",
	//                 alignItems: "center",
	//                 justifyContent: "center",
	//                 display: "flex",
	//               }}
	//             >
	//               Stock Scanner
	//             </h1>
	//           </div>
	//           <div
	//             style={{
	//               width: "100%",
	//               marginTop: "-100px",
	//               display: "flex",
	//               justifyContent: "center",
	//               alignItems: "center",
	//               flexDirection: "column",
	//             }}
	//           >
	//             <h1
	//               style={{
	//                 display: "block",
	//                 justifyContent: "center",
	//                 alignItems: "center",
	//               }}
	//               className="display"
	//             >
	//               Scan a warehouse
	//             </h1>
	//             <div
	//               style={{
	//                 width: "200px",
	//                 height: "200px",
	//               }}
	//             >
	//               {cameraOn && (
	//                 <QrReader
	//                   onResult={handleScanResult}
	//                   facingMode="environment"
	//                   style={{ width: "100%" }}
	//                 />
	//               )}
	//             </div>
	//             <div
	//               className="showmgs"
	//               style={{
	//                 display: "none",
	//                 alignItems: "center",
	//                 justifyContent: "center",
	//               }}
	//             >
	//               <h1>Scaned Successfully</h1>
	//             </div>
	//           </div>
	//           <button className="btn submit" onClick={handleSubmitButtonClick}>
	//             → Submit/सबमिट
	//           </button>
	//         </div>
	//       </div>

	//       {/* warehouse */}
	//       <div className="warehouse" style={{ display: "none" }}>
	//         <div className="warehouseconaner">
	//           <div
	//             style={{
	//               display: "flex",
	//               alignItems: "center",
	//               position: "relative",
	//               padding: "10px",
	//               justifyContent: "space-between",
	//               width: "100%",
	//             }}
	//           >
	//             <h1>Warehouse</h1>
	//             <div className="btns">
	//               <button
	//                 onClick={handleHomeClick}
	//                 className="btn btn-dark Home"
	//                 style={{
	//                   width: "60px",
	//                   height: "30px",
	//                   borderRadius: "5px",
	//                   alignItems: "center",
	//                   justifyContent: "center",
	//                   display: "flex",
	//                   position: "relative",
	//                 }}
	//               >
	//                 Home
	//               </button>
	//             </div>
	//           </div>
	//           <div
	//             style={{
	//               display: "flex",
	//               justifyContent: "center",
	//               alignItems: "center",
	//               flexDirection: "column",
	//               position: "relative",
	//               top: "2em",
	//             }}
	//           >
	//             <div
	//               className="btns d-flex"
	//               style={{
	//                 display: "flex",
	//                 alignItems: "center",
	//                 justifyContent: "center",
	//                 flexDirection: "column",
	//                 position: "relative",
	//                 top: "15em",
	//                 gap: "60px",
	//                 width: "100vw",
	//               }}
	//             >
	//               <button onClick={handleSendButtonClick} className="btn send">
	//                 ↑ Send/सेंड
	//               </button>
	//               <button
	//                 onClick={handleRequestButtonClick}
	//                 className="btn Request"
	//               >
	//                 ↩ Request/रिक्वेस्ट
	//               </button>
	//               <button
	//                 onClick={handleReceiveButtonClick}
	//                 className="btn Receive"
	//               >
	//                 ↓ Receive/रिसीव
	//               </button>
	//             </div>
	//           </div>
	//         </div>
	//       </div>

	//       {/* SendItems */}
	//       <div
	//         className="senditems"
	//         style={{
	//           width: "100vw",
	//           height: "100vh",
	//           display: "none",
	//           flexDirection: "column",
	//           alignItems: "center",
	//           justifyContent: "space-around",
	//         }}
	//       >
	//         <div className="sendcontaner">
	//           <div
	//             style={{
	//               display: "flex",
	//               justifyContent: "space-between",
	//               alignItems: "center",
	//               width: "100%",
	//               padding: "10px",
	//             }}
	//           >
	//             <h1 style={{ margin: 0 }}>Send Items</h1>
	//             <div className="btns">
	//               <button
	//                 onClick={handleHomeButtonClick}
	//                 className="btn btn-dark Home"
	//                 style={{
	//                   width: "60px",
	//                   height: "30px",
	//                   borderRadius: "5px",
	//                   alignItems: "center",
	//                   justifyContent: "center",
	//                   display: "flex",
	//                 }}
	//               >
	//                 Home
	//               </button>
	//             </div>
	//           </div>
	//           <div style={{ width: "200px", height: "200px" }}>
	//             {cameraOn2 && (
	//               <QrReader
	//                 onResult={handleScanResult2}
	//                 facingMode="environment"
	//                 style={{ width: "100%" }}
	//               />
	//             )}
	//           </div>
	//           <div
	//             style={{
	//               display: "flex",
	//               alignItems: "center",
	//               justifyContent: "center",
	//               gap: "1em",
	//             }}
	//           >
	//             <input
	//               type="number"
	//               className="qnt"
	//               placeholder="Select Qty."
	//               value={count}
	//               min={1}
	//               onChange={createqnt}
	//               style={{ width: "50px" }}
	//             />
	//           </div>
	//           <button onClick={handleButtonClick} className="btn submit">
	//             → Submit/सबमिट
	//           </button>
	//         </div>
	//       </div>

	//       {/* request */}
	//       <div className="request" style={{ display: "none" }}>
	//         <div className="requestContaner">
	//           <div
	//             style={{
	//               display: "flex",
	//               justifyContent: "space-between",
	//               alignItems: "center",
	//               width: "100%",
	//               padding: "10px",
	//             }}
	//           >
	//             <h1>Request Form</h1>
	//             <div className="btns">
	//               <button
	//                 onClick={homebtncall}
	//                 className="btn btn-dark Home"
	//                 style={{
	//                   width: "60px",
	//                   height: "30px",
	//                   borderRadius: "5px",
	//                   alignItems: "center",
	//                   justifyContent: "center",
	//                   display: "flex",
	//                 }}
	//               >
	//                 Home
	//               </button>
	//             </div>
	//           </div>
	//           <div
	//             style={{
	//               width: "100%",
	//               height: "54vh",
	//               display: "flex",
	//               justifyContent: "center",
	//               alignItems: "center",
	//               flexDirection: "column",
	//             }}
	//           >
	//             <label for="opt" style={{ fontSize: "2em" }}>
	//               Purpose
	//             </label>

	//             <select
	//               name="options"
	//               className="select"
	//               style={{ width: "60%", height: "45px" }}
	//             >
	//               <option value="Purchase">Purchase</option>
	//               <option value="Material Transfer">Material Transfer</option>
	//               <option value="Material Issue">Material Issue</option>
	//               <option value="Manufacture">Manufacture</option>
	//               <option value="Customer Provided">Customer Provided</option>
	//             </select>
	//             <div>
	//               <h3>Required By</h3>
	//               <DatePicker selected={date} onChange={(date) => setDate(date)} />
	//             </div>
	//           </div>
	//           <div className="coustomer">
	//             <input
	//               type="text"
	//               placeholder="Select a customer"
	//               style={{ display: "none" }}
	//             />
	//           </div>
	//           <div
	//             style={{
	//               display: "flex",
	//               justifyContent: "center",
	//               alignItems: "center",
	//               flexDirection: "column",
	//               position: "relative",
	//               top: "2em",
	//             }}
	//           >
	//             <div
	//               className="btns d-flex"
	//               style={{
	//                 display: "flex",
	//                 alignItems: "center",
	//                 justifyContent: "center",
	//                 flexDirection: "column",
	//                 width: "100vw",
	//               }}
	//             >
	//               <button onClick={sendbtncall} className="btn send">
	//                 ↑ Send/सेंड
	//               </button>
	//             </div>
	//           </div>
	//         </div>
	//       </div>

	//       {/* itemlist */}
	//       <div
	//         className="itemlist"
	//         style={{
	//           width: "100%",
	//           height: "100vh",
	//           display: "none",
	//           flexDirection: "column",
	//           alignItems: "center",
	//           padding: "1em",
	//         }}
	//       >
	//         <div className="itemContaner">
	//           <div
	//             style={{
	//               display: "flex",
	//               justifyContent: "space-between",
	//               width: "100%",
	//               marginBottom: "1em",
	//             }}
	//           >
	//             <h1 style={{ margin: 0 }}>Items List</h1>
	//             <div className="btns">
	//               <button
	//                 onClick={handleHomeButton}
	//                 className="btn btn-dark Home"
	//                 style={{
	//                   width: "60px",
	//                   height: "30px",
	//                   borderRadius: "5px",
	//                   alignItems: "center",
	//                   justifyContent: "center",
	//                   display: "flex",
	//                 }}
	//               >
	//                 Home
	//               </button>
	//             </div>
	//           </div>
	//           <div
	//             style={{
	//               display: "flex",
	//               justifyContent: "space-around",
	//               width: "90%",
	//               marginBottom: "1em",
	//             }}
	//           >
	//             <h4
	//               style={{
	//                 flexBasis: "50%",
	//                 textAlign: "center",
	//                 fontSize: "1.2em",
	//               }}
	//             >
	//               Items Name
	//             </h4>
	//             <h4
	//               style={{
	//                 flexBasis: "50%",
	//                 textAlign: "center",
	//                 fontSize: "1.2em",
	//               }}
	//             >
	//               Quantity
	//             </h4>
	//           </div>
	//           {itemsRef.current.map((item, index) => (
	//             <div
	//               key={index}
	//               style={{
	//                 display: "flex",
	//                 justifyContent: "space-around",
	//                 width: "90%",
	//                 marginBottom: "1em",
	//               }}
	//             >
	//               <h6
	//                 style={{
	//                   flexBasis: "50%",
	//                   textAlign: "center",
	//                   fontSize: "1.1em",
	//                 }}
	//               >
	//                 {item.name}
	//               </h6>
	//               <h6
	//                 style={{
	//                   flexBasis: "50%",
	//                   textAlign: "center",
	//                   fontSize: "1.1em",
	//                 }}
	//               >
	//                 {item.quantity}
	//               </h6>
	//             </div>
	//           ))}

	//           <div
	//             style={{
	//               marginTop: "auto",
	//               marginBottom: "1em",
	//               display: "flex",
	//               justifyContent: "space-around",
	//               width: "90%",
	//             }}
	//           >
	//             <button
	//               className="btn btn-primary"
	//               id="back"
	//               style={{ width: "30%", fontSize: "1.2em" }}
	//               onClick={handleButtonClick2}
	//             >
	//               ←
	//             </button>
	//             <button className="btn submit" onClick={handleButton2Click}>
	//               → Submit/सबमिट
	//             </button>
	//           </div>
	//         </div>
	//       </div>
	//     </>
	//   );
}

export default App;
