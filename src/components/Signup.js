import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:"" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, password} = credentials
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // Save the auth token redirect
      localStorage.setItem('token', json.authtoken)
      props.showAlert('Account Created Successfully', 'success')
      navigate('/login')
    }
    else {
      props.showAlert('Invalid Details', 'danger')
    }
  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-2'>
      <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" value={credentials.name} onChange={onchange} id="name" name="name"  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.cpassword} onChange={onchange} id="cpassword" name="cpassword" minLength={5} required/>
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup
