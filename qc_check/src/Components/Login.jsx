import React from 'react'
import { addLoginToken } from '../Context/LocalStorage'
import { useState, useEffect } from 'react'


import { useNavigate } from 'react-router-dom'
export default function Login({ frappe }) {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")


	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = frappe.auth();
			const response = await auth.loginWithUsernamePassword({ username, password });
			addLoginToken()

			if (response) {
				navigate("/home")
			}

			// document.querySelector(".login").style.display = "none";
			// document.querySelector(".scaner").style.display = "block";
		} catch (error) {
			console.error({ error: error.message })
		}
	}
	// className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"

	return (
		// <div className='container'>
		<div className='d-flex justify-content-center align-items-center  ' >
			<div className='card mt-5  shadow' style={{ height: "300px", width: "300px" }} >
				<div className='card-body'>
					<h5 className="card-title d-flex justify-content-center " >Login</h5>

					<form onSubmit={handleSubmit}>
						<div className="form-group ">
							<label for="exampleInputEmail1">Email address :</label>
							<input type="text"
								name="username"
								className="form-control m-2"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email" />

						</div>
						<div className="form-group">
							<label for="exampleInputPassword1">Password :</label>
							<input type="password"
								className="form-control m-2"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								id="exampleInputPassword1"
								placeholder="Password" />
						</div>

						<div className='d-flex justify-content-center'>
							<button type="submit"
								className="btn btn-primary m-3 "
							>
								Submit
							</button>

						</div>

					</form>

				</div>

			</div>
		</div>
		// </div>
	)
}
