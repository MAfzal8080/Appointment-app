import { useState } from 'react'
import './App.css'

function App() {
  const [blog, setBlog] = useState({name: "", price: "", company: "", description: ""});
  const [details, setDetails] = useState("")
    const handleChange = async (e)=>{
        setBlog({...blog, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, phone, date} = blog;
        const response = await fetch('http://localhost:5000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, phone, date})
        });
        const json = await response.json()
        if (json) {
          alert('Product has been added to the database');
        }
    };

    const fetchData = async ()=>{
      const data = await fetch('http://localhost:5000/appointments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const parse = await data.json()
      setDetails(parse)
      // console.log(parse);
      // console.log(details);
    }

  return (
    <div className='container justify-content-center' style={{width:'678px'}}>
      <form method='post' className=' border border-info bg-info m-4 pb-4 w-50' style={{minWidth: '-webkit-fill-available'}}>
        <h2 className='bg-dark text-white text-center p-2'>Appointment form</h2>
        <div className="form-group m-2">
          <input type='text' name='name' placeholder='Enter your name' onChange={handleChange} />
        </div>
        <div className="form-group m-2">
        <input type='email' name='email' placeholder='Enter your email' onChange={handleChange} />
        </div>
        <div className="form-group m-2">
        <input type='number' name='phone' placeholder='Enter your phone number' onChange={handleChange} />
        </div>
        <div className="form-group m-2">
        <input type='date' name='date' placeholder='Enter date' onChange={handleChange} />
        </div>
        <div className="form group m-2">
        <button className='btn btn-primary' type='submit' onClick={handleSubmit}>Book appointmnet</button>
        </div>
      </form>

      <div className="container">
        <button className='btn btn-primary' onClick={fetchData}>Show appointments</button>
        <h3>Todays Appointments</h3>
        <div className="container">
          <table  className="table table-striped rounded" border='1' cellSpacing='0'>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {
                details && details.map((person, idx)=>{
                  return <tr key={idx}>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>{person.date}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
              {details.length===0 ? <h3>Nothing to show</h3> : ""}
        </div>
        </div>
    </div>
  )
}

export default App
